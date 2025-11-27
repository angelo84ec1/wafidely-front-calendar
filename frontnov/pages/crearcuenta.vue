<template>
    <div>
      <div class="login">
        <div class="login__container">
          <div class="login__content">
            <div class="login__text">
              <img class="logo" src="~/assets/logos/logo_amc_black.png" alt="" />
              <h1>Bienvenidos a crear tu Cuenta</h1>
              <p>
               Estas a pocos pasos de tener tu asistrencia
              </p>
            </div>
  
            <form class="login__form" @submit.prevent="register">
              <h2>Crear Cuenta</h2>
              <BaseSelect v-model="formLogin.documentType" :v="vuelidate.documentType" label="Tipo de identificación"
                for="tipo de identificacion" :options="options" />
              <BaseInput v-model="formLogin.idDocument" :v="vuelidate.idDocument" label="Identificación" for="id"
                :has-icon="true">
                <template #img>
                  <img src="~/assets/images/account_rosado.png" alt="User icon" />
                </template>
              </BaseInput>
              <BaseInput v-model="formLogin.email" :v="vuelidate.email" label="Email" for="email"
                :has-icon="true">
                <template #img>
                  <img src="~/assets/images/email_estableci.png" alt="Email icon" />
                </template>
              </BaseInput>
              <BaseInput v-model="formLogin.establecimientos" :v="vuelidate.establecimientos" label="Establecimientos" for="establecimientos"
                :has-icon="true">
                <template #img>
                  <img src="~/assets/images/estable_mientos.png" alt="User icon" />
                </template>
              </BaseInput>
              <BaseInput v-model="formLogin.password" :v="vuelidate.password" label="Contraseña" for="password"
                name="password" :has-icon="true" type="password">
                <template #img>
                  <img src="~/assets/images/Password.png" alt="Left icon" />
                </template>
              </BaseInput>
              <BaseButton type="submit" :disabled="loading">
                <template #text>
                  <span v-if="loading">
                    <Loader />
                  </span>
                  <span v-else>
                    Crear Cuenta
                  </span>
                </template>
              </BaseButton>
              <NuxtLink class="forgot-login" to="/login">Login</NuxtLink>
            </form>
          </div>
        </div>
        <div class="login__image">
          <span></span>
        </div>
      </div>
      <AccountNotExistModal v-if="showModal" @close="hideAccountNotExistModal" @action="sendMailto" />
    </div>
  </template>
  <script lang="ts" setup>
  import useVuelidate from "@vuelidate/core";
  import { helpers, required } from "@vuelidate/validators";
  import { POSITION, useToast } from "vue-toastification";
  import BaseButton from "~/components/common/buttons/base-button.vue";
  import BaseInput from "~/components/common/inputs/base-input.vue";
  import BaseSelect from "~/components/common/inputs/base-select.vue";
  import Loader from "~/components/login/Loader.vue";
  import { useAuthStore } from '~/store/auth';
  import AccountNotExistModal from "~/components/login/AccountNotExistModal.vue";
  definePageMeta({
    name: "CrearCuentaPage",
    components: {
      BaseInput,
      BaseSelect,
      BaseButton,
      AccountNotExistModal,
      Loader
    }
  })
  const options = ref([
    { text: "Pasaporte", value: "pasaporte" },
    { text: "Cedula", value: "cedula" },
    { text: "RUC", value: "ruc" },
  ]);
  const formLogin = reactive({
    documentType: 'pasaporte',
    idDocument: '',
    password: '',
    establecimientos: '',
    email: ''
  });
  
  const showModal = ref(false)
  const loading = ref(false); // Define la referencia para mostrar/ocultar el loader

  const showAccountNotExistModal = () => {
    showModal.value = true
  }
  
  const hideAccountNotExistModal = () => {
    showModal.value = false
  }
  
  const { public: { MAILTO } } = useRuntimeConfig()
  
  const sendMailto = () => {
    window.open(`mailto:${MAILTO}`)
  }
  
  const toast = useToast()
  const rules = {
    documentType: {
      required: helpers.withMessage("El tipo de documento es requerido", required),
    },
    idDocument: {
      required: helpers.withMessage("El documento es requerido", required),
    },
    password: {
      required: helpers.withMessage("La contraseña es requerida", required),
    },
    establecimientos: {
      required: helpers.withMessage("La establecimientos es requerida", required),
    },
    email: {
      required: helpers.withMessage("El email es requerido", required),
    },
  };
  const vuelidate = useVuelidate(rules, formLogin)
  const authStore = useAuthStore()
  const router = useRouter()
  const register = async () => {
      try {
        vuelidate.value.$touch();
        if (!await vuelidate.value.$validate()) {
          return;
        }
        loading.value = true; // Show the loader
        const res = await fetch("https://amcacmin.automotorsclub.com/establecimientos", {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre:formLogin.establecimientos,
            correo:formLogin.email
          }),
        }
        )
        const establecimiento = await res.json()
        const { response, data } = await authStore.register({
          documentType: formLogin.documentType,
          identifier: formLogin.idDocument,
          password: formLogin.password,
          establecimientos: establecimiento.id,
          email: formLogin.email,
          role: "establecimiento"
        })
        if (response.status === 400) {
          if (data.message[0].messages[0].id === "Auth.form.error.account.not-exist") {
            showAccountNotExistModal()
            return;
          }
          if (data.message[0].messages[0].id === "Auth.form.error.invalid") {
            toast.error('Usuario o contraseña incorrectos', {
              position: POSITION.BOTTOM_RIGHT,
              timeout: 3000,
              closeOnClick: true,
            })
            return;
          }
        }
        authStore.user = data.user;
        authStore.token = data.jwt;
        if (authStore.getUser?.role.name === 'admin') {
          await router.push('/usuarios')
        } else {
          await router.push('/resumen')
        }
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false; // Hide the loader
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
    background-image: url("../assets/images/crearcuenta.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  
  .login__image>span {
    font-size: var(--heading-2);
    line-height: var(--heading-line-height);
    color: var(--white);
    max-width: 317px;
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
  }
  </style>
