<script setup>
import { usePaymentStore } from '@/store/payment/index.js';
import { useRouter } from 'vue-router';

const store = usePaymentStore()
const router = useRouter()
const currentDate = new Date();

const cart = store.cart
const tax = store.tax


const combineNames = (cart) => {
    let names = ""
    cart.forEach(item => {
        names += item.name + " "
    });
    return names
}

console.log(store.cart)

// const products = combineNames(store.cart)



const data = {
    producto: "",
    user: store.userObjectId,
    pais: "ecu",
    descuento: Number(store.discount),
    total: store.total,
    estado: "Pending",
    respapi1: "Transferencia",
    respapi2: "Transferencia",
    fecha_compra: currentDate,
    placa: store.fromDetails.placa,
    fecha_fin: new Date(`${currentDate.getFullYear()+1}/${currentDate.getMonth()+1}/${currentDate.getDate()}`)

};

function saveToBackEnd() {
    store.loading = true
    cart.forEach(item => {
        data.producto = item.name
        data.total = (item.price + (item.price * store.tax)).toFixed(2)
        fetch('https://amcacmin.automotorsclub.com/config-pagos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData)
                // sendMail()
                console.log(responseData)
                if (store.paymentGateWay !== "pagomedio") {
                    store.successMessage("!pago pendiente")
                }
                // fetch(`https://amcacmin.automotorsclub.com/datos-personales`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //             user: store.userObjectId,
                //             nombres: store.fromDetails.first_name,
                //             apellidos: store.fromDetails.last_name,
                //             correo: store.fromDetails.email,
                //             celular: store.fromDetails.celular,
                //             pais: data.pais,
                //             ciudad: store.fromDetails.ciudad,
                //             provincia: store.fromDetails.provincia,
                //             plan: item.name
                //         })
                //     }).then(response => response.json())
                //     .then(responseDato => {

                        // console.log(responseDato)

                        // fetch(`https://amcacmin.automotorsclub.com/users/${store.userObjectId}`, {
                        //     method: 'PUT',
                        //     headers: {
                        //         'Content-Type': 'application/json'
                        //     },
                        //     body: JSON.stringify({
                        //         configuracion_pago: {
                        //             _op: 'AddRelation',
                        //             objects: [responseData]
                        //         },
                        //         datos_personales:{
                        //             _op: 'AddRelation',
                        //             objects: [responseDato]
                        //         }
                        //     })
                        // })
                    // })
            })
            .catch(error => {
                store.loading = false
                console.log(error)
                saveToBackEnd()
            });
    });
    fetch(`https://amcacmin.automotorsclub.com/datos-personales/${store.fromDetails.datos}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            user: store.userObjectId,
            nombres: store.fromDetails.first_name,
            apellidos: store.fromDetails.last_name,
            correo: store.fromDetails.email,
            celular: store.fromDetails.celular,
            pais: data.pais,
            ciudad: store.fromDetails.ciudad,
            provincia: store.fromDetails.provincia,
            fecha_inicio: currentDate,
            fecha_fin: new Date(`${currentDate.getFullYear()+1}/${currentDate.getMonth()+1}/${currentDate.getDate()}`),
        })
    }).then(response => response.json())
    .then(responseDato => {
        localStorage.clear()
        store.loading = false
        console.log(responseDato)
    })
    }

function checkoutCart() {
    if (store.cart.length < 1) {
        store.errorMessages("Cart Is Empty")
        return
    }
    if (store.paymentGateWay == 'pagomedio') {
        store.loading = true;
        const data = {
        username: store.fromDetails.cedula,
        email: store.fromDetails.email,
        name: store.fromDetails.first_name,
        address: store.fromDetails.ciudad,
        phone: store.fromDetails.celular,
        total: store.total,
        }
        store.registerCard(data).then(
        // store.createPayment(data,store.fromDetails).then(
            (res) => {
                if (res == "error") {
                    store.loading = false;
                    store.errorMessages("Error al procesar el pago")
                    return
                }
                if (!res.success) {
                    store.loading = false;
                    store.errorMessages("Error al procesar el pago")
                    return
                }
                store.successMessage("Card Registered and Payment Successful")
                data.estado = "Paid"
                data.respapi1 = "Pagomedio"
                data.respapi2 = "Paid"
                fetch(`https://amcacmin.automotorsclub.com/auth/send-email-confirmation`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: store.fromDetails.email,
                            identifier: store.fromDetails.user_name,
                            password: store.fromDetails.password
                        })
                    }
                )
                saveToBackEnd()
                // wait for 5 sec
                setTimeout(() => {
                    store.loading = false;
                    router.push("landing")
                }, 5000);
            }
        )
        

    } else if (store.paymentGateWay == 'western-union') {
        saveToBackEnd()
    }
}
</script>

