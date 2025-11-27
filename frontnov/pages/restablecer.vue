<template>
    <div class="login">
        <div class="login__container">
            <div class="login__content">
                <div class="login__text">
                    <img class="logo" src="~/assets/logos/logo_amc_black.png" alt="" />
                    <h1>Bienvenidos a la consulta de socios</h1>
                    <p>Introduce una nueva contraseña</p>
                </div>

                <form class="login__form" @submit.prevent="sendForm">
                    <h2>Restablecer contraseña</h2>
                    <BaseInput v-model="formForgot.password" :v="vuelidate.password" label="Contraseña" for="contraseña"
                        :has-icon="true" type="text">
                        <template #img>
                          
                        </template>
                    </BaseInput>
                    <BaseInput v-model="formForgot.confirmPassword" :v="vuelidate.confirmPassword"
                        label="Confirmar contraseña" for="confirmar contraseña" type="text" :has-icon="true">
                        <template #img>
                          
                        </template>
                    </BaseInput>
                    <BaseButton type="submit">
                        <template #text> Restablecer contraseña </template>
                    </BaseButton>
                </form>
            </div>
        </div>
        <div class="login__image">
            <span>Emprende este nuevo viaje al portal del futuro</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, minLength, required, sameAs } from "@vuelidate/validators";
import { POSITION, useToast } from "vue-toastification";
import BaseButton from "~/components/common/buttons/base-button.vue";
import BaseInput from "~/components/common/inputs/base-input.vue";
import { useAuthStore } from '~/store/auth';
definePageMeta({
    name: "RecuperarContrasenaPage",
    components: {
        BaseInput,
        BaseButton,
    }
})
const formForgot = reactive({
    password: '',
    confirmPassword: '',
});
const route = useRoute()
const code = route.query.code as string
const toast = useToast()
const rules = {
    password: {
        required: helpers.withMessage('La contraseña es requerida', required),
        minLength: helpers.withMessage('La contraseña debe tener al menos 8 caracteres', minLength(8)),
    },
    confirmPassword: {
        required: helpers.withMessage('La contraseña es requerida', required),
        minLength: helpers.withMessage('La contraseña debe tener al menos 8 caracteres', minLength(8)),
    },
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
        if (formForgot.password !== formForgot.confirmPassword) {
            toast.error('Las contraseñas no coinciden', {
                position: POSITION.BOTTOM_RIGHT,
                timeout: 3000,
                closeOnClick: true,
            })
            return;
        }
        const response = await authStore.resetPassword({
            password: formForgot.password,
            passwordConfirmation: formForgot.confirmPassword,
            code: code
        })
        if (!response.ok && response.status === 400) {
            const data = await response.json()
            if (data.message[0].messages[0].id === 'Auth.form.error.code.provide') {
                toast.error('El código de restablecimiento de contraseña es inválido, solicita uno nuevo', {
                    position: POSITION.BOTTOM_RIGHT,
                    timeout: 3000,
                    closeOnClick: true,
                })
                return;
            }
            toast.error('Ocurrio un error', {
                position: POSITION.BOTTOM_RIGHT,
                timeout: 3000,
                closeOnClick: true,
            })
            return;
        }
        toast.success('Se ha restablecido su contraseña, inicia sesión con sus nuevas credenciales', {
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
    background-image: url("../assets/images/backgroud-login.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
}

.login__image>span {
    font-size: var(--heading-2);
    line-height: var(--heading-line-height);
    color: var(--white);
    max-width: 497px;
}

.forgot-password-link {
    color: #2563EB;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
}

@media (max-width: 800px) {
    .login__image {
        display: none;
    }
}
</style>
  