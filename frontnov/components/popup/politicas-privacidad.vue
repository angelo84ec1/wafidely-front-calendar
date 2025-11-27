<!-- components/popup/politica-privacidad.vue - CON DEBUG DE MONTAJE -->
<template>
    <div>
      <!-- DEBUG: Componente montado -->
      <div style="position: fixed; top: 50px; right: 10px; background: lime; padding: 5px; z-index: 9999; font-size: 12px;">
        POPUP COMPONENT LOADED ✅
      </div>
      
      <Teleport to="body">
        <div v-if="isOpen" class="popup-overlay" @click="closeModal">
          <div class="popup-content" @click.stop>
            <div class="popup-header">
              <h2>Políticas de Privacidad</h2>
              <button @click="closeModal" class="close-btn">×</button>
            </div>
            
            <div class="popup-body">
              <div class="section">
                <h3>1. Información que recopilamos</h3>
                <p>Recopilamos información que usted nos proporciona directamente cuando utiliza nuestros servicios.</p>
              </div>
  
              <div class="section">
                <h3>2. Uso de la información</h3>
                <p>Utilizamos su información para proporcionar y mejorar nuestros servicios, procesar transacciones y personalizar su experiencia.</p>
              </div>
  
              <div class="section">
                <h3>3. Seguridad</h3>
                <p>Implementamos medidas de seguridad para proteger su información personal contra acceso no autorizado.</p>
              </div>
  
              <div class="section">
                <h3>4. Contacto</h3>
                <p>Para preguntas sobre esta política de privacidad:</p>
                <p><strong>Email:</strong> privacidad@wappiad.com</p>
                <p><strong>Teléfono:</strong> +57 1 234 5678</p>
              </div>
  
              <div class="section">
                <p><strong>Última actualización:</strong> Agosto 2025</p>
              </div>
            </div>
            
            <div class="popup-footer" style="padding-bottom: 37px !important;">
  <button @click="closeModal" class="accept-btn">Entendido</button>
</div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  // DEBUG: Logs inmediatos
  console.log('🟡 POPUP COMPONENT: Script executing...')
  
  const isOpen = ref(false)
  
  const openModal = () => {
    console.log('🟢 POPUP: Opening modal!')
    isOpen.value = true
    if (process.client) {
      document.body.style.overflow = 'hidden'
    }
  }
  
  const closeModal = () => {
    console.log('🟢 POPUP: Closing modal!')
    isOpen.value = false
    if (process.client) {
      document.body.style.overflow = 'unset'
    }
  }
  
  // Listener para eventos
  const handleOpenPolicy = (event) => {
    console.log('🟢 POPUP: Event received!', event)
    openModal()
  }
  
  onMounted(() => {
    console.log('🟢 POPUP: onMounted called!')
    
    // Registrar listener
    window.addEventListener('open-policy-modal', handleOpenPolicy)
    
    console.log('🟢 POPUP: Event listener registered for "open-policy-modal"')
    
    // Test inmediato para verificar que funciona
    setTimeout(() => {
      console.log('🟢 POPUP: Testing event listener...')
      window.dispatchEvent(new CustomEvent('open-policy-modal'))
    }, 2000)
  })
  
  onUnmounted(() => {
    console.log('🟢 POPUP: onUnmounted called!')
    window.removeEventListener('open-policy-modal', handleOpenPolicy)
    if (process.client) {
      document.body.style.overflow = 'unset'
    }
  })
  
  // También exponer métodos (backup)
  defineExpose({
    openModal,
    closeModal
  })
  
  console.log('🟡 POPUP COMPONENT: Script execution completed!')
  </script>
  
  <style scoped>


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px 20px 37px 20px; /* Cambiar el padding inferior de 20px a 37px */
  animation: fadeIn 0.3s ease;
}
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .popup-content {
  background: white;
  border-radius: 12px;
  max-width: 650px;
  width: 100%;
  max-height: calc(85vh - 50px); /* CAMBIAR ESTA LÍNEA: era 85vh, ahora 85vh - 50px */
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s ease;
}
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 30px;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
  }
  
  .popup-header h2 {
    margin: 0;
    font-size: 22px;
    color: #1e293b;
    font-weight: 600;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    padding: 8px;
    color: #64748b;
    line-height: 1;
    border-radius: 6px;
    transition: all 0.2s ease;
  }
  
  
  .close-btn:hover {
    color: #1e293b;
    background: #e2e8f0;
  }
  
  .popup-body {
    padding: 30px;
    overflow-y: auto;
    max-height: calc(85vh - 140px);
  }
  
  .section {
    margin-bottom: 24px;
  }
  
  .section h3 {
    color: #1e293b;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
  }
  
  .section p {
    color: #475569;
    line-height: 1.6;
    margin-bottom: 8px;
    font-size: 15px;
  }
  
  .popup-footer {
  padding: 20px 30px 37px 30px !important;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  text-align: right;
}
  .accept-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.2s ease;
  position: relative;
  bottom: 17px; /* Mover el botón 17px hacia arriba */
}
  
  .accept-btn:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .popup-content {
      margin: 10px;
      max-height: 90vh;
    }
    
    .popup-header,
    .popup-body,
    .popup-footer {
      padding-left: 20px;
      padding-right: 20px;
    }
    
    .accept-btn {
      width: 100%;
    }
  }
  </style>