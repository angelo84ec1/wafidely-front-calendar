/**
 * Composable para verificar el estado de la suscripción
 * Bloquea acceso a páginas protegidas si el estado es "Cancelado"
 * 
 * Uso:
 * import { useSubscriptionGuard } from '~/composables/useSubscriptionGuard'
 * 
 * En el setup de la página:
 * const { checkSubscriptionStatus } = useSubscriptionGuard()
 * await checkSubscriptionStatus()
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~/store/auth'

export const useSubscriptionGuard = () => {
  const router = useRouter()
  const toast = useToast()
  const authStore = useAuthStore()
  const { public: { baseURL } } = useRuntimeConfig()
  
  const isCheckingSubscription = ref(false)
  const subscriptionStatus = ref(null)
  
  /**
   * Verifica el estado de la suscripción del usuario
   * Si está "Cancelado", muestra un toast y redirige a /facturacion
   * @returns {Promise<boolean>} true si puede acceder, false si está bloqueado
   */
  const checkSubscriptionStatus = async () => {
    // Si ya está verificando, esperar
    if (isCheckingSubscription.value) {
      return false
    }
    
    try {
      isCheckingSubscription.value = true
      
      // Obtener datos del usuario autenticado
      const userId = authStore.user?._id || authStore.user?.id
      const establecimientoId = authStore.user?.establecimiento?._id || 
                                authStore.user?.establecimiento?.id || 
                                authStore.user?.establecimiento
      
      if (!userId) {
        console.warn('⚠️ No hay usuario autenticado')
        return true // Dejar pasar, el middleware de autenticación se encargará
      }
      
      // Construir URL para obtener la última suscripción
      let url = `${baseURL}/config-pagos?user=${userId}&_sort=createdAt:DESC&_limit=1`
      
      if (establecimientoId) {
        url += `&establecimiento=${establecimientoId}`
      }
      
      console.log('🔍 Verificando suscripción:', url)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      
      if (!response.ok) {
        console.error('❌ Error al verificar suscripción:', response.status)
        return true // En caso de error, dejar pasar
      }
      
      const data = await response.json()
      
      // Si no hay suscripción, permitir acceso (pueden ser usuarios nuevos)
      if (!data || data.length === 0) {
        console.log('⚠️ No se encontró información de suscripción')
        subscriptionStatus.value = null
        return true
      }
      
      const subscription = data[0]
      subscriptionStatus.value = subscription.estado
      
      console.log('📊 Estado de suscripción:', {
        estado: subscription.estado,
        producto: subscription.producto,
        fecha_fin: subscription.fecha_fin
      })
      
      // Verificar si el estado es "Cancelado"
      if (subscription.estado === 'Cancelado') {
        console.log('🚫 Acceso denegado: Suscripción cancelada')
        
        // Mostrar toast con mensaje de error
        toast.error('Servicio cancelado hasta el pago de tu suscripción', {
          position: 'top-center',
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: 'button',
          icon: true,
          rtl: false
        })
        
        // Redirigir a la página de facturación después de un breve delay
        setTimeout(() => {
          router.push('/facturacion')
        }, 1500)
        
        return false
      }
      
      // Si el estado es diferente a "Cancelado", permitir acceso
      console.log('✅ Acceso permitido')
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
   * Verifica si la suscripción está activa sin bloquear
   * Útil para mostrar advertencias pero no bloquear acceso
   * @returns {Promise<string|null>} Estado de la suscripción o null
   */
  const getSubscriptionStatus = async () => {
    try {
      const userId = authStore.user?._id || authStore.user?.id
      const establecimientoId = authStore.user?.establecimiento?._id || 
                                authStore.user?.establecimiento?.id || 
                                authStore.user?.establecimiento
      
      if (!userId) return null
      
      let url = `${baseURL}/config-pagos?user=${userId}&_sort=createdAt:DESC&_limit=1`
      
      if (establecimientoId) {
        url += `&establecimiento=${establecimientoId}`
      }
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      
      if (!response.ok) return null
      
      const data = await response.json()
      
      if (!data || data.length === 0) return null
      
      return data[0].estado
    } catch (error) {
      console.error('Error obteniendo estado de suscripción:', error)
      return null
    }
  }
  
  return {
    checkSubscriptionStatus,
    getSubscriptionStatus,
    isCheckingSubscription,
    subscriptionStatus
  }
}