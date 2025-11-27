import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  
  // Restaurar autenticación desde localStorage
  authStore.restoreAuth();
  
  console.log('🔍 Plugin auth ejecutado');
  console.log('🔑 Token restaurado:', authStore.token ? '✅' : '❌');
  
  // Si hay token, hacer fetch del usuario completo con establecimiento
  if (authStore.token) {
    try {
      console.log('⏳ Obteniendo usuario completo del servidor...');
      
      const response = await fetch(`${config.public.baseURL}/users/me?populate=establecimiento`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        
        console.log('📦 Usuario recibido:', userData);
        console.log('🏢 Establecimiento:', userData.establecimiento);
        
        authStore.user = userData;
        authStore.saveAuth();
        
        console.log('✅ Usuario actualizado desde servidor');
        console.log('👤 Usuario:', userData.username || userData.email);
        console.log('🏢 Establecimiento ID:', userData.establecimiento?.id || 'ninguno');
      } else {
        console.warn('⚠️ Error al obtener usuario. Status:', response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('❌ Error obteniendo usuario:', error);
    }
  } else {
    console.log('⚠️ No hay token guardado');
  }
});