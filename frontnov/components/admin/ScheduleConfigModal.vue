<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-[99999]" @close="handleClose">
      <TransitionChild 
        as="template" 
        enter="ease-out duration-300" 
        enter-from="opacity-0" 
        enter-to="opacity-100"
        leave="ease-in duration-200" 
        leave-from="opacity-100" 
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-[99999] w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild 
            as="template" 
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" 
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-6xl">
              <!-- Header -->
              <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <DialogTitle class="text-xl font-bold text-white">
                        Configuración Avanzada de Horarios
                      </DialogTitle>
                      <p class="text-sm text-white/80">Gestiona horarios, bloqueos y excepciones</p>
                    </div>
                  </div>
                  <button
                    @click="handleClose"
                    class="text-white/80 hover:text-white transition-colors"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Tabs -->
              <div class="border-b border-gray-200 bg-gray-50">
                <nav class="flex space-x-2 px-6" aria-label="Tabs">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'py-4 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    <div class="flex items-center space-x-2">
                      <component :is="tab.icon" class="w-4 h-4" />
                      <span>{{ tab.name }}</span>
                    </div>
                  </button>
                </nav>
              </div>

              <!-- Content -->
              <div class="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
                
                <!-- TAB 1: Configuración Básica -->
                <div v-show="activeTab === 'basic'" class="space-y-6">
                  
                  <!-- Días Activos -->
                  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div class="flex items-center space-x-3 mb-4">
                      <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-900">Días de Atención</h3>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                      <label 
                        class="flex items-center space-x-3 p-4 bg-white border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                        :class="config.diasActivos === 'lunes-viernes' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'"
                      >
                        <input 
                          type="radio" 
                          v-model="config.diasActivos" 
                          value="lunes-viernes"
                          class="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                        >
                        <div class="flex-1">
                          <span class="text-sm font-medium text-gray-900">Lunes a Viernes</span>
                          <p class="text-xs text-gray-500 mt-0.5">5 días laborales</p>
                        </div>
                      </label>
                      
                      <label 
                        class="flex items-center space-x-3 p-4 bg-white border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                        :class="config.diasActivos === 'lunes-sabado' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'"
                      >
                        <input 
                          type="radio" 
                          v-model="config.diasActivos" 
                          value="lunes-sabado"
                          class="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                        >
                        <div class="flex-1">
                          <span class="text-sm font-medium text-gray-900">Lunes a Sábado</span>
                          <p class="text-xs text-gray-500 mt-0.5">6 días laborales</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Horario Laboral -->
                  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div class="flex items-center space-x-3 mb-4">
                      <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-900">Horario de Atención</h3>
                    </div>
                    
                    <div class="space-y-3">
                      <label 
                        v-for="horario in horariosPreset" 
                        :key="horario.value"
                        class="flex items-center justify-between p-4 bg-white border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                        :class="config.horarioLaboral === horario.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200'"
                      >
                        <div class="flex items-center space-x-3">
                          <input 
                            type="radio" 
                            v-model="config.horarioLaboral" 
                            :value="horario.value"
                            class="w-5 h-5 text-purple-600 focus:ring-purple-500"
                          >
                          <div>
                            <span class="text-sm font-medium text-gray-900">{{ horario.label }}</span>
                            <p class="text-xs text-gray-500 mt-0.5">{{ horario.duracion }}</p>
                          </div>
                        </div>
                        <div class="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {{ horario.value }}
                        </div>
                      </label>

                      <!-- Horario Personalizado -->
                      <div 
                        class="p-4 bg-white border-2 rounded-lg transition-all"
                        :class="config.horarioLaboral === 'personalizado' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'"
                      >
                        <label class="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="radio" 
                            v-model="config.horarioLaboral" 
                            value="personalizado"
                            class="w-5 h-5 text-purple-600 focus:ring-purple-500"
                          >
                          <span class="text-sm font-medium text-gray-900">Personalizado</span>
                        </label>
                        
                        <div v-if="config.horarioLaboral === 'personalizado'" class="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <label class="block text-xs font-medium text-gray-700 mb-2">Hora Inicio</label>
                            <input 
                              type="time" 
                              v-model="config.horarioInicio"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                          </div>
                          <div>
                            <label class="block text-xs font-medium text-gray-700 mb-2">Hora Fin</label>
                            <input 
                              type="time" 
                              v-model="config.horarioFin"
                              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Duración de Citas -->
                  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div class="flex items-center space-x-3 mb-4">
                      <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                      </div>
                      <h3 class="text-lg font-semibold text-gray-900">Duración de Citas</h3>
                    </div>
                    
                    <div class="grid grid-cols-4 gap-3">
                      <label 
                        v-for="duracion in duracionesDisponibles" 
                        :key="duracion"
                        class="flex flex-col items-center justify-center p-4 bg-white border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                        :class="config.duracionCita === duracion ? 'border-green-500 bg-green-50' : 'border-gray-200'"
                      >
                        <input 
                          type="radio" 
                          v-model="config.duracionCita" 
                          :value="duracion"
                          class="sr-only"
                        >
                        <span class="text-2xl font-bold text-gray-900">{{ duracion }}</span>
                        <span class="text-xs text-gray-500 mt-1">minutos</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- TAB 2: Días Bloqueados -->
                <div v-show="activeTab === 'blocked-days'" class="space-y-6">
                  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-lg font-semibold text-gray-900">Días Bloqueados</h3>
                          <p class="text-sm text-gray-600">Días completos sin atención</p>
                        </div>
                      </div>
                      <button
                        @click="agregarDiaBloqueado"
                        class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Agregar Día
                      </button>
                    </div>

                    <!-- Lista de días bloqueados -->
                    <div v-if="config.diasBloqueados.length > 0" class="space-y-3">
                      <div 
                        v-for="(bloqueo, index) in config.diasBloqueados" 
                        :key="index"
                        class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                      >
                        <div class="flex-1">
                          <p class="font-medium text-gray-900">{{ formatearFecha(bloqueo.fecha) }}</p>
                          <p class="text-sm text-gray-600 mt-1">{{ bloqueo.motivo }}</p>
                        </div>
                        <button
                          @click="eliminarDiaBloqueado(index)"
                          class="ml-4 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                      No hay días bloqueados configurados
                    </div>
                  </div>
                </div>

                <!-- TAB 3: Horas Bloqueadas -->
                <div v-show="activeTab === 'blocked-hours'" class="space-y-6">
                  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-lg font-semibold text-gray-900">Horas Bloqueadas</h3>
                          <p class="text-sm text-gray-600">Rangos de tiempo sin atención (ej: almuerzo)</p>
                        </div>
                      </div>
                      <button
                        @click="agregarHoraBloqueada"
                        class="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Agregar Hora
                      </button>
                    </div>

                    <!-- Lista de horas bloqueadas -->
                    <div v-if="config.horasBloqueadas.length > 0" class="space-y-3">
                      <div 
                        v-for="(bloqueo, index) in config.horasBloqueadas" 
                        :key="index"
                        class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                      >
                        <div class="flex-1">
                          <div class="flex items-center space-x-2">
                            <span class="font-medium text-gray-900">{{ bloqueo.horaInicio }} - {{ bloqueo.horaFin }}</span>
                            <span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                              {{ bloqueo.dias.join(', ') }}
                            </span>
                          </div>
                          <p class="text-sm text-gray-600 mt-1">{{ bloqueo.motivo }}</p>
                        </div>
                        <button
                          @click="eliminarHoraBloqueada(index)"
                          class="ml-4 text-red-600 hover:text-red-700 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                      No hay horas bloqueadas configuradas
                    </div>
                  </div>
                </div>

                <!-- TAB 4: Horarios Especiales -->
                <div v-show="activeTab === 'special-schedules'" class="space-y-6">
                  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 class="text-lg font-semibold text-gray-900">Horarios Especiales</h3>
                          <p class="text-sm text-gray-600">Horarios diferentes por período</p>
                        </div>
                      </div>
                      <button
                        @click="agregarHorarioEspecial"
                        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Agregar Horario
                      </button>
                    </div>

                    <!-- Lista de horarios especiales -->
                    <div v-if="config.horariosEspeciales.length > 0" class="space-y-3">
                      <div 
                        v-for="(especial, index) in config.horariosEspeciales" 
                        :key="index"
                        class="p-4 bg-white border border-gray-200 rounded-lg"
                      >
                        <div class="flex items-center justify-between mb-2">
                          <div>
                            <h4 class="font-medium text-gray-900">{{ especial.nombre }}</h4>
                            <p class="text-sm text-gray-600">
                              {{ formatearFecha(especial.fechaInicio) }} - {{ formatearFecha(especial.fechaFin) }}
                            </p>
                          </div>
                          <button
                            @click="eliminarHorarioEspecial(index)"
                            class="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                          <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span class="text-gray-600">{{ especial.horario }}</span>
                          </div>
                          <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <span class="text-gray-600">{{ especial.dias }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                      No hay horarios especiales configurados
                    </div>
                  </div>
                </div>

              </div>

              <!-- Footer Actions -->
              <div class="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                <button
                  @click="handleClose"
                  class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  @click="guardarConfiguracion"
                  :disabled="guardando"
                  class="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg v-if="guardando" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  <span>{{ guardando ? 'Guardando...' : 'Guardar Configuración' }}</span>
                </button>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>

      <!-- Modal para Agregar Día Bloqueado -->
      <TransitionRoot as="template" :show="modalDiaBloqueado">
        <Dialog class="relative z-[100000]" @close="modalDiaBloqueado = false">
          <TransitionChild 
            as="template" 
            enter="ease-out duration-300" 
            enter-from="opacity-0" 
            enter-to="opacity-100"
            leave="ease-in duration-200" 
            leave-from="opacity-100" 
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-900/50 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-[100000] overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild 
                as="template" 
                enter="ease-out duration-300"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" 
                leave="ease-in duration-200"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-md">
                  <div class="bg-white px-6 pt-6 pb-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Agregar Día Bloqueado</h3>
                    
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                        <input 
                          type="date" 
                          v-model="nuevoDiaBloqueado.fecha"
                          :min="hoy"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Motivo</label>
                        <input 
                          type="text" 
                          v-model="nuevoDiaBloqueado.motivo"
                          placeholder="Ej: Feriado nacional, Vacaciones, etc."
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <button
                      @click="modalDiaBloqueado = false"
                      class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      @click="confirmarDiaBloqueado"
                      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Modal para Agregar Hora Bloqueada -->
      <TransitionRoot as="template" :show="modalHoraBloqueada">
        <Dialog class="relative z-[100000]" @close="modalHoraBloqueada = false">
          <TransitionChild 
            as="template" 
            enter="ease-out duration-300" 
            enter-from="opacity-0" 
            enter-to="opacity-100"
            leave="ease-in duration-200" 
            leave-from="opacity-100" 
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-900/50 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-[100000] overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild 
                as="template" 
                enter="ease-out duration-300"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" 
                leave="ease-in duration-200"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-md">
                  <div class="bg-white px-6 pt-6 pb-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Agregar Hora Bloqueada</h3>
                    
                    <div class="space-y-4">
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Hora Inicio</label>
                          <input 
                            type="time" 
                            v-model="nuevaHoraBloqueada.horaInicio"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Hora Fin</label>
                          <input 
                            type="time" 
                            v-model="nuevaHoraBloqueada.horaFin"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                        </div>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Días de la semana</label>
                        <div class="grid grid-cols-4 gap-2">
                          <label 
                            v-for="dia in diasSemana" 
                            :key="dia.value"
                            class="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
                            :class="nuevaHoraBloqueada.dias.includes(dia.value) ? 'bg-orange-50 border-orange-300' : 'border-gray-200'"
                          >
                            <input 
                              type="checkbox" 
                              :value="dia.value"
                              v-model="nuevaHoraBloqueada.dias"
                              class="rounded text-orange-600"
                            >
                            <span class="text-xs">{{ dia.label }}</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Motivo</label>
                        <input 
                          type="text" 
                          v-model="nuevaHoraBloqueada.motivo"
                          placeholder="Ej: Hora de almuerzo"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <button
                      @click="modalHoraBloqueada = false"
                      class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      @click="confirmarHoraBloqueada"
                      class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <!-- Modal para Agregar Horario Especial -->
      <TransitionRoot as="template" :show="modalHorarioEspecial">
        <Dialog class="relative z-[100000]" @close="modalHorarioEspecial = false">
          <TransitionChild 
            as="template" 
            enter="ease-out duration-300" 
            enter-from="opacity-0" 
            enter-to="opacity-100"
            leave="ease-in duration-200" 
            leave-from="opacity-100" 
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-gray-900/50 transition-opacity" />
          </TransitionChild>

          <div class="fixed inset-0 z-[100000] overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild 
                as="template" 
                enter="ease-out duration-300"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100" 
                leave="ease-in duration-200"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-lg">
                  <div class="bg-white px-6 pt-6 pb-4">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Agregar Horario Especial</h3>
                    
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del período</label>
                        <input 
                          type="text" 
                          v-model="nuevoHorarioEspecial.nombre"
                          placeholder="Ej: Vacaciones de verano, Temporada alta"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                      </div>
                      
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Inicio</label>
                          <input 
                            type="date" 
                            v-model="nuevoHorarioEspecial.fechaInicio"
                            :min="hoy"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Fecha Fin</label>
                          <input 
                            type="date" 
                            v-model="nuevoHorarioEspecial.fechaFin"
                            :min="nuevoHorarioEspecial.fechaInicio || hoy"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                        </div>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Horario</label>
                        <div class="grid grid-cols-2 gap-4">
                          <input 
                            type="time" 
                            v-model="nuevoHorarioEspecial.horaInicio"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                          <input 
                            type="time" 
                            v-model="nuevoHorarioEspecial.horaFin"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                        </div>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Días activos</label>
                        <select 
                          v-model="nuevoHorarioEspecial.dias"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="lunes-viernes">Lunes a Viernes</option>
                          <option value="lunes-sabado">Lunes a Sábado</option>
                          <option value="todos">Todos los días</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <button
                      @click="modalHorarioEspecial = false"
                      class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      @click="confirmarHorarioEspecial"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  establecimientoId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'saved'])

