// composables/usePayPal.ts
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

export const usePayPal = () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const paypalLoaded = ref(false)
  const isProcessing = ref(false)

  /**
   * Carga el SDK de PayPal dinámicamente
   */
  const loadPayPalScript = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // Si ya está cargado, retornar
      if (window.paypal) {
        paypalLoaded.value = true
        resolve(window.paypal)
        return
      }

      // Crear el script
      const script = document.createElement('script')
      const clientId = config.public.paypalClientId
      const mode = config.public.paypalMode || 'sandbox'
      
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
      script.async = true
      
      script.onload = () => {
        paypalLoaded.value = true
        console.log('✅ PayPal SDK cargado correctamente')
        resolve(window.paypal)
      }
      
      script.onerror = (error) => {
        console.error('❌ Error al cargar PayPal SDK:', error)
        toast.error('Error al cargar PayPal. Por favor recarga la página.')
        reject(error)
      }
      
      document.head.appendChild(script)
    })
  }

  /**
   * Crea una orden de pago en PayPal
   */
  const createOrder = async (amount: number, description: string = 'Compra en Wafidely') => {
    try {
      if (!window.paypal) {
        throw new Error('PayPal SDK no está cargado')
      }

      const order = await window.paypal.Buttons().createOrder({
        purchase_units: [{
          description,
          amount: {
            value: amount.toString(),
            currency_code: 'USD'
          }
        }]
      })

      return order
    } catch (error) {
      console.error('Error creando orden PayPal:', error)
      throw error
    }
  }

  /**
   * Renderiza los botones de PayPal en un contenedor
   */
  const renderButtons = async (
    containerId: string,
    amount: number,
    options: {
      description?: string
      onSuccess?: (order: any) => void | Promise<void>
      onError?: (error: any) => void
      onCancel?: () => void
    } = {}
  ) => {
    try {
      await loadPayPalScript()

      const container = document.getElementById(containerId)
      if (!container) {
        throw new Error(`Contenedor ${containerId} no encontrado`)
      }

      // Limpiar contenedor
      container.innerHTML = ''

      // Renderizar botones
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              description: options.description || 'Compra en Wafidely',
              amount: {
                value: amount.toString(),
                currency_code: 'USD'
              }
            }]
          })
        },

        onApprove: async (data: any, actions: any) => {
          try {
            isProcessing.value = true
            
            // Capturar el pago
            const order = await actions.order.capture()
            
            console.log('✅ Pago capturado:', order)
            
            // Ejecutar callback de éxito
            if (options.onSuccess) {
              await options.onSuccess(order)
            }
            
            toast.success('¡Pago procesado exitosamente!')
            
            return order
          } catch (error) {
            console.error('Error capturando pago:', error)
            toast.error('Error al procesar el pago')
            
            if (options.onError) {
              options.onError(error)
            }
            
            throw error
          } finally {
            isProcessing.value = false
          }
        },

        onError: (err: any) => {
          console.error('Error en PayPal:', err)
          toast.error('Error en la conexión con PayPal')
          
          if (options.onError) {
            options.onError(err)
          }
        },

        onCancel: () => {
          console.log('Pago cancelado por el usuario')
          toast.info('Pago cancelado')
          
          if (options.onCancel) {
            options.onCancel()
          }
        }
      }).render(`#${containerId}`)

    } catch (error) {
      console.error('Error renderizando botones PayPal:', error)
      toast.error('Error al cargar los botones de pago')
      throw error
    }
  }

  /**
   * Procesa un pago directamente sin botones
   * Útil para pagos programáticos
   */
  const processPayment = async (
    amount: number,
    description: string = 'Compra en Wafidely'
  ): Promise<any> => {
    try {
      isProcessing.value = true

      await loadPayPalScript()

      // Aquí podrías implementar un flujo de pago directo
      // Por ahora, este método requiere que uses renderButtons
      throw new Error('Usa renderButtons() para procesar pagos')

    } catch (error) {
      console.error('Error procesando pago:', error)
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  /**
   * Verifica el estado de una transacción
   */
  const verifyTransaction = async (orderId: string): Promise<any> => {
    try {
      // Aquí harías una llamada a tu backend para verificar
      // el estado de la transacción con PayPal
      const response = await $fetch('/api/paypal/verify', {
        method: 'POST',
        body: { orderId }
      })

      return response
    } catch (error) {
      console.error('Error verificando transacción:', error)
      throw error
    }
  }

  return {
    paypalLoaded,
    isProcessing,
    loadPayPalScript,
    createOrder,
    renderButtons,
    processPayment,
    verifyTransaction
  }
}