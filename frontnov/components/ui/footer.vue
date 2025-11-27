<!-- footer.vue - CON AMBOS MODALS INTEGRADOS -->
<template>
  <footer class="footer">
    <!-- Figuras de fondo interactivas -->
    <div class="background-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
      <div class="shape shape-5"></div>
      <div class="shape shape-6"></div>
    </div>

    <div class="footer-content">
      <!-- Año a la izquierda -->
      <div class="footer-year">
        <p>© {{ currentYear }} - Desarrollado y mantenido por <a href="https://www.wappiad.com" target="_blank">WAPPIAD S.A.S.</a></p>
      </div>

      <!-- Enlaces centrales -->
      <div class="social-icons">
        <div class="terms-links-container">
          <!-- CAMBIO: De NuxtLink a button para abrir modal -->
          <button @click="openTermsModal" class="terms-link">
            Términos y Condiciones
          </button>
          <!-- BOTÓN QUE ABRE EL MODAL DE POLÍTICAS -->
          <button @click="openPolicyModal" class="terms-link">
            Políticas y Privacidad
          </button>
        </div>

      <!-- Iconos de redes sociales a la derecha -->
      <div class="social-icons">
        <a href="https://facebook.com/wafidely1" class="social-link facebook" aria-label="Facebook" target="_blank">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://instagram.com/wafidely1" class="social-link instagram" aria-label="Instagram" target="_blank">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/wappiad-s-a-s/" class="social-link linkedin" aria-label="LinkedIn" target="_blank">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
              <!-- Logo AWS -->
              <div class="aws-section">
          <img
            src="~/assets/images/aws-svgrepo-com.png"
            alt="Logo AWS"
            class="aws-logo"
          />
          <span class="aws-text"></span>
        </div>
      </div>
    </div>

    <!-- WhatsApp Floating Button -->
    <div class="whatsapp-float bottom-10 right-6 z-50">
      <button 
        @click="openWhatsApp"
        class="whatsapp-button shadow-glow animate-bounce-gentle text-white"
      >
        <svg class="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"></path>
        </svg>
      </button>
    </div>

    <!-- ========================================
         MODAL DE TÉRMINOS Y CONDICIONES
         ======================================== -->
    <Teleport to="body">
      <div v-if="isTermsModalOpen" class="terms-modal-overlay" @click="closeTermsModal">
        <div class="terms-modal-content" @click.stop>
          <div class="terms-modal-header">
            <h2>Términos y Condiciones</h2>
            <button @click="closeTermsModal" class="terms-close-btn">×</button>
          </div>
          
          <div class="terms-modal-body">
            <div class="terms-section">
              <h3>1. Aceptación de los Términos</h3>
              <p>Al acceder y utilizar los servicios de Wafidely, una marca de WAPPIAD SAS, usted acepta estar sujeto a estos términos y condiciones.</p>
            </div>

            <div class="terms-section">
              <h3>2. Descripción de los Servicios</h3>
              <p>Wafidely proporciona servicios de Saas para mejorar la productividad de los negocios con asistentes de AI utilizando herramientas importantes que se utiliza en el día a día como Whatsapp, Correos, Redes sociales, Sitios web, Sistemas Erps, etc para poder integrarlos en una sola plataforma y automatizar para mejorar el tiempo de trabajo de los colaboradores y departamentos de cada empresa</p>
            </div>

            <div class="terms-section">
              <h3>3. Registro y Cuentas de Usuario</h3>
              <p>Para acceder a ciertos servicios, es posible que deba crear una cuenta. Usted es responsable de:</p>
              <ul>
                <li>✅ Proporcionar información precisa y actualizada</li>
                <li>✅ Mantener la seguridad de su contraseña</li>
                <li>✅ Todas las actividades que ocurran bajo su cuenta</li>
              </ul>
            </div>

            <div class="terms-section">
              <h3>4. Uso Aceptable</h3>
              <p>Al utilizar nuestros servicios, usted se compromete a no:</p>
              <ul>
                <li>✅ Violar cualquier ley o regulación aplicable</li>
                <li>✅ Infringir derechos de propiedad intelectual</li>
                <li>✅ Transmitir contenido malicioso o dañino</li>
                <li>✅ Interferir con el funcionamiento normal de los servicios</li>
              </ul>
            </div>

            <div class="terms-section">
              <h3>5. Propiedad Intelectual</h3>
              <p>Todos los contenidos, marcas, logos (de proveedores de herramientas y propios de la marca ) y materiales disponibles en los servicios de Wafidely son propiedad de WAPPIAD SAS o de sus respectivos propietarios.</p>
            </div>

            <div class="terms-section">
              <h3>6. Limitación de Responsabilidad</h3>
              <p>WAPPIAD SAS no será responsable por daños indirectos, incidentales, especiales o consecuentes que puedan surgir del uso de nuestros servicios.</p>
            </div>

            <div class="terms-section">
              <h3>7. Contacto</h3>
              <p>Para preguntas sobre estos términos y condiciones:</p>
              <p><strong>WAPPIAD SAS</strong></p>
              <p><strong>Email:</strong> info@wappiad.com</p>
              <p><strong>Teléfono:</strong> +593983314957</p>
            </div>

            <div class="terms-footer-section">
              <p><strong>Última actualización:</strong> Agosto 2025</p>
            </div>
          </div>
          
          <div class="terms-modal-footer">
            <button @click="closeTermsModal" class="terms-accept-btn">Aceptar</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========================================
         MODAL DE POLÍTICAS DE PRIVACIDAD
         ======================================== -->
    <Teleport to="body">
      <div v-if="isPolicyModalOpen" class="policy-modal-overlay" @click="closePolicyModal">
        <div class="policy-modal-content" @click.stop>
          <div class="policy-modal-header">
            <h2>Políticas de Privacidad</h2>
            <button @click="closePolicyModal" class="policy-close-btn">×</button>
          </div>
          
          <div class="policy-modal-body">
            <div class="policy-section">
              <h3>1. Información que recopilamos</h3>
              <p>Recopilamos información que usted nos proporciona directamente cuando crea una cuenta, utiliza nuestros servicios o se comunica con nosotros.</p>
            </div>

            <div class="policy-section">
              <h3>2. Cómo utilizamos su información</h3>
              <p>Utilizamos la información recopilada para:</p>
              <ul>
                <li>✅ Proporcionar, mantener y mejorar nuestros servicios</li>
                <li>✅ Procesar transacciones y enviar confirmaciones</li>
                <li>✅ Comunicarnos con usted sobre productos, servicios y promociones</li>
                <li>✅ Personalizar su experiencia</li>
              </ul>
            </div>

            <div class="policy-section">
              <h3>3. Compartir información</h3>
              <p>No vendemos, intercambiamos ni transferimos su información personal a terceros sin su consentimiento, excepto en los casos descritos en esta política.</p>
            </div>

            <div class="policy-section">
              <h3>4. Seguridad de datos</h3>
              <p>Implementamos medidas de seguridad apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
            </div>

            <div class="policy-section">
              <h3>5. Sus derechos</h3>
              <p>Usted tiene derecho a:</p>
              <ul>
                <li>✅ Acceder a sus datos personales</li>
                <li>✅ Rectificar información incorrecta</li>
                <li>✅ Solicitar la eliminación de sus datos</li>
                <li>✅ Oponerse al procesamiento de sus datos</li>
              </ul>
            </div>

            <div class="policy-section">
              <h3>6. Contacto</h3>
              <p>Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:</p>
              <p><strong>Email:</strong> info@wappiad.com</p>
              <p><strong>Teléfono:</strong> +593983314957</p>
            </div>

            <div class="policy-footer-section">
              <p><strong>Última actualización:</strong> Agosto 2025</p>
            </div>
          </div>
          
          <div class="policy-modal-footer">
            <button @click="closePolicyModal" class="policy-accept-btn">Entendido</button>
          </div>
        </div>
      </div>
    </Teleport>
  </footer>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

