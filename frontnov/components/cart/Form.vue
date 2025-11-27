<script setup>

// Ruc : 171478965001
// pass: hBSe9Q47wUDEVEL
import { useToast } from 'vue-toastification';
import countryCode from "@/assets/data/countryCodes.json"
import { usePaymentStore } from '@/store/payment/index.js';
import { useRouter } from 'vue-router';
const pagomedioToken = useRuntimeConfig().public.pagomedioToken
console.log(pagomedioToken)



const toast = useToast();
const store = usePaymentStore()
const router = useRouter()
const error = ref("")
const loading = ref(false)


const form = reactive({
    first_name: "",

    email: "",
    password: "",

    option: "",

    ciudad: "",
    celular: "",

    datos: ""
})






function saveDataToBackEnd() {
    loading.value = true
    console.log(form)
   
           
                    fetch(`http://localhost:1337/users?email=${form.email}`)
                    .then(response => response.json())
                .then(responseData => {
                    if (responseData.length > 0) {
                        toast.error('El correo ya existe');
                        loading.value = false
                        return;
                    }
                    fetch('http://localhost:1337/auth/local/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: form.email,
                            password: form.password,
                            identifier: form.cedula,
                            documentType: form.option,
                        })
                    })
                        .then(response => response.json())
                        .then(responseData => {
                            console.log(responseData)
        
                            store.userObjectId = responseData.user._id
                            store.fromDetails.email = form.email
                            store.fromDetails.password = form.password
                
                            store.fromDetails.option = form.option
                            store.fromDetails.first_name = form.first_name
            
      
                            store.fromDetails.ciudad = form.ciudad
                            store.fromDetails.celular = form.celular
                 
                            store.fromDetails.datos = responseData.user.datos_personales
        
                            loading.value = false
                            router.push("checkout")
        
                        })
                        .catch(error => {
                            console.log(error)
                            saveDataToBackEnd()
                        });
                    })
            
             

        .catch(error => {
            console.log(error)
            loading.value = false
        });
}

function validateForm() {
    let isValid = true;

    if (!form.first_name.trim()) {
        isValid = false;
        toast.error('Se requiere nombre');
        return;
    }

    

  

    if (!form.ciudad.trim()) {
        isValid = false;
        toast.error('Se requiere ciudad');
        return;
    }


    if (!form.email.trim()) {
        isValid = false;
        toast.error('Correo electrónico es requerido');
        return;
    } else if (!isValidEmail(form.email)) {
        isValid = false;

        toast.error('Formato inválido Email');
        return;
    }

    if (!form.celular.trim()) {
        isValid = false;
        toast.error('Se requiere número celular');
        return;
    }

    if (!form.password.trim()) {
        isValid = false;
        toast.error('Se requiere contraseña');
        return;

    }








    // Validate phone Wa_number field
    // if (!form.Wa_number && !isValidPhoneWa_number(form.Wa_number)) {
    //     isValid = false;
    //     // Handle phone Wa_number format validation error
    //     error.value('Invalid phone Wa_number format');
    // }

    if (isValid) {
        store.fromDetails = form
        saveDataToBackEnd()
    } else {
        // Form is invalid, display error message or take appropriate action
        console.log('Form is invalid');
    }


    if (form.acceptTerms) {
        // Aquí puedes enviar los datos del formulario porque los términos y condiciones fueron aceptados
        // Puedes agregar la lógica para enviar los datos al servidor o realizar otras acciones necesarias
        console.log("Datos del formulario enviados:", form);
    } else {
        this.error = "Debes aceptar los términos y condiciones para continuar.";
    }

}

function submitForm() {
    validateForm();
    if (form.acceptTerms) {
        console.log("Formulario enviado:", form);
    } else {
        console.log('Formulario no enviado. Debes aceptar los términos y condiciones.');
    }
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\+\d{1,3}\d{6,14}$/;
    return phoneNumberRegex.test(phoneNumber);
}

// function isValidPassword(password) {
//     const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     return regex.test(password);
// }
</script>

<template>
    <Loading v-if="loading" />
    <section class="cart-form">
        <form>
            
            <div class="name">
                <input type="text" placeholder="Nombres *" v-model="form.first_name">
               

            </div>

            <input type="text" placeholder="Ciudad *" v-model="form.ciudad">
            <input type="email" placeholder="Correo electrónico *" v-model="form.email">
            <input type="telefono" placeholder="Celular*" v-model="form.celular" maxlength="10">
   
            <input type="password" placeholder="Contraseña*" v-model="form.password">




            <div class="terms-checkbox">
                <input type="checkbox" id="accept-terms" v-model="form.acceptTerms" class="small-checkbox">
                <label for="accept-terms" class="custom-checkbox">
                    <span class="checkbox-icon" :class="{ checked: form.acceptTerms }">&#10003;</span>
                    <a href="/terminosycondiciones" class="checkbox-text-link">
                        <span class="checkbox-text">He leído, autorizo y acepto las políticas</span>
                    </a>
                </label>
            </div>

            <span>{{ error }}</span>
        </form>

        <button class="submit-button" @click="submitForm" :disabled="!form.acceptTerms">Siguiente Paso <i
                class="fas fa-long-arrow-alt-right"></i></button>

    </section>
</template>

<style lang="scss" scoped>
.cart-form {
    width: 100%;
    max-width: 500px;
    border-radius: 4px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .text {
        p {
            font-weight: bold;
            font-size: 16px;
            color: white;
            margin: 1rem auto;
            text-align: center;

        }

        i {
            color: yellow;
        }
    }

    form {
        width: 100%;
        max-width: 500px;

        border-radius: 6px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem 2rem;
        margin: 2rem auto;



        input {
            padding: 0.5rem 8px;
            /* Reduce el padding superior e inferior */
            font-size: 0.8rem;
            /* Reduce el tamaño de la fuente */
            background-color: white;
            color: black;
            width: 100%;
            border-radius: 4px;
            /* Reduce el border-radius para esquinas más redondeadas */
            margin: 4px auto;
            /* Reduce el margen */
            outline: none;
        }

        .name {
            display: flex;
            width: 100%;

            input {
                &:first-child {
                    margin-right: 8px;
                }
            }
        }

        .number {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            select {
                color: black;
                height: 59px;
                border-radius: 6px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }

            .flag {
                margin-right: 8px;
            }

            input {
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
            }
        }

        .ecu {

            display: flex;
            justify-content: flex-start;
            width: 100%;
            margin: 10px auto;
            margin-bottom: 1rem;

            select {
                padding: 2px 40px 1px 10px;
                /* Reduce el padding superior e inferior */
                font-size: 0.8rem;
                /* Reduce el tamaño de la fuente */
                color: black;
                height: 2.5rem;
                border-radius: 6px;

            }
        }
    }

    .submit-button {
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        color: white;
        border-radius: 8px;
        height: 50px;
        background: #0200AB;
        margin-bottom: 1rem;
    }

}

.terms-checkbox {

    align-items: center;
}

.custom-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.small-checkbox {
    /* Ajusta el tamaño del checkbox */
    transform: scale(0);

}


.checkbox-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    background-color: transparent;
    /* Hacer el fondo transparente */
    border-radius: 4px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox-icon.checked {
    background-color: #5cb85c;
    /* Cambia el color cuando está marcado */
    border-color: #5cb85c;
    color: #fff;
}

.checkbox-text {
    font-size: 14px;
    color: #fff;
}
</style>