<template>
  <main style="background-color: #f1f8f8">
    <header>
      <div class="home__actions">
        <h2>Agregar socio</h2>
      </div>
    </header>
    <div class="home__content">
      <div class="home__actions">
        <h3>Sobre el socio</h3>
        <div class="home__buttons">
          <button class="button button--secondary" @click.prevent="save()">
            <img src="~/assets/images/save-green.png" alt="" /> Guardar cambios
          </button>
        </div>
      </div>
      <form ref="formPersonalData" class="form">
        <div class="form__group">
          <div class="two-columns">
            <BaseFileInput
              v-model="formCreate.foto"
              :v="vuelidate"
              class="full-column"
              label="Foto de perfil"
              name="foto"
              @update:modelValue="formCreate.foto = $event"
            />
           
            <BaseInput
              v-model="formCreate.nombres"
              :v="vuelidate.nombres"
              type="text"
              label="Nombres"
              placeholder="Luis"
              class="new-line"
              name="nombres"
            />
            <BaseInput
              v-model="formCreate.Apellidos"
              :v="vuelidate.apellidos"
              type="text"
              label="Apellidos"
              placeholder="Granda"
              name="apellidos"
            />
            <BaseInput
              v-model="formCreate.Compania"
              name="compania"
              :v="vuelidate.compania"
              type="text"
              label="Compañia"
            />
            <BaseInput
              v-model="formCreate.cedula_ruc"
              name="cedula_ruc"
              :v="vuelidate.cedula_ruc"
              type="text"
              label="Identificación o Ruc"
            />
            <BaseInput
              v-model="formCreate.cedula"
              name="cedula"
              :v="vuelidate.cedula"
              type="text"
              label="Cedula"
            />
            <BaseInput
              v-model="formCreate.profesion"
              name="profesion"
              :v="vuelidate.profesion"
              type="text"
              label="Profesion"
            />
            <BaseInput
              v-model="formCreate.pasaporte"
              name="pasaporte"
              :v="vuelidate.pasaporte"
              type="text"
              label="Pasaporte"
            />
            <BaseInput
              v-model="formCreate.sexo"
              name="sexo"
              :v="vuelidate.sexo"
              type="text"
              label="Sexo"
            />
            <BaseInput
              v-model="formCreate.fecha_nacimiento"
              :v="vuelidate.fecha_nacimiento"
              type="date"
              label="Nacimiento"
              name="fecha_nacimiento"
            />
            <BaseInput
              v-model="formCreate.nacionalidad"
              name="nacionalidad"
              :v="vuelidate.nacionalidad"
              type="text"
              label="Nacionalidad"
            />
            <BaseInput
              v-model="formCreate.estado_civil"
              name="estado_civil"
              :v="vuelidate.estado_civil"
              type="text"
              label="Estado Civil"
            />
            <BaseInput
              v-model="formCreate.celular"
              name="celular"
              :v="vuelidate.celular"
              type="text"
              label="Celular"
            />
            <BaseInput
              v-model="formCreate.telefono_convencional"
              name="telefono_convencional"
              :v="vuelidate.telefono_convencional"
              type="text"
              label="Telefono Convencional"
            />
            <BaseInput
              v-model="formCreate.correo"
              name="correo"
              :v="vuelidate.correo"
              type="text"
              label="Correo"
            />
            <BaseInput
              v-model="formCreate.pais"
              name="pais"
              :v="vuelidate.pais"
              type="text"
              label="Pais"
            />
            <BaseInput
              v-model="formCreate.ciudad"
              name="ciudad"
              :v="vuelidate.ciudad"
              type="text"
              label="Ciudad"
            />
            <BaseInput
              v-model="formCreate.provincia"
              name="provincia"
              :v="vuelidate.provincia"
              type="text"
              label="provincia"
            />
            <BaseInput
              v-model="formCreate.fecha_inicio"
              name="fecha_inicio"
              :v="vuelidate.fecha_inicio"
              type="text"
              label="Fecha Inicio"
            />
            <BaseInput
              v-model="formCreate.fecha_fin"
              name="fecha_fin"
              :v="vuelidate.fecha_fin"
              type="text"
              label="Fecha Fin"
            />
            <BaseInput
              v-model="formCreate.tipo_persona"
              name="tipo_persona"
              :v="vuelidate.tipo_persona"
              type="text"
              label="Tipo de Persona"
            />
            <BaseInput
              v-model="formCreate.tipo_tarjeta"
              name="tipo_tarjeta"
              :v="vuelidate.tipo_tarjeta"
              type="text"
              label="Tipo de Tarjeta"
            />
            <BaseInput
              v-model="formCreate.plan"
              name="plan"
              :v="vuelidate.plan"
              type="text"
              label="Plan"
            />
            <BaseInput
              v-model="formCreate.poliza"
              name="poliza"
              :v="vuelidate.poliza"
              type="text"
              label="Poliza"
            />
            <BaseInput
              v-model="formCreate.certificado"
              name="certificado"
              :v="vuelidate.certificado"
              type="text"
              label="Certificado"
            />
            <BaseInput
              v-model="formCreate.marca"
              name="marca"
              :v="vuelidate.marca"
              type="text"
              label="Marca"
            />
            <BaseInput
              v-model="formCreate.modelo"
              name="modelo"
              :v="vuelidate.modelo"
              type="text"
              label="Modelo"
            />
            <BaseInput
              v-model="formCreate.anio"
              name="anio"
              :v="vuelidate.anio"
              type="text"
              label="Año"
            />
            <BaseInput
              v-model="formCreate.color"
              name="color"
              :v="vuelidate.color"
              type="text"
              label="Color"
            />
            <BaseInput
              v-model="formCreate.placa"
              name="placa"
              :v="vuelidate.placa"
              type="text"
              label="Placa"
            />    
            <BaseInput
              v-model="formCreate.motor"
              name="motor"
              :v="vuelidate.motor"
              type="text"
              label="Motor"
            />
            <BaseInput
              v-model="formCreate.chasis"
              name="chasis"
              :v="vuelidate.chasis"
              type="text"
              label="Chasis"
            />
            <BaseInput
              v-model="formCreate.establecimientos"
              name="establecimientos"
              :v="vuelidate.establecimientos"
              type="text"
              label="Establecimientos"
            />
     
      
     
 
  
           
          </div>
        </div>


      </form>
    </div>
    <scroll-top />
  </main>
