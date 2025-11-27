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
          <small class="text-gray-400">Crea tu Landing Page por 5 dias GRATIS</small>
  
          <form class="mt-4" @submit.prevent="register">
     
            <div class="mb-3">
  
              <BaseSelect v-model="formLogin.documentType" :v="vuelidate.documentType" label="Tipo de identificación"
                  for="tipo de identificacion" :options="options" />
                <BaseInput v-model="formLogin.idDocument" :v="vuelidate.idDocument" label="Identificación" for="id"
                  :has-icon="true">
                  <template #img>
                    <img src="~/assets/images/account_rosado.png" alt="User icon" class="image-container"/>
                  </template>
                </BaseInput>
                <BaseInput class="svgIcon mb-2 block text-sm font-normal" v-model="formLogin.email" :v="vuelidate.email" label="Email" for="email"
                  :has-icon="true">
                  <template #img>
                    <img src="~/assets/images/email_estableci.png" alt="Email icon" />
                  </template>
                </BaseInput>
                <BaseInput v-model="formLogin.establecimientos" :v="vuelidate.establecimientos" label="Nombre del establecimiento" label-class="text-sm" for="establecimientos"
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
                <BaseButton class="mt-4 mb-1.5 block w-full text-center text-white bg-[#232c4d] hover:bg-[#40496d] px-2 py-1.5 rounded-md" type="submit" :disabled="loading">
                  <template #text>
                    <span v-if="loading">
                      <Loader />
                    </span>
                    <span v-else>
                      Crear Cuenta
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
      <div class="deg flex flex-wrap content-center justify-center rounded-r-md  responsive-hide" style="width: 24rem; height: 32rem; overflow: hidden;">
    <img class="max-w-full max-h-full rounded-r-md" src="~/assets/images/wafidelyblanco.png" alt="Logo">
  </div>
  
    </div>
  
   
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
      layout: "default",
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
    const loading = ref(false);
  
    const showAccountNotExistModal = () => {
      showModal.value = true
    }
    
    const hideAccountNotExistModal = () => {
      showModal.value = false
    }
    
    const { public: { MAILTO, baseURL } } = useRuntimeConfig()
    
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
        required: helpers.withMessage("El establecimiento es requerido", required),
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
          
          loading.value = true;
          
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('🔵 Iniciando proceso de registro...');
          console.log('📧 Email:', formLogin.email);
          console.log('🏢 Establecimiento:', formLogin.establecimientos);
          
          // ✅ Paso 0: Verificar duplicados ANTES de crear nada
          console.log('🔍 Paso 0: Verificando duplicados...');
          const duplicateCheck = await authStore.checkDuplicates({
            email: formLogin.email,
            documentType: formLogin.documentType,
            identifier: formLogin.idDocument,
            establecimientos: formLogin.establecimientos
          });
          
          if (duplicateCheck.hasErrors) {
            console.log('❌ Duplicados encontrados:', duplicateCheck.errors);
            
            // Mostrar cada error encontrado
            duplicateCheck.errors.forEach(error => {
              toast.error(error, {
                position: POSITION.BOTTOM_RIGHT,
                timeout: 4000,
                closeOnClick: true,
              });
            });
            
            loading.value = false;
            return;
          }
          
          console.log('✅ No se encontraron duplicados, continuando...');
          
          // ✅ Paso 1: Crear establecimiento primero
          console.log('🏗️ Paso 1: Creando establecimiento...');
          const resEstablecimiento = await fetch(`${baseURL}/establecimientos`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: formLogin.establecimientos,
              correo: formLogin.email
            }),
          });
          
          if (!resEstablecimiento.ok) {
            const errorData = await resEstablecimiento.json();
            console.error('❌ Error al crear establecimiento:', errorData);
            toast.error('Error al crear el establecimiento', {
              position: POSITION.BOTTOM_RIGHT,
              timeout: 3000,
            });
            loading.value = false;
            return;
          }
          
          const establecimiento = await resEstablecimiento.json();
          console.log('✅ Establecimiento creado con ID:', establecimiento.id);
          
          // ✅ Paso 2: Registrar usuario con el establecimiento
          console.log('👤 Paso 2: Registrando usuario...');
          const { response, data } = await authStore.register({
            documentType: formLogin.documentType,
            identifier: formLogin.idDocument,
            password: formLogin.password,
            establecimientos: establecimiento.id,
            email: formLogin.email,
            role: "establecimiento"
          });
          
          console.log('📦 Respuesta de registro:', response.status);
          
          if (response.status === 400) {
            if (data.message?.[0]?.messages?.[0]?.id === "Auth.form.error.account.not-exist") {
              showAccountNotExistModal();
              loading.value = false;
              return;
            }
            if (data.message?.[0]?.messages?.[0]?.id === "Auth.form.error.invalid") {
              toast.error('Usuario o contraseña incorrectos', {
                position: POSITION.BOTTOM_RIGHT,
                timeout: 3000,
                closeOnClick: true,
              });
              loading.value = false;
              return;
            }
            
            toast.error('Error en el registro: ' + (data.message || 'Intenta de nuevo'), {
              position: POSITION.BOTTOM_RIGHT,
              timeout: 3000,
            });
            loading.value = false;
            return;
          }
          
          if (!response.ok) {
            toast.error('Error al crear la cuenta', {
              position: POSITION.BOTTOM_RIGHT,
              timeout: 3000,
            });
            loading.value = false;
            return;
          }
          
          console.log('✅ Usuario registrado con ID:', data.user.id);
          console.log('🔍 Establecimiento en respuesta:', data.user?.establecimiento);
          
          // ✅ Paso 3: Verificar si el establecimiento se asignó
          if (!data.user?.establecimiento) {
            console.log('⚠️ El establecimiento NO se asignó durante el registro');
            console.log('🔗 Asignando establecimiento manualmente...');
            
            // Asignar el establecimiento al usuario mediante PUT
            const updateResponse = await fetch(`${baseURL}/users/${data.user.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.jwt}`
              },
              body: JSON.stringify({
                establecimiento: establecimiento.id
              })
            });
            
            if (updateResponse.ok) {
              const updatedUser = await updateResponse.json();
              console.log('✅ Establecimiento asignado correctamente');
              console.log('🏢 Establecimiento ID:', updatedUser.establecimiento?.id || establecimiento.id);
              
              // Actualizar el usuario en el store
              data.user.establecimiento = establecimiento.id;
            } else {
              console.error('❌ Error al asignar establecimiento');
              toast.warning('Usuario creado pero el establecimiento no se pudo asignar automáticamente');
            }
          } else {
            console.log('✅ Establecimiento asignado durante el registro:', data.user.establecimiento);
          }
          
          // ✅ Paso 4: Guardar autenticación y refrescar usuario
          console.log('💾 Guardando autenticación...');
          authStore.token = data.jwt;
          
          // Obtener usuario completo con establecimiento poblado
          console.log('🔄 Obteniendo usuario completo con establecimiento...');
          const userResponse = await fetch(`${baseURL}/users/me?populate=establecimiento`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.jwt}`
            }
          });
          
          if (userResponse.ok) {
            const completeUser = await userResponse.json();
            authStore.user = completeUser;
            console.log('✅ Usuario completo cargado');
            console.log('🏢 Establecimiento final:', completeUser.establecimiento?.id);
          } else {
            console.warn('⚠️ No se pudo cargar usuario completo, usando datos básicos');
            authStore.user = data.user;
          }
          
          authStore.saveAuth();
          
          toast.success('¡Cuenta creada exitosamente!', {
            position: POSITION.BOTTOM_RIGHT,
            timeout: 3000,
          });
          
// ✅ Paso 5: Redirigir según rol
console.log('🚀 Redirigiendo a la aplicación...');
if (authStore.getUser?.role?.name === 'admin') {
  await router.push('/usuarios');
} else {
  // Redirigir a facturación con parámetro welcome para mostrar el modal
  await router.push('/facturacion?welcome=true');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Proceso de registro completado exitosamente');
          
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('✅ Proceso de registro completado exitosamente');
          
        } catch (error) {
          console.error('💥 Error en registro:', error);
          toast.error('Error inesperado al crear la cuenta');
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