<script setup>
import { usePaymentStore } from '@/store/payment/index.js';
import { useCuponStore } from '@/store/payment/cupon.js'
const store = usePaymentStore()
const cuponStore = useCuponStore()
</script>

<template>
    <div>
        <div class="discount">
            <input type="text" placeholder="ingresar cupón" v-model="cuponStore.cuponCode">
            <button @click="cuponStore.applyCupon">Aplicar cupón</button>
        </div>
        <div class="discount-msg">{{ cuponStore.cuponMessage }}</div>
    </div>
</template>

<style lang="scss" scoped>
.discount {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;



    input {
        border-radius: 4px;
        width: 100%;
        margin-right: 4px;

        @media (width < 640px) {
            width: 85%;
        }
    }

    button {
        width: 50%;
        padding: 1.4rem 1rem;
        font-size: 1rem;
        background-color: #18f3dc;
        color: #232c4d;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (width < 640px) {
            width: 85%;
        }
    }
}

.discount-msg {
    font-size: 14px;
    margin-top: 4px;
}
</style>