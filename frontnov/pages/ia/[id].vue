<script setup lang="ts">




import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useSubscriptionGuard } from '~/composables/useSubscriptionGuard';


const { checkSubscriptionStatus } = useSubscriptionGuard()
const isPageLoading = ref(true)
const loadingProgress = ref(0)
const calenderLoading = ref(true)
const calenderData = ref([])
const googleEventsPublic = ref([])
const isLoadingCalendar = ref(true)
const loadingMessage = ref('Cargando calendario...')
const activeSection = ref('section1')


const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? '' : section
}

const toast = useToast()
const route = useRoute()
const router = useRouter()

const {
  public: { baseURL, GOOGLE_MAPS_API },
} = useRuntimeConfig()
const BASE_URL = baseURL

const getProfilePicture = (url: string) => `${BASE_URL}${url}`

const establecimientos = ref<any>(null)
const establishmentId = ref<string>('')

// ====================================
// NUEVA FUNCIÓN: Detectar si es ID o slug
// ====================================
const isMongoId = (str: string): boolean => {
  return /^[a-f\d]{24}$/i.test(str);
}

// ====================================
// NUEVA FUNCIÓN: Obtener establecimiento por ID o slug
// ====================================
const fetchEstablishment = async () => {
  try {
    const param = route.params.id as string;

    console.log('🔍 PARAM:', param); // ← AGREGAR
    console.log('🔍 baseURL:', baseURL); // ← AGREGAR

    let endpoint = '';

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 INICIO fetchEstablishment');
    console.log('🔍 Parámetro recibido:', param);
    console.log('🔍 Tipo de param:', typeof param);
    console.log('🔍 baseURL:', baseURL); 
    
    if (param === "create") {
      return;
    }
    
    // Determinar si es un ID de MongoDB o un slug personalizado
    if (isMongoId(param)) {
      // Es un ID - usar endpoint existente
      endpoint = `${baseURL}/establecimientos/${param}`;
      establishmentId.value = param;

      console.log('📌 Modo ID'); // ← AGREGAR
    } else {
      // Es un slug personalizado - buscar por urlbusiness
      endpoint = `${baseURL}/establecimientos/by-slug/${param}`;

      console.log('📌 Modo SLUG'); // ← AGREGAR
    }
    
    loadingMessage.value = 'Cargando información del negocio...';
    loadingProgress.value = 10;
    
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('✅ Fetch completado');
    console.log('✅ Status:', response.status);
    console.log('✅ OK:', response.ok);
    console.log('✅ Headers:', response.headers);
    
    if (!response.ok) {

      console.error('❌ Response.ok es false');
      console.error('❌ Lanzando error...');
      throw new Error('Establecimiento no encontrado');
    }

    console.log('📦 Parseando JSON...');
    const data = await response.json();
    console.log('📦 JSON parseado exitosamente');
    console.log('📦 Keys del data:', Object.keys(data));
    console.log('📦 data.id:', data.id);
    console.log('📦 data._id:', data._id);
    console.log('📦 data.nombre:', data.nombre);
    


    console.log('📦 Data:', data); // ← AGREGAR
    
    // Verificar si la landing está activa
    if (data.activateLanding === false) {
      toast.error("Landing page desactivada por administrador");
      router.push("/");
      return;
    }
    
    console.log('✅ Landing activa (o sin campo activateLanding)');
    // Guardar el ID del establecimiento para uso posterior
    establishmentId.value = data.id || data._id;

    console.log('💾 establishmentId guardado:', establishmentId.value);
    
    // Procesar coordenadas de Google Maps
    if (data.googlemaps && typeof data.googlemaps === 'string') {

      console.log('🗺️ Procesando coordenadas...');
      data.googlemaps = {
        lat: parseFloat(data.googlemaps.split(",")[0]),
        lng: parseFloat(data.googlemaps.split(",")[1]),
      };
    }
    
    // Asignar color de fondo por defecto si no existe
    if (!data.detalledescripcion5) {
      data.detalledescripcion5 = '#f5f5f5';
    }
    
    establecimientos.value = data;
    console.log('✅ establecimientos.value asignado');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    loadingProgress.value = 30;
    
  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('💥 ERROR en fetchEstablishment:', error);
    console.error('💥 Error message:', error.message);
    console.error('💥 Error stack:', error.stack);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    toast.error('No se pudo cargar la página. Verifica la URL.');
    
    // Redirigir al home después de 2 segundos
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }
}