const { public: { baseURL } } = useRuntimeConfig()

// Estado
const activeTab = ref('basic')
const guardando = ref(false)
const modalDiaBloqueado = ref(false)
const modalHoraBloqueada = ref(false)
const modalHorarioEspecial = ref(false)

// Configuración principal
const config = reactive({
  diasActivos: 'lunes-viernes',
  horarioLaboral: '08:00-18:00',
  horarioInicio: '08:00',
  horarioFin: '18:00',
  duracionCita: 30,
  diasBloqueados: [],
  horasBloqueadas: [],
  horariosEspeciales: []
})

// Tabs
const tabs = [
  { id: 'basic', name: 'Configuración Básica', icon: 'svg' },
  { id: 'blocked-days', name: 'Días Bloqueados', icon: 'svg' },
  { id: 'blocked-hours', name: 'Horas Bloqueadas', icon: 'svg' },
  { id: 'special-schedules', name: 'Horarios Especiales', icon: 'svg' }
]

// Datos
const horariosPreset = [
  { value: '08:00-18:00', label: '8:00 AM - 6:00 PM', duracion: '10 horas' },
  { value: '09:00-18:30', label: '9:00 AM - 6:30 PM', duracion: '9.5 horas' },
  { value: '08:30-17:30', label: '8:30 AM - 5:30 PM', duracion: '9 horas' },
  { value: '07:00-15:00', label: '7:00 AM - 3:00 PM', duracion: '8 horas' }
]

