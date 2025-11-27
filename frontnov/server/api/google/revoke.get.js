// server/api/google/revoke.get.js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    console.log('═══════════════════════════════════════')
    console.log('🗑️ REVOCANDO SESIÓN DE GOOGLE')
    console.log('═══════════════════════════════════════')
    
    // Leer token desde cookie
    const cookieTokens = getCookie(event, 'google_tokens')
    
    if (!cookieTokens) {
      console.log('⚠️ No hay tokens en cookie para revocar')
      return { success: false, message: 'No hay tokens para revocar' }
    }

    const tokens = JSON.parse(cookieTokens)
    const establecimientoId = tokens.establecimientoId
    
    console.log('🔑 Tokens encontrados:', {
      hasAccessToken: !!tokens.access_token,
      establecimientoId
    })
    
    // 1. Revocar el token en Google
    if (tokens.access_token) {
      try {
        console.log('🌐 Revocando token en Google...')
        const revokeResponse = await fetch(
          `https://oauth2.googleapis.com/revoke?token=${tokens.access_token}`, 
          { method: 'POST' }
        )
        
        if (revokeResponse.ok) {
          console.log('✅ Token revocado en Google')
        } else {
          console.warn('⚠️ Google no pudo revocar el token:', revokeResponse.status)
        }
      } catch (googleError) {
        console.error('❌ Error revocando en Google:', googleError.message)
      }
    }
    
    // 2. Limpiar en Strapi
    if (establecimientoId) {
      try {
        console.log('💾 Limpiando tokens en Strapi...')
        console.log('🏢 Establecimiento ID:', establecimientoId)
        
        const strapiResponse = await fetch(
          `${config.public.baseURL}/establecimientos/${establecimientoId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              googleRefreshToken: '',
              googleCalendarSyncEnabled: false,
              googleLastSync: null
            })
          }
        )
        
        if (strapiResponse.ok) {
          console.log('✅ Tokens limpiados en Strapi')
        } else {
          console.warn('⚠️ No se pudo limpiar Strapi:', strapiResponse.status)
        }
      } catch (strapiError) {
        console.error('❌ Error limpiando Strapi:', strapiError.message)
      }
    }
    
    // 3. Eliminar cookie local
    deleteCookie(event, 'google_tokens')
    console.log('🍪 Cookie eliminada')
    
    console.log('═══════════════════════════════════════')
    console.log('✅ SESIÓN DE GOOGLE REVOCADA COMPLETAMENTE')
    console.log('═══════════════════════════════════════')
    
    return { 
      success: true, 
      message: 'Sesión de Google revocada correctamente' 
    }
    
  } catch (error) {
    console.error('❌ ERROR AL REVOCAR:')
    console.error('   Mensaje:', error.message)
    console.error('   Stack:', error.stack)
    console.log('═══════════════════════════════════════')
    
    // Aunque falle, intentar eliminar la cookie local
    deleteCookie(event, 'google_tokens')
    
    return { 
      success: true, 
      message: 'Cookie eliminada localmente, pero hubo errores en la revocación completa' 
    }
  }
})