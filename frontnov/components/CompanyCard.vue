<script setup>
import { usePaymentStore } from '@/store/payment';
import { useRouter } from 'vue-router';

const store = usePaymentStore()
const router = useRouter()
const items = [{
    id : 7,
    name: " Plan Black",
    heading: "pro",
    price: 110,
    crossedPrice: 75.25,
    discount: 61.66,
    details: ["100 Credits per month", "Unlimited users"],
    benifits: [" Direct Phone Numbers ",
        " Landline Phone Numbers ",
        " Corporate email addresses ",
        "Propsetcs",
        " Chrome Extension "]
}]

function addToCart(item) {
    store.cart.push(item)
    router.push("products")
}
</script>

<template>
    <section>
        <div class="top">
            <div class="vid">
                <img src="@/assets/videos/planc.png">
            </div>
            <div class="prices">
                <div class="left">
                    <div class="text">Antes <span class="cross">$155</span> <span class="ahorra">Ahorra 45%</span>
                    </div>
                    <div class="price">USD $110</div>
                </div>
       
            </div>
            <!-- <NuxtLink to="/purchase"> -->
            <button @click="addToCart(items[0])" class="purchase-button"><i class="fas fa-hand-point-right"></i> Adquirir Plan</button>
            <!-- </NuxtLink> -->
        </div>
        <div class="bottom">
           
    
        </div>
    </section>
</template>

<style lang="scss" scoped>
section {
    border-radius: 6px;
    width: 400px !important;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (width < 640px) {
        width: 400px !important;
    }

    @media (width < 450px) {
        width: 340px !important;
    }

    @media (width < 380px) {
        width: 300px !important;
    }


    button {
        width: 100%;
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
        border-radius: 8px;
        height: 50px;
    }

    .top {
      
        padding: 1rem;

        .vid {
            width: 100%;
        }

        .prices {
            padding: 1rem 0rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                .text {

                    font-size: 1.2rem;


                    @media (width < 380px) {
                        font-size: 1rem;
                    }


                    .cross {
                        text-decoration: line-through;
                    }

                    .ahorra {
                        margin-left: 1rem;
                        margin-top: 4px;
                        padding: 8px;
                        background-color: #C028B9;
                        border-radius: 16px;
                        font-size: 0.8rem;
                        color: white;
                        font-weight: bold;


                        @media (width < 450px) {
                            padding: 4px;
                            font-size: 8px;
                        }
                    }
                }


                .price {
                    font-size: 2.2rem;
                    font-weight: bold;
                    color: #C028B9;
                }
            }

            .right {
                color: rgb(109, 109, 177);
                font-size: 1.5rem;
                font-weight: bold;



                @media (width < 640px) {
                    font-size: 1rem;
                }
            }
        }

        .purchase-button {
            background-color: #C028B9;

            .fa-hand-point-right {
                color: yellow;
            }
        }
    }

    .bottom {
        padding: 1rem;

        width: 100%;

        p {
            margin: 1rem auto;

            .bold {
                font-weight: bold;
            }
        }

        .sub-button {
            background: rgb(21, 153, 21);
        }

        .payment-icons {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 1rem auto;

            img {
                width: 32px;
            }
        }

        .benifits {
            h3 {
                font-weight: bold;
                font-size: 1;
            }

            .list-items {
                margin: 1rem auto;

                @media (width < 450px) {
                    font-size: 12px;
                }

                i {
                    color: orangered;
                    margin-right: 8px;
                }
            }
        }

    }


}
</style>