</template>
<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, decimal, helpers, numeric } from "@vuelidate/validators";
import { StatusRegistry } from "~/common/enums/status.enum";
import type { SelectOption } from "~/common/interfaces/select-option.interface";
import BaseInput from "~/components/common/inputs/base-input.vue";
import BaseSelect from "~/components/common/inputs/base-select.vue";
import BaseFileInput from "~/components/common/inputs/file-input.vue";
import ScrollTop from "~/components/common/buttons/scroll-top.vue";
import { useAuthStore } from "~~/store/auth";
import { useToast } from "vue-toastification";

definePageMeta({
  name: "CreateSociosPage",
  components: {
    BaseInput,
    BaseFileInput,
    ScrollTop,
  },
  layout: "private",
});
const router = useRouter();


const statusOptions = ref<SelectOption[]>([
  { text: "Activo", value: "true" },
  { text: "Inactivo", value: "false" },
]);

const formCreate = reactive({
  status: "",
  foto: null,
  nombres: "",
  apellidos: "",
  compania: "",
  cedula_ruc: "",
  cedula: "",
  profesion: "",
  pasaporte: "",
  sexo: "",
  fecha_nacimiento: "",
  nacionalidad: "",
  estado_civil: "",
  celular: "",
  telefono_convencional: "",
  correo: "",
  pais: "",
  ciudad:"",
  provincia: "",
  fecha_inicio: "",
  Fecha_fin: "",
  tipo_persona: "",
  tipo_tarjeta:"",
  plan: "",
  poliza:"",
  certificado: "",
  marca:"",
  modelo: "",
  anio:"",
  color:"",
  placa:"",
  motor:"",
  chasis:"",
  establecimientos:"",


});

