<script setup lang="ts">
// Forzar renderizado solo en cliente para evitar errores de hidratación
definePageMeta({
  ssr: false,
  middleware: ["auth"],
  layout: "private"
})

import { ref, computed, onMounted } from 'vue'
import BaseInput from "~/components/common/inputs/base-input.vue";
import BaseFileInput from "~/components/common/inputs/file-input.vue";
import BaseTextarea from "~/components/common/inputs/base-textarea.vue";
import BaseSelect from "~/components/common/inputs/base-select.vue";
import useAdmin from '~/composables/useAdmin';
import { useAuthStore } from "~/store/auth";
import type { User, EstableCimientos } from "~/common/interfaces/user.interface";
import { useToast } from "vue-toastification";
import { useSubscriptionGuard } from '~/composables/useSubscriptionGuard';

const { isAdmin, isEstablecimiento } = useAdmin()
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const { checkSubscriptionStatus } = useSubscriptionGuard()

const {
  public: { baseURL },
} = useRuntimeConfig();
const BASE_URL = baseURL;

// Active tab management
const activeTab = ref('images')
const completedTabs = ref<string[]>([])

// Tab configuration
const tabs = [
  { id: 'images', name: 'Imágenes', icon: 'svg' },
  { id: 'general', name: 'Info General', icon: 'svg' },
  { id: 'locations', name: 'Ubicaciones', icon: 'svg' },
  { id: 'content', name: 'Contenido', icon: 'svg' },
  { id: 'social', name: 'Redes Sociales', icon: 'svg' }
]

const currentTabIndex = computed(() => tabs.findIndex(tab => tab.id === activeTab.value))

// Navigation methods
const nextTab = () => {
  if (currentTabIndex.value < tabs.length - 1) {
    if (!completedTabs.value.includes(activeTab.value)) {
      completedTabs.value.push(activeTab.value)
    }
    activeTab.value = tabs[currentTabIndex.value + 1].id
  }
}

const previousTab = () => {
  if (currentTabIndex.value > 0) {
    activeTab.value = tabs[currentTabIndex.value - 1].id
  }
}

const landingUrl = computed(() => {
  // Valor por defecto
  if (!currentUserEstablishment.value || !currentUserEstablishment.value[0]) {
    return '/ia'
  }

  // Usar slug personalizado si existe
  if (urlnego.value && urlnego.value.trim() !== '') {
    return `/ia/${urlnego.value}`
  }

  // Fallback al ID
  return `/ia/${currentUserEstablishment.value[0]?.id}`
})

const openLandingPage = () => {
  // Abre la URL en nueva pestaña
  window.open(landingUrl.value, '_blank', 'noopener,noreferrer')
}

const convertToSlug = (text: string): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Auto-generar slug desde el nombre
const generateSlugFromName = () => {
  if (name.value && !urlnego.value) {
    urlnego.value = convertToSlug(name.value);
    toast.info("URL generada automáticamente desde el nombre");
  }
}

const validateSlug = () => {
  if (!urlnego.value) return;
  
  // Solo convertir a minúsculas y eliminar caracteres inválidos
  // NO eliminar guiones ni hacer otras transformaciones agresivas
  let cleaned = urlnego.value
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9-]/g, '');  // Solo elimina caracteres inválidos
  
  if (urlnego.value !== cleaned) {
    urlnego.value = cleaned;
  }
}

// Existing form data
const getProfilePicture = (url: string) => `${BASE_URL}${url}`;
const formPersonalData = ref<HTMLFormElement | null>(null);

// Form fields
const category = ref<boolean>(false);
const name = ref("");
const contact = ref("");
const whatsa = ref("");
const form = ref("");
const urlnego = ref("");

// Maps and locations
const maps = ref("");
const maps2 = ref("");
const maps3 = ref("");
const maps4 = ref("");
const maps5 = ref("");
const titulomaps = ref("");
const titulomaps2 = ref("");
const titulomaps3 = ref("");
const titulomaps4 = ref("");
const titulomaps5 = ref("");
const direction1 = ref("");
const direction2 = ref("");
const direction3 = ref("");
const direction4 = ref("");
const direction5 = ref("");

// Content sections
const titledescription1 = ref("");
const description1 = ref("");
const titledescription2 = ref("");
const description2 = ref("");
const titledescription3 = ref("");
const description3 = ref("");
const titledescription4 = ref("");
const description4 = ref("");
const titledescription5 = ref("");
const description5 = ref("");

// Social media
const face = ref("");
const insta = ref("");
const tik = ref("");
const youtu = ref("");


// Images
const banner = ref(null);
const logo = ref(null);

const bannerFile = ref<File | null>(null);
const logoFile = ref<File | null>(null);

// ✅ Variables para preview de archivos
const bannerPreview = ref<string>('');
const logoPreview = ref<string>('');