const getCalenderData = computed(() => {
  const localDates = calenderData.value
    .filter(event => 
      event?.date && 
      event?.hour && 
      event?.establecimientos?.length && 
      event?.establecimientos[0]?.id == establishmentId.value
    )
    .map(event => {
      const [year, month, day] = event.date.split('-')
      const [hours, minutes] = event.hour.split(':')
      return new Date(year, month - 1, day, hours, minutes)
    })

  const googleDates = googleEventsPublic.value
    .filter(event => event.start && !event.isAllDay)
    .map(event => event.start instanceof Date ? event.start : new Date(event.start))

  return [...localDates, ...googleDates]
})

definePageMeta({
  title: "Landing Page",
  name: "Landing Page",
})

const markerOptions = computed(() => ({
  position: {
    lat: establecimientos.value?.googlemaps?.lat - 0.00011,
    lng: establecimientos.value?.googlemaps?.lng + 0.00024,
  },
  anchorPoint: 'TOP_CENTER',
  label: 'O',
  title: establecimientos.value?.nombre || 'Ubicación'
}))

const getDataAppoinments = async () => {
  try {
    calenderLoading.value = true
    loadingMessage.value = 'Obteniendo citas locales...'
    
    const citasResponse = await fetch(`${BASE_URL}/citas`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!citasResponse.ok) {
      throw new Error('Failed to fetch data')
    }

    calenderData.value = await citasResponse.json()
  } catch (error) {
    console.error('Error fetching citas:', error)
  } finally {
    calenderLoading.value = false
  }
}

const getGoogleEvents = async () => {
  try {
    loadingMessage.value = 'Sincronizando con Google Calendar...'
    
    const url = `/api/public/google-calendar-direct?establecimientoId=${establishmentId.value}`
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      googleEventsPublic.value = []
      return
    }

    if (data.events && Array.isArray(data.events) && data.events.length > 0) {
      googleEventsPublic.value = data.events
        .filter(event => event.start && !event.isAllDay)
        .map(event => ({
          ...event,
          start: new Date(event.start),
          originalStart: event.start
        }))
    } else {
      googleEventsPublic.value = []
    }
  } catch (error) {
    console.error('Error obteniendo eventos de Google:', error)
    googleEventsPublic.value = []
  }
}

onMounted(async () => {

  const canAccess = await checkSubscriptionStatus()
  if (!canAccess) {
    return
  }
  try {
    // MODIFICADO: Primero obtener el establecimiento
    await fetchEstablishment()
    
    if (!establecimientos.value) {
      return;
    }
    
    loadingProgress.value = 40
    
    // Luego cargar las citas y eventos
    await getDataAppoinments()
    loadingProgress.value = 60
    
    await getGoogleEvents()
    loadingProgress.value = 90
    
    loadingProgress.value = 100
    
  } catch (error) {
    console.error('Error en onMounted:', error)
  } finally {
    await new Promise(resolve => setTimeout(resolve, 300))
    isLoadingCalendar.value = false
    isPageLoading.value = false
  }
})
</script>

