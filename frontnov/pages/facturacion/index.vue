<template>
  <main class="min-h-screen bg-white shadow-sm border-b border-gray-200">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Planes y Facturación</h1>
            <p class="text-sm text-[#4285f4] mt-1">Elige el plan perfecto para tu negocio</p>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="showPaymentHistory = true"
              class="inline-flex items-center px-4 py-2 border border-[#667eea] text-sm font-medium rounded-lg text-[#667eea] hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white transition-all duration-300"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Historial de Pagos
            </button>
            <nuxt-link 
              to="/resumen"
              class="inline-flex items-center px-4 py-2 border border-[#4285f4] text-sm font-medium rounded-lg text-[#4285f4] hover:bg-gradient-to-r hover:from-[#4285f4] hover:to-[#34a853] hover:text-white transition-all duration-300"
            >
              ← Volver al Dashboard
            </nuxt-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Current Plan Banner -->
    <div v-if="currentPlan" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div class="bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 border border-[#667eea]/30 rounded-2xl p-6 shadow-lg">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center shadow-xl">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Plan Actual: {{ currentPlan }}</h3>
              <p class="text-sm text-gray-600">{{ currentPlan === 'WAFree' ? 'Upgrade para acceder a más funciones' : 'Estás disfrutando de todos los beneficios' }}</p>
            </div>
          </div>
          <div v-if="currentPlan === 'WAFree'" class="px-4 py-2 bg-gradient-to-r from-[#4285f4]/20 to-[#34a853]/20 border border-[#4285f4] rounded-lg">
            <p class="text-sm font-medium text-[#4285f4]">⚡ Mejora tu plan ahora</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Billing Toggle -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-center items-center gap-4">
        <span :class="['text-lg font-medium transition-colors', !isAnnual ? 'text-gray-900' : 'text-gray-500']">
          Mensual
        </span>
        <button 
          @click="isAnnual = !isAnnual"
          class="relative w-16 h-8 bg-gray-200 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:ring-offset-2 shadow-lg"
          :class="isAnnual ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2]' : ''"
        >
          <span 
            class="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 transform shadow-lg"
            :class="isAnnual ? 'translate-x-8' : ''"
          />
        </button>
        <span :class="['text-lg font-medium transition-colors', isAnnual ? 'text-gray-900' : 'text-gray-500']">
          Anual
        </span>
        <span v-if="isAnnual" class="ml-2 px-3 py-1 bg-gradient-to-r from-[#4285f4]/20 to-[#34a853]/20 border border-[#4285f4] rounded-full text-sm font-medium text-[#4285f4]">
          🎉 2 meses GRATIS%
        </span>
      </div>
    </div>

    <!-- Plans Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- WAFree Plan -->
        <div 
          class="relative bg-white border-2 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
          :class="[
            currentPlan === 'WAFree' ? 'border-[#667eea] shadow-xl shadow-[#667eea]/20' : 
            hasUsedWAFreeBefore ? 'border-gray-300 opacity-75' : 'border-gray-200'
          ]"
        >
          <!-- Badge: Plan Actual -->
          <div v-if="currentPlan === 'WAFree'" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="px-4 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold rounded-full shadow-lg">Plan Actual</span>
          </div>
          
          <!-- Badge: Ya Utilizado -->
          <div v-else-if="hasUsedWAFreeBefore" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="px-4 py-1 bg-gray-500 text-white text-sm font-bold rounded-full shadow-lg">🔒 Ya Utilizado</span>
          </div>
          
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold mb-2" :class="hasUsedWAFreeBefore ? 'text-gray-500' : 'text-gray-900'">
              WAFree
            </h3>
            <p class="text-sm mb-4" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-600'">
              Prueba gratuita para conocer nuestro servicio
            </p>
            <div class="mb-4">
              <span class="text-5xl font-bold" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-900'">
                $0
              </span>
            </div>
            <p class="text-sm font-medium" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'">
              Por 5 días
            </p>
            
            <!-- Mensaje informativo cuando ya fue usado -->
            <div v-if="hasUsedWAFreeBefore" class="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-xs text-yellow-800">
                ⚠️ Este plan solo puede activarse una vez
              </p>
            </div>
          </div>

          <ul class="space-y-3 mb-8">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">5 dias GRATIS ilimitado</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">Notificaciones de recordatorios a WhatsApp Business por 5 dias</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">URL personalizada</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">Nombre de negocio</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">Iconos redes sociales</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">Título y Descripción de servicios</span>
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 flex-shrink-0 mt-0.5" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-[#4285f4]'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-sm" :class="hasUsedWAFreeBefore ? 'text-gray-400' : 'text-gray-700'">Calendario para agendar citas</span>
            </li>
          </ul>

          <!-- Botón según el estado -->
          <button
            v-if="currentPlan === 'WAFree'"
            disabled
            class="w-full py-3 px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-bold shadow-lg cursor-not-allowed"
          >
            ✓ Plan Actual
          </button>
          <button
            v-else-if="hasUsedWAFreeBefore"
            disabled
            class="w-full py-3 px-4 bg-gray-400 text-gray-100 rounded-lg font-bold cursor-not-allowed"
            title="Este plan solo puede activarse una vez"
          >
            🔒 Plan Utilizado
          </button>
          <button
            v-else
            @click="selectPlan('WAFree', 0)"
            class="w-full py-3 px-4 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white rounded-lg font-bold hover:shadow-xl transition-all duration-300"
          >
            🎉 Activar Plan Gratis
          </button>
        </div>

        <!-- WAStarter Plan -->
        <div 
          class="relative bg-white border-2 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
          :class="currentPlan === 'WAStarter' ? 'border-[#667eea] shadow-xl shadow-[#667eea]/20' : 'border-[#667eea]/30'"
        >
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="px-4 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold rounded-full shadow-lg">
              {{ currentPlan === 'WAStarter' ? 'Plan Actual' : '⭐ Popular' }}
            </span>
          </div>
          
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">WAStarter</h3>
            <p class="text-gray-600 text-sm mb-4">Ideal para emprendedores y pequeños negocios</p>
            <div class="mb-2">
              <span class="text-2xl text-gray-500 line-through">${{ isAnnual ? '468' : '59' }}</span>
            </div>
            <div class="mb-4">
              <span class="text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">${{ isAnnual ? '390' : '39' }}</span>
            </div>
            <p class="text-gray-900 text-sm font-medium mb-1">USD por {{ isAnnual ? 'año' : 'mes' }}</p>
            <div class="inline-block px-3 py-1 bg-gradient-to-r from-[#4285f4]/20 to-[#34a853]/20 border border-[#4285f4] rounded-full">
              <span class="text-[#4285f4] text-xs font-bold">16% OFF</span>
            </div>
          </div>
          <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Agendamientos Ilimitados en el año por profesional o sucursal</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Notificaciones de recordatorios a whatsapp business sin limite</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">URL personalizada</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Nombre de negocio</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Iconos redes sociales</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Título y Descripción de servicios</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Calendario para agendar citas</span>
              </li>
            </ul>

          <button
            v-if="currentPlan !== 'WAStarter'"
            @click="selectPlan('WAStarter', isAnnual ? 390 : 39)"
            class="w-full py-3 px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Seleccionar Plan
          </button>
          <button
            v-else
            disabled
            class="w-full py-3 px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-bold shadow-lg"
          >
            ✓ Plan Actual
          </button>
        </div>

        <!-- WAPyme Plan -->
        <div 
          class="relative bg-white border-2 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
          :class="currentPlan === 'WAPyme' ? 'border-[#4285f4] shadow-xl shadow-[#4285f4]/20' : 'border-gray-200'"
        >
          <div v-if="currentPlan === 'WAPyme'" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="px-4 py-1 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white text-sm font-bold rounded-full shadow-lg">Plan Actual</span>
          </div>
          
          <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">WAPyme</h3>
            <p class="text-gray-600 text-sm mb-4">Para empresas en crecimiento</p>
            <div class="mb-2">
              <span class="text-2xl text-gray-500 line-through">${{ isAnnual ? '828' : '89' }}</span>
            </div>
            <div class="mb-4">
              <span class="text-5xl font-bold bg-gradient-to-r from-[#4285f4] to-[#34a853] bg-clip-text text-transparent">${{ isAnnual ? '690' : '69' }}</span>
            </div>
            <p class="text-gray-900 text-sm font-medium mb-1">USD por {{ isAnnual ? 'año' : 'mes' }}</p>
            <div class="inline-block px-3 py-1 bg-gradient-to-r from-[#4285f4]/20 to-[#34a853]/20 border border-[#4285f4] rounded-full">
              <span class="text-[#4285f4] text-xs font-bold">16% OFF</span>
            </div>
          </div>

          <ul class="space-y-3 mb-8">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Agendamientos Ilimitados en el año por profesional o sucursal</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Notificaciones de recordatorios a whatsapp business sin limite</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Whatsapp Business con IA hasta 50.000 tokens al mes </span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">URL personalizada</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Nombre de negocio</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Iconos redes sociales</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Título y Descripción de servicios</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#4285f4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700 text-sm">Calendario para agendar citas</span>
              </li>
            </ul>

          <button
            v-if="currentPlan !== 'WAPyme'"
            @click="selectPlan('WAPyme', isAnnual ? 690 : 69)"
            class="w-full py-3 px-4 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white rounded-lg font-bold hover:shadow-xl transition-all"
          >
            Seleccionar Plan
          </button>
          <button
            v-else
            disabled
            class="w-full py-3 px-4 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white rounded-lg font-bold shadow-lg"
          >
            ✓ Plan Actual
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showPaymentModal"
          class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
          @click.self="closePaymentModal"
        >
          <div class="min-h-screen px-4 py-8 flex items-center justify-center">
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fadeIn">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">Finalizar Compra</h3>
                  <p class="text-sm text-gray-600 mt-1">Plan: <span class="font-semibold">{{ selectedPlan }}</span> - <span class="font-semibold text-[#667eea]">${{ selectedPrice }} USD</span></p>
                </div>
                <button 
                  @click="closePaymentModal"
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Payment Method Selection -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-900 mb-3">
                  Método de Pago
                </label>
                <div class="grid grid-cols-2 gap-4">
                  <!-- PayPal Option -->
                  <button
                    @click="changePaymentMethod('paypal')"
                    class="relative p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                    :class="paymentMethod === 'paypal' ? 'border-[#0070ba] bg-[#0070ba]/5 shadow-lg' : 'border-gray-200 hover:border-[#0070ba]/50'"
                  >
                    <div class="flex flex-col items-center gap-2 -mt-5">
                      <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none">
                        <path d="M20.5 8.5c0 3.5-2.5 6-6 6h-1.5l-1 6h-4l1.5-9h3c2.5 0 4.5-1.5 4.5-4s-2-4-4.5-4h-5.5l-2.5 15h-4l3-18h9.5c4 0 7 2.5 7 6.5z" fill="#0070ba"/>
                      </svg>
                      <span class="text-sm font-medium text-gray-900">PayPal</span>
                    </div>
                    <div 
                      v-if="paymentMethod === 'paypal'"
                      class="absolute top-2 right-2 w-6 h-6 bg-[#0070ba] rounded-full flex items-center justify-center"
                    >
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </button>

                  <!-- Transfer Option -->
                  <button
                    @click="changePaymentMethod('transfer')"
                    class="relative p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                    :class="paymentMethod === 'transfer' ? 'border-[#38f5b3] bg-[#38f5b3]/5 shadow-lg' : 'border-gray-200 hover:border-[#38f5b3]/50'"
                  >
                    <div class="flex flex-col items-center gap-2 -mt-5">
                      <svg class="w-12 h-12 text-[#38f5b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                      </svg>
                      <span class="text-sm font-medium text-gray-900">Transferencia</span>
                    </div>
                    <div 
                      v-if="paymentMethod === 'transfer'"
                      class="absolute top-2 right-2 w-6 h-6 bg-[#38f5b3] rounded-full flex items-center justify-center"
                    >
                      <svg class="w-4 h-4 text-[#232c4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Payment Form -->
              <div class="mt-10  space-y-4 mb-6">
                <!-- PayPal Form -->
                <div v-if="paymentMethod === 'paypal'">
                  <label class="block text-sm font-medium text-gray-900 mb-2">
                    Email de PayPal
                  </label>
                  <input
                    v-model="paymentData.email"
                    type="email"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                    required
                  />
                  <p class="text-xs text-gray-600 mt-2">
                    Se abrirá PayPal para completar el pago de forma segura
                  </p>
                  <!-- PayPal Button Container -->
                  <div id="paypal-button-container" class="mt-4"></div>
                </div>

                <!-- Bank Transfer Form -->
                <div v-if="paymentMethod === 'transfer'" class="mt-10 space-y-4 ">
                  <div class="bg-[#9dfa2b]/10 border border-[#9dfa2b]/30 rounded-xl p-4 space-y-2">
                    <p class="text-sm font-medium text-black-700">Datos para transferencia:</p>
                    <div class="text-sm text-gray-300 space-y-1">
                      <p><strong class="text-[#232c4d]">Banco:</strong> Banco Produbanco</p>
                      <p><strong class="text-[#232c4d]">Cuenta:</strong> 27059059147</p>
                      <p><strong class="text-[#232c4d]">Tipo Cuenta:</strong> Corriente</p>
                      <p><strong class="text-[#232c4d]">Persona:</strong> Jurídica</p>
                      <p><strong class="text-[#232c4d]">Pais:</strong> Ecuador</p>
                      <p><strong class="text-[#232c4d]">Swift:</strong> PRODECEQXXX</p>
                      <p><strong class="text-[#232c4d]">Titular:</strong> WAPPIAD S.A.S.</p>
                      <p><strong class="text-[#232c4d]">RUC:</strong> 1793219287001</p>
                    </div>
                  </div>
                </div>

                <!-- Transfer Form -->
                <div v-if="paymentMethod === 'transfer'" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-2">
                      Número de Transferencia
                    </label>
                    <input
                      v-model="paymentData.transferNumber"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent transition-all"
                      placeholder="Ej: 123456789"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-2">
                      Fecha de Transferencia
                    </label>
                    <input
                      v-model="paymentData.transferDate"
                      type="date"
                      class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <!-- Country Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-2">
                    País
                  </label>
                  <select
                    v-model="paymentData.country"
                    class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all"
                  >
                    <option value="Ecuador">Ecuador</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Perú">Perú</option>
                    <option value="Chile">Chile</option>
                    <option value="Argentina">Argentina</option>
                    <option value="México">México</option>
                    <option value="España">España</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                  </select>
                </div>
              </div>

              <!-- Terms and Conditions -->
              <div class="mb-6">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input
                    v-model="acceptedTerms"
                    type="checkbox"
                    class="w-5 h-5 text-[#667eea] border-gray-300 rounded focus:ring-[#667eea] focus:ring-2 mt-0.5"
                  />
                  <span class="text-sm text-gray-700">
                    Acepto los 
                    <a href="#" class="text-[#667eea] hover:text-[#764ba2] font-medium">términos y condiciones</a>
                    y la
                    <a href="#" class="text-[#667eea] hover:text-[#764ba2] font-medium">política de privacidad</a>
                  </span>
                </label>
              </div>

              <!-- Submit Button (only for transfer) -->
              <button
                v-if="paymentMethod === 'transfer'"
                @click="processPayment"
                :disabled="isProcessing || !acceptedTerms"
                class="w-full py-3 px-6 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!isProcessing">Confirmar Pago</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Payment History Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showPaymentHistory"
          class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm"
          @click.self="showPaymentHistory = false"
        >
          <div class="min-h-screen px-4 py-8">
            <div class="bg-white rounded-2xl shadow-2xl max-w-7xl mx-auto p-8 animate-fadeIn">
              <div class="flex items-center justify-between mb-8">
                <h3 class="text-3xl font-bold text-gray-900">Historial de Pagos</h3>
                <button 
                  @click="showPaymentHistory = false"
                  class="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <PaymentHistory />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <WelcomeModal 
  :show="showWelcomeModal" 
  @close="closeWelcomeModal"
  @goToPlans="goToPlans"
