import jwtDecode from "jwt-decode";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔒 Middleware auth ejecutado');
  console.log('📍 Ruta destino:', to.path);
  console.log('📍 Ruta origen:', from.path);
  
  // Solo ejecutar en cliente
  if (process.server) {
    console.log('⚠️ Middleware ejecutándose en servidor, saltando...');
    return;
  }

  const authStore = useAuthStore();
  console.log('👤 Usuario en store:', authStore.user?.email || 'No hay usuario');
  console.log('🔑 Token presente:', !!authStore.token);
  console.log('✅ isAuthenticated:', authStore.isAuthenticated);

  // Si no está autenticado, redirigir a /ai (página pública)
  if (!authStore.isAuthenticated) {
    console.log('❌ Usuario no autenticado, redirigiendo a /ai');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    return navigateTo('/');
  }

  console.log('✅ Middleware auth pasado correctamente');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Si está en la raíz (/), redirigir según el rol
  if (to.path === "/") {
    const token = authStore.token;

    if (token) {
      try {
        // Validar expiración del token
        const decoded = jwtDecode<{ exp: number; id: string }>(token);
        const now = Date.now() / 1000;
        
        if (decoded.exp < now) {
          console.log('🔴 Token expirado');
          authStore.logout();
          return navigateTo('/login');
        }

        // Redirigir según rol
        const roleType = authStore.user?.role?.type || authStore.user?.role?.name;
        
        if (roleType === 'admin' || roleType === 'establecimiento') {
          console.log('➡️ Redirigiendo admin/establecimiento a /socios');
          return navigateTo('/socios');
        } else {
          console.log('➡️ Redirigiendo usuario a /resumen');
          return navigateTo('/resumen');
        }
      } catch (error) {
        console.error('❌ Token inválido:', error);
        authStore.logout();
        return navigateTo('/login');
      }
    }
    
    return navigateTo('/login');
  }
});