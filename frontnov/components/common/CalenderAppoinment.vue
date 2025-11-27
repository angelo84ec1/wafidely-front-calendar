<template>
  <div class="appointment-booking-wrapper">
    <!-- Mensaje de carga de configuración -->
    <div v-if="loadingConfig" class="flex flex-col items-center justify-center py-12">
      <div class="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-600 font-medium">Cargando configuración de horarios...</p>
    </div>

    <!-- Contenido principal -->
    <div v-else class="calendar-layout">
      <!-- Left Side: Monthly Calendar -->
      <div class="calendar-section">
        <div class="calendar-header">
          <button 
            type="button"
            class="nav-btn"
            @click="previousMonth"
            :disabled="!canGoPrevious"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div class="month-year">
            <span class="month-name">{{ currentMonthName }}</span>
            <span class="year-number">{{ currentYear }}</span>
          </div>

          <button 
            type="button"
            class="nav-btn"
            @click="nextMonth"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div class="weekdays-grid">
          <div v-for="day in weekDays" :key="day" class="weekday-label">{{ day }}</div>
        </div>

        <div class="calendar-grid">
          <div
            v-for="day in calendarDays"
            :key="day.date?.getTime() || `empty-${day.index}`"
            :class="[
              'calendar-day',
              {
                'empty': !day.date,
                'disabled': day.disabled,
                'selected': isSelectedDay(day.date),
                'today': isToday(day.date),
                'has-slots': day.hasSlots,
                'blocked': day.blocked
              }
            ]"
            @click="selectDay(day.date)"
          >
            <span v-if="day.date">{{ day.date.getDate() }}</span>
            <span v-if="day.blocked" class="blocked-indicator" title="Día bloqueado">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.965 4.904l9.131 9.131a6.5 6.5 0 00-9.131-9.131zm8.07 10.192L4.904 5.965a6.5 6.5 0 009.131 9.131zM4.343 4.343a8 8 0 1111.314 11.314A8 8 0 014.343 4.343z" clip-rule="evenodd" />
              </svg>
            </span>
          </div>
        </div>


      <!-- Info de configuración actual -->
      <div v-if="scheduleConfig" class="schedule-info">
          <div class="info-item">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>{{ scheduleConfig.diasActivos === 'lunes-sabado' ? 'Lun-Sáb' : 'Lun-Vie' }}</span>
          </div>
          <div class="info-item">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ scheduleConfig.horarioLaboral }}</span>
          </div>
          <div class="info-item">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>{{ scheduleConfig.duracionCita }} min</span>
          </div>
        </div>

        <div class="timezone-selector">
          <label for="timezone" class="timezone-label">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="timezone-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            Zona horaria
          </label>
          <select 
            id="timezone"
            v-model="selectedTimezone" 
            @change="onTimezoneChange"
            class="timezone-select"
          >
            <option 
              v-for="tz in timezones" 
              :key="tz.value" 
              :value="tz.value"
            >
              {{ tz.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Right Side: Time Slots -->
      <div class="time-slots-section">
        <div v-if="!selectedDate" class="no-selection">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <h3>Selecciona un día</h3>
          <p>Haz clic en un día del calendario para ver los horarios disponibles</p>
        </div>

        <div v-else class="slots-container">
          <div class="selected-day-header">
            <h3>{{ formatSelectedDate }}</h3>
            <p>{{ selectedDaySlots.length }} horarios disponibles</p>
          </div>

          <div class="slots-list">
            <button
              v-for="slot in selectedDaySlots"
              :key="slot.date.getTime()"
              :class="['time-slot', { 'selected': isSelectedSlot(slot.date) }]"
              @click="selectSlot(slot.date)"
              :disabled="isDisabled(slot.date)"
            >
              {{ formatTime(slot.date) }}
            </button>

            <div v-if="selectedDaySlots.length === 0" class="no-slots">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-small">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p>No hay horarios disponibles para este día</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <TransitionRoot as="template" :show="openModal">
      <Dialog class="relative z-[999999]" @close="handleCloseModal">
        <TransitionChild 
          as="template" 
          enter="ease-out duration-300" 
          enter-from="opacity-0" 
          enter-to="opacity-100"
          leave="ease-in duration-200" 
          leave-from="opacity-100" 
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity z-[999998]" />
        </TransitionChild>

        <div class="fixed inset-0 z-[999999] w-screen overflow-y-auto">
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
              <DialogPanel class="appointment-modal">
                <div v-if="isCongrats" class="success-content">
                  <div class="success-icon">
                    <svg class="checkmark" viewBox="0 0 52 52">
                      <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                      <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                  </div>
                  <DialogTitle as="h3" class="success-title">¡Cita confirmada!</DialogTitle>
                  <p class="success-message">Tu cita ha sido agendada exitosamente. Recibirás una confirmación por WhatsApp.</p>
                  <button type="button" class="btn-primary w-full mt-6" @click="handleCloseModal">Entendido</button>
                </div>

                <div v-else class="appointment-form">
                  <div class="form-header">
                    <DialogTitle as="h3" class="form-title">Confirma tu cita</DialogTitle>
                    <p class="form-subtitle">{{ formatSelectedDate }} a las {{ selectedSlotTime }}</p>
                  </div>

                  <div class="form-content">
                    <div class="form-group">
                      <label for="name" class="form-label">Nombre completo</label>
                      <input type="text" id="name" v-model="form.name" class="form-input" placeholder="Ej: María Fernández" required>
                    </div>

                    <div class="form-group">
                      <label for="whatsapp" class="form-label">WhatsApp</label>
                      <input type="tel" id="whatsapp" v-model="form.whatsapp" class="form-input" placeholder="+593 998 789 123" required>
                      <p class="input-hint">Incluye el código de país</p>
                    </div>
                  </div>

                  <div class="form-actions">
                    <button type="button" class="btn-secondary" @click="handleCloseModal" :disabled="loadingBtn">Cancelar</button>
                    <button type="button" class="btn-primary" :disabled="loadingBtn" @click="sendData">
                      <span v-if="!loadingBtn">Confirmar cita</span>
                      <span v-else class="flex items-center gap-2">
                        <svg class="spinner" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Procesando...
                      </span>
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
// ✅ CAMBIO IMPORTANTE: Importar generateAdvancedSlots en lugar de generateSlotsFromConfig
import { generateAdvancedSlots } from "@/helpers/slotsGenerator";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useToast } from 'vue-toastification';

const props = defineProps({
  disabledData: { type: Array, default: [] },
  establishmentId: { type: String }
});

const { public: { baseURL } } = useRuntimeConfig();
const toast = useToast();

// Estados
const loadingConfig = ref(true);
const scheduleConfig = ref(null);
const currentDate = ref(new Date());
const selectedDate = ref(null);
const selectedSlot = ref(null);
const openModal = ref(false);
const loadingBtn = ref(false);
const isCongrats = ref(false);
const selectedTimezone = ref('America/Guayaquil');
const generatedSlots = ref([]);

const form = reactive({
  name: '',
  whatsapp: '',
});

// Zonas horarias disponibles
const timezones = [
  { value: 'America/Guayaquil', label: '(UTC-05:00) Quito, Ecuador' },
  { value: 'America/Bogota', label: '(UTC-05:00) Bogotá, Colombia' },
  { value: 'America/Lima', label: '(UTC-05:00) Lima, Perú' },
  { value: 'America/New_York', label: '(UTC-05:00) Nueva York, EE.UU.' },
  { value: 'America/Chicago', label: '(UTC-06:00) Chicago, EE.UU.' },
  { value: 'America/Los_Angeles', label: '(UTC-08:00) Los Ángeles, EE.UU.' },
  { value: 'America/Mexico_City', label: '(UTC-06:00) Ciudad de México' },
  { value: 'America/Santiago', label: '(UTC-04:00) Santiago, Chile' },
  { value: 'America/Buenos_Aires', label: '(UTC-03:00) Buenos Aires, Argentina' },
  { value: 'Europe/Madrid', label: '(UTC+01:00) Madrid, España' },
];

// Días de la semana
const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Cargar configuración del establecimiento
const loadScheduleConfig = async () => {
  try {
    loadingConfig.value = true;
    console.log('🔄 Cargando configuración para establecimiento:', props.establishmentId);
    
    const response = await fetch(`${baseURL}/establecimientos/${props.establishmentId}`);
    
    if (!response.ok) {
      throw new Error('Error al cargar configuración');
    }
    
    const data = await response.json();
    console.log('📦 Datos del establecimiento:', data);
    
    // Obtener configuración de horarios
    scheduleConfig.value = data.configuracionHorarios || {
      diasActivos: 'lunes-viernes',
      horarioLaboral: '08:00-18:00',
      duracionCita: 30,
      diasBloqueados: [],
      horasBloqueadas: [], // ✅ Asegurarse de incluir esto
      horariosEspeciales: [] // ✅ Asegurarse de incluir esto
    };
    
    console.log('⚙️ Configuración de horarios cargada:', scheduleConfig.value);
    
    // ✅ CAMBIO IMPORTANTE: Usar generateAdvancedSlots que considera horas bloqueadas
    generatedSlots.value = generateAdvancedSlots(scheduleConfig.value, 90);
    console.log('📅 Slots generados:', generatedSlots.value.length);
    
  } catch (error) {
    console.error('❌ Error cargando configuración:', error);
    toast.error('Error al cargar la configuración del calendario');
    
    // Usar configuración por defecto
    scheduleConfig.value = {
      diasActivos: 'lunes-viernes',
      horarioLaboral: '08:00-18:00',
      duracionCita: 30,
      diasBloqueados: [],
      horasBloqueadas: [],
      horariosEspeciales: []
    };
    
    generatedSlots.value = generateAdvancedSlots(scheduleConfig.value, 90);
  } finally {
    loadingConfig.value = false;
  }
};

// Computeds
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('es-ES', { month: 'long' });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const canGoPrevious = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
  return firstDayOfMonth >= today;
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Días vacíos al inicio
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ date: null, disabled: true, index: `pre-${i}` });
  }

  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    
    const isPast = date < today;
    const hasSlots = availableSlots.value.some(slot => {
      const slotDate = new Date(slot);
      slotDate.setHours(0, 0, 0, 0);
      return slotDate.getTime() === date.getTime();
    });

    // Verificar si el día está bloqueado por la configuración
    const isBlocked = scheduleConfig.value?.diasBloqueados?.some(blocked => {
      const blockedDate = new Date(blocked.fecha + 'T00:00:00');
      return blockedDate.getTime() === date.getTime();
    }) || false;

    days.push({
      date,
      disabled: isPast || !hasSlots || isBlocked,
      hasSlots,
      blocked: isBlocked
    });
  }

  return days;
});