/>

  </main>
</template>



<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useAuthStore } from '~/store/auth'
import { usePaymentStore } from '~/store/payment'  // ✅ AGREGAR ESTA LÍNEA
import { useToast, POSITION } from 'vue-toastification'
import { useRouter } from 'vue-router'
import PaymentHistory from '~/components/PaymentHistory.vue'
import WelcomeModal from '~/components/WelcomeModal.vue'
import { useSubscription } from '~/composables/useSubscription'
import { 
  getEcuadorDateString, 
  calculateFechaFinEcuador, 
  dateToLocalString 
} from '~/utils/ecuadorDates'

definePageMeta({
  name: "Facturacion",
  layout: "private",
})

const toast = useToast()
const authStore = useAuthStore()
const paymentStore = usePaymentStore()  // ✅ AGREGAR ESTA LÍNEA
const router = useRouter()
const showWelcomeModal = ref(false)



const {
  public: { baseURL, paypalClientId }
} = useRuntimeConfig()

// State
const isAnnual = ref(false)
const currentPlan = ref<string | null>(null)
const hasUsedWAFreeBefore = ref(false) // 🔒 Rastrear si ya usó WAFree alguna vez
const selectedPlan = ref<string>('')
const selectedPrice = ref<number>(0)
const showPaymentModal = ref(false)
const showPaymentHistory = ref(false)
const paymentMethod = ref<'paypal' | 'transfer'>('paypal')
const acceptedTerms = ref(false)
const isProcessing = ref(false)
const paypalLoaded = ref(false)
const paypalButtonsInstance = ref<any>(null) // Para almacenar la instancia de los botones

