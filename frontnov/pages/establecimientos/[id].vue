<template>
  <main style="background-color: #f5bdd93c">
    <header>
      <div class="header__text">
        <div class="header__title">
          <h1>Establecimientos</h1>
          
        </div>
        <div class="header__actions">
          <button class="button button--secondary float"
            @click.prevent="savePaymentConfig">
            <img src="~/assets/images/save-green.png"
              alt="" /> Guardar
          </button>
        </div>
      </div>
    </header>
    <div class="home__content">
      <form class="form">
        <div class="form__group">
          <div class="two-columns">
           

            <BaseSelect v-model="taxes.user"
              label="User"
              :options="users"
              :disabled="false" />



            <h2 class="full-column margin-top-sm">Actualización Información</h2>
            <!-- <BaseInput
              v-model="taxes.aprobacion_pago1"
              label="Aprobación Pago"
              type="text"
              :disabled="true"
            /> -->
           
            <!-- <BaseInput
              v-model="taxes.Tipo_cuenta"
              label="Tipo de Cuenta"
              type="text"
              :disabled="true"
            /> -->
            <BaseInput v-model="taxes.nombre"
              label="Nombre"
              type="text"
              :disabled="false" />
            <!--<BaseInput
              v-model="taxes.Banco_cooperativa"
              label="Banco Cooperativa"
              type="text"
              :disabled="true"
            /> -->

          
            <BaseInput v-model="taxes.ruc"
              label="Ruc"
              type="text"
              :disabled="false" />

            
           
            <BaseInput v-model="taxes.telefono"
              label="Telefono"
              type="text"
              :disabled="false" />
           
           
            <BaseInput v-model="taxes.correo"
              label="Correo"
              type="text"
              placeholder="00000000" />
            <BaseInput v-model="taxes.fechainicio"
              label="Fecha Inicio"
              type="text"
              placeholder="00000000" />
           
            <BaseInput v-model="taxes.fechafin"
              label="Fecha Fin"
              type="text" />
           
           
           
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useToast } from "vue-toastification";
import BaseInput from "~/components/common/inputs/base-input.vue";

import { useAuthStore } from "~~/store/auth";
import { ref } from "vue";

definePageMeta({
  // name: "establecimientosPage",
  components: {
    BaseInput,

  },
  layout: "private",
  middleware: ["auth"],
});
const toast = useToast();
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();



onMounted(() => {
  // // console.log(app.$notify)
});

const {
  public: { baseURL },
} = useRuntimeConfig();

// console.log(route);
const establecimientos = ref<any>(null);

if (route.params.id != "create") {
  const { data } = await useFetch<any[]>(
    `${baseURL}/establecimientos/${route.params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.getToken}`,
      },
    }
  );
  console.log("????????? ", data.value);

  establecimientos.value = data.value;
  //get selected user
  //   const {data} = await useFetch<any[]>(`${baseURL}/users/`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${authStore.getToken}`,
  //   },
  // });
}


const users = ref<any>([]);
const { data } = await useFetch<any[]>(`${baseURL}/users`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authStore.getToken}`,
  },
});
users.value = data.value;
users.value.map((user: any) => {
  user.text = user.username;
  user.value = user._id;
});
console.log(users.value);



const taxes = {
  nombre: "",
  ruc: "",
  telefono: "",
  correo: "",
  fechainicio: "",
  fechafin: "",
  user: "",
};





if (establecimientos.value !== null) {


  const userData: any = establecimientos.value;
  watchEffect(() => {
    // Your statement or code block to run whenever 'myRef' value changes
    
    taxes.nombre = userData.nombre;
    taxes.ruc = userData.ruc;
    taxes.telefono = userData.telefono;
    taxes.correo = userData.correo;
    taxes.fechainicio = userData.fechainicio;
    taxes.fechafin = userData.fechafin; // changes by zee
    
    //taxes.user = userData.user.id;
  });
}



const savePaymentConfig = async () => {

  const saveObject = {


    nombre: taxes.nombre,
    ruc: Number(taxes.ruc),
    telefono: Number(taxes.telefono),
    correo: taxes.correo,
    fechainicio: taxes.fechainicio,
    fechafin: taxes.fechafin,



  };

  const configToUpdate = establecimientos.value;
  // // console.log(existingUser);
  // console.log("data", saveObject);
  if (route.params.id != "create") {
    const { data: updatedData, error: updateError } = await useFetch<any[]>(
      `${baseURL}/establecimientos/${configToUpdate.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.getToken}`,
        },
        body: JSON.stringify(saveObject),
      }
    );
    // console.log("updated data ::", updatedData);
    // console.log(updateError);

    if (updateError) {
      // console.log(updateError);
      toast("Información Actualizada");
    } else {
      toast("Error al Actualizar");
    }
  } else {
    const { data: updatedData, error: updateError } = await useFetch<any[]>(
      `${baseURL}/establecimientos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.getToken}`,
        },
        body: JSON.stringify(saveObject),
      }
    );


  }




};




// Code by Saeed
// // console.log(data);
</script>
<style scoped>
header {
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--gray-200);
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

.float {
  position: fixed;
  top: 100px;
  right: 30px;
}

.form {
  max-width: 670px;
}

.two-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 326px), 1fr));
}

.full-column {
  grid-column: 1/-1;
}

.margin-top-sm {
  margin-top: 1rem;
}
</style>
