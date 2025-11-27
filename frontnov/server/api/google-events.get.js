import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const establishmentId = query.establishment
  
  if (!establishmentId) {
    return { events: [] }
  }

  try {
    // Buscar el token de Google asociado a este establecimiento
    // Esto asume que guardas los tokens por establecimiento
    const tokenCookie = getCookie(event, `google_token_${establishmentId}`)
    
    if (!tokenCookie) {
      return { events: [] }
    }

    const oauth2Client = new google.auth.OAuth2(
      config.public.googleClientId,
      config.googleClientSecret,
      config.public.googleRedirectUri
    )

    oauth2Client.setCredentials(JSON.parse(tokenCookie))
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    const now = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 3)

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items.map(event => ({
      id: event.id,
      title: event.summary || 'Sin título',
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
    }))

    return { events }
  } catch (error) {
    console.error('Error:', error)
    return { events: [] }
  }
})