const paymentData = ref({
  email: '',
  transferNumber: '',
  transferDate: '',
  country: 'Ecuador'
})

// Load PayPal SDK
const loadPayPalScript = () => {
  return new Promise((resolve, reject) => {
    if (window.paypal) {
      paypalLoaded.value = true
      resolve(window.paypal)
      return
    }
    
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`
    script.onload = () => {
      paypalLoaded.value = true
      console.log('✅ PayPal SDK cargado correctamente')
      resolve(window.paypal)
    }
    script.onerror = (error) => {
      console.error('❌ Error cargando PayPal SDK:', error)
      reject(error)
    }
    document.body.appendChild(script)
  })
}

// Initialize PayPal Buttons
const initPayPalButtons = async () => {
  if (!window.paypal || paymentMethod.value !== 'paypal') {
    console.log('⚠️ PayPal no disponible o método incorrecto')
    return
  }
  
  await nextTick()
  
  const container = document.getElementById('paypal-button-container')
  if (!container) {
    console.log('⚠️ Contenedor de PayPal no encontrado')
    return
  }
  
  // CRÍTICO: Limpiar completamente el contenedor y destruir instancia anterior
  if (paypalButtonsInstance.value) {
    try {
      paypalButtonsInstance.value.close()
    } catch (e) {
      console.log('No se pudo cerrar la instancia anterior')
    }
    paypalButtonsInstance.value = null
  }
  container.innerHTML = ''
  
  try {
    console.log('🔄 Inicializando botones de PayPal...')
    
    // Crear nueva instancia de botones
    paypalButtonsInstance.value = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        height: 45
      },
      
      createOrder: (data: any, actions: any) => {
        if (!acceptedTerms.value) {
          toast.error('Debes aceptar los términos y condiciones', {
            position: POSITION.TOP_RIGHT
          })
          return Promise.reject(new Error('Terms not accepted'))
        }
        
        console.log('📦 Creando orden de PayPal...')
        
        return actions.order.create({
          purchase_units: [{
            description: `Plan ${selectedPlan.value}`,
            amount: {
              value: selectedPrice.value.toString(),
              currency_code: 'USD'
            }
          }]
        })
      },
      
      onApprove: async (data: any, actions: any) => {
        isProcessing.value = true
        console.log('✅ Orden aprobada, capturando pago...')
        
        try {
          const order = await actions.order.capture()
          console.log('💰 Pago capturado:', order)
          
          // Obtener fecha de compra actual
          const fechaCompraStr = getEcuadorDateString()
          const [year, month, day] = fechaCompraStr.split('-').map(num => parseInt(num, 10))
          const fechaInicio = new Date(year, month - 1, day)
          
          // Determinar tipo_tarjeta basado en el plan seleccionado
          let tipoTarjeta = 'demo'
          if (selectedPlan.value === 'WAFree') {
            tipoTarjeta = 'demo'
          } else if (selectedPlan.value === 'WAStarter' || selectedPlan.value === 'WAPyme') {
            tipoTarjeta = isAnnual.value ? 'anual' : 'mensual'
          }
          
          // Calcular fecha_fin basándose en el tipo de tarjeta
          const fechaFin = calculateFechaFinEcuador(fechaInicio, tipoTarjeta)
          const fechaFinStr = dateToLocalString(fechaFin)
          
          console.log('📅 Fechas calculadas en PayPal onApprove:', {
            planAnterior: currentPlan.value,
            planNuevo: selectedPlan.value,
            fecha_compra: fechaCompraStr,
            fecha_fin: fechaFinStr,
            tipoTarjeta
          })
          
          // Save payment to database con fechas actualizadas
          const discount = selectedPlan.value === 'WAStarter' ? 34 : (selectedPlan.value === 'WAPyme' ? 22 : 0)
          
          // Obtener el establecimiento del usuario
          const establecimientoId = paymentStore.getUserEstablecimiento()
          
          const paymentObject = {
            producto: selectedPlan.value,
            fecha_compra: fechaInicio.toISOString().split('T')[0],
            fecha_fin: fechaFin.toISOString().split('T')[0],
            tipo_tarjeta: tipoTarjeta,
            pais: paymentData.value.country,
            descuento: discount,
            total: selectedPrice.value,
            estado: 'Activo', // 🟢 PayPal = Activo (pago confirmado)
            respapi1: order.payer.email_address,
            respapi2: order.id,
            user: authStore.getUser?.id || authStore.getUser?._id,
            establecimiento: establecimientoId // 🔗 Relación con establecimiento
          }
          
          console.log('💾 Guardando pago PayPal en config-pagos:', paymentObject)
          
          const { error } = await useFetch<any>(
            `${baseURL}/config-pagos`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authStore.getToken}`
              },
              body: JSON.stringify(paymentObject)
            }
          )
          
          if (error.value) {
            throw new Error('Error al guardar el pago')
          }
          
          // Update current plan
          const planAnterior = currentPlan.value
          currentPlan.value = selectedPlan.value
          closePaymentModal()
          
          // Mensaje personalizado según si es cambio de plan o nuevo plan
          let mensaje = ''
          if (planAnterior && planAnterior !== selectedPlan.value) {
            mensaje = `¡Plan actualizado exitosamente! Has cambiado de ${planAnterior} a ${selectedPlan.value}.`
          } else {
            mensaje = `¡Pago procesado exitosamente! Plan ${selectedPlan.value} activado.`
          }
          
          toast.success(mensaje, {
            position: POSITION.TOP_RIGHT,
            timeout: 5000
          })
          
          // Redirect to dashboard
          setTimeout(() => {
            router.push('/resumen')
          }, 2000)
          
        } catch (error) {
          console.error('❌ Error processing PayPal payment:', error)
          toast.error('Error al procesar el pago. Por favor intenta nuevamente.', {
            position: POSITION.TOP_RIGHT
          })
        } finally {
          isProcessing.value = false
        }
      },
      
      onError: (err: any) => {
        console.error('❌ PayPal error:', err)
        toast.error('Error en la conexión con PayPal', {
          position: POSITION.TOP_RIGHT
        })
        isProcessing.value = false
      },
      
      onCancel: () => {
        console.log('⚠️ Pago cancelado por el usuario')
        toast.info('Pago cancelado', {
          position: POSITION.TOP_RIGHT
        })
        isProcessing.value = false
      }
    })
    
    // Renderizar los botones
    await paypalButtonsInstance.value.render('#paypal-button-container')
    console.log('✅ Botones de PayPal renderizados exitosamente')
    
  } catch (error) {
    console.error('❌ Error initializing PayPal buttons:', error)
    toast.error('Error al cargar los botones de PayPal', {
      position: POSITION.TOP_RIGHT
    })
  }
}

