<script setup>
import { usePaymentStore } from '@/store/payment/index.js';
import { useCuponStore } from '@/store/payment/cupon.js'
const store = usePaymentStore()
const cuponStore = useCuponStore()
const subtotal = store.subtotal
const total = store.total
const tax = store.tax


</script>

<template>
    <ui-header></ui-header>
    <div class="spacer"></div>
    <section class="cart-wrapper">
        <div class="cart">
           
  

   


        </div>
        <div class="form">
          
            
            <div class="remaining">
                <p>Llena de manera cuidadosa los siguientes campos. <span class="bold">Aceptamos Transferencia o Tarjeta</span></p>
            </div>
            <CartForm />
        
        </div>

    </section>
    <CartSecurityCard />
    <scroll-top></scroll-top>
    <ui-footer></ui-footer>
</template>

<style lang="scss" scoped>
.cart-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 2rem;
    margin-top: -1rem;
    flex-wrap: wrap;
    padding: 2rem 1rem;
    background-color: rgb(236, 236, 236);


    .form {
        display: flex;
        flex-direction: column;
   
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

.cart {
    max-width: 490px;

    h1 {
        font-weight: 800;
        font-size: 1.5rem;

        .highlight {
          
        }
    }


    .cards {
        margin: 1rem auto;
    }

    .total {
        h3 {
            font-weight: 600;
            
            margin: 2rem auto 8px auto;
        }

        // .discount {
        //     display: flex;
        //     width: 100%;
        //     justify-content: space-between;
        //     align-items: center;



        //     input {
        //         border-radius: 4px;
        //         width: 100%;
        //         margin-right: 4px;

        //         @media (width < 640px) {
        //             width: 85%;
        //         }
        //     }

        //     button {
        //         width: 50%;
        //         padding: 1.4rem 1rem;
        //         font-size: 1rem;
        //         background-color: #148162;
        //         color: white;
        //         border-radius: 4px;
        //         display: flex;
        //         justify-content: center;
        //         align-items: center;

        //         @media (width < 640px) {
        //             width: 85%;
        //         }
        //     }
        // }

        // .discount-msg {
        //     font-size: 14px;
        //     margin-top: 4px;
        // }

        .subtotal,
        .total {
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

.spacer {
  height: 15px; /* Altura del espacio entre los divs */
}
</style>