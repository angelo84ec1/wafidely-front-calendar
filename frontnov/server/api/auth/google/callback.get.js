// server/api/auth/google/callback.get.js
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const code = query.code
  const state = query.state // establecimientoId

  console.log('═══════════════════════════════════════')
  console.log('📥 CALLBACK DE GOOGLE RECIBIDO')
  console.log('═══════════════════════════════════════')
  console.log('🔑 Code:', code ? 'RECIBIDO' : 'NO RECIBIDO')
  console.log('🏢 State (establecimientoId):', state)

  if (!code) {
    console.error('❌ No se recibió código de autorización')
    return sendRedirect(event, '/citas?error=no_code')
  }

  if (!state) {
    console.error('❌ No se recibió establecimientoId en state')
    return sendRedirect(event, '/citas?error=no_establishment')
  }

  try {
    // Detectar entorno para redirect URI
    const host = getRequestHeader(event, 'host')
    const isProduction = host?.includes('wafidely.com')
    
    const redirectUri = isProduction
      ? 'https://www.wafidely.com/api/auth/google/callback'
      : `http://${host}/api/auth/google/callback`

    console.log('🌐 Redirect URI:', redirectUri)

    const oauth2Client = new google.auth.OAuth2(
      config.public.googleClientId,
      config.googleClientSecret,
      redirectUri
    )

    console.log('🔄 Intercambiando código por tokens...')
    const { tokens } = await oauth2Client.getToken(code)
    
    console.log('✅ Tokens obtenidos:', {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      expiryDate: tokens.expiry_date
    })

    if (!tokens.refresh_token) {
      console.warn('⚠️ No se recibió refresh_token (usuario ya había autorizado antes)')
    }

    // 1. Guardar en cookie para uso inmediato
    const cookieData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      establecimientoId: state
    }

    console.log('🍪 Guardando cookie google_tokens')
    
    setCookie(event, 'google_tokens', JSON.stringify(cookieData), {
      httpOnly: true,
      secure: isProduction,
      maxAge: 60 * 60 * 24 * 30, // 30 días
      sameSite: 'lax',
      path: '/'
    })

    // 2. Guardar refresh_token en Strapi (persistencia)
    if (tokens.refresh_token) {
      console.log('💾 Guardando refresh_token en Strapi...')
      console.log('🏢 Establecimiento ID:', state)
      
      try {
        const strapiResponse = await fetch(`${config.public.baseURL}/establecimientos/${state}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            googleRefreshToken: tokens.refresh_token,
            googleCalendarSyncEnabled: true,
            googleLastSync: new Date().toISOString()
          })
        })

        if (strapiResponse.ok) {
          console.log('✅ Refresh token guardado en Strapi')
        } else {
          const errorText = await strapiResponse.text()
          console.error('❌ Error guardando en Strapi:', strapiResponse.status, errorText)
        }
      } catch (strapiError) {
        console.error('❌ Error al conectar con Strapi:', strapiError.message)
      }
    }

    console.log('═══════════════════════════════════════')
    console.log('✅ CALLBACK EXITOSO - Redirigiendo...')
    console.log('═══════════════════════════════════════')

    return sendRedirect(event, '/citas?google_auth=success')

  } catch (error) {
    console.error('═══════════════════════════════════════')
    console.error('❌ ERROR EN CALLBACK:')
    console.error('   Tipo:', error.constructor.name)
    console.error('   Mensaje:', error.message)
    console.error('   Stack:', error.stack)
    console.error('═══════════════════════════════════════')
    
    return sendRedirect(event, '/citas?error=auth_failed&message=' + encodeURIComponent(error.message))
  }
})