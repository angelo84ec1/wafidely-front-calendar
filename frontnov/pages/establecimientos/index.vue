<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Búsqueda de Socios </h1>
        </div>

      </div>
    </header>
   
    
    <div class="home__content">
      <table v-if="establecimientos">
        <tr class="t_header">
          <th v-for="tableHeader in table_headers" :key="tableHeader.id">{{ tableHeader.name }}</th>
          <th>Action</th>
          <th>Search User</th>
        </tr>
        <tr v-for="(data,index) in filteredData" :key="index">
          <td v-for="tableHeader in table_headers" :key="tableHeader.id"> 
            {{tableHeader.key == "user" ?  data[tableHeader.key] && data[tableHeader.key].username :  data[tableHeader.key] }}
          </td>
          <td>
            <div class="t_actions">
              <nuxt-link :to="`/establecimientos/${data.id}`">
                <svg data-v-45005775="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path data-v-45005775="" d="M16.862 4.48725L19.5 7.12525M16.862 4.48725L18.549 2.79925C18.9007 2.44757 19.3777 2.25 19.875 2.25C20.3723 2.25 20.8493 2.44757 21.201 2.79925C21.5527 3.15092 21.7502 3.6279 21.7502 4.12525C21.7502 4.62259 21.5527 5.09957 21.201 5.45125L6.832 19.8202C6.30332 20.3486 5.65137 20.737 4.935 20.9502L2.25 21.7502L3.05 19.0652C3.26328 18.3489 3.65163 17.6969 4.18 17.1682L16.863 4.48725H16.862Z" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </nuxt-link>
              <button data-v-45005775="" title="Borrar" @click="remove(data.id, index)">
                <svg data-v-45005775="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path data-v-45005775="" d="M14.74 8.99954L14.394 17.9995M9.606 17.9995L9.26 8.99954M19.228 5.78954C19.57 5.84154 19.91 5.89654 20.25 5.95554M19.228 5.79054L18.16 19.6725C18.1164 20.2378 17.8611 20.7657 17.445 21.1508C17.029 21.5359 16.4829 21.7497 15.916 21.7495H8.084C7.5171 21.7497 6.97102 21.5359 6.55498 21.1508C6.13894 20.7657 5.88359 20.2378 5.84 19.6725L4.772 5.78954M19.228 5.78954C18.0739 5.61506 16.9138 5.48264 15.75 5.39254M3.75 5.95454C4.09 5.89554 4.43 5.84054 4.772 5.78954M4.772 5.78954C5.92613 5.61506 7.08623 5.48264 8.25 5.39254M15.75 5.39254V4.47654C15.75 3.29654 14.84 2.31254 13.66 2.27554C12.5536 2.24018 11.4464 2.24018 10.34 2.27554C9.16 2.31254 8.25 3.29754 8.25 4.47654V5.39254M15.75 5.39254C13.2537 5.19962 10.7463 5.19962 8.25 5.39254" stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
          </td>
          <td>
            <div style="display: flex; justify-content: space-around">
              <input v-model="email" type="email" placeholder="Search & Add by Email" />
              <button class="button button--secondary" @click="addUsertoEst(email, data.id)">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.5V19.5M19.5 12H4.5"
                    stroke="#374151"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div> 
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>
<script setup lang="ts">

import { POSITION, useToast } from "vue-toastification";
import type { EstableCimientos, User, DatosPersonales, ConfiguracionPago } from "~~/common/interfaces/user.interface";
import { useAuthStore } from "~~/store/auth";
import type { Dictionary } from "~~/common/types/generic.types";
import { ref, onMounted, onBeforeMount } from 'vue'
definePageMeta({
  name: "EstablecimientosPage",
  layout: "private",
  middleware: ["auth"],
});


const {
  public: { baseURL },
} = useRuntimeConfig();
const toast = useToast();

const BASE_URL = baseURL;
const authStore = useAuthStore();
const filters = ref<Dictionary<string>>({});
const filterKey = ref("");
const filterValue = ref("");
const filteredData = ref([]);
const datos = ref<EstableCimientos[] | null>(null);
const totalData = ref<number | null>(null);
const limit = ref<number>(10);
const start = ref<number>(0);
const page = ref<number>(1);
const printData = ref<boolean>(false);
const usersChecked = ref<string[]>([]);
const email = ref<string>("");

const establecimientosCount = ref<number>(0);
const establecimientos = ref<EstableCimientos[]>([]);

