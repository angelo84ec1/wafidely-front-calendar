// store/payment/index.js
import { defineStore } from "pinia";
import { ref, watch } from 'vue';
import { useToast } from "vue-toastification";
import { useAuthStore } from '~/store/auth';  // 🔥 AGREGAR ESTE IMPORT

const toast = useToast()

export const usePaymentStore = defineStore('payment', () => {
  const config = useRuntimeConfig()
  const pagomedioToken = config.public.pagomedioToken
  const paypalClientId = config.public.paypalClientId
  
  const product = reactive({})
  const paypalPopUP = ref(false)
  const cart = ref([])
  const total = ref(0)
  const subtotal = ref(0)
  const tax = 0.15
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
  const paypalLoaded = ref(false)

  const PriceCards = reactive([])

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
    let sum = cart.value.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.price;
    }, 0);

    subtotal.value = sum.toFixed(2)
    total.value = (sum + (sum * tax)).toFixed(2)
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

  // ==========================================
  // HELPER: Obtener establecimiento del usuario
  // ==========================================

  /**
   * Obtiene el ID del establecimiento del usuario autenticado
   * Maneja tanto el caso de un solo establecimiento como múltiples
   */
  const getUserEstablecimiento = () => {
    const authStore = useAuthStore()
    const user = authStore.getUser

    if (!user) {
      console.warn('⚠️ No hay usuario autenticado')
      return null
    }

    // Caso 1: Usuario tiene un establecimiento directo (singular)
    if (user.establecimiento) {
      // Si es un objeto con ID
      if (typeof user.establecimiento === 'object' && user.establecimiento.id) {
        console.log('✅ Establecimiento encontrado (objeto):', user.establecimiento.id)
        return user.establecimiento.id
      }
      // Si es solo el ID
      if (typeof user.establecimiento === 'string' || typeof user.establecimiento === 'number') {
        console.log('✅ Establecimiento encontrado (ID):', user.establecimiento)
        return user.establecimiento
      }
    }

    // Caso 2: Usuario tiene múltiples establecimientos (array)
    if (user.establecimientos && Array.isArray(user.establecimientos) && user.establecimientos.length > 0) {
      const primerEstablecimiento = user.establecimientos[0]
      
      // Si es un objeto con _id o id
      if (typeof primerEstablecimiento === 'object') {
        const establecimientoId = primerEstablecimiento._id || primerEstablecimiento.id
        console.log('✅ Establecimiento encontrado (array):', establecimientoId)
        return establecimientoId
      }
      
      // Si es solo el ID
      console.log('✅ Establecimiento encontrado (array directo):', primerEstablecimiento)
      return primerEstablecimiento
    }

    console.warn('⚠️ No se encontró establecimiento para el usuario')
    return null
  }

  // ==========================================
  // PAYPAL INTEGRATION (ACTUALIZADO)
  // ==========================================

  /**
   * Carga el SDK de PayPal dinámicamente
   */
  const loadPayPalSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        paypalLoaded.value = true
        resolve(window.paypal)
        return
      }

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`
      script.async = true
      
      script.onload = () => {
        paypalLoaded.value = true
        console.log('✅ PayPal SDK cargado')
        resolve(window.paypal)
      }
      
      script.onerror = (error) => {
        console.error('❌ Error cargando PayPal:', error)
        errorMessages('Error al cargar PayPal')
        reject(error)
      }
      
      document.head.appendChild(script)
    })
  }

  /**
   * Renderiza los botones de PayPal
   */
  const renderPayPalButtons = async (containerId, amount, onSuccess) => {
    try {
      await loadPayPalSDK()

      const container = document.getElementById(containerId)
      if (!container) {
        throw new Error(`Contenedor ${containerId} no encontrado`)
      }

      container.innerHTML = ''

      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 45
        },

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: 'Compra en Wafidely',
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              }
            }]
          })
        },

        onApprove: async (data, actions) => {
          try {
            loading.value = true
            
            const order = await actions.order.capture()
            
            console.log('✅ Pago PayPal exitoso:', order)
            
            // Ejecutar callback personalizado
            if (onSuccess) {
              await onSuccess(order)
            }
            
            successMessage('¡Pago procesado exitosamente!')
            
            return order
          } catch (error) {
            console.error('Error capturando pago:', error)
            errorMessages('Error al procesar el pago')
            throw error
          } finally {
            loading.value = false
          }
        },

        onError: (err) => {
          console.error('Error PayPal:', err)
          errorMessages('Error en la conexión con PayPal')
        },

        onCancel: () => {
          console.log('Pago cancelado')
          toast.info('Pago cancelado')
        }
      }).render(`#${containerId}`)

    } catch (error) {
      console.error('Error renderizando botones PayPal:', error)
      errorMessages('Error al cargar los botones de pago')
      throw error
    }
  }

  /**
   * Procesa un pago con PayPal
   * Retorna el objeto de la orden de PayPal
   */
  const processPayPalPayment = async (paymentData) => {
    try {
      loading.value = true

      // Aquí puedes agregar lógica adicional antes de procesar
      // Por ejemplo, guardar información en tu base de datos

      console.log('Procesando pago PayPal:', paymentData)

      // El pago real se procesa cuando el usuario hace clic en el botón
      // Este método es principalmente para preparación

      return {
        success: true,
        message: 'Listo para procesar pago con PayPal'
      }
    } catch (error) {
      console.error('Error en processPayPalPayment:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Guarda la información de pago en tu base de datos
   * ACTUALIZADO: Ahora incluye la relación con el establecimiento
   */
  const savePayPalTransaction = async (orderData, userData) => {
    try {
      const config = useRuntimeConfig()
      const baseURL = config.public.baseURL
      
      const authStore = useAuthStore()
      const token = authStore.getToken

      // 🔥 NUEVO: Obtener el establecimiento del usuario
      const establecimientoId = getUserEstablecimiento()

      // Construir el objeto de pago
      const paymentRecord = {
        producto: userData.producto || 'Producto',
        fecha_compra: new Date().toISOString().split('T')[0],
        pais: userData.pais || 'Ecuador',
        descuento: userData.descuento || 0,
        total: orderData.purchase_units[0].amount.value,
        estado: 'Activo',
        respapi1: orderData.payer.email_address,
        respapi2: orderData.id,
        user: userData.userId
      }

      // 🔥 NUEVO: Agregar establecimiento si existe
      if (establecimientoId) {
        paymentRecord.establecimiento = establecimientoId
        console.log('✅ Establecimiento agregado al pago:', establecimientoId)
      } else {
        console.warn('⚠️ No se pudo obtener el establecimiento del usuario')
      }

      console.log('📦 Guardando transacción:', paymentRecord)

      const response = await $fetch(`${baseURL}/config-pagos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentRecord)
      })

      console.log('✅ Transacción guardada:', response)
      return response
    } catch (error) {
      console.error('Error guardando transacción:', error)
      throw error
    }
  }

  // ==========================================
  // PAGOMEDIO INTEGRATION (EXISTENTE)
  // ==========================================

  async function createPayment(data, fromDetail) {
    console.log("Create Payment con Pagomedio")
    console.log(fromDetail)
    console.log(data)
    
    const body = {
      integration: true,
      "third": {
        document: fromDetail.cedula,
        document_type: "05",
        name: fromDetail.user_name,
        email: fromDetail.email,
        phones: "00000",
        address: "ABCDEF",
        type: "Individual"
      },
      generate_invoice: 0,
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
    return createPayment(data, fromDetail)
  }

  const verifyPayment = async (token, time=0) => {
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
    } else {
      await new Promise(r => setTimeout(r, 5000));
      time += 5
      return verifyPayment(token, time)
    }
  }

  // Cards API integration (Pagomedio)
  const getAllCards = async (userId) => {
    const data = await fetch(`https://api.abitmedia.cloud/pagomedios/v2/cards?integration=true&document=${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${pagomedioToken}`,
        "Content-Type": "application/json"
      }
    })
    
    const dataJSON = await data.json()
    let i = 0
    
    if (dataJSON.data.length == 0){
      if (i > 60){
        errorMessages("¡Error al obtener las tarjetas!")
        return "error"
      }
      setTimeout(() => {
        i++
      }, 10000)
      return getAllCards(userId)
    }
    
    return dataJSON.data
  }

  const registerCard = async (payload) => {
    const body = {
      integration: "true",
      third: {
        document: payload.username,
        document_type: "05",
        name: payload.name,
        email: payload.email,
        phones: payload.phone,
        address: payload.address,
        "type": "Individual"
      }
    }

    const data = await fetch("https://api.abitmedia.cloud/pagomedios/v2/cards/register", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pagomedioToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const dataJSON = await data.json()
    
    if (!dataJSON.success){
      errorMessages(dataJSON.message)
    }
    
    const url = dataJSON.data.url
    const cardWindow = window.open(url)
    const card = await getAllCards(payload.username)
    cardWindow.close()
    console.log(card)
    
    if (card == "error"){
      return "error"
    }
    
    const pay = await fetch("https://api.abitmedia.cloud/pagomedios/v2/cards/charge", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pagomedioToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "integration": true,
        "document": payload.username,
        "token": card[0].cards[0].token,
        "reference": "REF"+Math.floor(Math.random() * 1000000),
        "description": "Prueba de cobro con token",
        amount: payload.total,
        amount_without_tax: payload.total,
        amount_with_tax: 0,
        "tax_value": 0,
        "generate_invoice": 0
      })
    })
    
    const payJSON = await pay.json()
    console.log(payJSON)
    return payJSON
  }

  // ==========================================
  // RESTORE FROM LOCAL STORAGE
  // ==========================================

  if (process.client) {
    if (localStorage.getItem("cart")) {
      cart.value = JSON.parse(localStorage.getItem("cart"))
    }

    if (localStorage.getItem("priceCardSelection")) {
      priceCardSelection.value = JSON.parse(localStorage.getItem("priceCardSelection"))
    }

    if (localStorage.getItem("total")) {
      total.value = JSON.parse(localStorage.getItem("total"))
    }

    if (localStorage.getItem("subtotal")) {
      subtotal.value = JSON.parse(localStorage.getItem("subtotal"))
    }
  }

  // ==========================================
  // WATCHERS
  // ==========================================

  watch(
    cart,
    (cartitem, old) => {
      calculateTotal()
      calculateDiscount()
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(cartitem))
        localStorage.setItem("total", JSON.stringify(total.value))
        localStorage.setItem("subtotal", JSON.stringify(subtotal.value))
      }
    },
    { deep: true }
  )

  watch(
    priceCardSelection,
    (card) => {
      if (process.client) {
        localStorage.setItem("priceCardSelection", JSON.stringify(card))
      }
    },
    { deep: true }
  )

  return {
    // State
    product, 
    paypalPopUP, 
    cart, 
    total, 
    subtotal, 
    tax, 
    fromDetails, 
    userObjectId, 
    discount, 
    priceCardSelection, 
    loading, 
    paymentGateWay,
    PriceCards,
    paypalLoaded,
    
    // Methods - Common
    successMessage, 
    errorMessages, 
    removeFromCart,
    handleCheckboxChange,
    getUserEstablecimiento, // 🔥 NUEVO método exportado
    
    // Methods - Pagomedio
    createPayment, 
    verifyPayment, 
    getAllCards, 
    registerCard,
    
    // Methods - PayPal (ACTUALIZADO)
    loadPayPalSDK,
    renderPayPalButtons,
    processPayPalPayment,
    savePayPalTransaction
  }
})