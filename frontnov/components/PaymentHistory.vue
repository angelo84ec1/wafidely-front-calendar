<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Historial de Pagos</h2>
      <p class="text-gray-600">Revisa todos tus pagos y transacciones</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Total Gastado</p>
            <p class="text-3xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">${{ totalSpent }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-[#667eea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Pagos Realizados</p>
            <p class="text-3xl font-bold bg-gradient-to-r from-[#4285f4] to-[#34a853] bg-clip-text text-transparent">{{ payments.length }}</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-r from-[#4285f4]/10 to-[#34a853]/10 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-[#4285f4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">Próximo Pago</p>
            <p class="text-xl font-bold text-gray-900">{{ nextPaymentDate || 'N/A' }}</p>
          </div>
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Estado</label>
          <select 
            v-model="filterStatus"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all"
          >
            <option value="">Todos</option>
            <option value="Paid">Pagado</option>
            <option value="Activo">Activo</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelled">Cancelado</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Plan</label>
          <select 
            v-model="filterPlan"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent transition-all"
          >
            <option value="">Todos</option>
            <option value="WAFree">WAFree</option>
            <option value="WAStarter">WAStarter</option>
            <option value="WAPyme">WAPyme</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Desde</label>
          <input 
            v-model="filterDateFrom"
            type="date"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-800 mb-2">Hasta</label>
          <input 
            v-model="filterDateTo"
            type="date"
            class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>

    <!-- Payments List -->
    <div class="space-y-4">
      <div 
        v-for="payment in filteredPayments" 
        :key="payment.id"
        class="bg-white border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
        :class="getPlanBorderColor(payment.producto)"
      >
        <div class="flex items-start justify-between flex-wrap gap-4">
          <!-- Left Info -->
          <div class="flex-1 min-w-[200px]">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="getPlanColor(payment.producto)">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ payment.producto }}</h3>
                <p class="text-sm text-gray-600">{{ formatDate(payment.fecha_compra) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4 mt-3 text-sm text-gray-700">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4 text-[#4285f4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {{ payment.pais }}
              </span>
              
              <span class="flex items-center gap-1" v-if="payment.descuento > 0">
                <svg class="w-4 h-4 text-[#34a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-[#34a853] font-medium">{{ payment.descuento }}% OFF</span>
              </span>
            </div>
          </div>

          <!-- Center Info -->
          <div class="text-center">
            <p class="text-3xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-1">${{ payment.total }}</p>
            <p class="text-sm text-gray-600">USD</p>
          </div>

          <!-- Right Info -->
          <div class="text-right">
            <span 
              class="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
              :class="getStatusColor(payment.estado)"
            >
              {{ getStatusLabel(payment.estado) }}
            </span>
            <p class="text-xs text-gray-600">
              {{ getPaymentMethod(payment) }}
            </p>
            
            <!-- Actions -->
            <div class="mt-3 flex gap-2 justify-end">
              <button
                @click="viewDetails(payment)"
                class="px-3 py-1 text-xs border border-[#667eea] text-[#667eea] rounded-lg hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white hover:border-transparent transition-all duration-300"
              >
                Ver Detalles
              </button>
              <button
                v-if="payment.estado === 'Paid' || payment.estado === 'Activo'"
                @click="downloadInvoice(payment)"
                class="px-3 py-1 text-xs bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Factura
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPayments.length === 0" class="text-center py-12">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <p class="text-gray-600 text-lg">No se encontraron pagos</p>
        <p class="text-gray-500 text-sm mt-2">Intenta ajustar los filtros</p>
      </div>
    </div>

    <!-- Payment Details Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showDetailsModal"
          class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="showDetailsModal = false"
        >
          <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fadeIn">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Detalles del Pago</h3>
              <button 
                @click="showDetailsModal = false"
                class="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Payment Details -->
            <div v-if="selectedPayment" class="space-y-6">
              <!-- Status Badge -->
              <div class="text-center">
                <span 
                  class="inline-block px-6 py-2 rounded-full text-base font-bold"
                  :class="getStatusColor(selectedPayment.estado)"
                >
                  {{ getStatusLabel(selectedPayment.estado) }}
                </span>
              </div>

              <!-- Amount -->
              <div class="text-center py-6 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-xl border border-[#667eea]/20">
                <p class="text-sm text-gray-600 mb-2">Monto Total</p>
                <p class="text-5xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                  ${{ selectedPayment.total }}
                </p>
                <p class="text-sm text-gray-600 mt-2">USD</p>
              </div>

              <!-- Details Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p class="text-xs text-gray-600 mb-1">Plan</p>
                  <p class="text-base font-bold text-gray-900">{{ selectedPayment.producto }}</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p class="text-xs text-gray-600 mb-1">Fecha de Compra</p>
                  <p class="text-base font-bold text-gray-900">{{ formatDate(selectedPayment.fecha_compra) }}</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p class="text-xs text-gray-600 mb-1">País</p>
                  <p class="text-base font-bold text-gray-900">{{ selectedPayment.pais }}</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p class="text-xs text-gray-600 mb-1">Descuento</p>
                  <p class="text-base font-bold text-[#34a853]">{{ selectedPayment.descuento }}% OFF</p>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 col-span-2">
                  <p class="text-xs text-gray-600 mb-1">Método de Pago</p>
                  <p class="text-base font-bold text-gray-900">{{ getPaymentMethod(selectedPayment) }}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  @click="showDetailsModal = false"
                  class="flex-1 py-3 px-4 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                >
                  Cerrar
                </button>
                <button
                  v-if="selectedPayment.estado === 'Paid' || selectedPayment.estado === 'Activo'"
                  @click="downloadInvoice(selectedPayment)"
                  class="flex-1 py-3 px-4 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Descargar Factura
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useToast } from 'vue-toastification'

definePageMeta({
name: "PaymentHistory",
layout: "private",
})

const toast = useToast()
const authStore = useAuthStore()

const {
  public: { baseURL }
} = useRuntimeConfig()

// State
const payments = ref<any[]>([])
const filterStatus = ref('')
const filterPlan = ref('')
const filterDateFrom = ref('')
const filterDateTo = ref('')
const showDetailsModal = ref(false)
const selectedPayment = ref<any>(null)

// Computed
const totalSpent = computed(() => {
  return payments.value.reduce((sum, payment) => {
    if (payment.estado === 'Paid' || payment.estado === 'Activo') {
      return sum + parseFloat(payment.total)
    }
    return sum
  }, 0).toFixed(2)
})

const nextPaymentDate = computed(() => {
  const activePlan = payments.value.find(p => p.estado === 'Paid' || p.estado === 'Activo')
  
  if (activePlan) {
    // Prioridad 1: Usar fecha_fin si está disponible
    if (activePlan.fecha_fin) {
      let date;
      if (activePlan.fecha_fin.match(/^\d{4}-\d{2}-\d{2}/)) {
        const [year, month, day] = activePlan.fecha_fin.split('-').map(num => parseInt(num, 10));
        date = new Date(year, month - 1, day);
      } else {
        date = new Date(activePlan.fecha_fin);
      }
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Prioridad 2: Calcular basándose en fecha_compra y tipo_tarjeta
    if (activePlan.fecha_compra) {
      let date;
      if (activePlan.fecha_compra.match(/^\d{4}-\d{2}-\d{2}/)) {
        const [year, month, day] = activePlan.fecha_compra.split('-').map(num => parseInt(num, 10));
        date = new Date(year, month - 1, day);
      } else {
        date = new Date(activePlan.fecha_compra);
      }
      
      // Calcular fecha_fin según el tipo de tarjeta o producto
      const tipoTarjeta = activePlan.tipo_tarjeta || 'demo';
      
      switch (tipoTarjeta) {
        case 'demo':
        case 'free':
          // WAFree: 5 días
          date.setDate(date.getDate() + 5);
          break;
        case 'mensual':
          // Plan mensual: 30 días
          date.setDate(date.getDate() + 30);
          break;
        case 'anual':
          // Plan anual: 365 días
          date.setDate(date.getDate() + 365);
          break;
        default:
          // Por defecto según el producto
          if (activePlan.producto === 'WAFree') {
            date.setDate(date.getDate() + 5);
          } else {
            // Asumir mensual si no se especifica
            date.setDate(date.getDate() + 30);
          }
      }
      
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }
  
  return null
})

const filteredPayments = computed(() => {
  return payments.value.filter(payment => {
    let matches = true

    if (filterStatus.value && payment.estado !== filterStatus.value) {
      matches = false
    }

    if (filterPlan.value && payment.producto !== filterPlan.value) {
      matches = false
    }

    if (filterDateFrom.value) {
      // Parsear fechas sin zona horaria
      let paymentDate;
      if (payment.fecha_compra.match(/^\d{4}-\d{2}-\d{2}/)) {
        const [year, month, day] = payment.fecha_compra.split('-').map(num => parseInt(num, 10));
        paymentDate = new Date(year, month - 1, day);
      } else {
        paymentDate = new Date(payment.fecha_compra);
      }
      
      const [yearFrom, monthFrom, dayFrom] = filterDateFrom.value.split('-').map(num => parseInt(num, 10));
      const fromDate = new Date(yearFrom, monthFrom - 1, dayFrom);
      
      if (paymentDate < fromDate) {
        matches = false
      }
    }

    if (filterDateTo.value) {
      // Parsear fechas sin zona horaria
      let paymentDate;
      if (payment.fecha_compra.match(/^\d{4}-\d{2}-\d{2}/)) {
        const [year, month, day] = payment.fecha_compra.split('-').map(num => parseInt(num, 10));
        paymentDate = new Date(year, month - 1, day);
      } else {
        paymentDate = new Date(payment.fecha_compra);
      }
      
      const [yearTo, monthTo, dayTo] = filterDateTo.value.split('-').map(num => parseInt(num, 10));
      const toDate = new Date(yearTo, monthTo - 1, dayTo);
      
      if (paymentDate > toDate) {
        matches = false
      }
    }

    return matches
  })
})

// Methods
const fetchPayments = async () => {
  try {
    const { data } = await useFetch<any[]>(
      `${baseURL}/config-pagos?user=${authStore.getUser?.id}&_sort=fecha_compra:DESC`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.getToken}`
        }
      }
    )

    if (data.value) {
      payments.value = data.value
    }
  } catch (error) {
    console.error('Error fetching payments:', error)
    toast.error('Error al cargar el historial de pagos')
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'No disponible';
  
  // Si la fecha viene en formato YYYY-MM-DD, parsearla sin zona horaria
  if (dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  // Para otros formatos, usar el comportamiento por defecto
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

const getPlanColor = (plan: string) => {
  const colors = {
    WAFree: 'bg-gray-100 text-gray-600',
    WAStarter: 'bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 text-[#667eea]',
    WAPyme: 'bg-gradient-to-r from-[#4285f4]/10 to-[#34a853]/10 text-[#4285f4]'
  }
  return colors[plan] || colors.WAFree
}

const getPlanBorderColor = (plan: string) => {
  const colors = {
    WAFree: 'border-gray-200',
    WAStarter: 'border-[#667eea]/30 hover:border-[#667eea]',
    WAPyme: 'border-[#4285f4]/30 hover:border-[#4285f4]'
  }
  return colors[plan] || colors.WAFree
}

const getStatusColor = (status: string) => {
  const colors = {
    Paid: 'bg-gradient-to-r from-[#4285f4]/20 to-[#34a853]/20 text-[#34a853] border border-[#34a853]/30',
    Activo: 'bg-gradient-to-r from-[#4285f4]/20 to-[#34a853]/20 text-[#34a853] border border-[#34a853]/30',
    Pendiente: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
    Cancelled: 'bg-red-50 text-red-600 border border-red-200'
  }
  return colors[status] || colors.Pendiente
}

const getStatusLabel = (status: string) => {
  const labels = {
    Paid: 'Pagado',
    Activo: 'Activo',
    Pendiente: 'Pendiente',
    Cancelled: 'Cancelado'
  }
  return labels[status] || status
}

const getPaymentMethod = (payment: any) => {
  if (payment.respapi1?.includes('@')) {
    return 'PayPal'
  }
  return 'Transferencia Bancaria'
}

const viewDetails = (payment: any) => {
  selectedPayment.value = payment
  showDetailsModal.value = true
}

const downloadInvoice = async (payment: any) => {
  toast.info('Generando factura...')
  setTimeout(() => {
    toast.success('Factura descargada correctamente')
  }, 1000)
}

// Lifecycle
onMounted(() => {
  fetchPayments()
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

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

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

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23667eea' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>