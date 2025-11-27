<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Planes Contratados</h1>
            <p class="text-sm text-gray-600 mt-1">Gestiona y visualiza todos los planes de tus clientes</p>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-3">
            <nuxt-link 
              :to="`/pagos/create`"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Nuevo Plan
            </nuxt-link>
            
            <button 
              @click.prevent="printPage()"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Filters Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filtros
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Primary Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filtrar por</label>
            <select 
              v-model="filterKey" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Seleccionar filtro</option>
              <option value="date">Fecha de Compra</option>
              <option v-if="!(isEstablecimiento || authStore.user?.role.name === 'establecimiento')" value="establishment">Establecimiento</option>
              <option value="month">Mes</option>
              <option value="year">Año</option>
            </select>
          </div>

          <!-- Primary Filter Value -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor del filtro</label>
            <input 
              v-if="filterKey !== 'date'" 
              v-model="filterValue" 
              type="text" 
              placeholder="Ingresa el valor"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input 
              v-if="filterKey === 'date'" 
              v-model="filterValue" 
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <!-- Secondary Filter (for establishment) -->
          <div v-if="filterKey === 'establishment'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Filtro adicional</label>
            <select 
              v-model="filterKey2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Seleccionar</option>
              <option value="date">Fecha de Compra</option>
              <option value="month">Mes</option>
              <option value="year">Año</option>
            </select>
          </div>

          <!-- Secondary Filter Value -->
          <div v-if="filterKey2 !== '' && filterKey === 'establishment'">
            <label class="block text-sm font-medium text-gray-700 mb-2">Valor adicional</label>
            <input 
              v-if="filterKey2 !== 'date'" 
              v-model="filterValueDate" 
              type="text"
              placeholder="Valor del filtro"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input 
              v-if="filterKey2 === 'date'" 
              v-model="filterValueDate" 
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Apply Filter Button -->
        <div class="mt-6">
          <button 
            @click="applyFilter"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
            Aplicar Filtros
          </button>
        </div>
      </div>

      <!-- Active Filters & Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Active Filters -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros Activos</h3>
          <div class="space-y-2">
            <div v-if="filterKey == 'date'" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <span class="font-medium">Fecha:</span>&nbsp;{{ filterValue }}
            </div>
            <div v-if="filterKey == 'establishment'" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              <span class="font-medium">Establecimiento:</span>&nbsp;{{ filterValue }}
            </div>
            <div v-if="filterKey == 'month'" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              <span class="font-medium">Mes:</span>&nbsp;{{ filterValue }}
            </div>
            <div v-if="filterKey == 'year'" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
              <span class="font-medium">Año:</span>&nbsp;{{ filterValue }}
            </div>
            <div v-if="!filterKey" class="text-sm text-gray-500">
              No hay filtros activos
            </div>
          </div>
        </div>

        <!-- Summary Stats -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">${{ total.toFixed(2) }}</div>
              <div class="text-sm text-gray-600">Total Recaudado</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900">{{ filteredData.length }}</div>
              <div class="text-sm text-gray-600">Total Planes</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Plans Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-silver-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Plan WAPyme</h3>
              <p class="text-3xl font-bold text-gray-900">{{ planSilver }}</p>
              <p class="text-sm text-gray-600">Planes contratados</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Plan WAMedium</h3>
              <p class="text-3xl font-bold text-gray-900">{{ planGold }}</p>
              <p class="text-sm text-gray-600">Planes contratados</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Plan WALarge</h3>
              <p class="text-3xl font-bold text-gray-900">{{ planBlack }}</p>
              <p class="text-sm text-gray-600">Planes contratados</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Lista de Planes</h3>
          <p class="text-sm text-gray-600 mt-1">{{ filteredData.length }} planes encontrados</p>
        </div>

        <!-- Table for larger screens -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th v-for="tableHeader in table_headers" :key="tableHeader.id" 
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ tableHeader.name }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(data, index) in filteredData" :key="data.id" class="hover:bg-gray-50 transition-colors">
                <td v-for="tableHeader in table_headers" :key="tableHeader.id" class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ tableHeader.key == "user" ? data[tableHeader.key] && data[tableHeader.key].username : data[tableHeader.key] }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div v-if="!(isEstablecimiento || authStore.user?.role.name === 'establecimiento')" class="flex items-center space-x-2">
                    <nuxt-link 
                      :to="`/pagos/${data.id}`"
                      class="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                      title="Editar"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </nuxt-link>
                    <button 
                      @click="remove(data.id, index)"
                      class="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Cards for mobile screens -->
        <div class="md:hidden space-y-4 p-4">
          <div v-for="(data, index) in filteredData" :key="data.id" 
               class="bg-gray-50 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-gray-900">{{ data.producto }}</h4>
                <p class="text-sm text-gray-600">{{ data.fecha_compra }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ data.total }}</p>
                <p class="text-sm text-gray-600">-${{ data.descuento }}</p>
              </div>
            </div>
            
            <div class="text-sm text-gray-600">
              <p><span class="font-medium">Usuario:</span> {{ data.user?.username || 'N/A' }}</p>
            </div>

            <div v-if="!(isEstablecimiento || authStore.user?.role.name === 'establecimiento')" 
                 class="flex justify-end space-x-2 pt-2 border-t border-gray-200">
              <nuxt-link 
                :to="`/pagos/${data.id}`"
                class="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </nuxt-link>
              <button 
                @click="remove(data.id, index)"
                class="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredData.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No hay planes</h3>
          <p class="mt-1 text-sm text-gray-500">No se encontraron planes con los filtros aplicados.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="config_pagos && filteredData.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <bottom-pagination 
          :page="page" 
          :total-data="totalData ?? 0" 
          :limit="Number(limit)"
          @change-limit="(e) => changeLimit(e)" 
          @go-to-page="(e) => goToPage(e)" 
          @next-page="nextPage()"
          @prev-page="prevPage()" 
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { POSITION, useToast } from "vue-toastification";
import { useAuthStore } from "~~/store/auth";
import bottomPagination from "~~/components/common/pagination/bottom-pagination.vue";
import { ref, onMounted, watch } from 'vue'
import type { ConfiguracionPago } from "~/common/interfaces/user.interface";

