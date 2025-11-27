
<script>
import { onMounted, ref } from "vue";
import { usePaymentStore } from '@/store/payment/index.js';
import { useRouter } from 'vue-router';

export default {

    data() {
        return {
            paidFor: false,
        };
    },
    setup() {
        const router = useRouter()
        const currentDate = new Date();
        const paypal = ref(null)
        const store = usePaymentStore()
        const products = combineNames(store.cart)


        const data = {
            producto: products,
            user: store.userObjectId,
            pais: "ecu",
            descuento: store.discount,
            total: store.total,
            estado: "approved",
            respapi1: "paypal",
            respapi2: "paypal",
            fecha_compra: currentDate
        };

        const emailData = {
            to: store.fromDetails.email,
            subject: "Gracias por comprar",
            pkg: products,
            price: store.total,
            user_name: store.fromDetails.user_name,
            password: store.fromDetails.password,
            confirm: true,


        }

        function combineNames(objects) {
            const combinedNames = objects.map(obj => obj.name.trim()).join('  +  ');
            return combinedNames;
        }


        function saveToBackEnd() {
            store.loading = true
            fetch('http://localhost:1337/config-pagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {

                    sendMail()
                })
                .catch(error => {
                    store.loading = false
                    console.log(error)
                    saveToBackEnd()
                });
        }
        function sendMail() {
            fetch('http://localhost:1337/resumen/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            })
                .then(response => response.json())
                .then(responseData => {
                    store.loading = false
                    store.successMessage("Compra exitosa")
                    localStorage.clear()
                    router.push("features")
                    // console.log(responseData)
                })
                .catch(error => {
                    console.log(error)
                });
        }

        onMounted(() => {

            const script = document.createElement("script");
            script.setAttribute('data-namespace', "paypal_sdk");
            script.src = "https://www.paypal.com/sdk/js?client-id=Afan6kPFylSUJ8qHTOpVBvos-aq2AI8EBs5vdHPNBv6RtRn_kblpXWQP1ttUDnewhjumiopVY7k6yVNq";


            script.addEventListener("load", setLoaded);

            document.body.appendChild(script);
        })

        function setLoaded() {
            paypal_sdk
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: store.cart[0].name,
                                    amount: {
                                        currency_code: "USD",
                                        value: store.total
                                    }
                                }
                            ]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        store.cart;
                        saveToBackEnd()
                        this.paidFor = true;
                        store.paypalPopUP = false;
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(paypal.value);
        }

        return {
            paypal, store
        }

    }
}

</script>
<template>
    <div id="paypal" ref="paypal">
    </div>
</template>

<style lang="scss" scoped>
#paypal {
    width: 100%;
    z-index: 111;
    background-color: rgb(185, 185, 185);
    padding: 3rem;
    border-radius: 10px;

}
</style>