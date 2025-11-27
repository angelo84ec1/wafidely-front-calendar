<script setup>
import { usePaymentStore } from '@/store/payment/index.js';
import { useRouter } from 'vue-router';

const store = usePaymentStore()
const router = useRouter()

const subtotal = store.subtotal
const total = store.total
const tax = store.tax







onBeforeMount(() => {
    if (store.cart.length < 1 || store.userObjectId == null) {
        router.push("login")
    }
})
</script>

<template>
    <ui-header></ui-header>
    <div class="spacer"></div>
    <Loading v-if="store.loading" />

    <section class="cart-wrapper">
        <div class="cart">
            <h1>Resumen <span class="highlight">de tu plan</span></h1>

            <CartItems />

            <CartPriceCard class="cards" />

            <div class="total">
                <!-- <h3>Tienes un cupon? Haz clic aqui para introducir tu codigo</h3> -->
                <CartCupon />


               
                <div class="subtotal">
                    <span>Subtotal</span>
                    <span> USD $ {{ subtotal }}</span>
                </div>

                <div class="subtotal">
                    <span>Iva</span>
                    <span> USD $ {{ (subtotal*tax).toFixed(2) }}</span>
                </div>

                <div class="total">
                    <span>Total</span>
                    <span>USD $ {{ total }}</span>
                </div>
            </div>

            <div class="list-wrapper">
                <h2>Beneficios de Wafidely</h2>
                <ul class="comprando-list">
                    <li class="list-items">
                        <i class="fas fa-check"></i>
                        <span>Recordatorio automático de avisos en whatsapp</span>
                    </li>
                    <li class="list-items">
                        <i class="fas fa-check"></i>
                        <span>Generación de Qr para tu url de agendamiento de citas</span>
                    </li>
                    <li class="list-items">
                        <i class="fas fa-check"></i>
                        <span>Página de aterrizaje</span>
                    </li>
                    <li class="list-items">
                        <i class="fas fa-check"></i>
                        <span>Módulo personalizado para mas de 5 tipos de distintos negocios</span>
                    </li>
                    
                </ul>
            </div>
        </div>
        <div class="form">
            <div class="payment-icons">
                <img src="@/assets/payment-icons/logo-tarjetas-aceptadas.png" alt="">
            </div>
           
    
            <CartCheckoutCard />

           
        </div>

    </section>

    <scroll-top></scroll-top>
    <ui-footer></ui-footer>
</template>

<style lang="scss" scoped>
section {
    background-color: rgb(236, 236, 236);
}

.paypal-checkout {
    position: absolute;
    max-width: 700px;
    height: 600px;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(185, 185, 185);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 2rem auto;

    @media (width < 1024px) {
        position: relative;
        top: 0;
        left: 0;
        transform: translate(0%, 0%);
        height: 500px;
    }

    @media (width < 640px) {
        height: 300px;
    }

    i {
        top: 10px;
        right: 15px;
        position: absolute;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
}

.cart-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 2rem;
    margin-top: -1rem;
    flex-wrap: wrap;
    padding: 1rem;

    .form {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        max-width: 500px;

        .text-box {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: white;
            padding: 1rem;
            border: 1px solid rgb(145, 145, 145);
            border-radius: 6px;

            img {
                width: 64px;
            }

            p {
                font-size: 10px;
            }
        }

        .payment-icons {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 1rem auto;

            img {
                width: 1248px;
            }

            p {
                width: 70%;
                margin: 1rem auto;
            }

        }

        .remaining {
            margin-top: 1rem;
            width: 100%;
            background-color: lightyellow;
            padding: 1rem 3rem;
            text-align: center;
            border-radius: 6px;
            font-size: 1rem;

        }
    }
}

.spacer {
  height: 15px; /* Altura del espacio entre los divs */
}

.cart {
    max-width: 490px;

    h1 {
        font-weight: 800;
        font-size: 1.5rem;

        .highlight {
            color: #18f3dc;
        }
    }

    .cards {
        margin: 1rem auto;
    }

    .total {
        h3 {
            margin: 2rem auto;
            font-weight: 600;
            color: #C028B9;
        }

        .subtotal,
        .total {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem auto;
        }

        .iva {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem auto;
        }


        .total {
            span {
                font-weight: 600;
                font-size: 1.1em;
            }
        }
    }

    .list-wrapper {
        margin: 2rem auto;

        h2 {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .comprando-list {
            margin-left: 1rem;

            li {
                font-size: 14px;
                margin: 1rem auto;

                .fa-check {
                    margin-right: 8px;
                    font-size: 1rem;

                }
            }
        }
    }
}
</style>