import { computed } from 'vue';
import { useAuthStore } from "~/store/auth/index.ts";

export default function useAdmin() {
  const authStore = useAuthStore();
  
  const isAdmin = computed(() => {
    return authStore?.user?.role?.name?.includes('admin') || false;
  });
  
  const isEstablecimiento = computed(() => {
    return authStore?.user?.role?.name === 'establecimiento' || false;
  });
  
  return { 
    isAdmin,
    isEstablecimiento  // ✅ FALTABA ESTO
  };
}