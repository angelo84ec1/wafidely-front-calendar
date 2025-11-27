<template>
  <main style="background-color: #f1f8f8">
    <header>
      <div class="home__actions">
        <h2>Editar socio</h2>
      </div>
    </header>
    <div class="home__content">
      <div class="home__actions">
        <h3>Sobre el socio</h3>
        <div class="home__buttons">
          <button class="button button--secondary float" @click.prevent="save()">
            <img src="~/assets/images/save-green.png" alt="" /> Guardar cambios
          </button>

        </div>
      </div>
      <form ref="formPersonalData" class="form">
        <div class="form__group">
          <div class="two-columns d-flex">
            <BaseFileInput v-model="formEdit.foto" :v="vuelidate" class="full-column" label="Foto de perfil" name="foto"
              @update:modelValue="formEdit.foto = $event" />
            <BaseInput v-model="formEdit.nombres" :v="vuelidate.nombres" type="text" label="Nombres" placeholder="Luis"
              class="new-line" name="nombres" />
            <BaseInput v-model="formEdit.apellidos" :v="vuelidate.apellidos" type="text" label="Apellidos"
              placeholder="Vasquez" name="apellidos" />
            <BaseInput v-model="formEdit.compania" name="compania" :v="vuelidate.compania" type="text" label="Compañia" />

            <BaseInput v-model="formEdit.cedula_ruc" name="cedula_ruc" :v="vuelidate.cedula_ruc" type="text"
              label="Identificación o Ruc" />
            <BaseInput v-model="formEdit.cedula" name="cedula" :v="vuelidate.cedula" type="text" label="Cedula" />
            <BaseInput v-model="formEdit.profesion" name="profesion" :v="vuelidate.profesion" type="text"
              label="Profesion" />
            <BaseInput v-model="formEdit.pasaporte" name="pasaporte" :v="vuelidate.pasaporte" type="text"
              label="Pasaporte" />
            <BaseInput v-model="formEdit.sexo" name="sexo" :v="vuelidate.sexo" type="text" label="Sexo" />
           

            <BaseInput v-model="formEdit.nacionalidad" name="nacionalidad" :v="vuelidate.nacionalidad" type="text"
              label="Nacionalidad" />
            <BaseInput v-model="formEdit.estado_civil" name="estado_civil" :v="vuelidate.estado_civil" type="text"
              label="Estado Civil" />
            <BaseInput v-model="formEdit.celular" name="celular" :v="vuelidate.celular" type="text" label="Celular" />
            <BaseInput v-model="formEdit.telefono_convencional" name="telefono_convencional"
              :v="vuelidate.telefono_convencional" type="text" label="Telefono Convencional" />
            <BaseInput v-model="formEdit.correo" name="correo" :v="vuelidate.correo" type="text" label="Correo" />
            <BaseInput v-model="formEdit.pais" name="pais" :v="vuelidate.pais" type="text" label="Pais" />
            <BaseInput v-model="formEdit.ciudad" name="ciudad" :v="vuelidate.ciudad" type="text" label="Ciudad" />
            <BaseInput v-model="formEdit.provincia" name="provincia" :v="vuelidate.provincia" type="text"
              label="provincia" />
            <BaseInput v-model="formEdit.fecha_inicio" name="fecha_inicio" :v="vuelidate.fecha_inicio" type="text"
              label="Fecha Inicio" />
            <BaseInput v-model="formEdit.tipo_persona" name="tipo_persona" :v="vuelidate.tipo_persona" type="text"
              label="Tipo de Persona" />
            <BaseInput v-model="formEdit.tipo_tarjeta" name="tipo_tarjeta" :v="vuelidate.tipo_tarjeta" type="text"
              label="Tipo de Tarjeta" />

          </div>


        </div>


      </form>

      <div v-if="!isEstablishment">

        <div class="home__actions">

          <h2>Planes</h2>

          <div class="home__buttons">
            <button class="button button--secondary" @click.prevent="savePlans()">
              <img src="~/assets/images/save-green.png" alt="" /> Guardar cambios ok
            </button>
          </div>
        </div>
        <form class="form" ref="formPlanData">
          <div v-if="dataPlans?.length === 0">No dispone de planes</div>
          <button class="plans" v-if="dataPlans?.length > 1" v-for="plan in dataPlans" :key="plan.id"
            @click.prevent="updatePlan(plan)">{{ plan.producto }}</button>
          <div class="form__group two-columns">
            <BaseInput v-model="plane" type="text" label="Plan" :disabled="true" name="plan" />

            <BaseInput v-model="birthDate" type="date" label="Fecha de Nacimiento" name="fecha_nacimiento" />


            <BaseInput v-model="pVehicle" type="text" label="Marca Vehiculo" name="marca" />


            <BaseInput v-model="pModel" type="text" label="Modelo" name="modelo" />


            <BaseInput v-model="pAno" type="text" label="Año" name="anio" />


            <BaseInput v-model="pColor" type="text" label="Color" name="color" />


            <BaseInput v-model="pPlaca" type="text" label="Placa" name="placa" />


            <BaseInput v-model="pMotor" type="text" label="Motor" name="motor" />

            <BaseInput v-model="pChasis" type="text" label="Chasis" name="chasis" />


          </div>
        </form>
      </div>
      <div v-else>
        <div class="home__actions">
          <h2>Establecimiento</h2>
          <div class="home__buttons">
            <button class="button button--secondary" :disabled="!active" @click.prevent="() => { router.push(`/aiembudo/${estId}`) }">
              <img src="~/assets/images/landingwhite.png" alt="" /> Landing Page
            </button>
          </div>
        </div>
        <div>
          <div class="home__actions">
            <h3>Estado de la landing page</h3>
          </div>
          <div class="home__buttons">
            <button class="button button--secondary" :disabled="active" @click.prevent="updateLanding('activate')">
              <img src="~/assets/images/landingwhite.png" alt="" /> Activar
            </button>
            <button class="button button--secondary" :disabled="!active" @click.prevent="updateLanding('deactivate')">
              <img src="~/assets/images/landingwhite.png" alt="" /> Desactivar
            </button>
          </div>
        </div>
      </div>
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
import BaseFileInput from "~/components/common/inputs/file-input.vue";
import ScrollTop from "~/components/common/buttons/scroll-top.vue";
import type { DatosPersonales, ConfiguracionPago } from "~/common/interfaces/user.interface";
import { useAuthStore } from "~~/store/auth";
import { useToast } from "vue-toastification";