const contentSections = [
  { title: titledescription1, description: description1 },
  { title: titledescription2, description: description2 },
  { title: titledescription3, description: description3 },
  { title: titledescription4, description: description4 },
  { title: titledescription5, description: description5 },
]

const categoryOptions = ref([
  { text: "Veterinaria", value: "Veterinaria" },
  { text: "Clínica", value: "Clínica" },
  { text: "Agencias de IA", value: "Agencias de IA" },
  { text: "Gimnasios", value: "Gimnasios" },
  { text: "Talleres Vehículos", value: "Talleres Vehículos" },
]);

const currentUserEstablishment = ref<EstableCimientos | null>(null);
const hasValidEstablishment = ref(false);
const isNewLanding = ref(true);
const isRefreshing = ref(false);



// Computed para verificar si se puede guardar
const canSave = computed(() => {
  return hasValidEstablishment.value || 
         (currentUserEstablishment.value && currentUserEstablishment.value[0]?.id);
});

// ✅ NUEVO: Función para forzar refresh del usuario
const forceRefreshUser = async () => {
  isRefreshing.value = true;
  try {
    console.log('🔄 Forzando refresh del usuario...');
    const refreshedUser = await authStore.refreshUser();
    
    console.log('📦 Usuario refrescado:', refreshedUser);
    console.log('🏢 Establecimiento:', refreshedUser?.establecimiento);
    
    if (refreshedUser?.establecimiento) {
      currentUserEstablishment.value = [refreshedUser.establecimiento];
      hasValidEstablishment.value = true;
      toast.success('Datos del usuario actualizados');
      await fetchData();
    } else {
      toast.error('El usuario no tiene un establecimiento asignado en la base de datos');
      console.error('❌ Usuario sin establecimiento después de refresh');
    }
  } catch (error) {
    console.error('❌ Error al refrescar usuario:', error);
    toast.error('Error al actualizar datos del usuario');
  } finally {
    isRefreshing.value = false;
  }
};

// Existing methods
// ✅ Función captureFile mejorada con validación y preview
const captureFile = (file: File, type: string) => {
  console.log('📁 Archivo capturado:', file);
  console.log('📁 Tipo:', type);
  console.log('📁 Tamaño:', file?.size);
  console.log('📁 Nombre:', file?.name);
  
  if (!file) {
    toast.error('No se pudo capturar el archivo');
    return;
  }
  
  // Crear preview del archivo
  const previewUrl = URL.createObjectURL(file);
  
  if (type === "banner") {
    bannerFile.value = file;
    bannerPreview.value = previewUrl;
    console.log('✅ Banner capturado correctamente');
  } else if (type === "logo") {
    logoFile.value = file;
    logoPreview.value = previewUrl;
    console.log('✅ Logo capturado correctamente');
  }
  
  toast.success(`Archivo ${file.name} seleccionado. ¡Ahora presiona "Subir ${type === 'banner' ? 'Banner' : 'Logo'}"!`);
};


// ✅ Función para eliminar banner
const removeBanner = () => {
  if (confirm('¿Estás seguro de eliminar el banner actual?')) {
    banner.value = null;
    bannerFile.value = null;
    bannerPreview.value = '';
    toast.info('Banner eliminado. Recuerda guardar los cambios.');
    console.log('🗑️ Banner eliminado');
  }
};

// ✅ Función para eliminar logo
const removeLogo = () => {
  if (confirm('¿Estás seguro de eliminar el logo actual?')) {
    logo.value = null;
    logoFile.value = null;
    logoPreview.value = '';
    toast.info('Logo eliminado. Recuerda guardar los cambios.');
    console.log('🗑️ Logo eliminado');
  }
};


