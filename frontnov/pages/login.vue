<template>
  <!-- Container -->
  <div class="flex flex-wrap min-h-screen w-full content-center justify-center bg-[#fbf8ff] py-10">
    
    <!-- Login component -->
    <div class="flex shadow-md">
      <!-- Login form -->
      <div class="flex flex-wrap content-center justify-center rounded-l-md bg-white" style="width: 24rem; height: 32rem;">
        <div class="w-72">
          <!-- Heading -->
          <h1 class="text-xl font-semibold">Bienvenidos</h1>
          <small class="text-gray-400">Ingresa tu usuario y contraseña</small>
  
          <form class="mt-4" @submit.prevent="login">
     
            <!-- Selector de tipo de documento -->
            <div class="mb-3">
              <BaseSelect
                class="mb-2 block text-sm font-normal"
                v-model="formLogin.documentType"
                :v="vuelidate.documentType"
                label="Tipo de Identificación"
                for="documentType"
                :options="options"
                :has-icon="true"
              >
                <template #icon>
                  <img src="~/assets/icons/MaterialSymbolsMarkEmailRead.png" width="1.5em" height="1.5em" viewBox="0 0 24 24" />
                </template>
              </BaseSelect>
            </div>
  
            <!-- Input para el documento/email -->
            <div class="mb-3">
              <BaseInput
                class="svgIcon mb-2 block text-sm font-normal"
                v-model="formLogin.idDocument"
                :v="vuelidate.idDocument"
                :label="getDocumentLabel()"
                for="idDocument"
                :has-icon="true" 
                :placeholder="getDocumentPlaceholder()"
                :type="formLogin.documentType === 'Email' ? 'email' : 'text'"
              >
                <template #icon>
                  <img src="~/assets/icons/MaterialSymbolsMarkEmailRead.png" width="1.5em" height="1.5em" viewBox="0 0 24 24" />
                </template>
              </BaseInput>
            </div>
  
            <!-- Input para contraseña -->
            <div class="mb-3">
              <BaseInput 
                class="mb-2 block text-sm font-normal" 
                v-model="formLogin.password"
                :v="vuelidate.password"
                label="Contraseña"
                for="password"
                name="password"
                :has-icon="true"
                placeholder="********" 
                :type="showPassword ? 'text' : 'password'"
              >
                <template #icon>
                  <img src="~/assets/icons/MaterialSymbolsPasswordRounded.png" width="1.5em" height="1.5em" viewBox="0 0 24 24" />
                </template>
                <template #icon-right>
                  <button 
                    type="button"
                    @click="togglePasswordVisibility"
                    class="text-gray-400 hover:text-gray-600"
                  >
                    {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                  </button>
                </template>
              </BaseInput>
            </div>
  
            <div class="mb-3 flex flex-wrap content-center">
              <NuxtLink class="text-xs font-normal text-[#232c4d]" to="/recuperar">¿Olvidaste tu contraseña?</NuxtLink>
            </div>
  
            <div class="mb-3">
              <BaseButton 
                class="mb-1.5 block w-full text-center text-white bg-[#232c4d] hover:bg-[#40496d] px-2 py-1.5 rounded-md" 
                type="submit" 
                :disabled="loading"
              >
                <template #text>
                  <span v-if="loading">
                    <Loader />
                  </span>
                  <span v-else>
                    Ingresar
                  </span>
                </template>
              </BaseButton>
            </div>
          </form>
  
          <!-- Footer -->
        </div>
        <AccountNotExistModal v-if="showModal" @close="hideAccountNotExistModal" @action="sendMailto" />
      </div>
  
      <!-- Login banner -->
      <div class="deg flex flex-wrap content-center justify-center rounded-r-md responsive-hide" style="width: 24rem; height: 32rem; overflow: hidden;">
        <img class="max-w-full max-h-full rounded-r-md" src="~/assets/images/wafidelyblanco.png" alt="Logo">
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts" setup>
  import useVuelidate from "@vuelidate/core";
  import { helpers, required, email } from "@vuelidate/validators";
  import { POSITION, useToast } from "vue-toastification";
  import BaseButton from "~/components/common/buttons/base-button.vue";
  import BaseInput from "~/components/common/inputs/base-input.vue";
  import BaseSelect from "~/components/common/inputs/base-select.vue";
  import Loader from "~/components/login/Loader.vue";
  import { useAuthStore } from '~/store/auth';
  import { defineComponent, ref, reactive, computed } from 'vue';
  import AccountNotExistModal from "~/components/login/AccountNotExistModal.vue";
  
  definePageMeta({
    name: "LoginPage",
    components: {
      BaseInput,
      BaseSelect,
      BaseButton,
      AccountNotExistModal,
      Loader
    },
  })
  
  const options = ref([
    { text: "Cédula / DNI / ID Nacional", value: "cedula" },
    { text: "Ruc / Nut / Nit", value: "ruc" },
    { text: "Pasaporte", value: "pasaporte" },
    { text: "Email", value: "Email" },
  ]);
  
  const formLogin = reactive({
    documentType: 'Email', // Cambiar default a Email
    idDocument: '',
    password: '',
  });
  
  const showPassword = ref(false);
  const loading = ref(false);
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  const showModal = ref(false)
  
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
  
  // Funciones helper para labels y placeholders dinámicos
  const getDocumentLabel = () => {
    switch (formLogin.documentType) {
      case 'cedula':
        return 'Cédula / DNI / ID Nacional'
      case 'ruc':
        return 'Ruc / Nut / Nit'
      case 'pasaporte':
        return 'Pasaporte'
      case 'Email':
        return 'Email'
      default:
        return 'Documento'
    }
  }
  
  const getDocumentPlaceholder = () => {
    switch (formLogin.documentType) {
      case 'cedula':
        return 'ejm: 1234567890'
      case 'ruc':
        return 'ejm: 1234567890001'
      case 'pasaporte':
        return 'ejm: AB123456'
      case 'Email':
        return 'ejm: juan@gmail.com'
      default:
        return 'Ingresa tu documento'
    }
  }
  
  const toast = useToast()
  
  // Reglas de validación dinámicas
  const rules = computed(() => {
    const baseRules = {
      documentType: {
        required: helpers.withMessage("El tipo de documento es requerido", required),
      },
      idDocument: {
        required: helpers.withMessage(`El ${getDocumentLabel().toLowerCase()} es requerido`, required),
      },
      password: {
        required: helpers.withMessage("La contraseña es requerida", required),
      },
    };
  
    // Agregar validación de email solo si el tipo es Email
    if (formLogin.documentType === 'Email') {
      baseRules.idDocument.email = helpers.withMessage("Debe ser un email válido", email);
    }
  
    return baseRules;
  });
  
  const vuelidate = useVuelidate(rules, formLogin)
  const authStore = useAuthStore()
  const router = useRouter()
  
  if (authStore.isAuthenticated) {
      router.push({ path: "/" })
  }
  
  const login = async () => {
    try {
      vuelidate.value.$touch();
      if (!await vuelidate.value.$validate()) {
        console.log('Errores de validación:', vuelidate.value.$errors);
        return;
      }
      
      loading.value = true;
      
      // Debug: Mostrar qué datos se están enviando
      const loginPayload = {
        documentType: formLogin.documentType,
        identifier: formLogin.idDocument,
        password: formLogin.password,
      };
      
      console.log('🚀 Payload enviado al backend:', loginPayload);
      console.log('📄 Tipo de documento:', formLogin.documentType);
      console.log('🆔 Documento/Email:', formLogin.idDocument);
      console.log('🔒 Password length:', formLogin.password.length);
      
      const { response, data } = await authStore.login(loginPayload);
      
      console.log('📡 Response status:', response?.status);
      console.log('📊 Response data:', data);
      
      if (response?.status === 400) {
        if (data?.message?.[0]?.messages?.[0]?.id === "Auth.form.error.account.not-exist") {
          showAccountNotExistModal()
          return;
        }
        if (data?.message?.[0]?.messages?.[0]?.id === "Auth.form.error.invalid") {
          toast.error('Usuario o contraseña incorrectos', {
            position: POSITION.BOTTOM_RIGHT,
            timeout: 4000,
            closeOnClick: true,
          })
          return;
        }
        // Error genérico para otros casos
        toast.error('Error al iniciar sesión. Verifica tus datos.', {
          position: POSITION.BOTTOM_RIGHT,
          timeout: 4000,
          closeOnClick: true,
        })
        return;
      }
      
      // Verificar pagos pendientes
      const config_res = await fetch(`https://wafiapi.wafidely.com/config-pagos?user=${authStore.user?.id}&estado=Pending`)
      const config_res_json = await config_res.json()
      console.log('💳 Pagos pendientes:', config_res_json)
      
      if (config_res_json.length > 0) {
        toast.error('Tienes una compra pendiente de pago', {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          closeOnClick: true,
        })
        return;
      }
  
      // Redireccionar según el rol
      if (authStore.user?.role.name == 'admin' || authStore.user?.role.name == 'establecimiento') {
        await router.push('/resumen')
      } else {
        await router.push('/resumen')
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      toast.error('Error de conexión. Intenta nuevamente.', {
        position: POSITION.BOTTOM_RIGHT,
        timeout: 4000,
        closeOnClick: true,
      })
    } finally {
      loading.value = false;
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
  
  .login__image>span {
    font-size: var(--heading-2);
    line-height: var(--heading-line-height);
    color: var(--white);
    max-width: 497px;
  }
  
  .forgot-password-link {
    color: #38f5b3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
  }
  
  .deg {
    background-image: linear-gradient(360deg, #232c4d, #38f5b3);
  }
  
  @media (max-width: 800px) {
    .login__image {
      display: none;
    }
  }
  
  @media (max-width: 768px) {
    .responsive-hide {
      display: none;
    }
  }
  </style>