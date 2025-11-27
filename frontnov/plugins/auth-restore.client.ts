// plugins/auth-restore.client.ts
import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin(() => {
  // Este plugin se ejecuta automáticamente en el cliente
  const authStore = useAuthStore()
  
  console.log('🔄 Plugin: Restaurando autenticación...')
  
  // Restaurar autenticación desde localStorage
  authStore.restoreAuth()
  
  console.log('✅ Plugin: Autenticación restaurada')
  console.log('👤 Usuario:', authStore.user?.username || 'No autenticado')
})