<template>
    
    <section class="checkout-card">
        <p class="w-full text-white mt-4 pl-2 bold" style="margin-top: -30px; padding: 15px">
            Selecciona tu forma de pago preferida:
        </p>
        <div class="checkout">
            
            <div class="payment-options w-full">
                <div class="pagomedios">
                    <div class="checkbox">
                        <input id="pagomedios" type="radio" name="payment-option" value="pagomedio"
                            v-model="store.paymentGateWay">
                        <label for="pagomedios">Tarjeta de Crédito</label>
                    </div>
                </div>

                <div class="cards">
                    <div class="checkbox">
                        <input id="card" type="radio" name="payment-option" value="western-union"
                            v-model="store.paymentGateWay">
                            
                        <label for="card">Transferencia o Depósito</label>
                    </div>
                    <div class="payment-icons">
                        <img src="@/assets/payment-icons/bancos.png" alt="">
                        <!-- <img src="@/assets/payment-icons/visa-48.png" alt="">
                        <img src="@/assets/payment-icons/card-1.png" alt="">
                        <img src="@/assets/payment-icons/card-2.png" alt=""> -->
                    </div>
                </div>
                <div class="text text-white">
                    Banco: Produbanco<br>
                    Nombre: WAPPIAD S.A.S. <br>
                    Cta. Cte. #: 27059059147 <br>
                    Ruc: 1793219287001 <br>
                    Swift: PRODECQXXX <br>
                    Pais: Ecuador <br>
                   Envía tu depósito al correo ventas@wappiad.com <br>

                </div>
                
            </div>
        </div>
       

        <div class="process w-full">


            <button @click="checkoutCart()" v-if="store.paymentGateWay == 'pagomedio'" class="process-button"> 
                <strong>PAGAR AHORA</strong> </button>
            <button @click="checkoutCart()" v-if="store.paymentGateWay == 'western-union'" class="process-button"> 
                <strong>PAGAR AHORA</strong> </button>
        </div>

        <!-- <div class="text-box">
            <img src="@/assets/icons/reward.png" alt="">
            <p>Te develovmos tu pago al 100% si no estas contento can tu compra en ios primeros 7 dias.</p>
        </div> -->
    </section>
</template>

<style lang="scss" scoped>
.checkout-card {
    width: 100%;
    max-width: 500px;
    background-color: #232c4d;
    border-radius: 6px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1.5rem;
    margin: 2rem auto;
    padding-top: 3rem;

    .checkout {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid blanchedalmond;
        border-radius: 4px;

        .cards,
        .pagomedios,
        .text {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            border: 1px solid blanchedalmond;
            padding: 1rem;
            width: 100%;

            .checkbox {
                margin-bottom: 8px;

                label {
                    margin: 0px 8px;
                    font-weight: bold;
                    color: white;
                }
            }
        }

        .cards {

            .payment-icons {
                display: flex;
                margin-left: 8px;

                img {
                    width: 170px;
                }
            }
        }

        .paypal {
            width: 100%;

            img {
                width: 164px;
            }
        }
    }

    .process {
        margin: 2rem auto;

        .process-button {
            width: 100%;
            color: white;
            border-radius: 8px;
            height: 50px;
            background: #18f3dc;
            color: #484747;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100px;
            }
        }

    }
}
</style>