// Clean up PayPal buttons
const cleanupPayPalButtons = () => {
  console.log('🧹 Limpiando botones de PayPal...')
  
  if (paypalButtonsInstance.value) {
    try {
      paypalButtonsInstance.value.close()
    } catch (e) {
      console.log('No se pudo cerrar la instancia')
    }
    paypalButtonsInstance.value = null
  }
  
  const container = document.getElementById('paypal-button-container')
  if (container) {
    container.innerHTML = ''
  }
}

// Change payment method
const changePaymentMethod = async (method: 'paypal' | 'transfer') => {
  console.log(`🔄 Cambiando método de pago a: ${method}`)
  
  // Limpiar botones de PayPal si existen
  cleanupPayPalButtons()
  
  // Cambiar el método
  paymentMethod.value = method
  
  // Si cambiamos a PayPal, inicializar los botones
  if (method === 'paypal' && paypalLoaded.value) {
    await nextTick()
    setTimeout(() => {
      initPayPalButtons()
    }, 100) // Pequeño delay para asegurar que el DOM se actualizó
  }
}

// Close payment modal
const closePaymentModal = () => {
  console.log('🚪 Cerrando modal de pago...')
  cleanupPayPalButtons()
  showPaymentModal.value = false
  acceptedTerms.value = false
  paymentMethod.value = 'paypal'
}

