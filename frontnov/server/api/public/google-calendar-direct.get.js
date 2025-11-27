// server/api/public/google-calendar-direct.get.js
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const establecimientoId = query.establecimientoId

  console.log('═══════════════════════════════════════')
  console.log('🔍 ENDPOINT PÚBLICO - Google Calendar')
  console.log('═══════════════════════════════════════')
  console.log('Establecimiento ID:', establecimientoId)

  if (!establecimientoId) {
    console.error('❌ No hay establecimientoId')
    return { 
      error: 'Se requiere establecimientoId',
      events: [],
      authenticated: false 
    }
  }

  try {
    // ✅ Usar 127.0.0.1 en lugar de localhost (fuerza IPv4)
    const strapiUrl = 'http://127.0.0.1:1337'
    const url = `${strapiUrl}/establecimientos/${establecimientoId}`
    
    console.log('📡 Consultando Strapi:', url)

    let establecimientoResponse
    try {
      establecimientoResponse = await fetch(url, {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (fetchError) {
      console.error('❌ Error de conexión a Strapi:')
      console.error('   Mensaje:', fetchError.message)
      console.error('   Causa:', fetchError.cause?.code)
      
      if (fetchError.cause?.code === 'ECONNREFUSED') {
        console.error('   🔴 STRAPI NO ESTÁ CORRIENDO')
        console.error('   👉 Inicia Strapi con: npm run develop')
      }
      
      return {
        error: 'No se puede conectar a Strapi. Verifica que esté corriendo en el puerto 1337.',
        events: [],
        authenticated: false
      }
    }

    console.log('📡 Status de Strapi:', establecimientoResponse.status)

    if (!establecimientoResponse.ok) {
      const errorText = await establecimientoResponse.text()
      console.error('❌ Strapi respondió con error:', errorText)
      throw new Error(`Strapi error: ${establecimientoResponse.status}`)
    }

    const establecimiento = await establecimientoResponse.json()

    console.log('📋 Establecimiento obtenido:', {
      id: establecimiento.id,
      nombre: establecimiento.nombre,
      hasGoogleToken: !!establecimiento.googleRefreshToken,
      tokenLength: establecimiento.googleRefreshToken?.length || 0,
      syncEnabled: establecimiento.googleCalendarSyncEnabled
    })

    if (!establecimiento.googleRefreshToken) {
      console.log('⚠️ No hay token de Google para este establecimiento')
      return { 
        error: 'Google Calendar no está sincronizado. Ve al admin y sincroniza con Google.',
        events: [],
        authenticated: false,
        needsSetup: true
      }
    }

    if (!establecimiento.googleCalendarSyncEnabled) {
      console.log('⚠️ Sincronización deshabilitada')
      return { 
        error: 'La sincronización con Google Calendar está deshabilitada',
        events: [],
        authenticated: false,
        needsSetup: false
      }
    }

    console.log('✅ Token encontrado, configurando OAuth2...')

    // Configurar OAuth2
    const oauth2Client = new google.auth.OAuth2(
      config.public.googleClientId,
      config.googleClientSecret
    )

    oauth2Client.setCredentials({
      refresh_token: establecimiento.googleRefreshToken
    })

    console.log('📅 Consultando Google Calendar API...')

    // Consultar Google Calendar
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    const now = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 3)

    console.log('📆 Rango:', now.toISOString(), 'hasta', endDate.toISOString())

    const response = await calendar.events.list({
      calendarId: establecimiento.googleCalendarEmail || 'primary',
      timeMin: now.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 250
    })

    const events = response.data.items
      .filter(event => event.start)
      .map(event => {
        const start = event.start.dateTime || event.start.date
        const end = event.end.dateTime || event.end.date
        
        return {
          id: `google-${event.id}`,
          googleId: event.id,
          title: event.summary || 'Sin título',
          description: event.description || '',
          start: start,
          end: end,
          location: event.location || '',
          source: 'google',
          isAllDay: !event.start.dateTime,
          status: event.status
        }
      })

    console.log(`✅ ${events.length} eventos obtenidos de Google Calendar`)
    console.log('Primeros 3:', events.slice(0, 3).map(e => ({ title: e.title, start: e.start })))
    console.log('═══════════════════════════════════════')

    return { 
      events,
      authenticated: true,
      count: events.length,
      calendarEmail: establecimiento.googleCalendarEmail || 'primary',
      lastSync: new Date().toISOString()
    }

  } catch (error) {
    console.error('═══════════════════════════════════════')
    console.error('❌ ERROR EN ENDPOINT PÚBLICO')
    console.error('═══════════════════════════════════════')
    console.error('Tipo:', error.constructor.name)
    console.error('Mensaje:', error.message)
    console.error('Code:', error.code)
    console.error('Stack:', error.stack)
    console.error('═══════════════════════════════════════')
    
    if (error.code === 401 || error.code === 403) {
      return {
        error: 'Token de Google expirado o inválido. Ve al admin y vuelve a sincronizar.',
        events: [],
        authenticated: false,
        needsReauth: true
      }
    }

    return { 
      error: error.message || 'Error desconocido',
      events: [],
      authenticated: false
    }
  }
})