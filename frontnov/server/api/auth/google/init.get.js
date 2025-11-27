// server/api/auth/google/init.get.js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const establecimientoId = query.establecimientoId

  if (!establecimientoId) {
    return sendRedirect(event, '/citas?error=no_establecimiento')
  }

  console.log('🔐 Iniciando OAuth para establecimiento:', establecimientoId)

  // Determinar redirect URI según el entorno
  const host = getRequestHeader(event, 'host')
  const redirectUri = host?.includes('localhost')
    ? `http://${host}/api/auth/google/callback`
    : config.public.googleRedirectUri

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authUrl.searchParams.append('client_id', config.public.googleClientId)
  authUrl.searchParams.append('redirect_uri', redirectUri)
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('scope', 'https://www.googleapis.com/auth/calendar.readonly')
  authUrl.searchParams.append('access_type', 'offline')
  authUrl.searchParams.append('prompt', 'consent')
  authUrl.searchParams.append('state', establecimientoId) // ✅ Pasar el ID

  console.log('🔗 Redirigiendo a Google OAuth')
  return sendRedirect(event, authUrl.toString())
})