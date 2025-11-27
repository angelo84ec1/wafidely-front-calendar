<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Crear usuario</h1>
          
        </div>
    
      </div>
    </header>
    <div class="home__content">
      <form class="form">
        <div class="form__group">
          <div class="two-columns">
            <FileInput label="Foto de perfil" class="full-column" placeholder="Solo archivos PNG,JPG o JPEG" name="foto"
              @update:modelValue="formCreate.foto = $event" />
            <BaseInput v-model="formCreate.nombres" :v="vuelidate.nombres" label="Nombres" type="text" name="nombres" />
            <BaseInput v-model="formCreate.apellidos" :v="vuelidate.apellidos" label="Apellidos" type="text"
              name="apellidos" />
            <BaseInput v-model="formCreate.correo" :v="vuelidate.correo" label="Email" class="full-column" type="email"
              name="email" />
            <BaseInput v-model="formCreate.password" :v="vuelidate.password" label="Contraseña" class="full-column password-input"
              type="password" name="password" />
            <BaseInput v-model="formCreate.cedula_ruc" :v="vuelidate.cedula_ruc" label="RUC"
              class="full-column" type="text" name="identificacion" />
              <BaseInput v-model="formCreate.cedula" :v="vuelidate.cedula" label="Cedula"
              class="full-column" type="text" name="identificacion" />
            <BaseInput v-model="formCreate.fecha_nacimiento" :v="vuelidate.fecha_nacimiento" label="Nacimiento"
              class="full-column" type="date" name="nacimiento" />
            <BaseSelect v-model="formCreate.sexo" :v="vuelidate.sexo" label="Genero" class="full-column" name="genero"
              :options="genderOptions" />
            
            <BaseSelect v-model="formCreate.role" :v="vuelidate.role" label="Rol" class="full-column" type="text"
              name="role" :options="roleOptions" />
            <BaseInput v-model="formCreate.celular" :v="vuelidate.celular" label="Celular" type="text" name="celular" />
            <BaseInput v-model="formCreate.telefono_convencional" :v="vuelidate.telefono_convencional"
              label="Telefono fijo" type="text" name="telefono_convencional" />
            <BaseSelect v-model="formCreate.estado" :v="vuelidate.estado" label="Estado" class="full-column"
              name="estado" :options="statusOptions" />
          </div>
        </div>
      </form>
    </div>
    <div class="buttons">
      <button class="button button--primary" @click="save">
        <img src="~/assets/images/save.png" alt="" />Finalizar
      </button>
      <button class="button button--terciary" @click="goBack">Cancelar</button>
    </div>
  </main>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, required, helpers, numeric } from '@vuelidate/validators'
import { useToast } from 'vue-toastification';
import type { SelectOption } from '~/common/interfaces/select-option.interface';
import type { User } from '~/common/interfaces/user.interface';
import BaseInput from '~/components/common/inputs/base-input.vue'
import BaseSelect from '~/components/common/inputs/base-select.vue'
import FileInput from '~/components/common/inputs/file-input.vue'
import type {  Role } from '~~/common/interfaces/options.interface';
import { useAuthStore } from '~~/store/auth';
definePageMeta({
  name: 'CreateUserPage',
  components: {
    BaseInput,
    BaseSelect,
    FileInput
  },
  layout: 'private',
  middleware: ['auth'],
})
const router = useRouter()
const genderOptions = ref<SelectOption[]>([
  { value: 'M', text: 'Masculino' },
  { value: 'F', text: 'Femenino' }
])

const statusOptions = ref<SelectOption[]>([
  { value: 'Activo', text: 'Activo' },
  { value: 'Desactivado', text: 'Desactivado' }
])
const formCreate = reactive({
  foto: null,
  nombres: '',
  apellidos: '',
  correo: '',
  password: '',
  cedula_ruc: '',
  cedula: '',
  fecha_nacimiento: '',
  sexo: '',
  role: '',
  celular: '',
  telefono_convencional: '',
  estado: ''
})

