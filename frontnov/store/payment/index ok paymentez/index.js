  import { defineStore } from "pinia";
  import { ref, watch } from 'vue';
  import {  useToast } from "vue-toastification";

  const toast = useToast()
  const pagomedioToken = useRuntimeConfig().public.pagomedioToken
  
  
  export const usePaymentStore = defineStore('payment', () => {
    const product = reactive({})
    const paypalPopUP = ref(false)
    const cart = ref([])
    const total = ref(0)
    const discount = ref(0)
    const paymentGateWay = ref("")
    const fromDetails = reactive({
      user_name: "",
      email: "",
      password: "",
      cedula: "",
      option: "",
      first_name: "",
      last_name: "",
      provincia: "",
      ciudad: "",
      placa:"",
      celular: "",
      datos: ""
    })
    const userObjectId = ref(null)
    const priceCardSelection = ref([
      {
        id: 1,
        val: false
      },
      {
        id: 2,
        val: false
      },
      {
        id: 3,
        val: false
      }
    ])
    const loading = ref(false)

    const PriceCards = reactive([
      
    ])


    function handleCheckboxChange(item) {

      const index = cart.value.indexOf(item);

      priceCardSelection.value.forEach(p => {
        if (p.id == item.id) {
          if (p.val == false) {
            cart.value.splice(index, 1);
            errorMessages("¡Eliminado del Carrito!")
          } else {
            cart.value.push(item)
            successMessage("¡Agregado al carrito!")
          }
        }
      })
    }

    function removeFromCart(item) {

      localStorage.removeItem("priceCardSelection")

      if (item.id > 3) {
        const index = cart.value.indexOf(item);
        cart.value.splice(index, 1);
        errorMessages("¡Eliminado del Carrito!")
          return
      }


      priceCardSelection.value.forEach(p => {
        if (p.id == item.id) {
          p.val = false
        }
      })
      PriceCards.forEach(card => {
        if (item.price === card.price) {
          cart.value = cart.value.filter(item => item.price !== card.price)

          errorMessages("¡Producto retirado del carrito")
          return
        }
      })



    }

    function calculateTotal() {
      const sum = cart.value.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.price;
      }, 0);

      total.value = sum.toFixed(2)
    }

    function calculateDiscount() {
      const sum = cart.value.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.discount;
      }, 0);

      discount.value = sum.toFixed(2)
    }



    function successMessage(msg) {
      toast.success(msg)
    }

    function errorMessages(msg) {
      toast.error(msg)
    }


    if (localStorage.getItem("cart")) {
      cart.value = JSON.parse(localStorage.getItem("cart"))
    }


    if (localStorage.getItem("priceCardSelection")) {
      priceCardSelection.value = JSON.parse(localStorage.getItem("priceCardSelection"))
      console.log(JSON.parse(localStorage.getItem("priceCardSelection")))
    }

    if (localStorage.getItem("total")) {
      total.value = JSON.parse(localStorage.getItem("total"))
    }

    // PaymentGateWay Implementation
    async function createPayment(data, store_val) {
      console.log("Create Payment")
      console.log(store_val)
      const body = {
        integration: true,
        "third": {
          document: store_val.cedula,
         document_type: "05",
         name: store_val.user_name,
         email: store_val.email,
         phones: "00000",
         address: "ABCDEF",
         type: "Individual"
        }
        ,        generate_invoice: 0,
        description: "Pago de prueba",
        amount: data.total,
        amount_without_tax: data.total,
        amount_with_tax: 0,
        tax_value: 0,
        settings: [],
        notify_url: null,
        custom_value: null,
        has_cash: 0,
        has_cards: 1
      }
      console.log(body)
      const dataURL = await fetch("https://api.abitmedia.cloud/pagomedios/v2/payment-requests", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${pagomedioToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const dataJSON = await dataURL.json()
      console.log(dataJSON)
      if (dataJSON.data && dataJSON.status == 201) {
        // Open payment url in self created popup window and when VerifyPayemnt is successfull then close popup window
        const paymentURL = dataJSON.data.url
        const paymentWindow = window.open(paymentURL, "Payment", "width=600,height=600")
        const pay = await verifyPayment(dataJSON.data.token)
        if (pay == "error"){
          paymentWindow.close()
          return "error"
        }
        paymentWindow.close()
        return pay
      }
      errorMessages("¡Error al procesar el pago!")
      return createPayment(data)
    }

    const verifyPayment = async (token,time=0) => {
      const requestConfirmation = await fetch("https://api.abitmedia.cloud/pagomedios/v2/payment-requests?integration=true&uuid="+token, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${pagomedioToken}`,
          "Content-Type": "application/json"
        },
      })
      const requestConfirmationJSON = await requestConfirmation.json()
      console.log(requestConfirmationJSON)
      if (requestConfirmationJSON.data[0].status == 1) {
        successMessage("¡Pago realizado con éxito!")
        localStorage.removeItem("cart")
        localStorage.removeItem("total")
        localStorage.removeItem("priceCardSelection")
        cart.value = []
        total.value = 0
        priceCardSelection.value = [
          {
            id: 1,
            val: false
          },
          {
            id: 2,
            val: false
          },
          {
            id: 3,
            val: false
          }
        ]
        return requestConfirmationJSON.data[0]
      } else if (time > 600) {
        errorMessages("¡Tiempo de espera agotado!")
        loading.value = false
        return "error"
      }
      else {
        await new Promise(r => setTimeout(r, 5000));
        time += 5
        return verifyPayment(token,time)
      }
    }


    watch(
      cart,
      (cartitem, old) => {
        calculateTotal()
        calculateDiscount()
        localStorage.setItem("cart", JSON.stringify(cartitem))
        localStorage.setItem("total", JSON.stringify(total.value))
      },
      { deep: true }
    )

    watch(
      priceCardSelection,
      (card) => {
        localStorage.setItem("priceCardSelection", JSON.stringify(card))
      },
      { deep: true }
    )



    return {
      product, paypalPopUP, cart, successMessage, errorMessages, total, fromDetails, userObjectId, discount, priceCardSelection, loading, removeFromCart, paymentGateWay,
      handleCheckboxChange, PriceCards, createPayment, verifyPayment
    }
  })