definePageMeta({
  name: "EditSociosPage",
  components: {
    BaseInput,
    BaseFileInput,
    ScrollTop,

  },
  layout: "private",
});

const router = useRouter();
const { params } = useRoute();

const idDatos = computed(() => params.id);
const {
  public: { baseURL },
} = useRuntimeConfig();
const authStore = useAuthStore();

const { data: user } = useAsyncData<DatosPersonales>(
  "datos-personales",
  () =>
    $fetch(`${baseURL}/datos-personales/${idDatos.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    }),
  { watch: [idDatos] }
);
const userId = ref<String>("")
const estId = ref<String>("")
const active = ref<Boolean>(false);
const isEstablishment = ref<Boolean>(false);
fetch(`${baseURL}/users?datos_personales.id=${idDatos.value}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authStore.token}`,
  },
}).then((res) => res.json())
  .then((res) => {
    console.log(res[0])
    userId.value = res[0].id
    if (res[0].role.name === "establecimiento") {
      isEstablishment.value = true
      fetch(`${baseURL}/establecimientos?correo=${res[0].email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
      }).then((res) => res.json())
        .then((res) => {
          console.log(res[0])
          estId.value = res[0].id
          active.value = res[0].activateLanding
        })
    }
  })

const updateLanding = (action: string) => {
  fetch(`http://localhost:1337/establecimientos/${estId.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
    body: JSON.stringify({ activateLanding: action === "activate" ? true : false }),
  }).then((res) => res.json())
    .then((res) => {
      console.log(res)
      toast.success("Landing page actualizada correctamente")
      active.value = res.activateLanding
    })
}


watch(user, (value) => {
  console.log(value)
  for (const key in value) {
    formEdit[key] = value[key];
  }
});





const statusOptions = ref<SelectOption[]>([
  { text: "Activo", value: "true" },
  { text: "Inactivo", value: "false" },
]);
const sexOptions = ref<SelectOption[]>([
  { text: "Masculino", value: "M" },
  { text: "Femenino", value: "F" },
]);
const yesNoOptions = ref([
  { text: "Si", value: true },
  { text: "No", value: false },
]);
const civilStateOptions = ref<SelectOption[]>([
  { text: "Casado", value: "casado" },
  { text: "Divorciado", value: "divorciado" },
  { text: "Viudo", value: "viudo" },
  { text: "Soltero", value: "soltero" },
]);

const formEdit = reactive({
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
  ciudad: "",
  provincia: "",
  fecha_inicio: "",
  Fecha_fin: "",
  tipo_persona: "",
  tipo_tarjeta: "",
});

const rules = {
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

};

const vuelidate = useVuelidate(rules, formEdit);



const formPersonalData = ref(null);

const toast = useToast();

const save = async () => {
  vuelidate.value.$touch();
  console.log(formEdit)
  if (!(await vuelidate.value.$validate())) {
    toast.warning("Por favor, revise los campos marcados en rojo");
    return;
  }
  const data: { [key: string]: string } = {};
  const formData = new FormData();
  for (const key in formEdit) {
    if (key === "foto") {
      formData.append(`files.${key}`, formEdit[key]);
    }
    if (formEdit[key] !== "" && key !== "foto") {
      data[key] = formEdit[key];
    }
  }
  formData.append("data", JSON.stringify(data));
  await $fetch(`${baseURL}/datos-personales/${idDatos.value}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
    body: formData,
  }).catch((err) => {
    console.log(err);
    formData.delete("data");
    formData.delete("files.foto");
    toast.error("Error al guardar los datos");
  });
  formData.delete("data");
  formData.delete("files.foto");
  toast.success("Datos guardados correctamente");
  await router.push("/socios?created=true");
};


