<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Notificaciones</h1>
          <img src="~/assets/icons/mail-icon.png" alt="mail-icon" />
        </div>
        <span>
          Seleccione el socio o socios a quien deseas enviarle una notificación
        </span>
      </div>

      <button class="button"
        :class="{ 'button--primary': usersChecked.length, 'button--disabled': !usersChecked.length }"
        @click="goToSendNotification" :disabled="!usersChecked.length">
        <img v-if="usersChecked.length" src="~/assets/images/notification-white.png" alt="mail-icon">
        <img v-else src="~/assets/images/notification-gray.png" alt="mail-icon">
        <span style="font-weight: 600; font-style: bold; font-size: 16px; line-height: 24px;">Enviar
          notificación</span>
      </button>
    </header>
   
    <div class="filters__area">
      <div class="filters__group">
        <label for="">
          Filtrar por:
          <select v-model="filterKey" name="filter">
            <option value="nombres">Nombre</option>
            <option value="apellidos">Apellido</option>
            <option value="correo">Correo</option>
            <option value="pais">País</option>
            <option value="provincia">Provincia</option>
            <option value="cedula">Cédula</option>
            <option value="valor_del_contrato">Valor de los Contratos</option>
            <option value="adendum_doc">Adenda</option>
            <option value="coordinador">Por Coordinadores</option>
            <!-- <option value="">Identificación del Coordinador</option> -->
            <option value="sexo">Sexo</option>
            <option value="ciudad">Ciudad</option>
            <option value="codigo_postal">Código Postal</option>
            <option value="categoria">Categoría</option>
            <option value="nacionalidad">Nacionalidad</option>
            <option value="fecha_nacimiento">Fecha de Nacimiento</option>
            <!-- <option value="">Parentesco</option> -->
            <option value="corregimiento">Corregimiento</option>
            <option value="discapacidad">Discapacidad</option>
            <option value="grupo_anticipo">Grupo Avanzado</option>
            <option value="profesion">Profesión</option>
            <option value="ocupacion">Ocupación</option>
            <option value="estado_civil">Estado Civil</option>
            <option value="tipo_sangre">Tipo de Sangre</option>
            <option value="tipo_de_servicio">Tipo de Servicio</option>
            <option value="tipo_de_proyecto">Tipo de Proyectos</option>
            <option value="departamento">Departamento</option>
            <option value="valor_del_contrato">Valor del Contrato</option>
            <option value="cheques_doc">Cheques</option>
            <option value="declaracion_jurada">Declaraciones Juradas</option>
            <option value="acta_compromiso_pago_doc">Acta de Compromisos</option>
            <option value="comprimiso_letra_cambio_doc">Letra de Cambio</option>
            <option value="covenio_compensacion_doc">Acuerdo de Compensación</option>
            <!-- <option value="">Número de Contrato Bancos</option> -->
            <option value="tipo_cuenta">Tipo de Cuentas 1</option>
            <option value="tipo_cuenta2">Tipo de Cuentas 2</option>
            <option value="tipo_cuenta3">Tipo de Cuentas 3</option>
            <!-- <option value="">Cooperativa</option> -->
            <option value="numero_cuenta">Número de Cuentas</option>
            <option value="numero_cuenta2">Número de Cuentas 2</option>
            <option value="numero_cuenta3">Número de Cuentas 3</option>
            <option value="parentezco_beneficiario1">Por Beneficiarios 1</option>
            <option value="parentezco_beneficiario2">Por Beneficiarios 2</option>
            <option value="parentezco_beneficiario3">Por Beneficiarios 3</option>
            <option value="telefono_convencional">Teléfonos</option>
            <option value="cedula">Celular</option>
            <option value="jubilacion">Jubilación</option>
            <!-- <option value="">Empresa</option>
            <option value="">Estado</option>
            <option value="">Depósitos Realizados</option> -->
            <option value="tipo_de_proyecto">Tipo de Proyectos</option>
            <option value="fecha_de_ingreso_a_la_organizacion">
              Fecha de Ingreso a la Organización
            </option>
          </select>
        </label>

        <label for="">
          Valor del filtro:
          <input v-model="filterValue" type="text" />
        </label>
        <button class="button button--secondary" @click="addFilter">
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
          Agregar filtro
        </button>

        <div
          v-for="(value, key) in filters"
          :key="key"
          style="margin-bottom: 0.3rem"
          class="chip"
        >
          <!-- Content -->
          <div class="chip__content">{{ key }}:{{ value }}</div>

          <!-- The close button -->
          <button class="chip__button" @click="removeFilter(key)">
            <div class="chip__button-line chip__button-line--first"></div>
            <div class="chip__button-line chip__button-line--second"></div>
          </button>
        </div>
      </div>

      <!-- added code by Saeed -->
      <p v-show="datos?.length > 0">
        Listado de socios registros({{ limit }} de {{ datos?.length }})
      </p>
      <!-- added code by Saeed -->
    </div>
    <div class="home__content">
      <div class="table__container">
        <table>
          <thead class="table__header">
            <tr>
              <th class="width--sm"></th>
              <th class="width--sm">Foto</th>
              <th class="width--md">Nombre</th>
              <th class="width--md">Email</th>
              <th class="width--md">Contrato 1</th>
              <th class="width--md">Depositos</th>
              <th class="width--md">Saldos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="socio in datos" :key="socio?.id" class="margin-botton">
              <td>
                <label class="checkbox-wrapper">
                  <input type="checkbox" @change="checkboxHandler($event, socio.id)" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td class="highlight">
                <img v-if="socio?.foto" :src="getProfilePicture(socio?.foto?.url)" :alt="`${socio?.nombres}-picture`"
                  class="socio__photo" />
                <img v-else src="~/assets/images/profile.png" alt="" class="socio__photo" />
              </td>
              <td class="max-width--medium" :title="socio?.nombres">
                {{ socio?.nombres }} {{ socio?.apellidos }}
              </td>
              <td :title="socio?.correo">{{ socio?.correo }}</td>
              <td>{{ socio?.valor_del_contrato? formatNumber(Number(socio?.valor_del_contrato)) : "0.00"
              }}</td>
              <td>{{ formatNumber(0) }}</td>
              <td>{{ formatNumber(0) }}</td>
            </tr>

          </tbody>
        </table>
      </div>
      <bottom-pagination :page="page" :total-data="totalData ?? 0" :limit="Number(limit)"
        @change-limit="(e) => changeLimit(e)" @go-to-page="e => goToPage(e)" @next-page="nextPage()"
        @prev-page="prevPage()" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { stringify } from 'qs';
