<template>
    <main>
        <header>
            <div class="header__text">
                <div class="header__description">
                    <h1>Notificaciones</h1>
                    <img src="~/assets/icons/mail-icon.png" alt="mail-icon" />
                </div>
            </div>
        </header>
        <div class="home__content">
            <form class="form">
                <div class="form__group">
                    <div>
                        <div class="full-column">
                            <span style="font-weight: 700;">Enviar a</span>
                            <div style="display: flex; align-items: center; gap: 16px;">
                                <img v-if="user && user.foto.url" :src="getProfilePicture(user.foto.url)"
                                    :alt="user.nombres ?? 'profile-picture'" class="header__photo">
                                <div style="font-weight: 500; font-size: 16px; line-height: 24px;">{{ user?.nombres }}
                                    {{ user?.apellidos }}
                                    <span v-if="(users.length > 1)">y&nbsp;</span>
                                    <span v-if="(users.length > 1)"
                                        style="color: #008583; font-style: bold; font-weight: 600;">{{ (users.length -
                                                1)
                                        }}&nbsp;</span>
                                    <span v-if="(users.length > 1)">más</span>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 24px;">
                            <BaseInput v-model="formSend.subject" :v="vuelidate.subject" label="Titulo"
                                class="full-column" />
                        </div>
                        <div style="margin-top: 24px;">
                            <BaseTextArea v-model="formSend.message" :v="vuelidate.message" label="Detalle"
                                class="full-column" height="244px" />
                        </div>
                        <div style="margin-top: 24px;">
                            <FileInput label="Archivo adjunto" :v="vuelidate.file" class="full-column" placeholder=""
                            @update:modelValue="formSend.file = $event" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="buttons">
            <button class="button button--primary" @click.prevent="send">
                <img src="~/assets/images/notification-white.png" alt="notificacion-icon" />Enviar notificación
            </button>
            <button class="button button--terciary" @click="goBack">Cancelar</button>
        </div>
    </main>
</template>
<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import BaseInput from '~/components/common/inputs/base-input.vue';
import BaseTextArea from '~/components/common/inputs/base-textarea.vue';
import FileInput from '~/components/common/inputs/file-input.vue';
import { DatosPersonales } from '~~/common/interfaces/user.interface';
import { useAuthStore } from '~~/store/auth';
definePageMeta({
    name: 'NotificacionesEnviarPage',
    layout: 'private',
    componets: {
        BaseInput,
        BaseTextArea,
        FileInput
    }
})

const route = useRoute()
const router = useRouter()
const users = ref<string[]>([])

const formSend = reactive<{ subject: string, message: string, file: File | null }>({
    subject: '',
    message: '',
    file: null
})

const rules = {
    subject: {
        required: helpers.withMessage('El campo es requerido', required)
    },
    message: {
        required: helpers.withMessage('El campo es requerido', required)
    },
    file: {}
}

const vuelidate = useVuelidate(rules, formSend)

users.value = route.query.users?.split(',') || []
const { public: { baseURL } } = useRuntimeConfig()
const authStore = useAuthStore()
const { data: user } = useFetch<DatosPersonales>(`${baseURL}/datos-personales/${users.value[0]}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
    },
})

if (users.value.length === 0) {
    router.push('/notificaciones')
}
const goBack = () => {
    router.push('/notificaciones')
}

const getProfilePicture = (url: string) => `${baseURL}${url}`

const toast = useToast()

const send = () => {
    try {
        const formData = new FormData()
        formData.append('users', JSON.stringify(users.value))
        formData.append('subject', formSend.subject)
        formData.append('message', formSend.message)
        if (formSend.file !== null)  {
            formData.append('attachment', formSend.file)
        }

        const { error } = useFetch(`${baseURL}/notificaciones/enviar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authStore.token}`
            },
            body: formData
        })
        if (error.value) {
            toast.error('Error al enviar la notificación')
        } else {
            toast.success('Notificación enviada')
            router.push('/notificaciones')
        }
    } catch (error) {
        console.log(error)
    }
}
</script>
<style scoped>
.home__content {
    padding: 1rem 0;
}

main {
    padding: 0 1rem 1rem 1rem;
}

header {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid var(--gray-200);
}

.header__description>h1 {
    font-size: var(--heading-2);
}

.header__description>img {
    width: 56px;
}

.header__text {
    flex-direction: column;
    gap: 1rem;
    flex-wrap: wrap;
    display: flex;
}

.header__description {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.quote {
    max-width: 550px;
}

.form {
    max-width: 670px;
}

.two-columns {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(327px, 1fr));
}

label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

label>textarea {
    height: 160px;
}

label>input {
    height: 40px;
    padding: 0 0.5rem;
}

.full-column {
    grid-column: 1/-1;
}

input[type="file"] {
    visibility: hidden;
}

.input--file {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--white);
    border: 1px solid var(--gray-500);
    height: 160px;
}

.input--file>svg {
    margin-bottom: 1rem;
    width: 3rem;
    height: 3rem;
    color: var(--gray-700);
}

.input--file>span {
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 1.4;
    color: var(--gray-700);
}

.input__file-label {
    color: var(--gray-900);
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
}

.header__photo {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

@media (max-width: 1060px) {
    .button>img {
        width: 1.5rem;
    }
}
</style>