definePageMeta({
  name: "PagosPage",
  layout: "private",
  middleware: ["auth"],
});

const toast = useToast();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Reactive data
const config_pagos = ref<any>(null);
const filteredData = ref([]);
const filterKey = ref("");
const filterKey2 = ref("");
const filterValue = ref("");
const filterValueDate = ref("");
const planBlack = ref(0);
const planSilver = ref(0);
const planGold = ref(0);
const total = ref(0);

// Pagination
const limit = ref<number>(10);
const start = ref<number>(0);
const page = ref<number>(1);
const query = ref<string>('');

// Table configuration
const table_headers = ref([
  { id: 1, name: "Fecha de Compra", key: "fecha_compra" },
  { id: 2, name: "Producto", key: "producto" },
  { id: 5, name: "Cédula", key: "user" },
  { id: 3, name: "Total", key: "total" },
  { id: 4, name: "Descuento", key: "descuento" }
]);

const {
  public: { baseURL },
} = useRuntimeConfig();

// Check user roles
const isEstablecimiento = computed(() => authStore.user?.role.name === 'establecimiento');

// Fetch data function
const fetchData = async () => {
  let quer = ""
  if (authStore.user?.role.name == "establecimiento") {
    let establecimientos = authStore.getUser?.establecimientos
    establecimientos?.forEach((element: any) => {
      quer += `establecimiento=${element._id}&`
    });
  }
  if (authStore.user?.role.name == "socio") {
    quer += `user=${authStore.getUser?.id}`
  }

  const { data } = await useFetch<any[]>(`${baseURL}/config-pagos?${quer}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.getToken}`,
    },
  })
  
  if (data) {
    config_pagos.value = data.value
    applyFilter()
  }
}

// Get total data count
const { data: totalData } = useAsyncData<number>('totalData', () => $fetch(`${baseURL}/config-pagos/count`, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authStore.token}`
  }
}))

// Remove function
const remove = async (id: string, index: number) => {
  const { data } = await useFetch<any[]>(`${baseURL}/config-pagos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.getToken}`,
    },
  });
  if (data) {
    config_pagos.value.splice(index, 1);
    applyFilter(); // Reapply filters after deletion
    toast.success("Plan eliminado correctamente");
  }
}

// Apply filters function
const applyFilter = () => {
  filteredData.value = [];
  planSilver.value = 0
  planBlack.value = 0
  planGold.value = 0
  total.value = 0

  if (!config_pagos.value) return;

  if (filterKey.value === 'date') {
    filteredData.value = config_pagos.value.filter((f_d) => {
      return f_d.fecha_compra.includes(filterValue.value)
    })
  } else if (filterKey.value === 'establishment') {
    filteredData.value = config_pagos.value.filter((f_d: any) => {
      return f_d.establecimiento?.nombre == filterValue.value
    })
    
    if (filterKey2.value === 'date') {
      filteredData.value = filteredData.value.filter((f_d) => {
        return f_d.fecha_compra.includes(filterValueDate.value);
      });
    } else if (filterKey2.value === 'month') {
      filteredData.value = filteredData.value.filter((item) => {
        const date = new Date(item.fecha_compra);
        return date.getMonth() + 1 === Number(filterValueDate.value);
      });
    } else if (filterKey2.value === 'year') {
      filteredData.value = filteredData.value.filter((item) => {
        const date = new Date(item.fecha_compra);
        return date.getFullYear() === Number(filterValueDate.value);
      });
    }
  } else if (filterKey.value === 'month') {
    filteredData.value = config_pagos.value.filter((item) => {
      const date = new Date(item.fecha_compra);
      return date.getMonth() + 1 === Number(filterValue.value);
    });
  } else if (filterKey.value === 'year') {
    filteredData.value = config_pagos.value.filter((item) => {
      const date = new Date(item.fecha_compra);
      return date.getFullYear() === Number(filterValue.value);
    });
  } else {
    filteredData.value = config_pagos.value
  }

  // Calculate stats
  filteredData.value.forEach(f_d => {
    if (f_d.producto == "Plan Gold") {
      planGold.value += 1
    } else if (f_d.producto == "Plan Black") {
      planBlack.value += 1
    } else if (f_d.producto == "Plan Silver") {
      planSilver.value += 1
    }
    total.value += f_d.total
  })
};

// Pagination functions
const changeLimit = (newLimit: number) => {
  limit.value = Number(newLimit)
  start.value = 0
  page.value = 1;
  fetchData()
}

const goToPage = (newPage: number) => {
  start.value = (newPage - 1) * limit.value
  page.value = newPage;
  fetchData()
}

const nextPage = () => {
  start.value = start.value + limit.value
  page.value = page.value + 1;
  fetchData()
}

const prevPage = () => {
  start.value = start.value - limit.value
  page.value = page.value - 1;
  fetchData()
}

// Print function
const printPage = () => {
  if (typeof window === 'undefined') return;
  window.print()
}

// Watchers
watch([start, limit], () => {
  fetchData()
})

// Initialize
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* Print styles */
@media print {
  .no-print {
    display: none;
  }
}

/* Custom responsive table styles */
@media (max-width: 768px) {
  .table-responsive {
    display: none;
  }
}

/* Transition animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>