const rules = {
  foto: {},
  nombres: { required: helpers.withMessage('Campo requerido', required) },
  apellidos: { required: helpers.withMessage('Campo requerido', required) },
  correo: { email: helpers.withMessage('Correo invalido', email) },
  password: { required: helpers.withMessage('Campo requerido', required) },
  cedula_ruc: { required: helpers.withMessage('Campo requerido', required) },
  cedula: { required: helpers.withMessage('Campo requerido', required) },
  fecha_nacimiento: { required: helpers.withMessage('Campo requerido', required) },
  sexo: { required: helpers.withMessage('Campo requerido', required) },
  role: { required: helpers.withMessage('Campo requerido', required) },
  celular: { required: helpers.withMessage('Campo requerido', required), numeric: helpers.withMessage('Solo numeros', numeric) },
  telefono_convencional: { required: helpers.withMessage('Campo requerido', required), numeric: helpers.withMessage('Solo numeros', numeric) },
  estado: { required: helpers.withMessage('Campo requerido', required) },
}
const vuelidate = useVuelidate(rules, formCreate)

const { public: { baseURL } } = useRuntimeConfig()
const authStore = useAuthStore()

const { data: roleOptions } = useAsyncData('roles', async () => {
  const { roles } = await $fetch<{ roles: Role[] }>(`${baseURL}/users-permissions/roles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.token
    },
  })
  return roles.map((role) => ({ value: role.id, text: role.name }))
})


const formData = new FormData()

const toast = useToast()

const save = async () => {
  vuelidate.value.$touch();
  if (!await vuelidate.value.$validate()) return;
  if (formCreate.foto) {
    formData.append('files.foto', formCreate.foto)
  }
  const data = ref<User>({
    datos_personales: {
      correo: formCreate.correo,
      nombres: formCreate.nombres,
      apellidos: formCreate.apellidos,
      cedula_ruc: formCreate.cedula_ruc,
      cedula: formCreate.cedula,
      fecha_nacimiento: formCreate.fecha_nacimiento,
      sexo: formCreate.sexo,
      celular: formCreate.celular,
      telefono_convencional: formCreate.telefono_convencional,
      status: formCreate.estado === 'Activo',
    },
  } as User)

  formData.append(`data`, JSON.stringify(data.value.datos_personales))
  const datos = await $fetch(`${baseURL}/datos-personales`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + authStore.token
    },
    body: formData,
  }).catch((err: any) => {
    console.error(err)
    formData.delete('files.foto')
    formData.delete('data')
  })
  const userCreated = await $fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.token
    },
    body: JSON.stringify({
      email: formCreate.correo,
      username: formCreate.cedula_ruc,
      password: formCreate.password,
      estado: formCreate.estado,
      datos_personales: datos.id
    })
  }).catch((err: any) => {
    console.error(err)
    formData.delete('files.foto')
    formData.delete('data')
  })
  if (userCreated) {
    toast.success('Usuario creado correctamente')
    await router.push('/usuarios?created=true')
  }
}

const goBack = async () => {
  await router.push('/usuarios')
}
</script>
<style scoped>
.home__content {
  padding: 1rem 0;
}

main {
  padding: 0 1rem 1rem 1rem;
}

header {
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
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

.form {
  max-width: 670px;
}

.two-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(327px, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label>textarea {
  height: 160px;
}

label>input {
  height: 40px;
  padding: 0 0.5rem;
}

.full-column {
  grid-column: 1/-1;
}

input[type="password"] + .password-input svg {
  display: none;
}

input[type="file"] {
  visibility: hidden;
}

.input--file {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border: 1px solid var(--gray-500);
  height: 160px;
}

.input--file>svg {
  margin-bottom: 1rem;
  width: 3rem;
  height: 3rem;
  color: var(--gray-700);
}

.input--file>span {
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--gray-700);
}

.input__file-label {
  color: var(--gray-900);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
}

@media (max-width: 1060px) {
  .button>img {
    width: 1.5rem;
  }
}

/* Estilos generales para la img-right-container */


</style>
