<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Panel de Control</h1>
        <p class="text-gray-600">Bienvenido a tu Resumen de Cuenta</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Cargando información...</p>
      </div>
      
      <!-- Content -->
      <div v-else-if="user" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Información de Suscripción -->
        <div class="lg:col-span-2 bg-[#f6efff] rounded-lg shadow-lg p-6 text-[#232c4d]">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <svg class="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Información de Suscripción
          </h2>
          
          <div v-if="subscriptionInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Plan Contratado -->
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p class="text-sm text-[#232c4d] mb-1">Plan Contratado</p>
              <p class="text-2xl font-bold">{{ subscriptionInfo.producto || 'No disponible' }}</p>
              <span v-if="subscriptionInfo.estado" 
                    :class="[
                      'inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold',
                      subscriptionInfo.estado === 'Activo' ? 'bg-green-400/30 text-[#232c4d]' : 
                      subscriptionInfo.estado === 'Pendiente' ? 'bg-yellow-400/30 text-[#232c4d]' : 'bg-red-400/30 text-[#232c4d]'
                    ]">
                {{ subscriptionInfo.estado }}
              </span>
            </div>

            <!-- Tipo de Pago -->
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p class="text-sm text-[#232c4d] mb-1">Tipo de Pago</p>
              <p class="text-2xl font-bold capitalize">{{ subscriptionInfo.tipo_tarjeta || 'No especificado' }}</p>
              <p class="text-sm text-[#232c4d] mt-2">
                <span v-if="subscriptionInfo.tipo_tarjeta === 'anual'">💎 Renovación anual</span>
                <span v-else-if="subscriptionInfo.tipo_tarjeta === 'mensual'">📅 Renovación mensual</span>
                <span v-else-if="subscriptionInfo.tipo_tarjeta === 'demo'">🎁 Período de prueba</span>
              </p>
            </div>

            <!-- Fecha de Compra -->
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p class="text-sm text-[#232c4d] mb-1">Fecha de Activación</p>
              <p class="text-xl font-bold">{{ formatDate(subscriptionInfo.fecha_compra) }}</p>
            </div>

            <!-- Fecha de Vencimiento -->
            <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p class="text-sm text-[#232c4d] mb-1">Fecha de Vencimiento</p>
              <p class="text-xl font-bold">{{ formatDate(subscriptionInfo.fecha_fin) }}</p>
              <p v-if="daysRemaining !== null" class="text-sm text-[#232c4d] mt-2">
                <span v-if="daysRemaining > 0">
                  ⏰ {{ daysRemaining }} día{{ daysRemaining !== 1 ? 's' : '' }} restante{{ daysRemaining !== 1 ? 's' : '' }}
                </span>
                <span v-else class="text-yellow-300 font-semibold">
                  ⚠️ Suscripción vencida
                </span>
              </p>
            </div>
          </div>

          <!-- Sin Suscripción -->
          <div v-else class="text-center py-8">
            <svg class="w-16 h-16 mx-auto mb-4 text-[#232c4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p class="text-xl font-semibold mb-3">No tienes un plan activo</p>
            <p class="text-white/90 mb-4">Para comenzar a usar todas las funciones, selecciona un plan</p>
            <NuxtLink 
              to="/facturacion"
              class="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Ver Planes Disponibles
            </NuxtLink>
          </div>
        </div>

        <!-- Información del Usuario -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Información del Usuario
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="text-gray-600">Email:</span>
              <span class="font-medium text-gray-900">{{ user.email }}</span>
            </div>
         
            <div class="flex justify-between py-2">
              <span class="text-gray-600">Rol:</span>
              <span class="font-medium text-gray-900">{{ user.role?.name }}</span>
            </div>
          </div>
        </div>
        
        <!-- Información del Establecimiento -->
        <div v-if="user.establecimiento" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Establecimiento
          </h2>
          <div class="space-y-3">
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="text-gray-600">Nombre:</span>
              <span class="font-medium text-gray-900">{{ user.establecimiento.nombre }}</span>
            </div>
            <div v-if="user.establecimiento.ruc" class="flex justify-between py-2">
              <span class="text-gray-600">RUC:</span>
              <span class="font-medium text-gray-900">{{ user.establecimiento.ruc }}</span>
            </div>
          </div>
        </div>
        
        <!-- Datos Personales -->
        <div v-if="user.datos_personales" class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg class="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
            </svg>
            Datos Personales
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="text-gray-600">Nombre:</span>
              <span class="font-medium text-gray-900">{{ user.datos_personales.nombres }} {{ user.datos_personales.apellidos }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-200">
              <span class="text-gray-600">Cédula:</span>
              <span class="font-medium text-gray-900">{{ user.datos_personales.cedula }}</span>
            </div>
          </div>
        </div>

        <!-- Acciones Rápidas -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <NuxtLink 
              to="/facturacion"
              class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <svg class="w-8 h-8 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              <span class="text-sm font-medium text-gray-900">Facturación</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/ia"
              class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <svg class="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="text-sm font-medium text-gray-900">Landing Page</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/citas"
              class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <svg class="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span class="text-sm font-medium text-gray-900">Citas</span>
            </NuxtLink>
            
            <NuxtLink 
              to="/personal"
              class="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <svg class="w-8 h-8 text-amber-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="text-sm font-medium text-gray-900">Mi Perfil</span>
            </NuxtLink>
          </div>
        </div>
        
      </div>
      
      <!-- Error -->
      <div v-else class="bg-white rounded-lg shadow p-6 text-center">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-xl font-semibold text-red-600 mb-2">Error al cargar los datos</p>
        <p class="text-gray-600">Por favor, intenta recargar la página</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onActivated } from 'vue';
