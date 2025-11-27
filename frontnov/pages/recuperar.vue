<template>




    <!-- Container -->
    <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-[#fbf8ff] py-10">
      
      <!-- Login component -->
      <div class="flex shadow-md">
        <!-- Login form -->
        <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white" style="width: 24rem; height: 32rem;">
          <div class="w-72">
            <!-- Heading -->
            <h1 class="text-xl font-semibold">Restablecer contraseña</h1>
            <small class="text-gray-400">Ingresa tu email </small>
    
            <form class="login__form" @submit.prevent="sendForm">
       
             
    
    
    
                    <BaseInput   class="svgIcon mb-2 block text-sm font-normal" v-model="formForgot.email" :v="vuelidate.email" label="Correo electrónico" for="id"
                        :has-icon="true">
                        <template #icon>
                            <img src="~/assets/icons/MaterialSymbolsMarkEmailRead.png"  width="1.5em" height="1.5em" viewBox="0 0 24 24" />
                        </template>
                    </BaseInput>
                    <BaseButton class="mb-1.5 block w-full text-center text-white bg-[#232c4d] hover:bg-[#40496d] px-2 py-1.5 rounded-md" type="submit" :disabled="loading">
                  <template #text>
                    <span v-if="loading">
                      <Loader />
                    </span>
                    <span  v-else>
                        Recuperar contraseña
               
                    </span>
                  </template>
                </BaseButton>
                  

                    <div class="mb-3 flex flex-wrap content-center">
            <NuxtLink class="text-xs font-nornmal text-[#232c4d] orgot-login" to="/login">Login</NuxtLink>
     
          </div>

                </form>
                </div>
            </div>
              </div>
            
    
        <!-- Login banner -->
        <div class="deg flex flex-wrap content-center justify-center rounded-r-md  responsive-hide" style="width: 24rem; height: 32rem; overflow: hidden;">
      <img class="max-w-full max-h-full rounded-r-md" src="~/assets/images/wafidelyblanco.png" alt="Logo">
    </div>
    

</div>
    
    </template>
    
    <script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { POSITION, useToast } from "vue-toastification";
import BaseButton from "~/components/common/buttons/base-button.vue";
import BaseInput from "~/components/common/inputs/base-input.vue";
import Loader from "~/components/login/Loader.vue";
import { useAuthStore } from '~/store/auth';
definePageMeta({
    name: "RecuperarPage",
    components: {
        BaseInput,
        BaseButton,
        Loader,
    }
})
const formForgot = reactive({
    email: ''
});

const loading = ref(false); // Define la referencia para mostrar/ocultar el loader

const toast = useToast()
const rules = {
    email: {
        required: helpers.withMessage("Este campo es requerido", required),
        email: helpers.withMessage("Este campo debe ser un correo electrónico", email)
    }
};
const vuelidate = useVuelidate(rules, formForgot)
const authStore = useAuthStore()
const router = useRouter()
const sendForm = async () => {
    try {
        vuelidate.value.$touch();
        if (!await vuelidate.value.$validate()) {
            return;
        }
      
    loading.value = true; // Show the loader
        const response = await authStore.forgotPassword({
            email: formForgot.email
        })
        if (!response.ok && response.status === 400) {
            toast.error('Ocurrio un error', {
                position: POSITION.BOTTOM_RIGHT,
                timeout: 3000,
                closeOnClick: true,
            })
            return;
        }
        toast.success('Se ha enviado un correo electrónico para restablecer su contraseña', {
            position: POSITION.BOTTOM_RIGHT,
            timeout: 3000,
            closeOnClick: true,
        })
        router.push('/login')
    } catch (error) {
        console.error(error);
    }
}
</script>
<style scoped>
.login {
    display: flex;
    min-height: 100vh;
}

.login>* {
    flex: 50% 1;
}

.login__content {
    max-width: 423px;
}

.login__container {
    display: grid;
    place-items: center;
    padding: 1rem;
}

.logo {
    width: 250px;
    height: auto;
}

.login__text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.login__form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.login__image {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 1rem;
    background-image: url("../assets/images/bann_password1.png");
    background-repeat: no-repeat;
    background-size: cover;
}

.login__image>span {
    font-size: var(--heading-2);
    line-height: var(--heading-line-height);
    color: var(--white);
    max-width: 497px;
}

.deg {
background-image: linear-gradient(360deg, #232c4d, #38f5b3);
}

.forgot-password-link {
    color: #2563EB;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
}

.forgot-login{
    color: #2563EB;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
    text-align: left;
  }


@media (max-width: 800px) {
    .login__image {
        display: none;
    }
    .responsive-hide {
    display: none;
  }
}
</style>
  
    