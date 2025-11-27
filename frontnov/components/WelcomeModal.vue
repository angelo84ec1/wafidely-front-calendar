<template>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="show"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          @click.self="closeModal"
        >
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
  
            <!-- Header -->
            <div class="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-8 rounded-t-2xl">
              <div class="text-center">
                <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg class="w-10 h-10 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 class="text-3xl font-bold text-white mb-2">¡Bienvenido a Wafidely!</h2>
                <p class="text-white/90">Estamos emocionados de tenerte con nosotros</p>
              </div>
            </div>
  
            <!-- Body -->
            <div class="p-8">
              <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">🎉 ¡Registro Exitoso!</h3>
                <p class="text-gray-600 leading-relaxed">
                  Gracias por registrarte en nuestra plataforma. Para comenzar a utilizar todos los servicios
                  y crear tu landing page personalizada, necesitas seleccionar un plan.
                </p>
              </div>
  
              <div class="bg-gradient-to-r from-[#4285f4]/10 to-[#34a853]/10 border border-[#4285f4]/30 rounded-xl p-6 mb-6">
                <h4 class="font-bold text-gray-900 mb-3 flex items-center">
                  <svg class="w-5 h-5 text-[#4285f4] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Para empezar:
                </h4>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-[#34a853] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-gray-700">
                      <strong class="text-gray-900">Selecciona el plan "WAFree"</strong> para comenzar con una prueba gratuita de 5 días
                    </span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-[#34a853] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-gray-700">
                      Elige <strong class="text-gray-900">"Transferencia"</strong> como método de pago (sin costo)
                    </span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-[#34a853] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-gray-700">
                      ¡Comienza a crear tu landing page personalizada!
                    </span>
                  </li>
                </ul>
              </div>
  
              <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <p class="text-sm text-amber-800">
                    <strong>Importante:</strong> Hasta que no selecciones un plan, solo tendrás acceso limitado al menú.
                    Las opciones de Escritorio y Facturación estarán disponibles para que puedas activar tu cuenta.
                  </p>
                </div>
              </div>
  
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="goToPlans"
                  class="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Ver Planes Ahora
                </button>
                <button
                  @click="closeModal"
                  class="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Lo haré después
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  
  const props = defineProps<{
    show: boolean
  }>()
  
  const emit = defineEmits<{
    close: []
    goToPlans: []
  }>()
  
  const closeModal = () => {
    emit('close')
  }
  
  const goToPlans = () => {
    emit('goToPlans')
  }
  
  // Prevenir scroll cuando el modal está abierto
  watch(() => props.show, (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  })
  </script>
  
  <style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-active > div,
  .modal-leave-active > div {
    transition: transform 0.3s ease;
  }
  
  .modal-enter-from > div {
    transform: scale(0.9);
  }
  
  .modal-leave-to > div {
    transform: scale(0.9);
  }
  </style>