// ✅ Función uploadFile mejorada con logging completo
const uploadFile = (file: File | null, name: string) => {
  console.log('🚀 uploadFile llamado con:', { file, name });
  console.log('🔍 Verificación del archivo:');
  console.log('   - file existe:', !!file);
  console.log('   - file.name:', file?.name);
  console.log('   - file.size:', file?.size);
  console.log('   - file.type:', file?.type);
  
  if (!file) {
    console.error('❌ No hay archivo para subir');
    toast.error('No hay archivo para subir. Por favor selecciona un archivo primero.');
    return;
  }

  console.log(`📤 Subiendo ${name}:`, file.name);
  
  const formData = new FormData();
  formData.append("files", file);
  
  const loadingToast = toast.info(`Subiendo ${name}...`, {
    timeout: false
  });
  
  fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  })
  .then(response => {
    console.log('📥 Respuesta recibida:', response.status);
    if (!response.ok) {
      throw new Error('Error en la subida');
    }
    return response.json();
  })
  .then(data => {
    console.log(`✅ ${name} subido:`, data);

    // Extraer primer archivo del array
    const uploadedFile = Array.isArray(data) ? data[0] : data;
    
    // 🔥 CRÍTICO PARA STRAPI V3: Guardar el ID (número), no la URL
    const fileId = uploadedFile?.id;
    const fileUrl = uploadedFile?.url;
    
    console.log('🆔 ID del archivo:', fileId, typeof fileId);
    console.log('🔗 URL del archivo:', fileUrl);

    if (name === "banner") {
      banner.value = fileId;  // ✅ Guardar ID numérico
      bannerFile.value = null;
      bannerPreview.value = fileUrl ? `${BASE_URL}${fileUrl}` : '';
      console.log('✅ Banner guardado - ID:', banner.value);
      toast.success("Banner subido exitosamente ✅");
    } else if (name === "logo") {
      logo.value = fileId;  // ✅ Guardar ID numérico
      logoFile.value = null;
      logoPreview.value = fileUrl ? `${BASE_URL}${fileUrl}` : '';
      console.log('✅ Logo guardado - ID:', logo.value);
      toast.success("Logo subido exitosamente ✅");
    }

    if (!fileId) {
      toast.warning(`El ${name} fue subido pero no se recibió el ID`);
    }

    toast.dismiss(loadingToast);
  })
  .catch(error => {
    console.error(`❌ Error subiendo ${name}:`, error);
    toast.error(`Error al subir ${name}. El archivo debe ser menor a 1MB`);
    toast.dismiss(loadingToast);
  });
};
const fetchData = async () => {
  // Verificar que el usuario y establecimientos existan
  if (!currentUserEstablishment.value || !currentUserEstablishment.value[0]?.id) {
    console.warn('⚠️ No hay establecimiento disponible');
    return;
  }

  const establishmentId = currentUserEstablishment.value[0].id;
  
  try {
    const response = await fetch(`${BASE_URL}/establecimientos/${establishmentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.getToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al cargar datos');
    }

    const data = await response.json();
    console.log('📦 Datos recibidos del servidor:', data);
    console.log('📦 Logo recibido:', data.logo, 'Tipo:', Array.isArray(data.logo) ? 'Array' : typeof data.logo);

    // Verificar si ya tiene datos de landing page
    const hasLandingData = data.nombre || data.banner || data.logo || data.categoria;
    
    if (hasLandingData) {
      console.log('✅ Landing page existente encontrada, cargando datos...');
      isNewLanding.value = false;
      
      // 🔥 MANEJO CORRECTO PARA STRAPI V3 - Logo puede venir como Array, Object, ID o null
      if (data.logo) {
        console.log('🔍 Procesando logo...');
        
        if (Array.isArray(data.logo) && data.logo.length > 0) {
          // Caso 1: Array (común en Strapi v3)
          const logoObj = data.logo[0];
          logo.value = logoObj.id || logoObj._id;
          logoPreview.value = logoObj.url ? `${BASE_URL}${logoObj.url}` : '';
          console.log('📸 Logo (array):', logo.value, 'Preview:', logoPreview.value);
        } else if (typeof data.logo === 'object' && data.logo.id) {
          // Caso 2: Objeto
          logo.value = data.logo.id || data.logo._id;
          logoPreview.value = data.logo.url ? `${BASE_URL}${data.logo.url}` : '';
          console.log('📸 Logo (objeto):', logo.value);
        } else if (typeof data.logo === 'number') {
          // Caso 3: Solo ID
          logo.value = data.logo;
          logoPreview.value = '';
          console.log('📸 Logo (ID):', logo.value);
        }
      } else {
        logo.value = null;
        logoPreview.value = '';
      }

      // Mismo manejo para banner
      if (data.banner) {
        if (Array.isArray(data.banner) && data.banner.length > 0) {
          const bannerObj = data.banner[0];
          banner.value = bannerObj.id || bannerObj._id;
          bannerPreview.value = bannerObj.url ? `${BASE_URL}${bannerObj.url}` : '';
        } else if (typeof data.banner === 'object' && data.banner.id) {
          banner.value = data.banner.id || data.banner._id;
          bannerPreview.value = data.banner.url ? `${BASE_URL}${data.banner.url}` : '';
        } else if (typeof data.banner === 'number') {
          banner.value = data.banner;
          bannerPreview.value = '';
        }
      } else {
        banner.value = null;
        bannerPreview.value = '';
      }

      // Resto de campos
      category.value = data.categoria || "";
      name.value = data.nombre || "";
      titledescription1.value = data.titulodescripcion1 || "";
      description1.value = data.detalledescripcion1 || "";
      titledescription2.value = data.titulodescripcion2 || "";
      description2.value = data.detalledescripcion2 || "";
      titledescription3.value = data.titulodescripcion3 || "";
      description3.value = data.detalledescripcion3 || "";
      titledescription4.value = data.titulodescripcion4 || "";
      description4.value = data.detalledescripcion4 || "";
      titledescription5.value = data.titulodescripcion5 || "";
      description5.value = data.detalledescripcion5 || "";

      contact.value = data.numerocontacto || "";
      face.value = data.facebook || "";
      insta.value = data.instagram || "";
      tik.value = data.tiktok || "";
      youtu.value = data.youtube || "";
      whatsa.value = data.whatsapp || "";
      form.value = data.formulario || "";
      urlnego.value = data.urlbusiness || "";

      maps.value = data.googlemaps || "";
      maps2.value = data.googlemaps2 || "";
      maps3.value = data.googlemaps3 || "";
      maps4.value = data.googlemaps4 || "";
      maps5.value = data.googlemaps5 || "";
      titulomaps.value = data.titulogooglemaps || "";
      titulomaps2.value = data.titulogooglemaps2 || "";
      titulomaps3.value = data.titulogooglemaps3 || "";
      titulomaps4.value = data.titulogooglemaps4 || "";
      titulomaps5.value = data.titulogooglemaps5 || "";
      direction1.value = data.direccion1 || "";
      direction2.value = data.direccion2 || "";
      direction3.value = data.direccion3 || "";
      direction4.value = data.direccion4 || "";
      direction5.value = data.direccion5 || "";
      
      console.log('✅ Datos cargados - Logo ID:', logo.value, 'Preview:', logoPreview.value);
      toast.success('Datos de landing page cargados exitosamente');
    } else {
      console.log('📝 Establecimiento nuevo sin landing page');
      isNewLanding.value = true;
      toast.info('Establecimiento listo para crear landing page');
    }
  } catch (error) {
    console.error('❌ Error en fetchData:', error);
    isNewLanding.value = true;
  }
}

const save = async () => {
  try {
    // Verificar que hay un establecimiento
    if (!currentUserEstablishment.value || !currentUserEstablishment.value[0]?.id) {
      toast.error('No se puede guardar sin un establecimiento');
      console.error('❌ No hay establecimiento:', currentUserEstablishment.value);
      return;
    }

    console.log('💾 Guardando landing page...');
    console.log('🆔 Establecimiento ID:', currentUserEstablishment.value[0].id);

    let description1Url = "";
    let description2Url = "";
    let description3Url = "";
    let description4Url = "";
    let description5Url = "";

    // 🔥 CONSTRUIR DATOS PARA STRAPI V3
    const data = {

      categoria: category.value,
      nombre: name.value,
     
      titulodescripcion1: titledescription1.value,
      detalledescripcion1: description1.value,
      detalledescripcion1Url: description1Url,

      titulodescripcion2: titledescription2.value,
      detalledescripcion2: description2.value,
      detalledescripcion2Url: description2Url,

      titulodescripcion3: titledescription3.value,
      detalledescripcion3: description3.value,
      detalledescripcion3Url: description3Url,

      titulodescripcion4: titledescription4.value,
      detalledescripcion4: description4.value,
      detalledescripcion4Url: description4Url,

      titulodescripcion5: titledescription5.value,
      detalledescripcion5: description5.value,
      detalledescripcion5Url: description5Url,

  
      facebook: face.value,
      instagram: insta.value,
      tiktok: tik.value,
      youtube: youtu.value,
      numerocontacto: contact.value,
      whatsapp: whatsa.value,
      formulario: form.value,
      urlbusiness: urlnego.value,

      googlemaps: maps.value,
      googlemaps2: maps2.value,
      googlemaps3: maps3.value,
      googlemaps4: maps4.value,
      googlemaps5: maps5.value,
      titulogooglemaps: titulomaps.value,
      titulogooglemaps2: titulomaps2.value,
      titulogooglemaps3: titulomaps3.value,
      titulogooglemaps4: titulomaps4.value,
      titulogooglemaps5: titulomaps5.value,
      direccion1: direction1.value,
      direccion2: direction2.value,
      direccion3: direction3.value,
      direccion4: direction4.value,
      direccion5: direction5.value,
    };

    // 🔥 CRÍTICO: Logo y Banner como IDs numéricos
    if (logo.value !== null && logo.value !== undefined) {
      data.logo = logo.value;
      console.log('📸 Logo incluido - ID:', data.logo, typeof data.logo);
    }
    
    if (banner.value !== null && banner.value !== undefined) {
      data.banner = banner.value;
      console.log('🖼️ Banner incluido - ID:', data.banner, typeof data.banner);
    }

    console.log('📤 Datos a enviar:', data);
    console.log('🔍 Tipos de datos:');
    console.log('  - logo:', data.logo, typeof data.logo);
    console.log('  - banner:', data.banner, typeof data.banner);

    const response = await fetch(`${BASE_URL}/establecimientos/${currentUserEstablishment.value[0].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.getToken}`
      },
      body: JSON.stringify(data)
    });

    console.log('📥 Respuesta del servidor:', response.status, response.statusText);

    if (response.ok) {
      const savedData = await response.json();
      console.log('✅ Landing page guardada:', savedData);
      
      // Actualizar estado
      isNewLanding.value = false;
      
      toast.success("Landing page creada exitosamente");
      await fetchData();
      sendEmail();
    } else {
      const errorData = await response.json();
      console.error('❌ Error del servidor:', errorData);
      toast.error("Error al guardar: " + (errorData.message || "Intenta de nuevo"));
    }
  } catch (error) {
    toast.error("Error al enviar la información");
    console.error("💥 Error en save:", error);
  }
};

const sendEmail = () => {
  try {
    const emailData = {
      to: "websecuador.net@gmail.com",
      subject: 'Landing Page Creada',
      text: `
      Un establecimiento creó la Landing page con la siguiente información a revisar:

          Whatsapp: ${whatsa.value}
          Correo: ${form.value}
        `,
    };

    fetch(`${BASE_URL}/email/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => {
        if (res.ok) {
          toast.success('Información enviada a Revisión');
        } else {
          toast.error('Error al enviar el correo');
        }
      })
      .catch((err) => {
        console.error('Error enviando email:', err);
      });
  } catch (error) {
    console.error("Error sending email", error);
  }
};