// Select plan
const selectPlan = (plan: string, price: number) => {
  console.log(`📋 Seleccionando plan: ${plan} - $${price}`)
  console.log(`📋 Plan actual: ${currentPlan.value}`)
  
  // 🔒 VALIDACIÓN: No se puede volver a WAFree si ya lo usó anteriormente
  if (plan === 'WAFree' && hasUsedWAFreeBefore.value) {
    toast.error('El plan WAFree solo puede activarse una vez. Ya lo utilizaste anteriormente.', {
      position: POSITION.TOP_RIGHT,
      timeout: 5000
    })
    return // Detener ejecución
  }
  
  // Si el usuario ya tiene este plan activo
  if (plan === currentPlan.value) {
    toast.info('Ya tienes este plan activo.', {
      position: POSITION.TOP_RIGHT,
      timeout: 3000
    })
    return
  }
  
  selectedPlan.value = plan
  selectedPrice.value = price
  showPaymentModal.value = true
  
  // Reset form
  acceptedTerms.value = false
  paymentData.value.email = authStore.getUser?.email || ''
  paymentData.value.transferNumber = ''
  paymentData.value.transferDate = ''
  paymentData.value.country = 'Ecuador'
  
  // Inicializar PayPal cuando el modal se abre
  if (paypalLoaded.value) {
    nextTick(() => {
      setTimeout(() => {
        initPayPalButtons()
      }, 300) // Dar tiempo para que el modal se renderice completamente
    })
  }
}