// Estados de los modales
const isPolicyModalOpen = ref(false)
const isTermsModalOpen = ref(false)

// Funciones para modal de Políticas
const openPolicyModal = () => {
  console.log('✅ Opening policy modal (inline)...')
  isPolicyModalOpen.value = true
  if (process.client) {
    document.body.style.overflow = 'hidden'
  }
}

const closePolicyModal = () => {
  console.log('✅ Closing policy modal (inline)...')
  isPolicyModalOpen.value = false
  if (process.client) {
    document.body.style.overflow = 'unset'
  }
}

// Funciones para modal de Términos
const openTermsModal = () => {
  console.log('✅ Opening terms modal (inline)...')
  isTermsModalOpen.value = true
  nextTick(() => {
    if (process.client) {
      document.body.style.overflow = 'hidden'
    }
  })
}

const closeTermsModal = () => {
  console.log('✅ Closing terms modal (inline)...')
  isTermsModalOpen.value = false
  if (process.client) {
    document.body.style.overflow = 'unset'
  }
}

// Cerrar con tecla ESC
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (isPolicyModalOpen.value) {
      closePolicyModal()
    }
    if (isTermsModalOpen.value) {
      closeTermsModal()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (process.client) {
    document.body.style.overflow = 'unset'
  }
})

const currentYear = new Date().getFullYear()

