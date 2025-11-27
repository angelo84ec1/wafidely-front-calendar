// middleware/subscription.ts
import { useSubscription } from '~/composables/useSubscription'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Solo verificar en rutas de IA
  if (!to.path.startsWith('/ia')) {
    return
  }

  const { checkAccess, subscriptionStatus } = useSubscription()
  
  // Verificar el estado de suscripción
  const hasAccess = await checkAccess()
  
  if (!hasAccess) {
    // Si el estado es Cancelado o no tiene acceso, redirigir a facturación
    console.warn('Acceso denegado a /ia - Suscripción no activa:', subscriptionStatus.value?.estado)
    
    // Redirigir después de mostrar el toast
    return navigateTo('/facturacion')
  }
})