// Función para actualizar plan existente o crear nuevo registro
const processPayment = async () => {
  if (!acceptedTerms.value) {
    toast.error('Debes aceptar los términos y condiciones', {
      position: POSITION.TOP_RIGHT
    })
    return
  }

  if (paymentMethod.value === 'transfer' && (!paymentData.value.transferNumber || !paymentData.value.transferDate)) {
    toast.error('Por favor completa todos los campos de transferencia', {
      position: POSITION.TOP_RIGHT
    })
    return
  }

  isProcessing.value = true

  try {
    const discount = selectedPlan.value === 'WAStarter' ? 34 : (selectedPlan.value === 'WAPyme' ? 22 : 0)
    
    // Obtener el establecimiento del usuario
    const establecimientoId = paymentStore.getUserEstablecimiento()
    
// ✅ REEMPLAZAR CON ESTO:
const fechaCompraStr = getEcuadorDateString()  // ⬅️ NUEVO
let tipoTarjeta = 'demo'

if (selectedPlan.value === 'WAFree') {
  tipoTarjeta = 'demo'
} else if (selectedPlan.value === 'WAStarter' || selectedPlan.value === 'WAPyme') {
  tipoTarjeta = isAnnual.value ? 'anual' : 'mensual'
}

// ⬇️⬇️⬇️ NUEVO ⬇️⬇️⬇️
const [year, month, day] = fechaCompraStr.split('-').map(num => parseInt(num, 10))
const fechaInicio = new Date(year, month - 1, day)
const fechaFin = calculateFechaFinEcuador(fechaInicio, tipoTarjeta)
const fechaFinStr = dateToLocalString(fechaFin)
// ⬆️⬆️⬆️ FIN NUEVO ⬆️⬆️⬆️

console.log('📅 Fechas calculadas en PayPal onApprove (Ecuador GMT-5):', {
  planAnterior: currentPlan.value,
  planNuevo: selectedPlan.value,
  fechaCompra: fechaCompraStr,     // ⬅️ MODIFICADO
  fechaFin: fechaFinStr,            // ⬅️ MODIFICADO
  tipoTarjeta,
  zonaHoraria: 'America/Guayaquil (GMT-5)'  // ⬅️ NUEVO
})

// ... más código ...

const paymentObject = {
  producto: selectedPlan.value,
  fecha_compra: fechaCompraStr,    // ⬅️ MODIFICADO
  fecha_fin: fechaFinStr,          // ⬅️ MODIFICADO
      tipo_tarjeta: tipoTarjeta,
      pais: paymentData.value.country,
      descuento: discount,
      total: selectedPrice.value,
      estado: selectedPlan.value === 'WAFree' ? 'Activo' : 'Pendiente', // 🟢 WAFree = Activo, Transferencias = Pendiente
      respapi1: paymentData.value.transferNumber || '',
      respapi2: paymentData.value.transferDate || '',
      user: authStore.getUser?.id || authStore.getUser?._id
    }

    // Agregar establecimiento si existe
    if (establecimientoId) {
      paymentObject.establecimiento = establecimientoId
      console.log('✅ Establecimiento agregado al pago:', establecimientoId)
    } else {
      console.warn('⚠️ No se pudo obtener el establecimiento del usuario')
    }

    console.log('📦 Guardando cambio de plan en config-pagos:', paymentObject)

    // Crear nuevo registro de pago (historial)
    const { data, error } = await useFetch<any>(
      `${baseURL}/config-pagos`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.getToken}`
        },
        body: JSON.stringify(paymentObject)
      }
    )

    if (error.value) {
      throw new Error('Error al procesar el pago')
    }

    // Actualizar el plan actual localmente
    const planAnterior = currentPlan.value
    currentPlan.value = selectedPlan.value

    closePaymentModal()

    // Mensaje personalizado según el tipo de plan y si es un cambio
    if (selectedPlan.value === 'WAFree') {
      toast.success('¡Plan gratuito activado! Disfruta de 5 días de prueba.', {
        position: POSITION.TOP_RIGHT,
        timeout: 3000
      })
    } else {
      let mensaje = ''
      if (planAnterior && planAnterior !== selectedPlan.value) {
        mensaje = `¡Plan actualizado! Has cambiado de ${planAnterior} a ${selectedPlan.value}. Tu pago está pendiente de verificación.`
      } else {
        mensaje = `¡Plan ${selectedPlan.value} adquirido! Tu pago está pendiente de verificación.`
      }
      
      toast.success(mensaje, {
        position: POSITION.TOP_RIGHT,
        timeout: 5000
      })
    }

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/resumen')
    }, 2000)

  } catch (error) {
    console.error('❌ Error processing payment:', error)
    toast.error('Error al procesar el pago. Por favor intenta nuevamente.', {
      position: POSITION.TOP_RIGHT
    })
  } finally {
    isProcessing.value = false
  }
}

// Función para manejar el éxito del pago con PayPal
const handlePayPalSuccess = async (order: any) => {
  console.log('🎉 Pago con PayPal exitoso!')
  console.log('📦 Orden de PayPal:', order)
  
  try {
    const discount = selectedPlan.value === 'WAStarter' ? 34 : (selectedPlan.value === 'WAPyme' ? 22 : 0)
    
    // Obtener fecha de compra actual
    const fechaCompraStr = getEcuadorDateString()
    const [year, month, day] = fechaCompraStr.split('-').map(num => parseInt(num, 10))
    const fechaInicio = new Date(year, month - 1, day)
    
    // Determinar tipo_tarjeta basado en el plan seleccionado
    let tipoTarjeta = 'demo'
    if (selectedPlan.value === 'WAFree') {
      tipoTarjeta = 'demo'
    } else if (selectedPlan.value === 'WAStarter' || selectedPlan.value === 'WAPyme') {
      tipoTarjeta = isAnnual.value ? 'anual' : 'mensual'
    }
    
    // Calcular fecha_fin basándose en el tipo de tarjeta
    const fechaFin = calculateFechaFinEcuador(fechaInicio, tipoTarjeta)
    const fechaFinStr = dateToLocalString(fechaFin)
    
    console.log('📅 Fechas calculadas para PayPal:', {
      planAnterior: currentPlan.value,
      planNuevo: selectedPlan.value,
      fecha_compra: fechaCompraStr,
      fecha_fin: fechaFinStr,
      tipoTarjeta
    })
    
    // Guardar la transacción con fechas actualizadas
    const userData = {
      producto: selectedPlan.value,
      pais: paymentData.value.country,
      descuento: discount,
      userId: authStore.getUser?.id,
      fecha_compra: fechaInicio.toISOString().split('T')[0],
      fecha_fin: fechaFin.toISOString().split('T')[0],
      tipo_tarjeta: tipoTarjeta
    }

    console.log('💾 Guardando transacción de PayPal con datos:', userData)

    await paymentStore.savePayPalTransaction(order, userData)

    // Actualizar el plan actual localmente
    currentPlan.value = selectedPlan.value

    closePaymentModal()
    
    toast.success(`¡Pago completado exitosamente! Plan ${selectedPlan.value} activado.`, {
      position: POSITION.TOP_RIGHT,
      timeout: 3000
    })

    // Redirect to dashboard
    setTimeout(() => {
      router.push('/resumen')
    }, 2000)

  } catch (error) {
    console.error('❌ Error guardando transacción:', error)
    toast.error('El pago se procesó pero hubo un error al guardar. Contacta a soporte.', {
      position: POSITION.TOP_RIGHT
    })
  }
}

// AGREGAR funciones del modal:
const closeWelcomeModal = () => {
  showWelcomeModal.value = false
}

const goToPlans = () => {
  showWelcomeModal.value = false
}

// 🔍 Función para verificar si el usuario ya usó WAFree anteriormente
const checkWAFreeHistory = async () => {
  try {
    const userId = authStore.getUser?.id || authStore.getUser?._id;
    const establecimientoId = authStore.getUser?.establecimiento?._id || 
                              authStore.getUser?.establecimiento?.id || 
                              authStore.getUser?.establecimiento;
    
    // Obtener TODO el historial de pagos (sin límite)
    let url = `${baseURL}/config-pagos?user=${userId}&_sort=createdAt:DESC`;
    
    if (establecimientoId) {
      url += `&establecimiento=${establecimientoId}`;
    }
    
    console.log('🔍 Verificando historial completo de WAFree desde:', url);
    
    const { data } = await useFetch<any[]>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.getToken}`
      }
    })

    if (data.value && data.value.length > 0) {
      // Buscar si alguna vez tuvo WAFree
      const hadWAFree = data.value.some(payment => payment.producto === 'WAFree')
      
      // Si el plan actual NO es WAFree pero sí lo tuvo antes, marcar como usado
      if (hadWAFree && currentPlan.value !== 'WAFree') {
        hasUsedWAFreeBefore.value = true
        console.log('🔒 El usuario ya usó WAFree anteriormente. No puede volver a activarlo.')
      } else if (hadWAFree && currentPlan.value === 'WAFree') {
        hasUsedWAFreeBefore.value = false // Aún está en WAFree, puede continuar
        console.log('✅ Usuario tiene WAFree activo actualmente')
      } else {
        hasUsedWAFreeBefore.value = false
        console.log('✅ Usuario nunca ha usado WAFree, puede activarlo')
      }
    } else {
      hasUsedWAFreeBefore.value = false
      console.log('✅ Sin historial de pagos, puede activar WAFree')
    }
  } catch (error) {
    console.error('❌ Error verificando historial de WAFree:', error)
    hasUsedWAFreeBefore.value = false
  }
}