import { useToast } from 'vue-toastification';
import { DatosPersonales, User } from '~~/common/interfaces/user.interface';
import { Dictionary } from '~~/common/types/generic.types';
import { useAuthStore } from '~~/store/auth';
import bottomPagination from '~~/components/common/pagination/bottom-pagination.vue';
definePageMeta({
  name: 'NotificacionesPage',
  layout: 'private',
})
const { public: { baseURL } } = useRuntimeConfig()
const toast = useToast()
const BASE_URL = baseURL
const authStore = useAuthStore()
const filters = ref<Dictionary<string>>({})
const filterKey = ref('')
const filterValue = ref('')

const addFilter = () => {
  filters.value[filterKey.value] = filterValue.value
  filterKey.value = "";
  filterValue.value = "";
  buildQuery()
  fetchData()
}

const removeFilter = (key: string) => {
  delete filters.value[key];
  filterKey.value = "";
  filterValue.value = "";
  limit.value = 10;
  buildQuery()
  fetchData()
}

const numberFields: { [key: string]: boolean } = {
  cedula: true,
};

const query = ref("");
const buildQuery = () => {
  const data: { [key: string]: string } = {};
  data._start = start.value.toString();
  data._limit = limit.value.toString();
  let i = 0;
  for (const key in filters.value) {
    if (numberFields[key]) {
      data[`_where[${i}][${key}]`] = filters.value[key];
      i++;
      continue;
    }
    data[`_where[${i}][${key}_contains]`] = filters.value[key];
    i++;
  }
  query.value = stringify(data);
};

const datos = ref<DatosPersonales[] | null>(null)
const totalData = ref<number | null>(null);
const limit = ref<number>(10);
const start = ref<number>(0);
const page = ref<number>(1);

const changeLimit = (newLimit: number) => {
  limit.value = Number(newLimit)
  start.value = 0
  page.value = 1;
  fetchData();
}

watch([start, limit], () => {
  fetchData();
});

const prevPage = () => {
  if (start.value < 0) start.value = 0;
  if (page.value <= 1) return;
  start.value = Number(start.value) - Number(limit.value);
  page.value = Number(page.value) - 1;
  fetchData()
}

const nextPage = () => {
  start.value = Number(limit.value) + Number(start.value)
  page.value = Number(page.value) + 1;
  fetchData()
}

const goToPage = (pageNumber: number) => {
  start.value = (Number(pageNumber) - 1) * Number(limit.value)
  page.value = Number(pageNumber);
  fetchData()
}

const fetchData = async () => {
  buildQuery()
  const { data: dataDatos } = useFetch<DatosPersonales[]>(`${BASE_URL}/datos-personales?${query.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.token
    },
  }
  );
  const { data: totalDatos } = useFetch<number>(`${BASE_URL}/datos-personales/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.token
    },
  }
  );


  
  watch(dataDatos, (newData) => {
    datos.value = newData;
    if (datos.value?.length < limit.value) {
      // added by Saeed
      limit.value = datos.value?.length; // added by Saeed
    } // added by Saeed
    console.log(datos);
  });

  watch(totalDatos, (newData) => {
    totalData.value = newData;
    if (totalData.value?.length < limit.value) {
      // added by Saeed
      limit.value = totalData.value?.length; // added by Saeed
    } // added by Saeed
    console.log(totalData);
  });
};
  
const getProfilePicture = (url: string) => `${BASE_URL}${url}`

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 10, minimumFractionDigits: 2 }).format(number)
}

