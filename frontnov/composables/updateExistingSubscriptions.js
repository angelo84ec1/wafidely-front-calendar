// Script para actualizar fecha_fin de registros existentes
// Este script recalcula la fecha_fin basándose en fecha_compra y tipo_tarjeta
// Ejecutar una sola vez después de actualizar el código

import { useAuthStore } from '~/store/auth'

export const updateExistingSubscriptions = async () => {
  const authStore = useAuthStore()
  const { public: { baseURL } } = useRuntimeConfig()
  
  console.log('🔄 Iniciando actualización de suscripciones existentes...')
  
  try {
    // 1. Obtener todas las suscripciones del usuario
    const userId = authStore.user?.id || authStore.user?._id
    
    if (!userId) {
      console.error('❌ No hay usuario autenticado')
      return
    }
    
    const response = await fetch(
      `${baseURL}/config-pagos?user=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Error obteniendo suscripciones')
    }
    
    const subscriptions = await response.json()
    console.log(`📋 Se encontraron ${subscriptions.length} suscripciones`)
    
    // 2. Recalcular fecha_fin para cada suscripción
    for (const sub of subscriptions) {
      if (!sub.fecha_compra || !sub.tipo_tarjeta) {
        console.log(`⚠️ Suscripción ${sub.id} sin fecha_compra o tipo_tarjeta, omitiendo...`)
        continue
      }
      
      // Calcular la nueva fecha_fin
      const fechaCompra = new Date(sub.fecha_compra)
      let diasAgregar = 5 // Por defecto demo
      
      switch (sub.tipo_tarjeta) {
        case 'demo':
        case 'free':
          diasAgregar = 5
          break
        case 'mensual':
          diasAgregar = 30
          break
        case 'anual':
          diasAgregar = 365
          break
      }
      
      const nuevaFechaFin = new Date(fechaCompra)
      nuevaFechaFin.setDate(nuevaFechaFin.getDate() + diasAgregar)
      const fechaFinFormatted = nuevaFechaFin.toISOString().split('T')[0]
      
      // Solo actualizar si la fecha_fin es diferente
      if (sub.fecha_fin !== fechaFinFormatted) {
        console.log(`📝 Actualizando suscripción ${sub.id}:`)
        console.log(`   Fecha anterior: ${sub.fecha_fin}`)
        console.log(`   Fecha nueva: ${fechaFinFormatted}`)
        console.log(`   Tipo: ${sub.tipo_tarjeta} (${diasAgregar} días)`)
        
        // 3. Actualizar en la base de datos
        const updateResponse = await fetch(
          `${baseURL}/config-pagos/${sub.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authStore.token}`
            },
            body: JSON.stringify({
              fecha_fin: fechaFinFormatted
            })
          }
        )
        
        if (updateResponse.ok) {
          console.log(`✅ Suscripción ${sub.id} actualizada correctamente`)
        } else {
          console.error(`❌ Error actualizando suscripción ${sub.id}`)
        }
      } else {
        console.log(`✓ Suscripción ${sub.id} ya tiene la fecha correcta`)
      }
    }
    
    console.log('✅ Actualización completada')
    return true
    
  } catch (error) {
    console.error('❌ Error en updateExistingSubscriptions:', error)
    return false
  }
}