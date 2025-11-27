<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Plan Contratado</h1>
          
        </div>
        <div class="header__actions">
          <button
            class="button button--secondary float"
            @click.prevent="savePaymentConfig"
          >
            <img src="~/assets/images/save-green.png" alt="" /> Guardar
          </button>
        </div>
      </div>
    </header>
    <div class="home__content">
      <form class="form">
        <div class="form__group">
          <div class="two-columns">
            <h2 class="full-column margin-top-sm">
              Seleccione el ID del socio
            </h2>
            <BaseSelect
              v-model="taxes.user"
              label="User"
              :options="users"
              :disabled="false"
            />

            <h2 class="full-column margin-top-sm">Information ecommerce</h2>
            <!-- <BaseInput
              v-model="taxes.aprobacion_pago1"
              label="Aprobación Pago"
              type="text"
              :disabled="true"
            /> -->
  
            <BaseInput
              v-model="taxes.fecha_compra"
              label="Fecha"
              type="text"
              :disabled="false"
              />

            <BaseInput
              v-model="taxes.producto"
              label="Producto"
              type="text"
              :disabled="false"
            />

            <BaseInput
              v-model="taxes.pais"
              label="Pais"
              type="text"
              :disabled="false"
            />

             <BaseInput
              v-model="taxes.descuento"
              label="Descuento"
              type="text"
              :disabled="false"
            />


              <BaseInput
              v-model="taxes.total"
              label="Total"
              type="text"
              :disabled="false"
            />


            <BaseInput
              v-model="taxes.estado"
              label="Estado"
              type="text"
              :disabled="false"
            />


                <BaseInput
              v-model="taxes.respapi1"
              label="Api Paypal"
              type="text"
              :disabled="false"
            />


            
                <BaseInput
              v-model="taxes.respapi2"
              label="Api Paypal 2"
              type="text"
              :disabled="false"
            />
             
           
           
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script setup lang="ts">
import { POSITION, useToast } from "vue-toastification";
import BaseInput from "~/components/common/inputs/base-input.vue";

import BaseSelect from "~/components/common/inputs/base-select.vue";
import { useAuthStore } from "~~/store/auth";
import { ref } from "vue";

definePageMeta({
  // name: "PagosPage",
  components: {
    BaseInput,
    BaseSelect,
  },
  layout: "private",
  middleware: ["auth"],
});
const toast = useToast();
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();



onMounted(() => {
  // console.log(app.$notify)
});

const {
  public: { baseURL },
} = useRuntimeConfig();

console.log(route);
const config_pagos = ref<any>(null);

if (route.params.id != "create") {
  const { data } = await useFetch<any[]>(
    `${baseURL}/config-pagos/${route.params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.getToken}`,
      },
    }
  );
  console.log("????????? ", data.value);
  
  config_pagos.value = data.value;
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
users.value.map((user) => {
  user.text = user.username;
  user.value = user._id;
});
console.log(users.value);



const taxes = {
  producto: "",
  fecha_compra: "",
  pais: "",
  descuento: "",
  total: "",
  estado: "",
  respapi1: "",
  respapi2: "",
  user: "",
};

onBeforeMount(() => {
  if (!authStore.user?.role.type.includes("admin")) {
    router.push("/personal");
    toast.error('Disculpas, usted no esta autorizado en visitar "Pagos" page');
  }
});




if (config_pagos.value !== null) {
  // console.log("pagos1", config_pagos[0].id);
  // console.log("pagos2", config_pagos[1].id);
  // console.log("userID", authStore.user?.id);
  // const userData:any = config_pagos.value.find(d => d.user.id === authStore.user?.id);
  const userData: any = config_pagos.value;
  watchEffect(() => {
    // Your statement or code block to run whenever 'myRef' value changes



  taxes.producto = userData.producto;
  taxes.fecha_compra = userData.fecha_compra;
  taxes.pais = userData.pais;
  taxes.descuento = userData.descuento;
  taxes.total = userData.total;
  taxes.estado = userData.estado;
  taxes.respapi1 = userData.respapi1;
  taxes.respapi2 = userData.respapi2;

  taxes.user = userData.user.id;
});
}



const savePaymentConfig = async () => {
  // changes by zee : there were typos in few of the arrays listed below, i fixed it.

	// console.log(">>>>>> ", tipo_cambios.value.find(
  //     (TipoCambio1) => TipoCambio1.id == taxes.tipo_cambio
  //   )?.text);
	// return
  // i want to see console value but no console is showing up
  // does tha depend on the internet browser?
  // console is showing correcly on my local, why it's not showing up on your machine?
  //  give me a minut, i'm fixing this issue in my local machine
  // ok
  // i figured it out. to fix this issue you need to modify your backend
  // and what should be changed?
  // that issue is that backend is taking these input field values in text like, "Urgente" but we need to store their id's
  // i could make a quick fix if you prefer
  // thank you very much for the quick solution. let me check first if it will work or not
  //ok // you can close the connection if you want, i will continue from my side
  // no problem send me the script when you have it please . ok
  // another select module works fine whit the same backend indicated
  const saveObject = {
    


    // aprobacion_pago1: Number(taxes.aprobacion_pago1),
    // aprobacion_pago2: aprobacion_pagos2.value.find(
    //   (aprobacionpago2) => aprobacionpago2.id === taxes.aprobacion_pago2.id
    // ),

    // aprobacion_pago2: taxes.aprobacion_pago2,
    // Numero_cuenta_pago2: taxes.Numero_cuenta_pago2,

    // aprobacion_pago3: taxes.aprobacion_pago3,
    // type_account3: typeAccount3.value,
    // account_number3: numeroCuentaPago3,
    // bankCooperativa3: bankCooperativa3.value,
    producto: taxes.producto, 
    fecha_compra: taxes.fecha_compra,
    pais: taxes.pais, 
    descuento: Number(taxes.descuento) ? Number(taxes.descuento) : 0, 
    total: Number(taxes.total) , 
    estado: taxes.estado,
    respapi1: taxes.respapi1, 
    respapi2: taxes.respapi2, 
    user: users.value.find((user) => user.id == taxes.user),
  };

  const configToUpdate = config_pagos.value;
  // console.log(existingUser);
  console.log("data", saveObject);
  if (route.params.id != "create") {
    const { data: updatedData, error: updateError } = await useFetch<any[]>(
      `${baseURL}/config-pagos/${configToUpdate.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.getToken}`,
        },
        body: JSON.stringify(saveObject),
      }
    );
    console.log("updated data ::", updatedData);
    console.log(updateError);
  } else {
    const { data: updatedData, error: updateError } = await useFetch<any[]>(
      `${baseURL}/config-pagos`,
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
// console.log(data);
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

.header__text > h1 {
  font-size: var(--heading-2);
}


.header__description > h1 {
  font-size: var(--heading-2);
}

.header__description > img {
  width: 56px;
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