const { data: dataPlans } = useAsyncData<ConfiguracionPago[]>(
  "planes",
  () => $fetch(
    `${baseURL}/config-pagos?user.id=${userId.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }),
  { watch: [userId] }
);


watch(dataPlans, () => {
  if (dataPlans.value && dataPlans.value.length > 0) {
    if (dataPlans.value?.length === 1) {
      updatePlan(dataPlans.value[0])
    }
    dataPlans.value.sort((a, b) => b.producto.localeCompare(a.producto));
    console.log(dataPlans.value)
  }
});

const plane = ref<string>("");
const pName = ref<string>("");
const pEmail = ref<string>("");
const pVehicle = ref<string>("");
const pModel = ref<string>("");
const pAno = ref<string>("");
const pColor = ref<string>("");
const pPlaca = ref<string>("");
const pMotor = ref<string>("");
const pChasis = ref<string>("");
const pId = ref<string>("");
const fecha_compra = ref<string>("");
const fecha_fin = ref<string>("");
  const birthDate = ref<string>("");
    const updatePlan = (plan: any) => {
  pAno.value = plan.anio;
  pChasis.value = plan.chasis;
  pColor.value = plan.color;
  pName.value = plan.user.first_name + plan.user.last_name;
  pModel.value = plan.modelo;
  pMotor.value = plan.motor;
  pPlaca.value = plan.placa;
  pVehicle.value = plan.marca;
  pEmail.value = plan.user.email;
  plane.value = plan.producto;
  birthDate.value = plan.fecha_nacimiento;
  pId.value = plan.id;
  fecha_compra.value = plan.fecha_compra;
  fecha_fin.value = plan.fecha_fin;


};

const savePlans = async () => {

  const payload = {
    anio: pAno.value,
    chasis: pChasis.value,
    color: pColor.value,
    marca: pVehicle.value,
    modelo: pModel.value,
    motor: pMotor.value,
    placa: pPlaca.value,
    fecha_nacimiento: birthDate.value
  }

  console.log(payload);

  try {
    const response = await fetch(`${baseURL}/config-pagos/${pId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      toast.success("Planes actualizados correctamente")
      // update the entry in the dataPlans array
      const index = dataPlans.value?.findIndex((plan) => plan.id === pId.value);
      if (index !== undefined && dataPlans.value) {
        dataPlans.value[index].anio = payload.anio;
        dataPlans.value[index].chasis = payload.chasis;
        dataPlans.value[index].color = payload.color;
        dataPlans.value[index].marca = payload.marca;
        dataPlans.value[index].modelo = payload.modelo;
        dataPlans.value[index].motor = payload.motor;
        dataPlans.value[index].placa = payload.placa;
        dataPlans.value[index].fecha_nacimiento = payload.fecha_nacimiento
        updatePlan(dataPlans.value[index]);
      }


    } else {
      toast.error("Error")
    }
  } catch (error) {
    toast.error("Error")
  }
};




</script>
<style scoped>
header {
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.header__text>h1 {
  font-size: var(--heading-2);
}

.header__photo {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.home__actions>h2 {
  font-size: var(--heading-1);
}

.home__actions>h3 {
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


.float {

  position: fixed;
  top: 100px;
  right: 30px;
  z-index: 10;


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

.plans {
  margin-right: 9px;
  padding: 10px;
  background-color: #C028B9 !important;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
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

label>input {
  height: 40px;
  padding: 0 0.5rem;
}

.new-line {
  grid-column: 1;
}

label+h3,
.one-column>h3 {
  margin-top: 1rem;
}

.form__group>h2 {
  margin-bottom: 1rem;
}

.full-column {
  grid-column: 1/-1;
}

/*breackpoint*/
@media only screen and (max-width: 600px) {
  .d-flex {
    display: flex !important;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .full-column,
  .full-column-2 {
    width: 100% !important;
  }

  .form__group {
    max-width: 100% !important;
  }
}
</style>
<style>
@media only screen and (max-width: 600px) {
  body .home__container {
    display: block !important;
  }
}
</style>