const usersChecked = ref<string[]>([])

const checkboxHandler = (e: Event, userId: string) => {
  if (e.currentTarget?.checked) {
    usersChecked.value.push(userId);
    console.log(usersChecked.value);
  } else {
    usersChecked.value = usersChecked.value.filter((id) => id !== userId);
  }
};

onMounted(async () => {
  await fetchData()
})

const router = useRouter();

const goToSendNotification = () => {
  router.push({ path: '/notificaciones/enviar', query: { users: usersChecked.value.join(',') } })
}
</script>
<style scoped>
main {
  padding: 0 1rem 1rem 1rem;
}

header {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--gray-200);
}

.header__description>h1 {
  font-size: var(--heading-2);
}

.header__description>img {
  width: 56px;
}

.header__text {
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
  display: flex;
}

.header__description {
  display: flex;
  gap: 1rem;
  align-items: center;
}


.quote {
  max-width: 550px;
}

.filters__group {
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label>input {
  height: 40px;
  padding: 0 0.5rem;
}

.button {
  background: #E5E7EB;
  border-radius: 6px;
}

.button--disabled {
  font-style: bold;

}

.button--primary {
  background: #008583;
  border-radius: 6px;

}

.button--primary img {
  filter: contrast(160%);
}

.button__group>button {
  padding: 0.25rem;
  display: grid;
  place-items: center;
  background-color: transparent;
}

.button__group>button>svg {
  width: 1.5rem;
}

.button__group>button>svg>path {
  stroke: var(--gray-700);
}

.button__group>button>svg>path {
  transition: color 250ms ease-in-out;
}

.button__group>button:hover>svg>path {
  stroke: var(--green-500);
}

.button__group {
  display: flex;
  gap: 0.25rem;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  text-align: start;
  vertical-align: middle;
  table-layout: fixed;
  overflow-x: hidden;
  word-break: break-word;
}

.width--sm {
  width: 10%;
}

.width--md {
  width: 12%;
}

.width--lg {
  width: 30%;
}

td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

th,
td {
  padding: 0.5rem;
}

.table__header {
  text-align: left;
  background-color: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
}

.socio__photo {
  width: 48px;
  height: auto;
  border-radius: 50%;
}

.checkbox-wrapper {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background: #D9D9D9;
  border-radius: 6px;
}

.checkbox-wrapper:hover input~.checkmark {
  background: #0E7A78;
}

.checkbox-wrapper input:checked~.checkmark {
  background: #0E7A78;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-wrapper input:checked~.checkmark:after {
  display: block;
}

.checkbox-wrapper .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

@media (max-width: 1260px) {
  .button>img {
    width: 1.5rem;
  }
}

@media (max-width: 920px) {
  .header__description>img {
    width: 40px;
    height: auto;
  }

  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  td {
    /* Behave  like a "row" */
    white-space: normal;
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 35%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 50%;
    left: 1rem;
    width: 25%;
    transform: translateY(-50%);
    padding-right: 10px;
    white-space: nowrap;
    font-weight: 700;
  }

  /*
	Label the data
	*/
  td:nth-of-type(1):before {
    content: "Foto";
  }

  td:nth-of-type(2):before {
    content: "Nombre";
  }

  td:nth-of-type(3):before {
    content: "Email";
  }

  td:nth-of-type(4):before {
    content: "Contrato 1";
  }

  td:nth-of-type(5):before {
    content: "Depositos";
  }

  td:nth-of-type(6):before {
    content: "Saldos";
  }

  .highlight {
    background-color: var(--gray-200);
  }

  .margin-botton {
    margin-bottom: 1rem;
  }
}

@media (max-width: 430px) {
  .button__group>button>svg {
    width: 1rem;
  }
}

@media (min-width: 1500px) {
  .width--md {
    width: 14%;
  }
}

/* CHIP CSS */
.chip {
  /* Center the content */
  align-items: center;
  display: inline-flex;
  justify-content: center;

  /* Background color */
  background-color: #d1d5db;

  /* Rounded border */
  border-radius: 9999px;

  /* Spacing */
  padding: 0.25rem 0.5rem;
}

.chip__content {
  margin-right: 0.25rem;
}

.chip__button {
  /* Reset */
  background-color: transparent;
  border-color: transparent;

  /* Cursor */
  cursor: pointer;

  /* Size */
  height: 1rem;
  width: 1rem;

  /* Used to position the inner */
  position: relative;
}

.chip__button-line {
  /* Background color */
  background-color: #9ca3af;

  /* Position */
  position: absolute;

  /* Size */
  height: 1px;
  width: 100%;
}

.chip__button-line--first {
  /* Position */
  left: 0px;
  top: 50%;
  transform: translate(0%, -50%) rotate(45deg);

  /* Size */
  height: 1px;
  width: 100%;
}

.chip__button-line--second {
  /* Position */
  left: 50%;
  top: 0px;
  transform: translate(-50%, 0%) rotate(45deg);

  /* Size */
  height: 100%;
  width: 1px;
}
</style>
