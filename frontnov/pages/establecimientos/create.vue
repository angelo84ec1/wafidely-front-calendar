<script setup lang="ts">
import { useToast } from "vue-toastification";
import BaseInput from "~/components/common/inputs/base-input.vue";
import { useAuthStore } from "~~/store/auth";
import { Estable } from '~/models/establecimientos.models';
import { EstableCimientos } from "~~/common/interfaces/user.interface";




const {
    public: { baseURL },
} = useRuntimeConfig();
definePageMeta({
    components: {
        BaseInput,

    },
    layout: "private",
    middleware: ["auth"],
});
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

const defaultEstablecimientos: Estable= {
    _id: '',
    published_at: '',
    nombre: '',
    ruc: '',
    telefono: '',
    correo: '',
    fechainicio: '',
    fechafin: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    id: '',
};
const currentPagos = ref<any>(defaultEstablecimientos);
const pagos_cofig = ref<EstableCimientos[]>([]); // Initialize as an empty array

const getPagosCofig = async () => {
    const { data: dataDatos } = await useFetch<EstableCimientos[]>(
        `${baseURL}/establecimientos`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authStore.token,
            },
        }
    );
    if (dataDatos.value !== null) {
        pagos_cofig.value = dataDatos.value;
    } else {
        pagos_cofig.value = [];
    }
};
getPagosCofig()

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



const defaultTaxes = {

    nombre: "",
    ruc: "",
    telefono: "",
    correo: "",
    fechainicio: "",
    fechafin: "",
    user: "",
};

function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

let taxes = ref(deepCopy(defaultTaxes));

watch(currentPagos, () => {

    const userData: any = currentPagos.value;
    if (!userData || userData === undefined) {
        taxes.value = deepCopy(defaultTaxes);
        return
    }
   
    taxes.value.nombre = userData.nombre;
    taxes.value.ruc = userData.ruc;
    taxes.value.telefono = userData.telefono;
    taxes.value.correo = userData.correo;
    taxes.value.fechainicio= userData.fechainicio;
    taxes.value.fechafin = userData.fechafin;

});

const onChange = () => {
    if (userVal.value.length === 0) {
        userVal.value = [];
        currentPagos.value = defaultEstablecimientos;
        return;
    }
    getUserPagos();
    const lastItem = userVal.value.pop();
    userVal.value = [lastItem];
}



const savePaymentConfig = async () => {

    const saveObject = {
       
        nombre: taxes.value.nombre,
        ruc: Number(taxes.value.ruc),
        telefono: Number(taxes.value.telefono),
        correo: taxes.value.correo,
        fechainicio: taxes.value.fechainicio,
        fechafin: taxes.value.fechafin,
       
    };
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
    if (updatedData.value) {
        toast.success("Establecimiento guardado exitosamente!");
        router.push('/establecimientos');
        return;
    }

    if (updateError) {
        toast.error("el establecimiento no se pudo guardar");
        return;
    }

}




// Code by Ammar Ahmed
</script>
<template>
    <main style="background-color: #f1f8f8">
        <header>
            <div class="header__text">
                <div class="header__title">
                    <h1>Crear Establecimiento</h1>
                    
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
                       


                        <h2 class="full-column margin-top-sm">Campos a Crear</h2>


                        <BaseInput v-model="taxes.nombre"
                            label="Nombre"
                            type="text"
                            :disabled="false" />

                      
                        <BaseInput v-model="taxes.ruc"
                            label="Ruc"
                            type="text"
                            :disabled="false" />


                        <BaseInput v-model="taxes.telefono"
                            label="Teléfono"
                            type="text"
                            :disabled="false" />
                        
                        <BaseInput v-model="taxes.correo"
                            label="Correo"
                            type="text"
                            />
                        <BaseInput v-model="taxes.fechainicio"
                            label="Fecha Inicio"
                            type="text"
                            />
                       
                        <BaseInput v-model="taxes.fechafin"
                            label="Fecha Fin"
                            type="text" />
                        
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
:deep(.p-multiselect) {
    color: var(--gray-800);
    background-color: var(--white);
    border: 1px solid var(--gray-500);
}

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

label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>
  