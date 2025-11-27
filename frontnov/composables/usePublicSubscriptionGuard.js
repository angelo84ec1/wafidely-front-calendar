/**
 * Composable para verificar el estado de suscripción de un ESTABLECIMIENTO
 * Funciona en áreas PÚBLICAS (sin necesidad de autenticación)
 * 
 * Uso en landing pages públicas:
 * import { usePublicSubscriptionGuard } from '~/composables/usePublicSubscriptionGuard'
 * 
 * const { checkEstablishmentSubscription } = usePublicSubscriptionGuard()
 * const isActive = await checkEstablishmentSubscription(establishmentId)
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const usePublicSubscriptionGuard = () => {
  const router = useRouter()
  const { public: { baseURL } } = useRuntimeConfig()
  
  const isCheckingSubscription = ref(false)
  const subscriptionStatus = ref(null)
  const subscriptionData = ref(null)
  
  /**
   * Verifica el estado de suscripción de un establecimiento
   * Si está "Cancelado" o "Pendiente", bloquea el acceso
   * @param {string} establishmentId - ID del establecimiento
   * @returns {Promise<boolean>} true si puede acceder, false si está bloqueado
   */
  const checkEstablishmentSubscription = async (establishmentId) => {
    if (isCheckingSubscription.value) {
      return false
    }
    
    if (!establishmentId) {
      console.warn('⚠️ No se proporcionó ID de establecimiento')
      return true // Permitir acceso si no hay ID (para evitar bloqueos innecesarios)
    }
    
    try {
      isCheckingSubscription.value = true
      
      // Consultar config-pagos filtrando solo por establecimiento
      // Obtener el último registro (más reciente)
      const url = `${baseURL}/config-pagos?establecimiento=${establishmentId}&_sort=createdAt:DESC&_limit=1`
      
      console.log('🔍 Verificando suscripción del establecimiento:', establishmentId)
      console.log('🔍 URL:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        console.error('❌ Error al verificar suscripción:', response.status)
        return true // En caso de error, permitir acceso
      }
      
      const data = await response.json()
      
      // Si no hay suscripción, permitir acceso
      if (!data || data.length === 0) {
        console.log('⚠️ No se encontró información de suscripción para este establecimiento')
        subscriptionStatus.value = null
        subscriptionData.value = null
        return true
      }
      
      const subscription = data[0]
      subscriptionStatus.value = subscription.estado
      subscriptionData.value = subscription
      
      console.log('📊 Estado de suscripción:', {
        estado: subscription.estado,
        producto: subscription.producto,
        establecimiento: subscription.establecimiento?.nombre || subscription.establecimiento,
        fecha_fin: subscription.fecha_fin
      })
      
      // Verificar si el estado está en "Cancelado" o "Pendiente"
      if (subscription.estado === 'Cancelado' || subscription.estado === 'Pendiente') {
        console.log('🚫 Acceso denegado: Suscripción', subscription.estado)
        return false
      }
      
      // Si el estado es "Activo" o cualquier otro, permitir acceso
      console.log('✅ Acceso permitido - Estado:', subscription.estado)
      return true
      
    } catch (error) {
      console.error('❌ Error al verificar suscripción:', error)
      // En caso de error, permitir acceso para no bloquear innecesariamente
      return true
    } finally {
      isCheckingSubscription.value = false
    }
  }
  
  /**
   * Obtiene los detalles de la suscripción sin bloquear
   * @param {string} establishmentId - ID del establecimiento
   * @returns {Promise<Object|null>} Datos de la suscripción o null
   */
  const getEstablishmentSubscription = async (establishmentId) => {
    if (!establishmentId) return null
    
    try {
      const url = `${baseURL}/config-pagos?establecimiento=${establishmentId}&_sort=createdAt:DESC&_limit=1`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) return null
      
      const data = await response.json()
      
      if (!data || data.length === 0) return null
      
      return data[0]
    } catch (error) {
      console.error('Error obteniendo suscripción:', error)
      return null
    }
  }
  
  return {
    checkEstablishmentSubscription,
    getEstablishmentSubscription,
    isCheckingSubscription,
    subscriptionStatus,
    subscriptionData
  }
}