const addUsertoEst = async (mail: string, est: string) => {
  const { data: conf } = await useFetch<ConfiguracionPago[]>(
    `${BASE_URL}/config-pagos?user.email=${mail}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authStore.token,
      },
    }
  );
  if (conf.value?.length === 0) {
    toast.error("El usuario no tiene una configuracion de pago");
    email.value = "";
    return;
  }
  conf.value?.map(async (item) => {
    if (item.establecimiento) {
      toast.error("El usuario ya tiene un establecimiento");
      email.value = "";
      return;
    }
    const { data: establecimiento } = await useFetch<EstableCimientos>(
      `${BASE_URL}/config-pagos/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authStore.token,
        },
        body: JSON.stringify({
          establecimiento: est,
        }),
      }
    );
    if (establecimiento) {
      toast.success("Usuario agregado correctamente");
      fetchData();
    }
  });
  email.value = "";
};

const fetchData = async () => {
  // if (!authStore.user?.datos_personales?.cedula){
  //   const {data:datosPersonales} = await useFetch<DatosPersonales>(`${BASE_URL}/datos-personales/${authStore.user?.datos_personales}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + authStore.token,
  //     },
  //   });
  
  //   authStore.user.datos_personales = datosPersonales.value;
  // }


  const { data: dataDatos } = await useFetch<EstableCimientos[]>(
    `${BASE_URL}/establecimientos?correo=${authStore.user?.email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authStore.token,
      },

    }
  );

  authStore.user.establecimientos = dataDatos.value;
  if (dataDatos){
    establecimientos.value = dataDatos.value;
  }

  console.log(establecimientos.value);

  const { data: totalDatos } = await useFetch<number>(
    `${BASE_URL}/establecimientos/count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authStore.token,
      },
    }
  );
  establecimientosCount.value = totalDatos.value;
  applyFilter();
};

const applyFilter = () => {
  filteredData.value = []

  if (filterKey.value === 'date') {
    filteredData.value = establecimientos.value.filter((item) => {
      const date = new Date(item.fechainicio);
      const filterDate = new Date(filterValue.value);
      return date.getTime() === filterDate.getTime();
    });  
    
  } else {
    filteredData.value = establecimientos.value
  }
};

const changeLimit = (newLimit: number) => {
  limit.value = Number(newLimit);
  start.value = 0;
  page.value = 1;
  fetchData();
};

watch([start, limit], () => {
  fetchData();
});

const prevPage = () => {
  if (start.value < 0) start.value = 0;
  if (page.value <= 1) return;
  start.value = Number(start.value) - Number(limit.value);
  page.value = Number(page.value) - 1;
  fetchData();
};

const nextPage = () => {
  start.value = Number(limit.value) + Number(start.value);
  page.value = Number(page.value) + 1;
  fetchData();
};

const goToPage = (pageNumber: number) => {
  start.value = (Number(pageNumber) - 1) * Number(limit.value);
  page.value = Number(pageNumber);
  fetchData();
};

// watch(establecimientos.value, (newData) => {
//   datos.value = newData;
//   if (datos.value?.length < limit.value) {
//     // added by Saeed
//     limit.value = datos.value?.length; // added by Saeed
//   } // added by Saeed
//   console.log(datos);
// });

watch(establecimientosCount.value, (newData) => {
  totalData.value = newData;
  if (totalData.value?.length < limit.value) {
    // added by Saeed
    limit.value = totalData.value?.length; // added by Saeed
  } // added by Saeed
  console.log(totalData);
});

const router = useRouter();
const route = useRoute();
const table_headers = ref([
  {
    id: 1,
    name: "Nombre",
    key: "nombre",
  },
 
  
]);



fetchData();

//delete a config_pagos
const remove = async (id: any, index: any) => {
  const { data } = await useFetch<any[]>(`${baseURL}/establecimientos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.getToken}`,
    },
  });
  if (data) establecimientos.value.splice(index, 1);
};

onMounted(async () => {
  // try {
  //   const response = await axios.get(`${baseURL}/users/630e044f4cf0715164fb96b0/pagos`);
  //   console.log(response.data)
  // } catch (error) {
  //   console.error('Error fetching pagos:', error);
  // }
});

</script>
<style scoped>
header {
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--gray-200);
}


.header__description > h1 {
  font-size: var(--heading-2);
}

.header__description > img {
  width: 56px;
}


main {
  padding: 0 1rem 1rem 1rem;
}

.header__text>h1 {
  font-size: var(--heading-2);
}

.header__text {
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__actions {
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
}

.header__title {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.header__title > img {
  width: 56px;
  height: auto;
}


.float {
display: flex;
align-items: center;
background-color: var(--green-400);
color:#ffffff;
}
.float span {
  display: flex;
  align-items: center;
  justify-content:center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table tr th {
  text-align: left;
}

tr th,
tr td {
  padding-left: .5rem;
}

tr td {
  padding: .5rem 0.5rem;
}

.t_header {
  background-color: #e7e7e7;
}

.t_actions button {
  background-color: #ffffff;
  padding: 0 0.4rem
}

.filters__area {
  display: flex;
  justify-content: space-between;
}

.filters__group {
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}
</style>
