<script setup>
import { usePaymentStore } from '@/store/payment/index.js';
import { useRouter } from 'vue-router';

const store = usePaymentStore()




</script>

<template>
    <section class="cart-card" v-for="(card, index) in store.PriceCards">
        <div class="top">
            <div class="left">
                <i class="fas fa-long-arrow-alt-right"></i>
                <input type="checkbox" @change="store.handleCheckboxChange(card)" v-model="store.priceCardSelection[index].val">
                <span class="text">{{ card.name }}</span>
            </div>
            <div class="right">
                <div class="cross">USD ${{ card.crossedPrice }}</div>
                <div class="price">USD ${{ card.price }}</div>
            </div>
        </div>
        <div class="bottom">
            <h2 v-html="card.heading"></h2>

            <div v-html="card.details[0]"></div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.cart-card {
    border: dashed 2px rgb(136, 123, 123);
    max-width: 500px;
    background-color: rgb(226, 226, 226);
    width: 100%;
    margin: 1rem auto;

    .top {
        padding: 8px;
        background-color: rgb(228, 228, 129);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (width < 460px) {
                width: 65%;
            }

            i {
                color: orangered;
            }

            input {
                width: 15px;
                height: 15px;
                background-color: rgb(180, 180, 180);

                &:checked {
                    background-color: orangered;
                }
            }

            .text {
                color: rgb(51, 150, 51);
                font-weight: bold;
            }
        }

        .right {
            font-size: 1em;

            .cross {
                text-decoration: line-through;
            }
        }
    }

    .bottom {
        padding: 16px 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h2 {
            font-weight: bold;
            font-size: 1.1rem !important;

            span {
                color: orangered !important;
            }
        }

        p {
            margin: 1rem auto;
            font-size: 12px;
        }
    }
}
</style>