// server/api/calendar-admin.get.js
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  console.log('═══════════════════════════════════════')
  console.log('📡 CALENDAR-ADMIN ENDPOINT LLAMADO')
  console.log('═══════════════════════════════════════')

  try {
    // OPCIÓN 1: Intentar leer tokens desde cookie (si acabó de autenticar)
    const cookieTokens = getCookie(event, 'google_tokens')
    
    console.log('🍪 Cookie google_tokens:', cookieTokens ? 'EXISTE' : 'NO EXISTE')
    
    let tokens = null
    let establecimientoId = null

    // Si hay cookie, usarla
    if (cookieTokens) {
      try {
        tokens = JSON.parse(cookieTokens)
        establecimientoId = tokens.establecimientoId
        console.log('✅ Cookie parseada correctamente')
        console.log('🔑 Tokens desde cookie:', {
          hasAccessToken: !!tokens.access_token,
          hasRefreshToken: !!tokens.refresh_token,
          establecimientoId
        })
      } catch (parseError) {
        console.error('❌ Error parseando cookie:', parseError.message)
        deleteCookie(event, 'google_tokens')
      }
    }

    // OPCIÓN 2: Si no hay cookie o no tiene refresh_token, buscar en Strapi
    if (!tokens || !tokens.refresh_token) {
      console.log('🔍 No hay tokens en cookie, buscando en Strapi...')
      
      // Intentar obtener el establecimientoId de la cookie de usuario
      // Necesitarás ajustar esto según tu sistema de autenticación
      const userCookie = getCookie(event, 'user') // o como guardes el usuario
      
      if (!userCookie && !establecimientoId) {
        console.error('❌ No hay forma de identificar el establecimiento')
        return {
          authenticated: false,
          events: [],
          error: 'No hay autenticación. Por favor, inicia sesión.',
          needsReauth: true
        }
      }

      // Si tenemos establecimientoId, buscar en Strapi
      if (establecimientoId || userCookie) {
        try {
          let finalEstablecimientoId = establecimientoId
          
          // Si no tenemos establecimientoId pero sí userCookie, obtenerlo del usuario
          if (!finalEstablecimientoId && userCookie) {
            const user = JSON.parse(userCookie)
            finalEstablecimientoId = user.establecimiento?.id || user.establecimiento
          }

          console.log('🏢 Establecimiento ID para Strapi:', finalEstablecimientoId)

          const strapiResponse = await fetch(
            `${config.public.baseURL}/establecimientos/${finalEstablecimientoId}`
          )

          if (strapiResponse.ok) {
            const establecimiento = await strapiResponse.json()
            console.log('📦 Establecimiento encontrado en Strapi:', {
              id: establecimiento.id,
              hasGoogleRefreshToken: !!establecimiento.googleRefreshToken,
              syncEnabled: establecimiento.googleCalendarSyncEnabled
            })

            if (establecimiento.googleRefreshToken && 
                establecimiento.googleCalendarSyncEnabled !== false) {
              
              tokens = {
                refresh_token: establecimiento.googleRefreshToken
              }
              establecimientoId = finalEstablecimientoId
              
              console.log('✅ Usando refresh_token de Strapi')
            } else {
              console.log('⚠️ No hay refresh_token en Strapi o sync deshabilitado')
              return {
                authenticated: false,
                events: [],
                error: 'Google Calendar no configurado. Sincroniza primero.',
                needsReauth: true
              }
            }
          } else {
            console.error('❌ Error obteniendo establecimiento de Strapi:', strapiResponse.status)
          }
        } catch (strapiError) {
          console.error('❌ Error conectando con Strapi:', strapiError.message)
        }
      }
    }

    // Si después de todo no tenemos tokens, error
    if (!tokens || !tokens.refresh_token) {
      console.error('❌ No se pudieron obtener tokens de ninguna fuente')
      return {
        authenticated: false,
        events: [],
        error: 'No hay tokens de Google. Por favor, sincroniza con Google Calendar.',
        needsReauth: true
      }
    }

    // Configurar OAuth2
    const oauth2Client = new google.auth.OAuth2(
      config.public.googleClientId,
      config.googleClientSecret
    )

    // Establecer credenciales
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date
    })

    console.log('📅 Consultando Google Calendar API...')

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    
    const now = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 2) // Próximos 2 meses

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
    
    if (events.length > 0) {
      console.log('📋 Primeros 3 eventos:', events.slice(0, 3).map(e => ({
        title: e.title,
        start: e.start
      })))
    }

    // Actualizar token si fue renovado automáticamente
    const currentTokens = oauth2Client.credentials
    if (currentTokens.access_token && currentTokens.access_token !== tokens.access_token) {
      console.log('🔄 Token renovado automáticamente por Google')
      
      // Actualizar cookie si existe
      if (cookieTokens) {
        setCookie(event, 'google_tokens', JSON.stringify({
          access_token: currentTokens.access_token,
          refresh_token: currentTokens.refresh_token || tokens.refresh_token,
          expiry_date: currentTokens.expiry_date,
          establecimientoId: establecimientoId
        }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 30,
          sameSite: 'lax',
          path: '/'
        })
      }

      // Actualizar en Strapi si tenemos establecimientoId
      if (establecimientoId && currentTokens.refresh_token) {
        try {
          await fetch(`${config.public.baseURL}/establecimientos/${establecimientoId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              googleRefreshToken: currentTokens.refresh_token,
              googleLastSync: new Date().toISOString()
            })
          })
          console.log('✅ Refresh token actualizado en Strapi')
        } catch (error) {
          console.error('⚠️ Error actualizando token en Strapi:', error.message)
        }
      }
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
    
    // Si el error es de autenticación (token expirado/inválido)
    if (error.code === 401 || error.code === 403 || 
        error.message?.includes('invalid_grant') ||
        error.message?.includes('Invalid Credentials')) {
      
      console.log('🗑️ Token inválido, limpiando cookie')
      deleteCookie(event, 'google_tokens')
      
      return {
        authenticated: false,
        events: [],
        error: 'Token de Google expirado o inválido',
        needsReauth: true
      }
    }

    return {
      authenticated: false,
      events: [],
      error: error.message || 'Error desconocido al obtener eventos'
    }
  }
})