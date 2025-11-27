import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const code = query.code

  console.log('📥 Callback de Google recibido')

  if (!code) {
    console.error('❌ No se recibió código de autorización')
    return sendRedirect(event, '/citas?error=no_code')
  }

  try {
    const host = getRequestHeader(event, 'host')
    const redirectUri = host?.includes('localhost')
      ? `http://${host}/api/auth/google/callback`
      : config.public.googleRedirectUri

    const oauth2Client = new google.auth.OAuth2(
      config.public.googleClientId,
      config.googleClientSecret,
      redirectUri
    )

    console.log('🔄 Intercambiando código por tokens...')
    const { tokens } = await oauth2Client.getToken(code)
    
    console.log('✅ Tokens obtenidos')

    // Guardar en cookie (para el panel)
    setCookie(event, 'google_token', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax'
    })

    // ✅ NUEVO: Guardar refresh_token en Strapi
    if (tokens.refresh_token) {
      // Obtener usuario actual (asume que tienes auth)
      // Ajusta según tu sistema de autenticación
      const userToken = getCookie(event, 'auth_token') // o como guardes el token del usuario
      
      if (userToken) {
        // Obtener establecimiento del usuario
        const userResponse = await fetch(`${config.public.baseURL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        })
        
        if (userResponse.ok) {
          const user = await userResponse.json()
          const establecimientoId = user.establecimiento?.id || user.establecimiento
          
          if (establecimientoId) {
            // Actualizar establecimiento con tokens de Google
            await fetch(`${config.public.baseURL}/establecimientos/${establecimientoId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
              },
              body: JSON.stringify({
                googleRefreshToken: tokens.refresh_token,
                googleCalendarEmail: 'websecuador.net@gmail.com', // o obtenerlo del perfil
                googleCalendarSyncEnabled: true,
                googleLastSync: new Date().toISOString()
              })
            })
            
            console.log('✅ Refresh token guardado en establecimiento:', establecimientoId)
          }
        }
      }
    }

    return sendRedirect(event, '/citas?google_auth=success')

  } catch (error) {
    console.error('❌ Error en callback:', error.message)
    return sendRedirect(event, '/citas?error=auth_failed')
  }
})