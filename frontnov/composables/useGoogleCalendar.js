export const useGoogleCalendar = () => {
    const config = useRuntimeConfig()
    const isAuthenticated = ref(false)
    const events = ref([])
    const loading = ref(false)
    const error = ref(null)
  
    /**
     * Autenticar con Google OAuth
     */
    const authenticate = () => {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${config.public.googleClientId}&` +
        `redirect_uri=${config.public.googleRedirectUri}&` +
        `response_type=code&` +
        `scope=https://www.googleapis.com/auth/calendar.readonly&` +
        `access_type=offline&` +
        `prompt=consent`
      
      window.location.href = authUrl
    }
  
    /**
     * Obtener eventos de Google Calendar
     */
    const fetchGoogleEvents = async () => {
      loading.value = true
      error.value = null
  
      try {
        const response = await $fetch('/api/google/calendar', {
          method: 'GET'
        })
  
        if (response.error) {
          throw new Error(response.error)
        }
  
        events.value = response.events || []
        isAuthenticated.value = true
        
        return events.value
      } catch (err) {
        console.error('Error fetching Google Calendar:', err)
        error.value = err.message
        isAuthenticated.value = false
        return []
      } finally {
        loading.value = false
      }
    }
  
    /**
     * Verificar si una fecha/hora está disponible
     * @param {string} date - Fecha en formato YYYY-MM-DD
     * @param {string} hour - Hora en formato HH:mm
     * @returns {boolean} - true si está disponible, false si está ocupada
     */
    const checkAvailability = (date, hour) => {
      const requestedDateTime = new Date(`${date} ${hour}`)
      
      // Verificar si la fecha/hora solicitada coincide con algún evento
      return !events.value.some(event => {
        const eventStart = new Date(event.start)
        const eventEnd = new Date(event.end)
        
        // Verificar si la hora solicitada cae dentro del rango del evento
        return requestedDateTime >= eventStart && requestedDateTime < eventEnd
      })
    }
  
    /**
     * Obtener todas las fechas ocupadas
     * @returns {Array<Date>} - Array de fechas ocupadas
     */
    const getOccupiedDates = () => {
      return events.value.map(event => new Date(event.start))
    }
  
    /**
     * Sincronizar con Google Calendar (obtener eventos nuevos)
     */
    const sync = async () => {
      return await fetchGoogleEvents()
    }
  
    /**
     * Cerrar sesión de Google
     */
    const logout = () => {
      if (process.client) {
        localStorage.removeItem('google_token')
        isAuthenticated.value = false
        events.value = []
      }
    }
  
    /**
     * Verificar si hay un token guardado
     */
    const checkStoredToken = () => {
      if (process.client) {
        const token = localStorage.getItem('google_token')
        if (token) {
          isAuthenticated.value = true
          return true
        }
      }
      return false
    }
  
    /**
     * Guardar token de Google
     */
    const saveToken = (token) => {
      if (process.client) {
        localStorage.setItem('google_token', JSON.stringify(token))
        isAuthenticated.value = true
      }
    }
  
    return {
      isAuthenticated,
      events,
      loading,
      error,
      authenticate,
      fetchGoogleEvents,
      checkAvailability,
      getOccupiedDates,
      sync,
      logout,
      checkStoredToken,
      saveToken
    }
  }