onMounted(async () => {
  console.log('🚀 Componente montado, cargando PayPal SDK...')
  
  // Verificar si es un usuario nuevo y mostrar modal de bienvenida
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('welcome') === 'true') {
    showWelcomeModal.value = true
    // Limpiar el parámetro de la URL
    window.history.replaceState({}, '', '/facturacion')
  }
  
  // Load PayPal SDK
  try {
    await loadPayPalScript()
  } catch (error) {
    console.error('Error loading PayPal SDK:', error)
    toast.error('Error al cargar PayPal. Por favor recarga la página.', {
      position: POSITION.TOP_RIGHT
    })
  }
  
  // Fetch user's current plan
  try {
    const userId = authStore.getUser?.id || authStore.getUser?._id;
    const establecimientoId = authStore.getUser?.establecimiento?._id || 
                              authStore.getUser?.establecimiento?.id || 
                              authStore.getUser?.establecimiento;
    
    // Construir URL con filtros
    let url = `${baseURL}/config-pagos?user=${userId}&_sort=createdAt:DESC&_limit=1`;
    
    // Agregar filtro de establecimiento si existe
    if (establecimientoId) {
      url += `&establecimiento=${establecimientoId}`;
      console.log('🏢 Filtrando plan actual por establecimiento:', establecimientoId);
    }
    
    console.log('🔍 Consultando plan actual desde:', url);
    
    const { data } = await useFetch<any[]>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.getToken}`
      }
    })

    if (data.value && data.value.length > 0) {
      // El primer elemento es el más reciente porque ordenamos por createdAt:DESC
      const activePlan = data.value[0];
      console.log('📋 Plan encontrado:', {
        id: activePlan.id,
        producto: activePlan.producto,
        estado: activePlan.estado,
        createdAt: activePlan.createdAt
      });
      
      if (activePlan.estado === 'Activo' || activePlan.estado === 'activo') {
        currentPlan.value = activePlan.producto;
        console.log('✅ Plan actual activo:', currentPlan.value);
      } else {
        console.log('⚠️ Plan encontrado pero no está activo:', activePlan.estado);
      }
    } else {
      console.log('⚠️ No se encontró ningún plan para este usuario');
    }
    
    // 🔍 Verificar historial de WAFree después de cargar el plan actual
    await checkWAFreeHistory()
    
  } catch (error) {
    console.error('Error fetching user plan:', error)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  console.log('👋 Componente desmontado, limpiando...')
  cleanupPayPalButtons()
})
</script>

<style scoped>
/* Modal Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white {
  transform: scale(0.9);
}

.modal-leave-to .bg-white {
  transform: scale(0.9);
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Custom Select Styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23667eea' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>