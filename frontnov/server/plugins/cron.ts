import { defineNitroPlugin } from 'nitropack/runtime'

export default defineNitroPlugin((nitroApp) => {
  if (process.env.NODE_ENV === 'production') {
    // Ejecutar cada 10 minutos
    setInterval(async () => {
      try {
        console.log('⏰ Ejecutando cron de recordatorios...')
        const response = await fetch('http://localhost:3000/api/cron/send-reminders')
        const data = await response.json()
        console.log('📊 Resultado:', data)
      } catch (error) {
        console.error('❌ Error en cron:', error)
      }
    }, 10 * 60 * 1000) // Cada 10 minutos
  }
})