const availableSlots = computed(() => {
  return generatedSlots.value.filter(slot => {
    const isNotDisabled = !props.disabledData.some(disabledDate => {
      return new Date(disabledDate).getTime() === new Date(slot).getTime();
    });
    return isNotDisabled && new Date(slot) > new Date();
  });
});

const selectedDaySlots = computed(() => {
  if (!selectedDate.value) return [];
  
  const selectedDateStr = selectedDate.value.toDateString();
  
  return availableSlots.value
    .filter(slot => {
      const slotDate = new Date(slot);
      return slotDate.toDateString() === selectedDateStr;
    })
    .map(slot => ({ date: new Date(slot) }))
    .sort((a, b) => a.date - b.date);
});

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return '';
  return selectedDate.value.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const selectedSlotTime = computed(() => {
  if (!selectedSlot.value) return '';
  return formatTime(selectedSlot.value);
});

// Métodos
const previousMonth = () => {
  if (!canGoPrevious.value) return;
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  selectedDate.value = null;
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  selectedDate.value = null;
};

const selectDay = (date) => {
  if (!date) return;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (date < today) return;
  
  const hasSlots = availableSlots.value.some(slot => {
    const slotDate = new Date(slot);
    slotDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return slotDate.getTime() === date.getTime();
  });
  
  if (!hasSlots) return;
  
  selectedDate.value = date;
  selectedSlot.value = null;
};

