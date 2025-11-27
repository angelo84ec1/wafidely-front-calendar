<script setup>

// Ruc : 171478965001
// pass: hBSe9Q47wUDEVEL
import countryCode from "@/assets/data/countryCodes.json"
import { usePaymentStore } from '@/store/payment/index.js';
import { useRouter } from 'vue-router';




const store = usePaymentStore()
const router = useRouter()
const error = ref("")
const loading = ref(false)


const form = reactive({
    nombre: "",
    ruc: "",
    telefono: "",
    correo: "",
    fechainicio: "",
    fechafin: "",
    
    datos: ""

})

const options = ref([
    { text: "Pasaporte", value: "pasaporte" },
    { text: "Cedula", value: "cedula" },
    { text: "RUC", value: "ruc" },
]);

function saveDataToBackEnd() {
    loading.value = true
    console.log(form)
    fetch(`http://localhost:1337/users?username=${form.ruc}`)
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData)
            if (responseData.length > 0) {
                error.value = "La ruc ya existe"
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
                    identifier: form.ruc,
                    documentType: form.option,
                })
            })
                .then(response => response.json())
                .then(responseData => {
                    console.log(responseData)
        
                    store.userObjectId = responseData.user._id

                    store.fromDetails.password = form.password
                    store.fromDetails.option = form.option
                    store.fromDetails.nombre = form.nombre
                    store.fromDetails.ruc = form.ruc
                    store.fromDetails.telefono = form.telefono
                    store.fromDetails.correo = form.correo
                    store.fromDetails.fechainicio = form.fechainicio
                    store.fromDetails.fechafin = form.fechafin
                    store.fromDetails.datos = responseData.user.establecimientos
        
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

    if (!form.ruc.trim()) {
        isValid = false;
        error.value = 'Se requiere el RUC';
    }

    if (!form.last_telefono.trim()) {
        isValid = false;
        error.value = 'Se requiere telefono';
    }

    if (!form.correo.trim()) {
        isValid = false;
        error.value = 'Se requiere correo';
    }



    if (!form.email.trim()) {
        isValid = false;
        error.value = 'correo electronico es requerido';
    } 
    if (!form.password.trim()) {
        isValid = false;
        error.value = "se requiere contraseña"
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
    } 
}



function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
            <div class="text">
                <p>Completa este formulario para adquirir la membresia<i class="fas fa-hand-point-down"></i></p>
            </div>
            
          
            <input type="text" placeholder="Nombre " v-model="form.nombre">
            <input type="email" placeholder="Correo electrónico *" v-model="form.correo">
            <input type="text" placeholder="Telefono " v-model="form.telefono">
           
          
            <input type="password" placeholder="Contraseña*" v-model="form.password">
           
            <div class="name">
                <div class="ecu">
                <select v-model="form.option">
                    <option :value="option.value" v-for="option in options">{{ option.text }}</option>
                </select>
              </div>
                <input type="text" placeholder="Ingresar # Cédula" v-model="form.cedula"  maxlength="10">

            </div>


    

            <span>{{ error }}</span>
        </form>

        <button class="submit-button" @click="submitForm" >Siguiente Paso <i
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
        background-color: #0200AB;
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
            margin: 8px auto;
            margin-bottom: 1rem;

            select {
                padding: 0px 15px 0px 10px;
                /* Reduce el padding superior e inferior */
                font-size: 0.8rem;
                /* Reduce el tamaño de la fuente */
                color: black;
                height: 3rem;
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
}</style>