const openWhatsApp = () => {
  if (process.client) {
    window.open('https://wa.me/593983314957?text=Hola%2C%20me%20interesa%20Wafidely%20AI%20mi%20nombre%20es%20:', '_blank')
  }
}
</script>

<style scoped>
.footer {
  position: relative;
  background-color: #FBF8FF;
  padding: 2rem 0;
  margin-top: auto;
  overflow: hidden;
  min-height: 80px;
}

/* Figuras de fondo interactivas */
.background-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 20%;
  right: 15%;
  animation-delay: -2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: -4s;
  border-radius: 20%;
}

.shape-4 {
  width: 40px;
  height: 40px;
  top: 60%;
  right: 30%;
  animation-delay: -1s;
}

.shape-5 {
  width: 70px;
  height: 70px;
  bottom: 30%;
  right: 10%;
  animation-delay: -3s;
  border-radius: 30%;
}

.shape-6 {
  width: 50px;
  height: 50px;
  top: 40%;
  left: 50%;
  animation-delay: -5s;
  transform: rotate(45deg);
  border-radius: 15%;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
    opacity: 0.5;
  }
  66% {
    transform: translateY(10px) rotate(240deg);
    opacity: 0.2;
  }
}

/* Contenido del footer */
.footer-content {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.footer-year {
  flex: 1;
}

.footer-year p {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0;
}

.center-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.terms-links-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.terms-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.terms-link:hover {
  color: #232c4d;
  text-decoration: underline;
  background-color: rgba(59, 130, 246, 0.1);
}

/* Separador entre enlaces */
.terms-link:not(:last-child)::after {
  content: '|';
  margin-left: 24px;
  color: #d1d5db;
  font-weight: 300;
}

.aws-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.aws-logo {
  width: 48px;
  height: auto;
  transform: translateY(3px);
  filter: brightness(0.7);
  transition: filter 0.3s ease;
}

.aws-logo:hover {
  filter: brightness(1);
}

.aws-text {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.social-icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.3s ease;
  background-color: transparent;
}

.social-link:hover {
  transform: translateY(-2px);
}

.facebook:hover {
  color: #1877f2;
}

.instagram:hover {
  color: #e4405f;
}

.linkedin:hover {
  color: #0077b5;
}

.social-link svg {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.whatsapp-float {
  position: fixed;
}

.shadow-glow {
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
}

.animate-bounce-gentle {
  animation: bounce-gentle 2s infinite;
}

@keyframes bounce-gentle {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.whatsapp-button {
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
}

.whatsapp-button:hover {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  transform: scale(1.1) translateY(2px);
  box-shadow: 0 0 30px rgba(37, 211, 102, 0.6);
}

.whatsapp-button:hover svg {
  color: #f0f9ff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.whatsapp-button:active {
  transform: scale(0.95);
}

.whatsapp-button svg {
  transition: all 0.3s ease;
}

/* ========================================
   ESTILOS COMPARTIDOS PARA AMBOS MODALES
   ======================================== */
.terms-modal-overlay, 
.policy-modal-overlay {
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
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.terms-modal-overlay {
  z-index: 10001;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.terms-modal-content, 
.policy-modal-content {
  background: white;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
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

.terms-modal-header, 
.policy-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #38f5b3 0%, #2563EB 50%, #7C3AED 100%);
  color: white;
}

.terms-modal-header h2, 
.policy-modal-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.policy-modal-header h2 {
  color: white;
}

.terms-modal-header h2 {
  color: white;
}

.terms-close-btn, 
.policy-close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 8px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.terms-close-btn:hover, 
.policy-close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.terms-modal-body, 
.policy-modal-body {
  padding: 30px;
  overflow-y: auto;
  max-height: calc(85vh - 140px);
}

.terms-section, 
.policy-section {
  margin-bottom: 24px;
}

.terms-section h3, 
.policy-section h3 {
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
  position: relative;
}

.terms-section h3:before, 
.policy-section h3:before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(135deg, #38f5b3 0%, #2563EB 50%, #7C3AED 100%);
}

.terms-section p, 
.policy-section p {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 8px;
  font-size: 15px;
}

.terms-section ul, 
.policy-section ul {
  padding-left: 20px;
  margin-bottom: 12px;
}

.terms-section li, 
.policy-section li {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 4px;
  font-size: 15px;
}

.terms-footer-section, 
.policy-footer-section {
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
  margin-top: 30px;
  text-align: center;
}

.terms-footer-section p, 
.policy-footer-section p {
  font-size: 13px;
  color: #94a3b8;
  font-style: italic;
}

.terms-modal-footer, 
.policy-modal-footer {
  padding: 20px 30px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  text-align: right;
}

.terms-accept-btn, 
.policy-accept-btn {
  background: linear-gradient(135deg, #38f5b3 0%, #2563EB 50%, #7C3AED 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.terms-accept-btn:hover, 
.policy-accept-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 2rem 0;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .footer-year {
    flex: none;
    order: 1;
  }
  
  .center-links {
    order: 2;
  }
  
  .terms-links-container {
    flex-direction: column;
    gap: 12px;
  }
  
  .terms-link:not(:last-child)::after {
    display: none;
  }
  
  .social-icons {
    gap: 1.5rem;
    justify-content: center;
    order: 3;
  }
  
  .shape {
    display: none;
  }

  /* Modal responsive */
  .terms-modal-content, 
  .policy-modal-content {
    margin: 10px;
    max-height: 90vh;
  }
  
  .terms-modal-header,
  .terms-modal-body,
  .terms-modal-footer,
  .policy-modal-header,
  .policy-modal-body,
  .policy-modal-footer {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .terms-accept-btn, 
  .policy-accept-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 0 1rem;
  }
  
  .aws-logo {
    width: 40px;
  }
  
  .aws-text {
    font-size: 0.8rem;
  }
  
  .social-icons {
    gap: 1rem;
  }
  
  .social-link {
    width: 35px;
    height: 35px;
  }
  
  .social-link svg {
    width: 18px;
    height: 18px;
  }
}

/* Efectos adicionales para interactividad */
@media (hover: hover) {
  .shape:hover {
    animation-duration: 2s;
    background: rgba(255, 255, 255, 0.08);
  }
}

/* Animación de entrada */
.footer-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scroll personalizado para modales */
.terms-modal-body::-webkit-scrollbar,
.policy-modal-body::-webkit-scrollbar {
  width: 8px;
}

.terms-modal-body::-webkit-scrollbar-track,
.policy-modal-body::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.terms-modal-body::-webkit-scrollbar-thumb,
.policy-modal-body::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #38f5b3 0%, #2563EB 100%);
  border-radius: 4px;
}

.terms-modal-body::-webkit-scrollbar-thumb:hover,
.policy-modal-body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
}
</style>