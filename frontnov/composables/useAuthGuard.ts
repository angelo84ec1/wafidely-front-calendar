// composables/useAuthGuard.ts
export const useAuthGuard = () => {
    const authStore = useAuthStore()
    const router = useRouter()
  
    const ensureAuthenticated = async () => {
      console.log('🔐 Verificando autenticación...')
  
      // Si hay token pero no usuario, cargar desde Strapi
      if (authStore.token && !authStore.user) {
        console.log('📡 Hidratando usuario...')
        try {
          await authStore.fetchUserFromStrapi()
        } catch (error) {
          console.error('❌ Error cargando usuario:', error)
          authStore.clearAuth()
          router.push('/login')
          return null
        }
      }
  
      // Verificar autenticación
      if (!authStore.user || !authStore.token) {
        console.error('❌ No autenticado')
        router.push('/login')
        return null
      }
  
      console.log('✅ Usuario autenticado:', authStore.user.username)
      return authStore.user
    }
  
    const getEstablecimientos = () => {
      const establecimientos = authStore.user?.establecimientos || []
      console.log('🏢 Establecimientos:', establecimientos.length)
      return establecimientos
    }
  
    return {
      ensureAuthenticated,
      getEstablecimientos,
      user: computed(() => authStore.user),
      isAuthenticated: computed(() => authStore.isAuthenticated)
    }
  }