onMounted(async () => {
  const canAccess = await checkSubscriptionStatus()
  if (!canAccess) {
    return
  }
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔄 Iniciando componente...');
    console.log('🔄 Restaurando autenticación desde localStorage...');
    
    // CRÍTICO: Restaurar el estado antes de cualquier otra cosa
    authStore.restoreAuth();
    
    console.log('🔍 authStore.user:', authStore.user);
    console.log('🔍 authStore.user.establecimiento:', authStore.user?.establecimiento);
    console.log('🔍 authStore.token:', authStore.token ? 'Existe' : 'No existe');
    
    // Verificar que hay usuario autenticado
    if (!authStore.user || !authStore.token) {
      console.error('❌ No hay autenticación válida después de restaurar');
      toast.error('Por favor inicia sesión');
      router.push('/login');
      return;
    }
    
    // ✅ NUEVO: Intentar obtener establecimiento de varias formas
    let establecimiento = authStore.user?.establecimiento;
    
    console.log('🔍 Verificando establecimiento...');
    console.log('   Tipo:', typeof establecimiento);
    console.log('   Valor:', establecimiento);
    
    // Si no tiene establecimiento, intentar refrescarlo SIEMPRE
    if (!establecimiento || !establecimiento.id) {
      console.log('⚠️ Usuario sin establecimiento, refrescando datos del servidor...');
      toast.info('Obteniendo información del establecimiento...');
      
      const refreshedUser = await authStore.refreshUser();
      console.log('📦 Usuario refrescado:', refreshedUser);
      
      if (refreshedUser?.establecimiento) {
        establecimiento = refreshedUser.establecimiento;
        console.log('✅ Establecimiento obtenido después de refresh:', establecimiento);
      } else {
        console.error('❌ Usuario sin establecimiento después de refresh');
        toast.error('Tu usuario no tiene un establecimiento asignado. Contacta al administrador.');
        hasValidEstablishment.value = false;
        return;
      }
    }
    
    console.log('📍 Establecimiento final:', establecimiento);
    
    if (establecimiento && establecimiento.id) {
      // Tu código actual espera un array, así que convertimos el objeto a array
      currentUserEstablishment.value = [establecimiento];
      hasValidEstablishment.value = true;
      
      console.log('✅ Establecimiento válido configurado');
      console.log('🆔 ID del establecimiento:', establecimiento.id);
      console.log('🎯 hasValidEstablishment:', hasValidEstablishment.value);
      console.log('🎯 canSave:', canSave.value);
      
      // Intentar cargar datos (puede o no tener landing page)
      await fetchData();
    } else {
      console.error('⚠️ Establecimiento sin ID válido');
      toast.error('El establecimiento no tiene un ID válido');
      hasValidEstablishment.value = false;
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Componente inicializado');
    console.log('🔐 Estado final:');
    console.log('   - hasValidEstablishment:', hasValidEstablishment.value);
    console.log('   - isNewLanding:', isNewLanding.value);
    console.log('   - canSave:', canSave.value);
    console.log('   - establishmentId:', currentUserEstablishment.value?.[0]?.id);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('💥 Error en onMounted:', error);
    toast.error('Error al cargar la página');
    hasValidEstablishment.value = false;
  }
})
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Constructor de Landing Page</h1>
            <p class="text-sm text-gray-600 mt-1">
              {{ isNewLanding ? 'Crea tu landing page' : 'Edita tu landing page' }}
            </p>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <!-- ✅ NUEVO: Botón de refresh -->
            <button 
              v-if="!hasValidEstablishment"
              @click="forceRefreshUser"
              :disabled="isRefreshing"
              class="inline-flex items-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-lg transition-colors text-orange-700 bg-orange-50 hover:bg-orange-100"
            >
              <svg v-if="!isRefreshing" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isRefreshing ? 'Cargando...' : 'Recargar Datos' }}
            </button>

            <button 
              @click.prevent="openLandingPage"
              :disabled="!canSave || (!urlnego && isNewLanding)"
              :class="[
                'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg transition-colors',
                (!canSave || (!urlnego && isNewLanding))
                  ? 'text-gray-400 bg-gray-200 cursor-not-allowed'
                  : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              ]"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              Ver Landing Page
            </button>
            
            <button 
              @click.prevent="save()"
              :disabled="!canSave"
              :class="[
                'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg transition-colors',
                !canSave
                  ? 'text-gray-400 bg-gray-200 cursor-not-allowed'
                  : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              ]"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              {{ isNewLanding ? 'Crear Landing' : 'Guardar Cambios' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ✅ Banner de error si no hay establecimiento -->
    <div v-if="!hasValidEstablishment" class="bg-red-50 border-b border-red-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-start">
          <svg class="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <div class="flex-1">
            <h3 class="text-sm font-medium text-red-800 mb-1">
              ⚠️ No se encontró un establecimiento asignado
            </h3>
            <p class="text-sm text-red-700 mb-3">
              Tu usuario no tiene un establecimiento asociado. Esto es necesario para crear o editar landing pages.
            </p>
            <div class="flex space-x-3">
              <button 
                @click="forceRefreshUser"
                :disabled="isRefreshing"
                class="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50"
              >
                <svg v-if="!isRefreshing" class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <svg v-else class="animate-spin w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isRefreshing ? 'Recargando...' : 'Intentar Recargar' }}
              </button>
              <p class="text-xs text-red-600 self-center">
                Si el problema persiste, contacta al administrador del sistema
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <!-- Banner informativo para landing pages nuevas -->
    <div v-if="isNewLanding && canSave" class="bg-blue-50 border-b border-blue-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <p class="text-sm text-blue-700">
            <strong>Nueva landing page:</strong> Completa los datos y haz clic en "Crear Landing" para publicar tu página.
          </p>
        </div>
      </div>
    </div>

    <!-- Progress Indicator -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center py-3">
          <div class="flex items-center space-x-2">
            <div v-for="(tab, index) in tabs" :key="tab.id" class="flex items-center">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 
                completedTabs.includes(tab.id) ? 'bg-green-500 text-white' :
                'bg-gray-200 text-gray-600'
              ]">
                <svg v-if="completedTabs.includes(tab.id)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div v-if="index < tabs.length - 1" :class="[
                'w-12 h-0.5 mx-2 transition-colors',
                completedTabs.includes(tab.id) ? 'bg-green-500' : 'bg-gray-200'
              ]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tab Navigation -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-0 overflow-x-auto">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex-1 px-4 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <div class="flex items-center justify-center">
                <svg v-if="completedTabs.includes(tab.id)" class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                {{ tab.name }}
              </div>
            </button>
          </nav>
        </div>

        <!-- Tab Content (resto del contenido igual que antes) -->
        <div class="p-6">
          <!-- ... (mismo contenido de tabs que en la versión anterior) ... -->
          <div v-show="activeTab === 'images'" class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Imágenes de tu Landing Page</h3>
              <p class="text-sm text-gray-600 mb-6">Sube el banner y logo que representarán tu negocio</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Banner Upload -->
              <div class="space-y-4">
                <h4 class="text-md font-medium text-gray-900">Banner Principal</h4>
                <div class="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-indigo-500 transition-colors">
                  
                  <!-- ✅ Input nativo -->
                  <div class="mb-4">
                    <label for="bannerInput" class="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Banner
                    </label>
                    <input
                      id="bannerInput"
                      type="file"
                      accept="image/*"
                      @change="(e) => captureFile(e.target.files[0], 'banner')"
                      class="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100
                        cursor-pointer"
                    />
                  </div>
                  
                  <!-- Preview del archivo seleccionado -->
                  <div v-if="bannerPreview" class="mt-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative">
                    <img :src="bannerPreview" alt="Preview Banner" class="object-cover" />
                    <div class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      ✓ Archivo listo para subir
                    </div>
                  </div>
                  
                  <!-- Preview del archivo ya subido -->
                  <div v-else-if="banner" class="mt-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative">
                    <img :src="getProfilePicture(banner)" alt="Banner" class="object-cover" />
                    <div class="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      Banner actual
                    </div>
                  </div>
                  
                  <!-- Botones de acción -->
                  <div class="flex gap-3 mt-4">
                    <button
                      v-if="bannerFile"
                      @click.prevent="uploadFile(bannerFile, 'banner')"
                      class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      Subir Banner
                    </button>
                    
                    <button 
                      v-if="banner || bannerPreview"
                      @click.prevent="removeBanner"
                      class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>

              <!-- Logo Upload -->
              <div class="space-y-4">
                <h4 class="text-md font-medium text-gray-900">Logo</h4>
                <div class="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-indigo-500 transition-colors">
                  
                  <!-- ✅ Input nativo -->
                  <div class="mb-4">
                    <label for="logoInput" class="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Logo
                    </label>
                    <input
                      id="logoInput"
                      type="file"
                      accept="image/*"
                      @change="(e) => captureFile(e.target.files[0], 'logo')"
                      class="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100
                        cursor-pointer"
                    />
                  </div>
                  
                  <!-- Preview del archivo seleccionado -->
                  <div v-if="logoPreview" class="mt-4 flex justify-center">
                    <div class="w-48 h-48 rounded-lg overflow-hidden bg-white border-2 border-green-500 flex items-center justify-center relative">
                      <img :src="logoPreview" alt="Preview Logo" class="max-w-full max-h-full object-contain" />
                      <div class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        ✓ Listo
                      </div>
                    </div>
                  </div>
                  
                  <!-- Preview del archivo ya subido -->
                  <div v-else-if="logo" class="mt-4 flex justify-center">
                    <div class="w-48 h-48 rounded-lg overflow-hidden bg-white border-2 border-gray-200 flex items-center justify-center relative">
                      <img :src="getProfilePicture(logo)" alt="Logo" class="max-w-full max-h-full object-contain" />
                      <div class="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        Actual
                      </div>
                    </div>
                  </div>
                  
                  <!-- Botones de acción -->
                  <div class="flex gap-3 mt-4">
                    <button
                      v-if="logoFile"
                      @click.prevent="uploadFile(logoFile, 'logo')"
                      class="flex-1 inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      Subir Logo
                    </button>
                    
                    <button 
                      v-if="logo || logoPreview"
                      @click.prevent="removeLogo"
                      class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- General Info Tab -->
          <div v-show="activeTab === 'general'" class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Información General</h3>
              <p class="text-sm text-gray-600 mb-6">Completa los datos básicos de tu negocio</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <BaseSelect v-model="category" :options="categoryOptions" label="Categoría" placeholder="Selecciona una categoría" />
              </div>
              
              <div class="md:col-span-2">
                <BaseInput 
                  v-model="name" 
                  type="text" 
                  label="Nombre del Negocio" 
                  name="name" 
                  @blur="generateSlugFromName"
                />
              </div>

              <BaseInput v-model="contact" type="text" label="Teléfono de Contacto" name="contact" />
              <BaseInput v-model="whatsa" type="text" label="WhatsApp" name="whatsapp" />
              <BaseInput v-model="form" type="email" label="Correo Electrónico" name="email" />
              
              <div class="md:col-span-2">
                <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
                  <div class="flex items-start">
                    <svg class="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                    </svg>
                    <div class="flex-1">
                      <h4 class="text-sm font-medium text-indigo-900 mb-1">URL Personalizada</h4>
                      <p class="text-xs text-indigo-700 mb-3">
                        Esta será la dirección única de tu landing page. Solo letras, números y guiones.
                      </p>
                      <BaseInput 
                        v-model="urlnego" 
                        type="text" 
                        label="URL del Negocio" 
                        name="urlbusiness"
                        placeholder="mi-negocio"
                        @input="validateSlug"
                      />
                      <p v-if="urlnego" class="text-xs text-green-600 mt-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        Tu página estará en: <strong class="ml-1 font-mono">{{ landingUrl }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Locations Tab -->
          <div v-show="activeTab === 'locations'" class="space-y-8">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Ubicaciones</h3>
              <p class="text-sm text-gray-600 mb-6">Configura hasta 5 ubicaciones de tu negocio</p>
            </div>

            <!-- Ubicación 1 (Principal) -->
            <div class="bg-blue-50 rounded-lg p-6">
              <h4 class="text-md font-medium text-blue-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                Ubicación Principal
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <BaseInput v-model="titulomaps" type="text" label="Título/Ciudad" placeholder="Oficina Principal - Quito" />
                <BaseInput v-model="maps" type="text" label="Coordenadas Google Maps" placeholder="-0.089666, -78.429636" />
                <BaseInput v-model="direction1" type="text" label="Dirección Completa" placeholder="Av. 6 de diciembre N36-109 y Eloy Alfaro" />
              </div>
            </div>

    
          </div>

          <!-- Content Tab -->
          <div v-show="activeTab === 'content'" class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Contenido de la Landing Page</h3>
              <p class="text-sm text-gray-600 mb-6">Crea hasta 5 secciones de contenido para destacar tus servicios o productos</p>
            </div>

            <div class="space-y-8">
              <!-- Sección 1 -->
              <div class="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-100">
                <h4 class="text-md font-medium text-indigo-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                  </svg>
                  Sección 1 (Principal)
                </h4>
                <div class="space-y-4">
                  <BaseInput v-model="titledescription1" type="text" label="Título de la Sección" placeholder="Nuestros Servicios" />
                  <BaseTextarea 
                    v-model="description1" 
                    label="Descripción" 
                    placeholder="Describe tus servicios principales, beneficios y qué te hace único..."
                    class="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4"
                  />
                </div>
              </div>

              <!-- Sección 2 -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-md font-medium text-gray-900 mb-4">Sección 2 (Opcional)</h4>
                <div class="space-y-4">
                  <BaseInput v-model="titledescription2" type="text" label="Título de la Sección" placeholder="¿Por qué elegirnos?" />
                  <BaseTextarea 
                    v-model="description2" 
                    label="Descripción"
                    class="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4"
                  />
                </div>
              </div>

              <!-- Sección 3 -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-md font-medium text-gray-900 mb-4">Sección 3 (Opcional)</h4>
                <div class="space-y-4">
                  <BaseInput v-model="titledescription3" type="text" label="Título de la Sección" placeholder="Nuestra Experiencia" />
                  <BaseTextarea 
                    v-model="description3" 
                    label="Descripción"
                    class="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4"
                  />
                </div>
              </div>

              <!-- Sección 4 -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-md font-medium text-gray-900 mb-4">Sección 4 (Opcional)</h4>
                <div class="space-y-4">
                  <BaseInput v-model="titledescription4" type="text" label="Título de la Sección" placeholder="Testimonios" />
                  <BaseTextarea 
                    v-model="description4" 
                    label="Descripción"
                    class="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4"
                  />
                </div>
              </div>

              <!-- Sección 5 -->
              <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-md font-medium text-gray-900 mb-4">Sección 5 (Opcional)</h4>
                <div class="space-y-4">
                  <BaseInput v-model="titledescription5" type="text" label="Título de la Sección" placeholder="Contáctanos" />
                  <BaseTextarea 
                    v-model="description5" 
                    label="Descripción"
                    class="mt-1 p-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="4"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media Tab -->
          <div v-show="activeTab === 'social'" class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h3>
              <p class="text-sm text-gray-600 mb-6">Conecta tus redes sociales para ampliar tu alcance y facilitar el contacto con tus clientes</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Facebook -->
              <div class="bg-blue-50 rounded-lg p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <h4 class="text-md font-medium text-blue-900">Facebook</h4>
                </div>
                <BaseInput v-model="face" type="url" label="URL de Facebook" placeholder="https://facebook.com/tu-pagina" />
              </div>

              <!-- Instagram -->
              <div class="bg-pink-50 rounded-lg p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <h4 class="text-md font-medium text-pink-900">Instagram</h4>
                </div>
                <BaseInput v-model="insta" type="url" label="URL de Instagram" placeholder="https://instagram.com/tu-perfil" />
              </div>

              <!-- TikTok -->
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </div>
                  <h4 class="text-md font-medium text-gray-900">TikTok</h4>
                </div>
                <BaseInput v-model="tik" type="url" label="URL de TikTok" placeholder="https://tiktok.com/@tu-perfil" />
              </div>

              <!-- YouTube -->
              <div class="bg-red-50 rounded-lg p-6">
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <h4 class="text-md font-medium text-red-900">YouTube</h4>
                </div>
                <BaseInput v-model="youtu" type="url" label="URL de YouTube" placeholder="https://youtube.com/c/tu-canal" />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Footer -->
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button 
            @click="previousTab"
            :disabled="currentTabIndex === 0"
            :class="[
              'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors',
              currentTabIndex === 0 
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            ]"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Anterior
          </button>

          <div class="text-sm text-gray-500">
            {{ currentTabIndex + 1 }} de {{ tabs.length }}
          </div>

          <button 
            @click="nextTab"
            :disabled="currentTabIndex === tabs.length - 1"
            :class="[
              'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors',
              currentTabIndex === tabs.length - 1 
                ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                : 'text-white bg-indigo-600 hover:bg-indigo-700'
            ]"
          >
            Siguiente
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.aspect-w-16 {
  position: relative;
  width: 100%;
}

.aspect-w-16::before {
  content: "";
  display: block;
  padding-bottom: 56.25%;
}

.aspect-w-16 > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.aspect-square {
  aspect-ratio: 1;
}
</style>