<!-- FixSubscriptionDates.vue -->
<!-- Componente temporal para corregir fechas de suscripciones existentes -->
<!-- Agregar este componente a resumen.vue temporalmente -->

<template>
    <div v-if="showFix" class="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-xl z-50">
      <div class="flex items-center gap-3 mb-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <div>
          <h3 class="font-bold">Fecha incorrecta detectada</h3>
          <p class="text-sm">Tu suscripción muestra 15 días en lugar de 5</p>
        </div>
      </div>
      
      <div class="flex gap-2">
        <button 
          @click="fixDates" 
          :disabled="fixing"
          class="flex-1 bg-white text-red-500 px-4 py-2 rounded font-bold hover:bg-gray-100 disabled:opacity-50"
        >
          {{ fixing ? 'Corrigiendo...' : '✓ Corregir Ahora' }}
        </button>
        <button 
          @click="showFix = false"
          class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          ✕
        </button>
      </div>
      
      <p v-if="message" class="mt-2 text-sm" :class="success ? 'text-green-200' : 'text-yellow-200'">
        {{ message }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useAuthStore } from '~/store/auth'
  import { useToast } from 'vue-toastification'
  
  const props = defineProps({
    subscriptionInfo: Object
  })
  
  const authStore = useAuthStore()
  const toast = useToast()
  const { public: { baseURL } } = useRuntimeConfig()
  
  const showFix = ref(false)
  const fixing = ref(false)
  const message = ref('')
  const success = ref(false)
  
  // Función para calcular fecha_fin correcta
  const calculateCorrectFechaFin = (fechaCompra, tipoTarjeta) => {
    const fecha = new Date(fechaCompra)
    
    switch (tipoTarjeta) {
      case 'demo':
      case 'free':
        fecha.setDate(fecha.getDate() + 5)
        break
      case 'mensual':
        fecha.setDate(fecha.getDate() + 30)
        break
      case 'anual':
        fecha.setDate(fecha.getDate() + 365)
        break
    }
    
    return fecha.toISOString().split('T')[0]
  }
  
  // Verificar si la fecha necesita corrección
  const checkIfNeedsFix = () => {
    if (!props.subscriptionInfo) return
    
    const { fecha_compra, fecha_fin, tipo_tarjeta } = props.subscriptionInfo
    
    if (!fecha_compra || !fecha_fin || !tipo_tarjeta) return
    
    const fechaFinCorrecta = calculateCorrectFechaFin(fecha_compra, tipo_tarjeta)
    
    if (fecha_fin !== fechaFinCorrecta) {
      console.log('⚠️ Fecha incorrecta detectada:')
      console.log('   Fecha actual:', fecha_fin)
      console.log('   Fecha correcta:', fechaFinCorrecta)
      showFix.value = true
    }
  }
  
  // Corregir fechas
  const fixDates = async () => {
    fixing.value = true
    message.value = ''
    
    try {
      const { id, fecha_compra, tipo_tarjeta } = props.subscriptionInfo
      const fechaFinCorrecta = calculateCorrectFechaFin(fecha_compra, tipo_tarjeta)
      
      console.log('🔧 Corrigiendo fecha_fin...')
      console.log('   ID:', id)
      console.log('   Nueva fecha_fin:', fechaFinCorrecta)
      
      const response = await fetch(`${baseURL}/config-pagos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.token}`
        },
        body: JSON.stringify({
          fecha_fin: fechaFinCorrecta
        })
      })
      
      if (response.ok) {
        message.value = '✅ Fecha corregida exitosamente'
        success.value = true
        toast.success('Fecha de vencimiento actualizada correctamente')
        
        // Recargar la página después de 2 segundos
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        throw new Error('Error al actualizar')
      }
      
    } catch (error) {
      console.error('❌ Error corrigiendo fecha:', error)
      message.value = '❌ Error al corregir fecha'
      success.value = false
      toast.error('Error al actualizar la fecha')
    } finally {
      fixing.value = false
    }
  }
  
  // Verificar al montar y cuando cambie subscriptionInfo
  onMounted(() => {
    checkIfNeedsFix()
  })
  
  watch(() => props.subscriptionInfo, () => {
    checkIfNeedsFix()
  }, { deep: true })
  </script>