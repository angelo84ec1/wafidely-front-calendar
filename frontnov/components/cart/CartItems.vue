<script setup>
import { usePaymentStore } from '@/store/payment/index.js';

const store = usePaymentStore()


</script>

<template>
    <div class="cart-items" v-for="item in store.cart">
        <div class="name">
            <img :src="item.image" alt="">
            <spa class="item-name">{{item.name}} </spa>
        </div>
        <span class="price"> USD ${{item.price}}</span>
        <span @click="store.removeFromCart(item)" class="remove-button"><i class="fas fa-close"></i></span>
    </div>
</template>

<style lang="scss" scoped>
.cart-items {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 0.5rem;
    border-radius: 6px;
    position: relative;
    padding-right: 3rem;

    .remove-button {
        width: 20px;
        position: absolute;
        right: 1rem;
        cursor: pointer;
        padding: 8px;
        background-color: #DF2F91;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        i {
            color: white;
        }
    }

    .name {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;

        @media (width < 540px) {
            font-size: 12px;
        }

        img {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            margin-right: 4px;
        }

    }

    .item-name {
        font-size: 1.1rem;
    }

    .price {
        font-weight: bold;
        font-size: 1.3rem;

        @media (width < 540px) {
            font-size: 1rem;
        }
    }

}
</style>