const duracionesDisponibles = [15, 30, 45, 60]

const diasSemana = [
  { value: 'lun', label: 'Lun' },
  { value: 'mar', label: 'Mar' },
  { value: 'mie', label: 'Mié' },
  { value: 'jue', label: 'Jue' },
  { value: 'vie', label: 'Vie' },
  { value: 'sab', label: 'Sáb' },
  { value: 'dom', label: 'Dom' }
]

// Nuevos objetos para modales
const nuevoDiaBloqueado = reactive({
  fecha: '',
  motivo: ''
})

const nuevaHoraBloqueada = reactive({
  horaInicio: '',
  horaFin: '',
  dias: [],
  motivo: ''
})

const nuevoHorarioEspecial = reactive({
  nombre: '',
  fechaInicio: '',
  fechaFin: '',
  horaInicio: '',
  horaFin: '',
  dias: 'lunes-viernes'
})

const hoy = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Métodos
const handleClose = () => {
  emit('close')
}

const formatearFecha = (fecha) => {
  const date = new Date(fecha + 'T00:00:00')
  return date.toLocaleDateString('es-EC', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Días bloqueados
const agregarDiaBloqueado = () => {
  nuevoDiaBloqueado.fecha = ''
  nuevoDiaBloqueado.motivo = ''
  modalDiaBloqueado.value = true
}

const confirmarDiaBloqueado = () => {
  if (nuevoDiaBloqueado.fecha) {
    config.diasBloqueados.push({
      fecha: nuevoDiaBloqueado.fecha,
      motivo: nuevoDiaBloqueado.motivo || 'Sin motivo especificado'
    })
    modalDiaBloqueado.value = false
  }
}

const eliminarDiaBloqueado = (index) => {
  config.diasBloqueados.splice(index, 1)
}

// Horas bloqueadas
const agregarHoraBloqueada = () => {
  nuevaHoraBloqueada.horaInicio = ''
  nuevaHoraBloqueada.horaFin = ''
  nuevaHoraBloqueada.dias = []
  nuevaHoraBloqueada.motivo = ''
  modalHoraBloqueada.value = true
}

const confirmarHoraBloqueada = () => {
  if (nuevaHoraBloqueada.horaInicio && nuevaHoraBloqueada.horaFin && nuevaHoraBloqueada.dias.length > 0) {
    config.horasBloqueadas.push({
      horaInicio: nuevaHoraBloqueada.horaInicio,
      horaFin: nuevaHoraBloqueada.horaFin,
      dias: [...nuevaHoraBloqueada.dias],
      motivo: nuevaHoraBloqueada.motivo || 'Sin motivo especificado'
    })
    modalHoraBloqueada.value = false
  }
}

const eliminarHoraBloqueada = (index) => {
  config.horasBloqueadas.splice(index, 1)
}

// Horarios especiales
const agregarHorarioEspecial = () => {
  nuevoHorarioEspecial.nombre = ''
  nuevoHorarioEspecial.fechaInicio = ''
  nuevoHorarioEspecial.fechaFin = ''
  nuevoHorarioEspecial.horaInicio = ''
  nuevoHorarioEspecial.horaFin = ''
  nuevoHorarioEspecial.dias = 'lunes-viernes'
  modalHorarioEspecial.value = true
}

const confirmarHorarioEspecial = () => {
  if (nuevoHorarioEspecial.nombre && nuevoHorarioEspecial.fechaInicio && nuevoHorarioEspecial.fechaFin) {
    config.horariosEspeciales.push({
      nombre: nuevoHorarioEspecial.nombre,
      fechaInicio: nuevoHorarioEspecial.fechaInicio,
      fechaFin: nuevoHorarioEspecial.fechaFin,
      horario: `${nuevoHorarioEspecial.horaInicio}-${nuevoHorarioEspecial.horaFin}`,
      dias: nuevoHorarioEspecial.dias
    })
    modalHorarioEspecial.value = false
  }
}

const eliminarHorarioEspecial = (index) => {
  config.horariosEspeciales.splice(index, 1)
}

// Guardar configuración
const guardarConfiguracion = async () => {
  try {
    guardando.value = true

    // Si es horario personalizado, usar los valores de inicio/fin
    let horarioFinal = config.horarioLaboral
    if (config.horarioLaboral === 'personalizado') {
      horarioFinal = `${config.horarioInicio}-${config.horarioFin}`
    }

    const configuracion = {
      diasActivos: config.diasActivos,
      horarioLaboral: horarioFinal,
      duracionCita: config.duracionCita,
      diasBloqueados: config.diasBloqueados,
      horasBloqueadas: config.horasBloqueadas,
      horariosEspeciales: config.horariosEspeciales
    }

    console.log('💾 Guardando configuración avanzada:', configuracion)

    const response = await fetch(`${baseURL}/establecimientos/${props.establecimientoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        configuracionHorarios: configuracion
      })
    })

    if (!response.ok) {
      throw new Error('Error al guardar la configuración')
    }

    emit('saved', configuracion)
    alert('✅ Configuración guardada exitosamente')
    handleClose()
  } catch (error) {
    console.error('Error guardando configuración:', error)
    alert('❌ Error al guardar la configuración')
  } finally {
    guardando.value = false
  }
}

// Cargar configuración existente
const cargarConfiguracion = async () => {
  try {
    const response = await fetch(`${baseURL}/establecimientos/${props.establecimientoId}`)
    const data = await response.json()

    if (data.configuracionHorarios) {
      const conf = data.configuracionHorarios
      
      config.diasActivos = conf.diasActivos || 'lunes-viernes'
      config.duracionCita = conf.duracionCita || 30
      config.diasBloqueados = conf.diasBloqueados || []
      config.horasBloqueadas = conf.horasBloqueadas || []
      config.horariosEspeciales = conf.horariosEspeciales || []

      // Parsear horario
      const horario = conf.horarioLaboral || '08:00-18:00'
      const esPreset = horariosPreset.some(h => h.value === horario)
      
      if (esPreset) {
        config.horarioLaboral = horario
      } else {
        config.horarioLaboral = 'personalizado'
        const [inicio, fin] = horario.split('-')
        config.horarioInicio = inicio
        config.horarioFin = fin
      }

      console.log('✅ Configuración cargada:', conf)
    }
  } catch (error) {
    console.error('Error cargando configuración:', error)
  }
}

// Cargar configuración cuando se abre el modal
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    cargarConfiguracion()
  }
})
</script>

<style scoped>
/* Scrollbar personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>