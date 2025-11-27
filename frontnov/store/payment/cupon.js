import { defineStore } from "pinia";
import { ref } from 'vue';
import { usePaymentStore } from '@/store/payment/index.js';

export const useCuponStore = defineStore('cupon', () => {
    const store = usePaymentStore()
    const cuponCode = ref("")
    const cuponMessage = ref("")
    const validCupons = ref([
        {
            code: "33DW$S",
            discount: 15,
            active: false
        },
        {
            code: "hd335E",
            discount: 25,
            active: false
        },
        {
            code: "4DYYFD",
            discount: 35,
            active: false
        }
    ])

    function applyCupon() {
        cuponMessage.value = ""
        const appliedCupon = validCupons.value.find((validCupon) => validCupon.code === cuponCode.value);

        if (appliedCupon) {
            if (appliedCupon.active) {
                cuponMessage.value = "el cupón ya está activado"
                return;
            }
            const discountPercent = appliedCupon.discount;
            let total = store.total - ((store.total * discountPercent) / 100);
            let discount = store.total - total
            store.discount = discount.toFixed(2)
            store.total = total.toFixed(2)
            cuponMessage.value = `Se aplica ${discount}% de descuento`
            appliedCupon.active = true
            localStorage.setItem("total", JSON.stringify(store.total))

        } else {
            cuponMessage.value = "cupón inválido"
        }
    }
    if (localStorage.getItem("validCupons")) {
        validCupons.value = JSON.parse(localStorage.getItem("validCupons"))
      }
    

    watch(
        validCupons,
        (card) => {
            localStorage.setItem("validCupons", JSON.stringify(validCupons.value))
        },
        { deep: true }
    )


    return {
        cuponCode, applyCupon, validCupons, cuponMessage
    }
})