<template>
  <!-- Loading Overlay -->
  <Transition name="fade">
    <div v-if="isPageLoading" class="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div class="text-center">
        <div class="mb-8">
          <div class="w-20 h-20 mx-auto bg-[#232c4d] rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-[#38f5b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        
        <div class="relative w-24 h-24 mx-auto mb-6">
          <div class="absolute inset-0 border-4 border-[#232c4d] rounded-full"></div>
          <div class="absolute inset-0 border-4 border-transparent border-t-[#38f5b3] rounded-full animate-spin"></div>
        </div>
        
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Cargando Landing Page</h2>
        <p class="text-gray-600 mb-4">{{ loadingMessage }}</p>
        
        <div class="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div 
            class="h-full bg-[#38f5b3] transition-all duration-300 ease-out"
            :style="{ width: loadingProgress + '%' }"
          ></div>
        </div>
        <p class="text-sm text-gray-500 mt-2">{{ loadingProgress }}%</p>
      </div>
    </div>
  </Transition>

  <!-- Error State (si el establecimiento no se cargó) -->
  <div v-if="!isPageLoading && !establecimientos" class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center max-w-md px-4">
      <svg class="w-24 h-24 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
      <p class="text-gray-600 mb-6">La URL que buscas no existe o ha sido movida.</p>
      <a href="/" class="inline-flex items-center px-4 py-2 bg-[#232c4d] text-white rounded-lg hover:bg-[#38f5b3] transition-colors">
        Volver al inicio
      </a>
    </div>
  </div>

  <!-- Contenedor Principal (solo si hay datos) -->
  <div v-else-if="establecimientos" class="min-h-screen py-8 px-4 relative overflow-hidden">
    <!-- Fondo corporativo de Wappiad -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"></div>
    
    <!-- Patrón de puntos corporativo -->
    <div class="absolute inset-0 opacity-30" style="background-image: radial-gradient(circle, #232c4d 1px, transparent 1px); background-size: 30px 30px;"></div>
    
    <!-- Formas geométricas corporativas -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#38f5b3]/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#232c4d]/10 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-2xl"></div>
    
    <div class="max-w-2xl mx-auto relative z-10">
      
      <!-- Sección de Perfil -->
      <div class="text-center mb-8">
        <!-- Logo/Avatar -->
        <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-xl ring-4 ring-white hover:ring-[#38f5b3]/50 transition-all duration-300 hover:scale-105">
          <img 
            v-if="establecimientos?.logo?.[0]?.url"
            :src="getProfilePicture(establecimientos.logo[0].url)"
            class="w-full h-full object-cover" 
            alt="Logo"
            @error="e => e.target.src = '/placeholder-logo.png'"
          />
          <div 
            v-else
            class="w-full h-full bg-gradient-to-br from-[#232c4d] to-[#38f5b3] flex items-center justify-center"
          >
            <span class="text-white text-4xl font-bold">
              {{ establecimientos?.nombre?.charAt(0) || '?' }}
            </span>
          </div>
        </div>

        <!-- Nombre y Categoría -->
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ establecimientos?.nombre }}
        </h1>
        <p class="text-lg text-gray-600 mb-6">
          {{ establecimientos?.categoria }}
        </p>

        <!-- Redes Sociales -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <!-- Facebook -->
          <a 
            v-if="establecimientos?.facebook"
            :href="'https://www.facebook.com/' + establecimientos.facebook" 
            target="_blank"
            class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
          >
            <svg class="w-6 h-6 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a 
            v-if="establecimientos?.instagram"
            :href="'https://www.instagram.com/' + establecimientos.instagram" 
            target="_blank"
            class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
          >
            <svg class="w-6 h-6 text-[#E4405F] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>

          <!-- TikTok -->
          <a 
            v-if="establecimientos?.tiktok"
            :href="'https://www.tiktok.com/' + establecimientos.tiktok" 
            target="_blank"
            class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
          >
            <svg class="w-6 h-6 text-[#000000] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          </a>

          <!-- YouTube -->
          <a 
            v-if="establecimientos?.youtube"
            :href="'https://www.youtube.com/' + establecimientos.youtube" 
            target="_blank"
            class="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group"
          >
            <svg class="w-6 h-6 text-[#FF0000] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Secciones de Información (Acordeón) -->
      <div class="space-y-4 mb-8">
        <!-- Sección 1 -->
        <div v-if="establecimientos?.titulodescripcion1" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
          <button 
            @click="toggleSection('section1')"
            class="w-full px-6 py-4 text-left font-semibold text-[#232c4d] hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <span>{{ establecimientos.titulodescripcion1 }}</span>
            <svg 
              class="w-5 h-5 transition-transform text-[#38f5b3]" 
              :class="{ 'rotate-180': activeSection === 'section1' }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div 
            v-show="activeSection === 'section1'"
            class="px-6 py-4 text-gray-700 border-t border-gray-100 bg-gray-50"
          >
            {{ establecimientos.detalledescripcion1 }}
          </div>
        </div>

        <!-- Sección 2 -->
        <div v-if="establecimientos?.titulodescripcion2" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
          <button 
            @click="toggleSection('section2')"
            class="w-full px-6 py-4 text-left font-semibold text-[#232c4d] hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <span>{{ establecimientos.titulodescripcion2 }}</span>
            <svg 
              class="w-5 h-5 transition-transform text-[#38f5b3]" 
              :class="{ 'rotate-180': activeSection === 'section2' }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div 
            v-show="activeSection === 'section2'"
            class="px-6 py-4 text-gray-700 border-t border-gray-100 bg-gray-50"
          >
            {{ establecimientos.detalledescripcion2 }}
          </div>
        </div>

        <!-- Sección 3 -->
        <div v-if="establecimientos?.titulodescripcion3" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
          <button 
            @click="toggleSection('section3')"
            class="w-full px-6 py-4 text-left font-semibold text-[#232c4d] hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <span>{{ establecimientos.titulodescripcion3 }}</span>
            <svg 
              class="w-5 h-5 transition-transform text-[#38f5b3]" 
              :class="{ 'rotate-180': activeSection === 'section3' }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div 
            v-show="activeSection === 'section3'"
            class="px-6 py-4 text-gray-700 border-t border-gray-100 bg-gray-50"
          >
            {{ establecimientos.detalledescripcion3 }}
          </div>
        </div>

        <!-- Sección 4 -->
        <div v-if="establecimientos?.titulodescripcion4" class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
          <button 
            @click="toggleSection('section4')"
            class="w-full px-6 py-4 text-left font-semibold text-[#232c4d] hover:bg-gray-50 transition-colors flex justify-between items-center"
          >
            <span>{{ establecimientos.titulodescripcion4 }}</span>
            <svg 
              class="w-5 h-5 transition-transform text-[#38f5b3]" 
              :class="{ 'rotate-180': activeSection === 'section4' }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div 
            v-show="activeSection === 'section4'"
            class="px-6 py-4 text-gray-700 border-t border-gray-100 bg-gray-50"
          >
            {{ establecimientos.detalledescripcion4 }}
          </div>
        </div>
      </div>

      <!-- Ubicación/Mapa -->
      <div v-if="establecimientos?.titulogooglemaps" class="mb-8">
        <button 
          @click="toggleSection('map')"
          class="w-full bg-white border border-gray-100 rounded-xl shadow-lg px-6 py-4 font-semibold text-[#232c4d] hover:shadow-xl transition-all flex justify-between items-center"
        >
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5 text-[#38f5b3]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"/>
            </svg>
            {{ establecimientos.titulogooglemaps }}
          </span>
          <svg 
            class="w-5 h-5 transition-transform text-[#38f5b3]" 
            :class="{ 'rotate-180': activeSection === 'map' }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        <div v-show="activeSection === 'map'" class="mt-4 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div v-if="establecimientos?.direccion1" class="px-6 py-3 border-b border-gray-100 text-sm text-gray-600 bg-gray-50">
            {{ establecimientos.direccion1 }}
          </div>
          <div class="h-80">
            <GoogleMap 
              :apiKey="GOOGLE_MAPS_API" 
              :center="establecimientos?.googlemaps" 
              :zoom="19"
              style="width: 100%; height: 100%"
            >
              <Marker :options="markerOptions">
                <InfoWindow>
                  <article>
                    <h1 class="font-semibold">{{ establecimientos?.nombre }}</h1>
                    <p class="text-sm">{{ establecimientos?.direccion1 }}</p>
                  </article>
                </InfoWindow>
              </Marker>
            </GoogleMap>
          </div>
        </div>
      </div>

      <!-- Calendario de Citas -->
      <div class="bg-white border border-gray-100 rounded-xl shadow-lg p-6 mb-8">
        <h3 class="text-xl font-bold text-[#232c4d] mb-4 text-center">Agenda tu Cita</h3>
        
        <div v-if="isLoadingCalendar" class="flex flex-col items-center justify-center py-12">
          <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600 font-medium">{{ loadingMessage }}</p>
          <p class="text-sm text-gray-400 mt-2">Sincronizando con Google Calendar...</p>
        </div>

        <CommonCalenderAppoinment 
          v-else
          :establishmentId="establishmentId" 
          :disabledData="getCalenderData" 
          @fetchCalender="getDataAppoinments"  
        />
      </div>

      <!-- Footer -->
      <div class="text-center py-6">
        <p class="text-sm text-gray-600 font-medium">
          © LANDING PAGE - EMBUDO DE VENTAS CREADO DE FORMA AUTOMÁTICA CON AI WAFIDELY
        </p>
      </div>

    </div>
  </div>

  <!-- WhatsApp Flotante -->
  <a 
    v-if="establecimientos?.whatsapp"
    :href="'https://wa.me/' + establecimientos.whatsapp" 
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:shadow-[#25D366]/50"
    aria-label="Contactar por WhatsApp"
  >
    <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </a>
</template>

<style scoped>
/* Transición fade para el loading */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animación de spin */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Transición suave para rotación */
.transition-transform {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Hover effect para iconos de redes sociales */
.group:hover svg {
  transform: scale(1.1);
}

/* Animación para botón WhatsApp */
@keyframes pulse-shadow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
}

/* Efecto pulsante para WhatsApp flotante */
.fixed.bottom-6.right-6:hover {
  animation: pulse-shadow 2s infinite;
}
</style>