import { useAuthStore } from '~/store/auth';

console.log('✅ RESUMEN.VUE CARGADO');

definePageMeta({
  layout: 'private',
  ssr: false,
});

const authStore = useAuthStore();
const { public: { baseURL } } = useRuntimeConfig();

// Estados básicos
const user = ref(null);
const loading = ref(true);
const subscriptionInfo = ref(null);

// Función para formatear fechas (corrige problema de zona horaria)
const formatDate = (dateString) => {
  if (!dateString) return 'No disponible';
  
  // Si la fecha viene en formato YYYY-MM-DD, parsearla sin zona horaria
  if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Para otros formatos, usar el comportamiento por defecto
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calcular días restantes (corrige problema de zona horaria)
const daysRemaining = computed(() => {
  if (!subscriptionInfo.value?.fecha_fin) return null;
  
  // Obtener fecha actual sin hora
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Parsear fecha_fin sin zona horaria
  let fechaFin;
  if (typeof subscriptionInfo.value.fecha_fin === 'string' && subscriptionInfo.value.fecha_fin.match(/^\d{4}-\d{2}-\d{2}/)) {
    const [year, month, day] = subscriptionInfo.value.fecha_fin.split('-').map(num => parseInt(num, 10));
    fechaFin = new Date(year, month - 1, day);
  } else {
    fechaFin = new Date(subscriptionInfo.value.fecha_fin);
  }
  fechaFin.setHours(0, 0, 0, 0);
  
  const diffTime = fechaFin.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

// Función para cargar usuario
const loadUser = async () => {
  console.log('🔄 Cargando usuario...');
  try {
    const userId = authStore.user?._id || authStore.user?.id;
    const res = await fetch(`${baseURL}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    if (res.ok) {
      user.value = await res.json();
      console.log('✅ USUARIO CARGADO');
    }
  } catch (e) {
    console.error('❌ ERROR:', e);
  }
};

// Función para cargar información de suscripción
const loadSubscription = async () => {
  console.log('🔄 Cargando información de suscripción...');
  try {
    const userId = authStore.user?._id || authStore.user?.id;
    const establecimientoId = authStore.user?.establecimiento?._id || authStore.user?.establecimiento?.id || authStore.user?.establecimiento;
    
    // Construir URL con filtros
    let url = `${baseURL}/config-pagos?user=${userId}&_sort=createdAt:DESC&_limit=1`;
    
    // Agregar filtro de establecimiento si existe
    if (establecimientoId) {
      url += `&establecimiento=${establecimientoId}`;
      console.log('🏢 Filtrando por establecimiento:', establecimientoId);
    }
    
    console.log('🔍 URL de consulta:', url);
    
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('📦 Datos recibidos de config-pagos:', data);
      
      if (data && data.length > 0) {
        subscriptionInfo.value = data[0];
        console.log('✅ INFORMACIÓN DE SUSCRIPCIÓN CARGADA (último registro):', {
          id: subscriptionInfo.value.id,
          producto: subscriptionInfo.value.producto,
          estado: subscriptionInfo.value.estado,
          createdAt: subscriptionInfo.value.createdAt,
          fecha_compra: subscriptionInfo.value.fecha_compra
        });
      } else {
        console.log('⚠️ No se encontró información de suscripción');
        subscriptionInfo.value = null;
      }
    }
  } catch (e) {
    console.error('❌ ERROR cargando suscripción:', e);
  }
};

onMounted(async () => {
  console.log('🎯 ONMOUNTED EJECUTADO');
  await loadUser();
  await loadSubscription();
  loading.value = false;
});

// Recargar datos cuando el usuario regresa a la página desde otra ruta
onActivated(async () => {
  console.log('🔄 PÁGINA REACTIVADA - Recargando datos...');
  await loadSubscription(); // Recargar la información de suscripción
});
</script>

<style scoped>
/* Estilos adicionales aquí */
</style>