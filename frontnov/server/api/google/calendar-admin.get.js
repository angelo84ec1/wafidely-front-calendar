// server/api/google/calendar-admin.get.js
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  console.log('═══════════════════════════════════════')
  console.log('📡 CALENDAR-ADMIN ENDPOINT LLAMADO')
  console.log('═══════════════════════════════════════')

  try {
    // Leer tokens desde cookie
    const cookieTokens = getCookie(event, 'google_tokens')
    
    console.log('🍪 Cookie google_tokens:', cookieTokens ? 'EXISTE' : 'NO EXISTE')
    
    if (!cookieTokens) {
      console.error('❌ No hay cookie de tokens')
      return { 
        authenticated: false, 
        events: [],
        error: 'No hay tokens. Sincroniza primero.'
      }
    }

    let tokens
    try {
      tokens = JSON.parse(cookieTokens)
      console.log('✅ Cookie parseada correctamente')
    } catch (parseError) {
      console.error('❌ Error parseando cookie:', parseError.message)
      deleteCookie(event, 'google_tokens')
      return {
        authenticated: false,
        events: [],
        error: 'Cookie corrupta',
        needsReauth: true
      }
    }
    
    console.log('🔑 Tokens:', {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      expiryDate: tokens.expiry_date,
      establecimientoId: tokens.establecimientoId
    })

    // Configurar OAuth2
    const oauth2Client = new google.auth.OAuth2(
      config.public.googleClientId,
      config.googleClientSecret
    )

    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date
    })

    console.log('📅 Consultando Google Calendar API...')

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    
    const now = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 3)

    console.log('📆 Rango de fechas:')
    console.log('   Desde:', now.toISOString())
    console.log('   Hasta:', endDate.toISOString())

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: endDate.toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime'
    })

    console.log('📊 Respuesta de Google:')
    console.log('   Total items:', response.data.items?.length || 0)

    const events = (response.data.items || [])
      .filter(event => event.start)
      .map(event => ({
        id: event.id,
        googleId: event.id,
        title: event.summary || 'Sin título',
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        description: event.description || '',
        location: event.location || '',
        source: 'google',
        status: event.status
      }))

    console.log(`✅ ${events.length} eventos procesados`)
    console.log('Primeros 3 eventos:', events.slice(0, 3).map(e => ({
      title: e.title,
      start: e.start
    })))

    // Actualizar token si fue renovado
    const currentTokens = oauth2Client.credentials
    if (currentTokens.access_token !== tokens.access_token) {
      console.log('🔄 Token renovado, actualizando cookie')
      
      setCookie(event, 'google_tokens', JSON.stringify({
        access_token: currentTokens.access_token,
        refresh_token: currentTokens.refresh_token || tokens.refresh_token,
        expiry_date: currentTokens.expiry_date,
        establecimientoId: tokens.establecimientoId
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        path: '/'
      })
    }

    console.log('═══════════════════════════════════════')

    return {
      authenticated: true,
      events,
      count: events.length
    }

  } catch (error) {
    console.error('❌ ERROR EN CALENDAR-ADMIN:')
    console.error('   Tipo:', error.constructor.name)
    console.error('   Mensaje:', error.message)
    console.error('   Code:', error.code)
    console.error('   Stack:', error.stack)
    console.log('═══════════════════════════════════════')
    
    if (error.code === 401 || error.code === 403) {
      console.log('🗑️ Token inválido, limpiando cookie')
      deleteCookie(event, 'google_tokens')
      
      return {
        authenticated: false,
        events: [],
        error: 'Token expirado',
        needsReauth: true
      }
    }

    return {
      authenticated: false,
      events: [],
      error: error.message
    }
  }
})