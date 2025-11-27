export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL
    
    try {
      console.log('🔔 [CRON] Verificando citas...')
      
      const citasResponse = await fetch(`${baseURL}/citas`, {
        headers: { 'Content-Type': 'application/json' }
      })
  
      if (!citasResponse.ok) throw new Error(`Error ${citasResponse.status}`)
  
      const todasLasCitas = await citasResponse.json()
      const citasPendientes = todasLasCitas.filter(c => !c.reminderSent)
  
      const now = new Date()
      const fiftyMinutesFromNow = new Date(now.getTime() + 50 * 60 * 1000)
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)
  
      console.log(`⏰ Ventana: ${fiftyMinutesFromNow.toISOString()} - ${oneHourFromNow.toISOString()}`)
  
      const citasToRemind = citasPendientes.filter(cita => {
        if (!cita.date || !cita.hour) return false
  
        try {
          const citaDateTimeStr = `${cita.date}T${cita.hour}:00-05:00`
          const citaDateTime = new Date(citaDateTimeStr)
          const inWindow = citaDateTime >= fiftyMinutesFromNow && citaDateTime <= oneHourFromNow
  
          if (citaDateTime.toDateString() === now.toDateString()) {
            console.log(`🔍 ${cita.name}: ${cita.hour} - ${inWindow ? '✅' : '❌'}`)
          }
  
          return inWindow
        } catch (error) {
          return false
        }
      })
  
      console.log(`📨 A enviar: ${citasToRemind.length}`)
  
      let sent = 0
      let failed = 0
      const detalles = []
  
      for (const cita of citasToRemind) {
        try {
          const [year, month, day] = cita.date.split('-')
          const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
          const fechaLegible = `${day} de ${months[parseInt(month) - 1]} de ${year}`
  
          const message = `🔔 *Recordatorio de Cita*
  
  Hola ${cita.name},
  
  Te recordamos tu cita programada para:
  📅 Fecha: ${fechaLegible}
  🕐 Hora: ${cita.hour}
  
  ¡Te esperamos!`
  
          const phoneNumber = cita.whatsapp.replace(/[\s\-\(\)]/g, '')
          
          if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
            failed++
            detalles.push({ name: cita.name, status: 'failed', reason: 'Número inválido' })
            continue
          }
          
          console.log(`📤 Enviando a ${cita.name}...`)
  
          const whatsappResponse = await fetch(
            'https://ai.wafidely.com/api/v1/messages/send',
            {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer pcp_8be7a7dd768208ecbc6bf0a41fafa49d6aa2528dccd43aa9698dfcb3a2b1f34f',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                channelId: 4,
                to: phoneNumber,
                message: message
              })
            }
          )
  
          if (whatsappResponse.ok) {
            await fetch(`${baseURL}/citas/${cita.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                reminderSent: true,
                reminderSentAt: new Date().toISOString()
              })
            })
  
            console.log(`✅ ${cita.name}`)
            sent++
            detalles.push({ name: cita.name, phone: phoneNumber, status: 'sent' })
          } else {
            console.error(`❌ ${cita.name}`)
            failed++
            detalles.push({ name: cita.name, status: 'failed' })
          }
  
          await new Promise(resolve => setTimeout(resolve, 1000))
  
        } catch (error) {
          console.error(`❌ Error con ${cita.name}:`, error.message)
          failed++
        }
      }
  
      return {
        success: true,
        message: `Completado: ${sent} enviados, ${failed} fallidos`,
        timestamp: new Date().toISOString(),
        stats: {
          total: todasLasCitas.length,
          pendientes: citasPendientes.length,
          enVentana: citasToRemind.length,
          enviados: sent,
          fallidos: failed
        },
        detalles
      }
  
    } catch (error) {
      console.error('❌ Error:', error.message)
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }
  })