const selectSlot = (date) => {
  selectedSlot.value = date;
  openModal.value = true;
};

const isSelectedDay = (date) => {
  if (!date || !selectedDate.value) return false;
  return date.toDateString() === selectedDate.value.toDateString();
};

const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isSelectedSlot = (date) => {
  if (!selectedSlot.value) return false;
  return date.getTime() === selectedSlot.value.getTime();
};

const isDisabled = (date) => {
  return props.disabledData.some(disabledDate => {
    return new Date(disabledDate).getTime() === new Date(date).getTime();
  });
};

const formatTime = (date) => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

const handleCloseModal = () => {
  if (!isCongrats.value) {
    openModal.value = false;
    selectedSlot.value = null;
  } else {
    openModal.value = false;
    isCongrats.value = false;
    form.name = '';
    form.whatsapp = '';
    selectedSlot.value = null;
    selectedDate.value = null;
  }
};

const onTimezoneChange = () => {
  console.log('Zona horaria cambiada a:', selectedTimezone.value);
  toast.info(`Zona horaria actualizada a ${timezones.find(tz => tz.value === selectedTimezone.value)?.label}`);
};

const sendData = async () => {
  if (!form.name || !form.whatsapp) {
    toast.error('Por favor completa todos los campos');
    return;
  }

  try {
    loadingBtn.value = true;

    const appointmentData = {
      name: form.name,
      whatsapp: form.whatsapp,
      date: selectedSlot.value.toISOString().split('T')[0],
      hour: formatTime(selectedSlot.value),
      establecimientos: [props.establishmentId],
      timezone: selectedTimezone.value,
      status: 'confirmed'
    };

    console.log('📤 Enviando cita:', appointmentData);

    const response = await fetch(`${baseURL}/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      throw new Error('Error al crear la cita');
    }

    const result = await response.json();
    console.log('✅ Cita creada:', result);

    isCongrats.value = true;
    toast.success('¡Cita agendada exitosamente!');

    // Emitir evento para actualizar el calendario
    emit('fetchCalender');

  } catch (error) {
    console.error('❌ Error al crear cita:', error);
    toast.error('Error al agendar la cita. Por favor intenta de nuevo.');
  } finally {
    loadingBtn.value = false;
  }
};

// Emits
const emit = defineEmits(['fetchCalender']);

// Lifecycle
onMounted(async () => {
  await loadScheduleConfig();
});

// Watchers
watch(() => props.establishmentId, async (newId) => {
  if (newId) {
    await loadScheduleConfig();
  }
});

// ✅ NUEVO: Recargar slots cuando cambie la configuración
watch(() => scheduleConfig.value, (newConfig) => {
  if (newConfig) {
    generatedSlots.value = generateAdvancedSlots(newConfig, 90);
    console.log('🔄 Slots regenerados por cambio de configuración');
  }
}, { deep: true });
</script>

<style scoped>
/* Los estilos permanecen igual */
.appointment-booking-wrapper {
  max-width: 100%;
  margin: 0 auto;
}

.calendar-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-section {
  border-right: 1px solid #e5e7eb;
  padding-right: 2rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.nav-btn {
  padding: 0.5rem;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.month-year {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.month-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.year-number {
  font-size: 0.875rem;
  color: #6b7280;
}

.weekdays-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.weekday-label {
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  border: 2px solid transparent;
}

.calendar-day:not(.empty):not(.disabled):hover {
  background: #f3f4f6;
  border-color: #e5e7eb;
}

.calendar-day.empty {
  cursor: default;
  pointer-events: none;
}

.calendar-day.disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.calendar-day.selected {
  background: #232c4d;
  color: white !important;
  border-color: #38f5b3;
}

.calendar-day.today {
  background: #eff6ff;
  color: #1e40af;
  font-weight: 800;
}

.calendar-day.has-slots:not(.disabled):not(.blocked) {
  color: #059669;
  font-weight: 600;
}

.calendar-day.blocked {
  background: #fee2e2;
  color: #991b1b;
  cursor: not-allowed;
  opacity: 0.6;
}

.blocked-indicator {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  color: #dc2626;
}

.timezone-selector {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.timezone-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.timezone-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.timezone-select {
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #111827;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.timezone-select:focus {
  outline: none;
  border-color: #232c4d;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.time-slots-section {
  display: flex;
  flex-direction: column;
}

.no-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  color: #9ca3af;
}

.no-selection .icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.no-selection h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.no-selection p {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.5;
}

.slots-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.selected-day-header {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.selected-day-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
  text-transform: capitalize;
}

.selected-day-header p {
  font-size: 0.875rem;
  color: #6b7280;
}

.slots-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.time-slot {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  font-weight: 500;
  font-size: 0.9375rem;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}

.time-slot:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #232c4d;
  color: #232c4d;
}

.time-slot.selected {
  background: #232c4d;
  border-color: #232c4d;
  color: white;
}

.time-slot:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f9fafb;
}

.no-slots {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  color: #9ca3af;
}

.no-slots .icon-small {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: #d1d5db;
}

.appointment-modal {
  background: white;
  border-radius: 16px;
  overflow: hidden;  
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 100%;
}

.success-content {
  padding: 3rem 2rem;
  text-align: center;
}

.success-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.checkmark {
  width: 64px;
  height: 64px;
  animation: scaleIn 0.5s ease-in-out;
}

.checkmark-circle {
  stroke: #10b981;
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  stroke: #10b981;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
}

@keyframes stroke { to { stroke-dashoffset: 0; } }
@keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }

.success-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
}

.success-message {
  font-size: 0.9375rem;
  color: #6b7280;
  line-height: 1.5;
}

.appointment-form { padding: 0; }

.form-header {
  background: #232c4d;
  padding: 1.5rem 2rem;
  text-align: center;
  color: white;
}

.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.form-subtitle {
  font-size: 0.9375rem;
  opacity: 0.9;
  color: white;
}

.form-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #111827;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #232c4d;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
}

.input-hint {
  font-size: 0.8125rem;
  color: #6b7280;
}

.form-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #232c4d;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1a2340;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background: #f9fafb;
}

@media (max-width: 968px) {
  .calendar-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .calendar-section {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding-right: 0;
    padding-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column-reverse;
  }
}

.schedule-info {
  margin-top: 1rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
}

.info-item svg {
  color: rgba(255, 255, 255, 0.8);
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>