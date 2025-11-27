import { ref, computed } from 'vue'
import { useAuthStore } from '~/store/auth'

export const useSubscription = () => {
  const authStore = useAuthStore()
  const { public: { baseURL } } = useRuntimeConfig()
  
  const subscriptionData = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Verificar si el usuario tiene una suscripción activa
  const checkSubscription = async () => {
    try {
      loading.value = true
      error.value = null

      const userId = authStore.user?.id || authStore.user?._id
      
      if (!userId) {
        throw new Error('Usuario no autenticado')
      }

      const response = await fetch(
        `${baseURL}/config-pagos?user=${userId}&_sort=fecha_compra:DESC&_limit=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Error al obtener suscripción')
      }

      const data = await response.json()
      
      if (data && data.length > 0) {
        subscriptionData.value = data[0]
        return data[0]
      }

      return null
    } catch (err: any) {
      error.value = err.message
      console.error('Error checking subscription:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Verificar si la suscripción está activa (ACTUALIZADO con verificación de estados)
  const isSubscriptionActive = computed(() => {
    if (!subscriptionData.value) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Resetear horas para comparación solo de fecha
    
    const fechaFin = subscriptionData.value.fecha_fin 
      ? new Date(subscriptionData.value.fecha_fin) 
      : null

    // Si no hay fecha_fin, no está activa
    if (!fechaFin) return false
    
    fechaFin.setHours(0, 0, 0, 0)

    // ⭐ NUEVO: Verificar que el estado sea "Activo" (no "Pendiente" ni "Cancelado")
    const estadosValidos = ['Activo', 'activo']
    const tieneEstadoValido = estadosValidos.includes(subscriptionData.value.estado)
    
    // ⭐ NUEVO: También verificar que la fecha no haya vencido
    const fechaNoVencida = fechaFin >= today

    console.log('🔍 Verificación de suscripción:', {
      estado: subscriptionData.value.estado,
      tieneEstadoValido,
      fechaFin: fechaFin.toISOString().split('T')[0],
      hoy: today.toISOString().split('T')[0],
      fechaNoVencida,
      resultado: tieneEstadoValido && fechaNoVencida
    })

    // La suscripción está activa solo si:
    // 1. El estado es "Activo"
    // 2. La fecha_fin no ha vencido
    return tieneEstadoValido && fechaNoVencida
  })

  // Verificar si es un usuario nuevo (sin suscripción)
  const isNewUser = computed(() => {
    return !subscriptionData.value
  })

  // Verificar si la suscripción está vencida
  const isSubscriptionExpired = computed(() => {
    if (!subscriptionData.value) return false
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const fechaFin = subscriptionData.value.fecha_fin 
      ? new Date(subscriptionData.value.fecha_fin) 
      : null

    if (!fechaFin) return false
    
    fechaFin.setHours(0, 0, 0, 0)

    return fechaFin < today
  })

  // ⭐ NUEVO: Verificar si está en estado pendiente o cancelado
  const isSubscriptionPending = computed(() => {
    if (!subscriptionData.value) return false
    const estadosPendientes = ['Pendiente', 'pendiente', 'Cancelado', 'cancelado']
    return estadosPendientes.includes(subscriptionData.value.estado)
  })

  // Días restantes de suscripción
  const daysRemaining = computed(() => {
    if (!subscriptionData.value?.fecha_fin) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const fechaFin = new Date(subscriptionData.value.fecha_fin)
    fechaFin.setHours(0, 0, 0, 0)
    
    const diffTime = fechaFin.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 0 ? diffDays : 0
  })

  // Calcular fecha_fin basada en el tipo de suscripción
  const calculateFechaFin = (fechaCompra: Date, tipoTarjeta: string): Date => {
    const fecha = new Date(fechaCompra)
    
    if (tipoTarjeta === 'anual') {
      // Plan anual: 365 días exactos
      fecha.setDate(fecha.getDate() + 365)
    } else if (tipoTarjeta === 'mensual') {
      // Plan mensual: 30 días exactos
      fecha.setDate(fecha.getDate() + 30)
    } else if (tipoTarjeta === 'demo' || tipoTarjeta === 'free') {
      // Plan WAFree (demo): 5 días
      fecha.setDate(fecha.getDate() + 5)
    }
    
    return fecha
  }

  // Actualizar estado de suscripción
  const updateSubscriptionStatus = async (configPagoId: string, estado: string) => {
    try {
      const response = await fetch(
        `${baseURL}/config-pagos/${configPagoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`
          },
          body: JSON.stringify({ estado })
        }
      )

      if (!response.ok) {
        throw new Error('Error al actualizar suscripción')
      }

      return await response.json()
    } catch (err) {
      console.error('Error updating subscription:', err)
      throw err
    }
  }

  // Verificar y actualizar suscripciones vencidas
  const checkAndUpdateExpiredSubscriptions = async () => {
    try {
      const subscription = await checkSubscription()
      
      if (subscription && isSubscriptionExpired.value) {
        await updateSubscriptionStatus(subscription.id || subscription._id, 'Pendiente')
        await checkSubscription() // Refrescar datos
      }
    } catch (err) {
      console.error('Error checking expired subscriptions:', err)
    }
  }

  return {
    subscriptionData,
    loading,
    error,
    isSubscriptionActive,
    isNewUser,
    isSubscriptionExpired,
    isSubscriptionPending,
    daysRemaining,
    checkSubscription,
    calculateFechaFin,
    updateSubscriptionStatus,
    checkAndUpdateExpiredSubscriptions
  }
}