const rules = {
  status: { required: helpers.withMessage("Este campo no puede estar vacio", required) },
  foto: {},
  nombres: { required: helpers.withMessage("Este campo no puede estar vacio", required) },
  apellidos: {
    required: helpers.withMessage("Este campo no puede estar vacio", required),
  },
  compania: {
    required: helpers.withMessage("Este campo no puede estar vacio", required),
  },
  
  cedula_ruc: {
    required: helpers.withMessage("Este campo no puede estar vacio", required),
  },
  cedula: { required: helpers.withMessage("Este campo no puede estar vacio", required) },
  profesion: {},
  pasaporte: {
    required: helpers.withMessage("Este campo no puede estar vacio", required),
  },
  sexo: {},
  fecha_nacimiento: {},
  nacionalidad: {},
  estado_civil: {},

  celular: { numeric: helpers.withMessage("Este campo solo acepta numeros", numeric) },
  telefono_convencional: {
    numeric: helpers.withMessage("Este campo solo acepta numeros", numeric),
  },
  correo: {
    required: helpers.withMessage("Este campo no puede estar vacio", required),
    email: helpers.withMessage("Debe ser un email valido", email),
  },

  pais: {},
  ciudad: {},
  provincia: {},
  fecha_inicio: {},
  fecha_fin: {},
  tipo_persona: {},
  tipo_tarjeta: {},
  plan: {},
  poliza: {},
  certificado: {},
  marca: {},
  modelo: {},
  anio: {},
  color: {},
  placa: {},
  motor: {},
  chasis: {},
  establecimientos: {},
 

};

const vuelidate = useVuelidate(rules, formCreate);

const {
  public: { baseURL },
} = useRuntimeConfig();

const authStore = useAuthStore();





const formPersonalData = ref(null);

const toast = useToast();

const save = async () => {
  vuelidate.value.$touch();
  if (!(await vuelidate.value.$validate())) {
    return;
  }
  const data: { [key: string]: string } = {};
  const formData = new FormData();
  for (const key in formCreate) {
    if (key === "foto") {
      formData.append(`files.${key}`, formCreate[key]);
    }
    if (formCreate[key] !== "" && key !== "foto") {
      data[key] = formCreate[key];
    }
  }
  formData.append("data", JSON.stringify(data));
  const { data: datos, error: errorDatos } = await useFetch(
    `${baseURL}/datos-personales`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: formData,
    }
  );
  if (errorDatos.value) {
    console.log(errorDatos.value);
    formData.delete("data");
    formData.delete("files.foto");
    toast.error("Error al guardar los datos");
    return;
  }
  if (datos.value) {
    const { data: userData, error: userError } = await useFetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({
        email: formCreate.correo,
        username: formCreate.cedula_ruc,
        estado: formCreate.status ? StatusRegistry.ACTIVO : StatusRegistry.INACTIVO,
        password: Math.random().toString(36).slice(2),
        datos_personales: datos.value?.id,
      }),
    });
    if (userError.value) {
      console.log(userError.value);
      formData.delete("data");
      formData.delete("files.foto");
      toast.error("Error al guardar los datos");
      return;
    }
    if (userData.value) {
      formData.delete("data");
      formData.delete("files.foto");
      toast.success("Datos guardados correctamente");
      await router.push("/socios?created=true");
    }
  }
  // await $axios.$post('/users', )
};

onBeforeMount(() => {
  if (!authStore.user?.role.type.includes("admin")) {
    router.push("/personal");
    toast.error('Disculpas, usted no esta autorizado en visitar "socios/crear" page');
  }
});
</script>
<style scoped>
header {
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.header__text > h1 {
  font-size: var(--heading-2);
}

.header__photo {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.home__actions > h2 {
  font-size: var(--heading-1);
}

.home__actions > h3 {
  font-size: var(--heading-2);
}

.home__actions {
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.home__link {
  color: var(--links);
}

.form {
  padding: 1rem 0;
}

.form__group {
  padding: 2rem 0;
  border-bottom: 1px solid var(--gray-200);
  max-width: 670px;
}

.two-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(327px, 1fr));
}

.one-column {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label > input {
  height: 40px;
  padding: 0 0.5rem;
}

.new-line {
  grid-column: 1;
}

label + h3,
.one-column > h3 {
  margin-top: 1rem;
}

.form__group > h2 {
  margin-bottom: 1rem;
}

.full-column {
  grid-column: 1/-1;
}
</style>
