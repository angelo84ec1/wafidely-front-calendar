<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Envío Información Coris</h1>
          
        </div>
        <div class="header__actions">
          <button class="button button--secondary" @click.prevent="printPage()">
            <img src="~/assets/images/imprimir-green.png" alt="" srcset="" />
            Imprimir
          </button>
          <button class="button button--secondary" @click="sendMail()">
            <img src="~/assets/images/email-green.png" alt="" />Enviar estado por email
          </button>
        </div>
      </div>
    </header>
    <div class="home__content">
      <div class="table__container">
        <table>
          <thead class="table__header">
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th class="width--lg">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="margin-botton">
              <td class="highlight">{{ user?.datos_personales?.nombres }} {{ user?.datos_personales?.apellidos }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.cargo }}</td>
              <td><span class="usuario--activo"> {{ user.estado }} </span></td>
              <td class="button__group">
                <button @click="goToEdit(user?.id)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.862 4.48725L19.5 7.12525M16.862 4.48725L18.549 2.79925C18.9007 2.44757 19.3777 2.25 19.875 2.25C20.3723 2.25 20.8493 2.44757 21.201 2.79925C21.5527 3.15092 21.7502 3.6279 21.7502 4.12525C21.7502 4.62259 21.5527 5.09957 21.201 5.45125L6.832 19.8202C6.30332 20.3486 5.65137 20.737 4.935 20.9502L2.25 21.7502L3.05 19.0652C3.26328 18.3489 3.65163 17.6969 4.18 17.1682L16.863 4.48725H16.862Z"
                      stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.5 10.5V6.75C16.5 5.55653 16.0259 4.41193 15.182 3.56802C14.3381 2.72411 13.1935 2.25 12 2.25C10.8065 2.25 9.66193 2.72411 8.81802 3.56802C7.97411 4.41193 7.5 5.55653 7.5 6.75V10.5M6.75 21.75H17.25C17.8467 21.75 18.419 21.5129 18.841 21.091C19.2629 20.669 19.5 20.0967 19.5 19.5V12.75C19.5 12.1533 19.2629 11.581 18.841 11.159C18.419 10.7371 17.8467 10.5 17.25 10.5H6.75C6.15326 10.5 5.58097 10.7371 5.15901 11.159C4.73705 11.581 4.5 12.1533 4.5 12.75V19.5C4.5 20.0967 4.73705 20.669 5.15901 21.091C5.58097 21.5129 6.15326 21.75 6.75 21.75Z"
                      stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 18.72C19.2668 18.8235 20.5412 18.6603 21.741 18.241C21.7868 17.6764 21.6718 17.1104 21.4093 16.6084C21.1468 16.1064 20.7476 15.689 20.2578 15.4044C19.768 15.1199 19.2076 14.9798 18.6415 15.0004C18.0755 15.0211 17.5268 15.2015 17.059 15.521M17.999 18.719L18 18.75C18 18.975 17.988 19.197 17.963 19.416C16.1483 20.4571 14.0921 21.0033 12 21C9.82998 21 7.79299 20.424 6.03699 19.416C6.01128 19.1846 5.99892 18.9519 5.99999 18.719M18 18.719C17.9961 17.5856 17.6697 16.4768 17.059 15.522M17.059 15.522C16.5169 14.6718 15.7691 13.972 14.8848 13.4875C14.0005 13.003 13.0083 12.7493 12 12.75C10.9918 12.7495 9.99981 13.0032 9.11571 13.4877C8.23162 13.9723 7.48399 14.6719 6.94199 15.522M6.94199 15.522C6.4742 15.2028 5.92563 15.0226 5.3597 15.0021C4.79378 14.9817 4.23362 15.1218 3.74399 15.4063C3.25435 15.6908 2.85525 16.1081 2.59281 16.6099C2.33038 17.1117 2.21534 17.6776 2.26099 18.242C3.45989 18.6637 4.73461 18.8263 6.00099 18.719M6.94099 15.522C6.33061 16.4769 6.00458 17.5857 6.00099 18.719M15 6.75C15 7.54565 14.6839 8.30871 14.1213 8.87132C13.5587 9.43393 12.7956 9.75 12 9.75C11.2043 9.75 10.4413 9.43393 9.87866 8.87132C9.31606 8.30871 8.99999 7.54565 8.99999 6.75C8.99999 5.95435 9.31606 5.19129 9.87866 4.62868C10.4413 4.06607 11.2043 3.75 12 3.75C12.7956 3.75 13.5587 4.06607 14.1213 4.62868C14.6839 5.19129 15 5.95435 15 6.75V6.75ZM21 9.75C21 10.0455 20.9418 10.3381 20.8287 10.611C20.7156 10.884 20.5499 11.1321 20.341 11.341C20.132 11.5499 19.884 11.7157 19.611 11.8287C19.338 11.9418 19.0455 12 18.75 12C18.4545 12 18.1619 11.9418 17.8889 11.8287C17.616 11.7157 17.3679 11.5499 17.159 11.341C16.9501 11.1321 16.7843 10.884 16.6713 10.611C16.5582 10.3381 16.5 10.0455 16.5 9.75C16.5 9.15326 16.737 8.58097 17.159 8.15901C17.581 7.73705 18.1532 7.5 18.75 7.5C19.3467 7.5 19.919 7.73705 20.341 8.15901C20.7629 8.58097 21 9.15326 21 9.75V9.75ZM7.49999 9.75C7.49999 10.0455 7.44179 10.3381 7.32871 10.611C7.21564 10.884 7.04991 11.1321 6.84098 11.341C6.63204 11.5499 6.38401 11.7157 6.11102 11.8287C5.83804 11.9418 5.54546 12 5.24999 12C4.95451 12 4.66193 11.9418 4.38895 11.8287C4.11596 11.7157 3.86793 11.5499 3.65899 11.341C3.45006 11.1321 3.28433 10.884 3.17126 10.611C3.05818 10.3381 2.99999 10.0455 2.99999 9.75C2.99999 9.15326 3.23704 8.58097 3.65899 8.15901C4.08095 7.73705 4.65325 7.5 5.24999 7.5C5.84672 7.5 6.41902 7.73705 6.84098 8.15901C7.26293 8.58097 7.49999 9.15326 7.49999 9.75V9.75Z"
                      stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.75 5.24971C16.5456 5.24971 17.3087 5.56578 17.8713 6.12839C18.4339 6.691 18.75 7.45406 18.75 8.24971M21.75 8.24971C21.7501 9.12483 21.5588 9.98938 21.1895 10.7827C20.8202 11.5761 20.2818 12.2791 19.6121 12.8424C18.9424 13.4057 18.1575 13.8156 17.3126 14.0436C16.4677 14.2715 15.5831 14.3118 14.721 14.1617C14.158 14.0647 13.562 14.1877 13.158 14.5917L10.5 17.2497H8.25V19.4997H6V21.7497H2.25V18.9317C2.25 18.3347 2.487 17.7617 2.909 17.3407L9.408 10.8417C9.812 10.4377 9.935 9.84171 9.838 9.27871C9.6962 8.45988 9.72604 7.62052 9.92563 6.81382C10.1252 6.00712 10.4902 5.25068 10.9975 4.59244C11.5047 3.9342 12.1432 3.38851 12.8724 2.98995C13.6016 2.5914 14.4057 2.34867 15.2336 2.27715C16.0616 2.20562 16.8953 2.30687 17.6821 2.57447C18.4688 2.84208 19.1914 3.27019 19.8041 3.8317C20.4167 4.3932 20.906 5.07584 21.241 5.83636C21.5759 6.59688 21.7493 7.41869 21.75 8.24971V8.24971Z"
                      stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <button>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.633 10.5C7.439 10.5 8.166 10.054 8.664 9.42C9.44026 8.42962 10.4147 7.61218 11.525 7.02C12.248 6.636 12.875 6.064 13.178 5.305C13.3908 4.77325 13.5001 4.20575 13.5 3.633V3C13.5 2.80109 13.579 2.61032 13.7197 2.46967C13.8603 2.32902 14.0511 2.25 14.25 2.25C14.8467 2.25 15.419 2.48705 15.841 2.90901C16.263 3.33097 16.5 3.90326 16.5 4.5C16.5 5.652 16.24 6.743 15.777 7.718C15.511 8.276 15.884 9 16.502 9H19.628C20.654 9 21.573 9.694 21.682 10.715C21.727 11.137 21.75 11.565 21.75 12C21.7541 14.7363 20.8191 17.3912 19.101 19.521C18.713 20.003 18.114 20.25 17.496 20.25H13.48C12.997 20.25 12.516 20.172 12.057 20.02L8.943 18.98C8.48411 18.8274 8.00361 18.7497 7.52 18.75H5.904M14.25 9H16.5M5.904 18.75C5.987 18.955 6.077 19.155 6.174 19.352C6.371 19.752 6.096 20.25 5.651 20.25H4.743C3.854 20.25 3.03 19.732 2.771 18.882C2.42465 17.7452 2.24906 16.5633 2.25 15.375C2.25 13.822 2.545 12.339 3.081 10.977C3.387 10.203 4.167 9.75 5 9.75H6.053C6.525 9.75 6.798 10.306 6.553 10.71C5.69889 12.116 5.24843 13.7299 5.251 15.375C5.251 16.569 5.483 17.708 5.905 18.75H5.904Z"
                      stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>

                <button @click="deleteUser(user)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.74 8.99954L14.394 17.9995M9.606 17.9995L9.26 8.99954M19.228 5.78954C19.57 5.84154 19.91 5.89654 20.25 5.95554M19.228 5.79054L18.16 19.6725C18.1164 20.2378 17.8611 20.7657 17.445 21.1508C17.029 21.5359 16.4829 21.7497 15.916 21.7495H8.084C7.5171 21.7497 6.97102 21.5359 6.55498 21.1508C6.13894 20.7657 5.88359 20.2378 5.84 19.6725L4.772 5.78954M19.228 5.78954C18.0739 5.61506 16.9138 5.48264 15.75 5.39254M3.75 5.95454C4.09 5.89554 4.43 5.84054 4.772 5.78954M4.772 5.78954C5.92613 5.61506 7.08623 5.48264 8.25 5.39254M15.75 5.39254V4.47654C15.75 3.29654 14.84 2.31254 13.66 2.27554C12.5536 2.24018 11.4464 2.24018 10.34 2.27554C9.16 2.31254 8.25 3.29754 8.25 4.47654V5.39254M15.75 5.39254C13.2537 5.19962 10.7463 5.19962 8.25 5.39254"
                      stroke="#374151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </td>
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
<script lang="ts" setup>
import type { User } from '~/common/interfaces/user.interface';
import { useAuthStore } from '~~/store/auth';
import bottomPagination from '~~/components/common/pagination/bottom-pagination.vue';
definePageMeta({
  name: 'UsuariosPage',
  layout: 'private',
  middleware: ['auth']
})
const route = useRoute()
const { public: { baseURL } } = useRuntimeConfig()
const authStore = useAuthStore();
const query = ref<string>('');
const users = ref<User[] | null>(null);
const fetchData = () => {
  query.value = `_start=${start.value}&_limit=${limit.value}`
  const { data: usersData } = useAsyncData<User[]>('users', () => $fetch(`${baseURL}/users?${query.value}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authStore.token}`
    }
  }))
  watch(usersData, () => {
    users.value = usersData.value
  })
}
const limit = ref<number>(10);
const start = ref<number>(0);
const page = ref<number>(1);
const { data: totalData } = useAsyncData<number>('totalData', () => $fetch(`${baseURL}/users/count`, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authStore.token}`
  }
}))

const changeLimit = (newLimit: number) => {
  limit.value = Number(newLimit)
  start.value = 0
  page.value = 1;
  fetchData()
}

watch([start, limit], () => {
  fetchData()
})

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

const router = useRouter()

const goToCreate = async () => {
  await router.push('/usuarios/crear')
}

const goToEdit = async (id: string) => {
  await router.push('/usuarios/' + id)
}

const deleteUser = async (user: User) => {
  await $fetch(`${baseURL}/users/` + user.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.token
    },
  })
  await $fetch(`${baseURL}/datos-personales/${user.datos_personales?.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.token
    },
  })
  users.value?.splice(users.value.findIndex((val) => val.id === user.id), 1)
}

if (!!route.query.created || !!route.query.updated) {
  fetchData()
}

onMounted(() => {
  fetchData()
})


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

.header__description > h1 {
  font-size: var(--heading-2);
}

.header__description > img {
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

.quote {
  max-width: 550px;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  text-align: start;
  vertical-align: middle;
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

@media (max-width: 900px) {
  .header__description > img {
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
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 1rem;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: 700;
  }

  td:nth-of-type(1):before {
    content: "Título del caso";
  }

  td:nth-of-type(2):before {
    content: "Creación";
  }

  td:nth-of-type(3):before {
    content: "Resolución";
  }

  td:nth-of-type(4):before {
    content: "Estado";
  }

  td:nth-of-type(5):before {
    content: "Descripción";
  }

  .highlight {
    background-color: var(--gray-200);
  }

  .margin-botton {
    margin-bottom: 1rem;
  }
}
</style>
