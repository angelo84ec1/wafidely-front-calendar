<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Editar usuario</h1>
    
        </div>
     
      </div>
    </header>
    <div class="home__content">
      <form class="form">
        <div class="form__group">
          <div class="two-columns">
            <FileInput
              label="Foto de perfil"
              class="full-column"
              placeholder="Solo archivos PNG,JPG o JPEG"
              name="foto"
              @update:modelValue="formEdit.foto = $event"
            />
            <BaseInput
              v-model="formEdit.nombres"
        
              label="Nombres"
              type="text"
              name="nombres"
            />
            <BaseInput
              v-model="formEdit.apellidos"
             
              label="Apellidos"
              type="text"
              name="apellidos"
            />
            <BaseInput
              v-model="formEdit.correo"
             
              label="Email"
              class="full-column"
              type="email"
              name="email"
            />
            <BaseInput
              v-model="formEdit.cedula_ruc"
           
              label="RUC"
              class="full-column"
              type="text"
              name="cedula_ruc"
            />
            <BaseInput
              v-model="formEdit.cedula"
           
              label="Cedula"
              class="full-column"
              type="text"
              name="cedula"
            />
            
            <BaseSelect v-if="!(!isAdmin || !isEstablecimiento) "
              v-model="formEdit.role"
        
              label="Rol"
              class="full-column"
              type="text"
              name="role"
              :options="roleOptions"
            />
            <BaseInput
              v-model="formEdit.celular"
         
              label="Celular"
              type="text"
              name="celular"
            />
            <BaseInput
              v-model="formEdit.telefono_convencional"
          
              label="Telefono fijo"
              type="text"
              name="telefono_convencional"
            />
            <BaseSelect
              v-model="formEdit.estado"
             
              label="Estado"
              class="full-column"
              name="estado"
              :options="statusOptions"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="buttons">
      <button class="button button--primary" @click="save">
        <img src="~/assets/images/save.png" alt="" />Guardar
      </button>
      <button class="button button--terciary" @click="goBack">Cancelar</button>
    </div>
  </main>
</template>
<script setup lang="ts">


import { useToast } from "vue-toastification";
import type { SelectOption } from "~/common/interfaces/select-option.interface";
import type { ConfiguracionPago, DatosPersonales, User } from "~/common/interfaces/user.interface";
import BaseInput from "~/components/common/inputs/base-input.vue";
import BaseSelect from "~/components/common/inputs/base-select.vue";
import FileInput from "~/components/common/inputs/file-input.vue";
import type { Cargo, Role } from "~/common/interfaces/options.interface";

import { useAuthStore } from "~/store/auth";

definePageMeta({
  name: "EditUserPage",
  components: {
    BaseInput,
    BaseSelect,
    FileInput,
  },
  layout: "private",
  middleware: ["auth"],
});

const { params } = useRoute();
const router = useRouter();



const statusOptions = ref<SelectOption[]>([
  { value: "Activo", text: "Activo" },
  { value: "Desactivado", text: "Desactivado" },
]);
const formEdit = reactive({
  foto: null,
  nombres: "",
  apellidos: "",
  correo: "",
  cedula_ruc: "",
  cedula: "",

  role: "",
  celular: "",
  telefono_convencional: "",
  estado: "",
});



const {
  public: { baseURL },
} = useRuntimeConfig();
const authStore = useAuthStore();

const idUser = computed(() => params.id);

const { data: user } = useFetch<User>(`${baseURL}/users/${idUser.value}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + authStore.token,
  },
});
watch(user, () => {
  formEdit.nombres = user.value?.datos_personales?.nombres ?? "";
  formEdit.apellidos = user.value?.datos_personales?.apellidos ?? "";
  formEdit.correo = user.value?.datos_personales?.correo ?? "";
  formEdit.cedula_ruc = user.value?.datos_personales?.cedula_ruc ?? "";
  formEdit.cedula = user.value?.datos_personales?.cedula ?? "";


  formEdit.role = user.value?.role?.id ?? "";
  formEdit.celular = user.value?.datos_personales?.celular ?? "";
  formEdit.telefono_convencional =
    user.value?.datos_personales?.telefono_convencional ?? "";
  formEdit.estado = user.value?.estado ?? "";
});

const { data: roleOptions } = useAsyncData("roles", async () => {
  const { roles } = await $fetch<{ roles: Role[] }>(
    `${baseURL}/users-permissions/roles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authStore.token,
      },
    }
  );
  return roles.map((cargo) => ({ value: cargo.id, text: cargo.name }));
});


const formData = new FormData();

const toast = useToast();

const save = async () => {
  

  if (formEdit.foto) {
    formData.append("files.foto", formEdit.foto);
  }
  const data = ref<User>({
    datos_personales: {
      correo: formEdit.correo,
      nombres: formEdit.nombres,
      apellidos: formEdit.apellidos,
      cedula_ruc: formEdit.cedula_ruc,
      cedula: formEdit.cedula,

     
      celular: formEdit.celular,
      telefono_convencional: formEdit.telefono_convencional,
      status: formEdit.estado === "Activo",
    },
  } as User);

  formData.append(`data`, JSON.stringify(data.value.datos_personales));
  const { data: datos, error: errorDatos } = await useFetch<DatosPersonales>(
    `${baseURL}/datos-personales/${user.value?.datos_personales?.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
      body: formData,
    }
  );
  if (errorDatos.value) {
    console.error(errorDatos.value);
    formData.delete("files.foto");
    formData.delete("data");
    toast.error("Error al actualizar datos personales");
    return;
  }
  const { data: dataUser, error: errorUser } = await useFetch(
    `${baseURL}/users/${user.value?.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
      body: JSON.stringify({
        email: formEdit.correo,
        username: formEdit.cedula,
        estado: formEdit.estado,
        datos_personales: datos.value?.id,
        role: formEdit.role,
      }),
    }
  );
  if (errorUser.value) {
    console.error(errorUser.value);
    formData.delete("files.foto");
    formData.delete("data");
    toast.error("Error al actualizar usuario");
    return;
  }
  if (dataUser.value) {
    formData.delete("files.foto");
    formData.delete("data");
    toast.success("Usuario actualizado");
  }

  const { data: conf } = await useFetch<ConfiguracionPago[]>(
    `${baseURL}/config-pagos?user.id=${user.value?.id}`)

  conf.value?.map(async (item) => {
    const { data: update_conf } = await useFetch<ConfiguracionPago>(
      `${baseURL}/config-pagos/${item.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authStore.token,
        },
        body: JSON.stringify({
          estado: formEdit.estado === "Activo" ? "Paid" : "Pending"
        }),
      }
    )
  })

  if (formEdit.estado === "Activo") {
    fetch(`http://localhost:1337/auth/send-email-confirmation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formEdit.correo,
          identifier: formEdit.cedula,
          password: "You know well about password!"
        })
      }
    )
  }

  await router.push("/usuarios?updated=true");
};

const goBack = async () => {
  await router.push("/usuarios");
};

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

label > textarea {
  height: 160px;
}

label > input {
  height: 40px;
  padding: 0 0.5rem;
}

.full-column {
  grid-column: 1/-1;
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

.input--file > svg {
  margin-bottom: 1rem;
  width: 3rem;
  height: 3rem;
  color: var(--gray-700);
}

.input--file > span {
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
  .button > img {
    width: 1.5rem;
  }
}
</style>
