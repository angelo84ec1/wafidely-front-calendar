/**
 * CRON JOB MEJORADO: Verificador de Suscripciones con Debug Detallado
 * 
 * URL: https://www.wafidely.com/api/cron/check-subscriptions
 * 
 * Versión mejorada que reporta errores detallados para debugging
 */

export default defineEventHandler(async (event) => {
    // ========================================
    // 🔒 VALIDACIÓN DE SEGURIDAD (Opcional)
    // ========================================
    const apiKey = getHeader(event, 'x-api-key') || getHeader(event, 'X-API-Key')
    const validApiKey = process.env.CRON_API_KEY
    
    // Si existe CRON_API_KEY en env, validar
    if (validApiKey && apiKey !== validApiKey) {
      console.warn('⚠️ Intento de acceso con API Key inválida o sin API Key')
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Invalid or missing API Key'
      })
    }
    
    // ========================================
    // 🕐 INICIO DEL CRON JOB
    // ========================================
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL
    
    console.log('='.repeat(80))
    console.log('🕐 CRON JOB INICIADO - Verificando suscripciones...')
    console.log('📅 Timestamp:', new Date().toISOString())
    console.log('🌐 BaseURL:', baseURL)
    console.log('='.repeat(80))
    
    try {
      // 1. Obtener todas las suscripciones activas
      const response = await fetch(
        `${baseURL}/config-pagos?estado=Activo&_sort=createdAt:DESC`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`Error al consultar config-pagos: ${response.status} ${response.statusText}`)
      }
      
      const allSubscriptions = await response.json()
      console.log(`\n📦 Total de suscripciones activas encontradas: ${allSubscriptions.length}`)
      
      if (allSubscriptions.length === 0) {
        console.log('✅ No hay suscripciones activas para verificar')
        return {
          success: true,
          message: 'No hay suscripciones activas para verificar',
          timestamp: new Date().toISOString(),
          checked: 0,
          expired: 0,
          active: 0,
          errors: 0,
          errorDetails: []
        }
      }
      
      // 2. Agrupar por usuario + establecimiento (solo la más reciente de cada combinación)
      const subscriptionMap = new Map()
      
      for (const sub of allSubscriptions) {
        const userId = sub.user?._id || sub.user?.id || sub.user
        const establecimientoId = sub.establecimiento?._id || sub.establecimiento?.id || sub.establecimiento || 'sin-establecimiento'
        
        // Crear clave única: userId + establecimientoId
        const key = `${userId}-${establecimientoId}`
        
        // Solo mantener la suscripción más reciente (primera porque ordenamos por createdAt:DESC)
        if (!subscriptionMap.has(key)) {
          subscriptionMap.set(key, sub)
        }
      }
      
      console.log(`🔍 Suscripciones únicas a verificar: ${subscriptionMap.size}\n`)
      
      // 3. Verificar cada suscripción y actualizar si es necesario
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Normalizar a medianoche
      
      const results = {
        checked: 0,
        expired: 0,
        active: 0,
        errors: 0,
        details: [],
        errorDetails: [] // Nueva sección para errores detallados
      }
      
      for (const [key, subscription] of subscriptionMap) {
        results.checked++
        
        const userId = subscription.user?._id || subscription.user?.id || subscription.user
        const establecimientoId = subscription.establecimiento?._id || 
                                  subscription.establecimiento?.id || 
                                  subscription.establecimiento || 
                                  'sin-establecimiento'
        
        console.log(`\n${'─'.repeat(80)}`)
        console.log(`📋 Verificando suscripción ${results.checked}/${subscriptionMap.size}`)
        console.log(`   ID: ${subscription.id}`)
        console.log(`   Producto: ${subscription.producto}`)
        console.log(`   Usuario: ${userId}`)
        console.log(`   Establecimiento: ${establecimientoId}`)
        console.log(`   Created At: ${subscription.createdAt}`)
        
        try {
          // Validar que existe fecha_fin
          if (!subscription.fecha_fin) {
            const errorMsg = `Suscripción sin fecha_fin`
            console.error(`   ❌ ERROR: ${errorMsg}`)
            
            results.errors++
            results.errorDetails.push({
              id: subscription.id,
              producto: subscription.producto,
              usuario: userId,
              establecimiento: establecimientoId,
              error: errorMsg,
              motivo: 'fecha_fin es null o undefined'
            })
            continue
          }
          
          console.log(`   Fecha fin: ${subscription.fecha_fin}`)
          
          // Calcular días restantes
          let fechaFin = null
          
          try {
            const fechaStr = subscription.fecha_fin
            
            // Parsear fecha sin zona horaria
            if (typeof fechaStr === 'string' && fechaStr.match(/^\d{4}-\d{2}-\d{2}/)) {
              const [year, month, day] = fechaStr.split('-').map(num => parseInt(num, 10))
              fechaFin = new Date(year, month - 1, day)
            } else {
              fechaFin = new Date(fechaStr)
            }
            
            fechaFin.setHours(0, 0, 0, 0)
            
            // Validar que la fecha es válida
            if (isNaN(fechaFin.getTime())) {
              throw new Error('Fecha inválida')
            }
            
          } catch (parseError) {
            const errorMsg = `Error al parsear fecha_fin: ${parseError.message}`
            console.error(`   ❌ ERROR: ${errorMsg}`)
            
            results.errors++
            results.errorDetails.push({
              id: subscription.id,
              producto: subscription.producto,
              usuario: userId,
              establecimiento: establecimientoId,
              error: errorMsg,
              motivo: 'Formato de fecha inválido',
              fecha_fin_raw: subscription.fecha_fin
            })
            continue
          }
          
          // Calcular diferencia en días
          const diffTime = fechaFin.getTime() - today.getTime()
          const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          console.log(`   Días restantes: ${daysRemaining}`)
          
          // Si la suscripción ha expirado (días <= 0)
          if (daysRemaining <= 0) {
            console.log(`   ⚠️ SUSCRIPCIÓN EXPIRADA - Actualizando estado a Cancelado...`)
            
            try {
              // Actualizar estado a Cancelado
              const updateResponse = await fetch(
                `${baseURL}/config-pagos/${subscription.id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    estado: 'Cancelado'
                  })
                }
              )
              
              if (!updateResponse.ok) {
                throw new Error(`HTTP ${updateResponse.status}: ${updateResponse.statusText}`)
              }
              
              const updateData = await updateResponse.json()
              
              results.expired++
              results.details.push({
                id: subscription.id,
                producto: subscription.producto,
                usuario: userId,
                establecimiento: establecimientoId,
                fecha_fin: subscription.fecha_fin,
                dias_restantes: daysRemaining,
                accion: 'Estado cambiado a Cancelado',
                timestamp: new Date().toISOString()
              })
              
              console.log(`   ✅ Actualizado exitosamente`)
              
            } catch (updateError) {
              const errorMsg = `Error al actualizar estado: ${updateError.message}`
              console.error(`   ❌ ${errorMsg}`)
              
              results.errors++
              results.errorDetails.push({
                id: subscription.id,
                producto: subscription.producto,
                usuario: userId,
                establecimiento: establecimientoId,
                error: errorMsg,
                motivo: 'Fallo en la actualización de la base de datos',
                dias_restantes: daysRemaining
              })
            }
            
          } else {
            // Suscripción aún activa
            results.active++
            console.log(`   ✅ Suscripción activa (${daysRemaining} días restantes)`)
          }
          
        } catch (error) {
          results.errors++
          const errorMsg = `Error inesperado: ${error.message}`
          console.error(`   ❌ ${errorMsg}`)
          console.error(`   Stack:`, error.stack)
          
          results.errorDetails.push({
            id: subscription.id,
            producto: subscription.producto,
            usuario: userId,
            establecimiento: establecimientoId,
            error: errorMsg,
            motivo: 'Error no capturado',
            stack: error.stack
          })
        }
      }
      
      // 4. Retornar resumen
      console.log(`\n${'='.repeat(80)}`)
      console.log('✅ CRON JOB COMPLETADO')
      console.log('📊 RESUMEN FINAL:')
      console.log(`   - Suscripciones verificadas: ${results.checked}`)
      console.log(`   - Suscripciones expiradas: ${results.expired}`)
      console.log(`   - Suscripciones activas: ${results.active}`)
      console.log(`   - Errores encontrados: ${results.errors}`)
      
      if (results.errors > 0) {
        console.log('\n⚠️ ERRORES DETALLADOS:')
        results.errorDetails.forEach((err, index) => {
          console.log(`\n   Error ${index + 1}:`)
          console.log(`   - ID: ${err.id}`)
          console.log(`   - Producto: ${err.producto}`)
          console.log(`   - Error: ${err.error}`)
          console.log(`   - Motivo: ${err.motivo}`)
        })
      }
      
      console.log('='.repeat(80))
      
      return {
        success: true,
        message: 'Verificación de suscripciones completada',
        timestamp: new Date().toISOString(),
        summary: {
          checked: results.checked,
          expired: results.expired,
          active: results.active,
          errors: results.errors
        },
        details: results.details,
        errorDetails: results.errorDetails // ← Nueva sección con errores
      }
      
    } catch (error) {
      console.error('❌ ERROR CRÍTICO EN CRON JOB:', error)
      console.error('Stack:', error.stack)
      
      return {
        success: false,
        message: 'Error crítico al verificar suscripciones',
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }
    }
  })