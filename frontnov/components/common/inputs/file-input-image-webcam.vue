<template>
  <div class="webcam-input-container">
    <!-- Botón para abrir modal de webcam -->
    <button
      @click.prevent="openModal"
      type="button"
      :disabled="disabled"
      class="btn-open-webcam"
      :class="{ 'btn-disabled': disabled }"
    >
      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      <span>{{ label || 'Abrir Cámara' }}</span>
    </button>

    <!-- Modal de Webcam -->
    <Teleport to="body" v-if="isClient">
      <Transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal-container">
            <div class="modal-header">
              <h3 class="modal-title">
                <svg class="icon-title" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Capturar Foto
              </h3>
              <button @click="closeModal" class="btn-close" aria-label="Cerrar">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="modal-body">
              <!-- Loading State -->
              <div v-if="isLoading" class="loading-container">
                <div class="spinner"></div>
                <p class="loading-text">Activando cámara...</p>
                <p class="loading-subtext">Por favor, permite el acceso cuando Chrome lo solicite</p>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="error-container">
                <svg class="error-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <div class="error-text" v-html="errorMessage"></div>
                <button @click="retryCamera" class="btn-retry">
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reintentar
                </button>
                <button @click="openChromeSettings" class="btn-settings">
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Abrir Configuración de Chrome
                </button>
              </div>

              <!-- Camera/Canvas Container -->
              <div v-show="!isLoading && !errorMessage" class="camera-container">
                <!-- Flash effect -->
                <div v-if="isShotPhoto" class="flash-effect"></div>

                <!-- Video Element (Camera) -->
                <video
                  ref="camera"
                  autoplay
                  playsinline
                  class="camera-video"
                  :class="{ 'hidden': isPhotoTaken }"
                ></video>

                <!-- Canvas Element (Photo Preview) -->
                <canvas
                  ref="canvas"
                  class="camera-canvas"
                  :class="{ 'hidden': !isPhotoTaken }"
                ></canvas>
              </div>
            </div>

            <div class="modal-footer">
              <button
                v-if="!isPhotoTaken && !isLoading && !errorMessage"
                @click="takePhoto"
                class="btn-action btn-capture"
              >
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Tomar Foto
              </button>

              <button
                v-if="isPhotoTaken"
                @click="takePhoto"
                class="btn-action btn-retake"
              >
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Tomar Otra
              </button>

              <button @click="closeModal" class="btn-action btn-cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'BaseFileInputWebcam',
  props: {
    accept: {
      type: String,
      default: 'image/png, image/jpeg'
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['file-updated'],
  setup(props, { emit }) {
    const showModal = ref(false);
    const isLoading = ref(false);
    const isPhotoTaken = ref(false);
    const isShotPhoto = ref(false);
    const camera = ref(null);
    const canvas = ref(null);
    const isClient = ref(false);
    const errorMessage = ref('');
    const currentStream = ref(null);

    onMounted(() => {
      isClient.value = true;
      console.log('✅ Componente de webcam montado en el cliente');
      checkBrowserAndProtocol();
    });

    onBeforeUnmount(() => {
      stopCameraStream();
    });

    const checkBrowserAndProtocol = () => {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const isSecure = protocol === 'https:' || hostname === 'localhost' || hostname === '127.0.0.1';
      
      console.log('🔍 Verificación de entorno:');
      console.log('  - Protocolo:', protocol);
      console.log('  - Hostname:', hostname);
      console.log('  - ¿Es seguro?:', isSecure);
      
      if (!isSecure) {
        console.warn('⚠️ ADVERTENCIA: No estás usando HTTPS. Chrome puede bloquear el acceso a la cámara.');
      }
    };

    const openModal = (event) => {
      console.log('📷 Abriendo modal de webcam');
      
      if (!isClient.value) {
        console.error('❌ No estamos en el cliente todavía');
        return;
      }

      showModal.value = true;
      isPhotoTaken.value = false;
      errorMessage.value = '';
      
      setTimeout(() => {
        createCameraElement();
      }, 150);
    };

    const closeModal = () => {
      console.log('🚪 Cerrando modal');
      stopCameraStream();
      showModal.value = false;
      isLoading.value = false;
      errorMessage.value = '';
      isPhotoTaken.value = false;
    };

    const createCameraElement = async () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📹 Iniciando cámara');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      isLoading.value = true;
      errorMessage.value = '';
      
      if (!process.client || !isClient.value) {
        console.error('❌ No estamos en el cliente');
        isLoading.value = false;
        errorMessage.value = 'Esta función solo funciona en el navegador';
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('❌ getUserMedia no disponible');
        isLoading.value = false;
        errorMessage.value = 'Tu navegador no soporta acceso a la cámara. Asegúrate de usar HTTPS o localhost.';
        return;
      }

      if (!camera.value) {
        console.error('❌ Elemento de video no encontrado');
        isLoading.value = false;
        errorMessage.value = 'Error interno: elemento de video no encontrado. Intenta cerrar y abrir de nuevo.';
        return;
      }

      // Verificar protocolo
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
      
      if (protocol !== 'https:' && !isLocalhost) {
        isLoading.value = false;
        errorMessage.value = `<strong>⚠️ Error de Seguridad</strong><br><br>
          Chrome requiere HTTPS para acceder a la cámara.<br><br>
          <strong>URL actual:</strong> ${protocol}//${hostname}<br><br>
          <strong>Soluciones:</strong><br>
          • Usa HTTPS en producción<br>
          • En desarrollo, usa localhost en lugar de IP`;
        return;
      }

      const constraints = {
        audio: false,
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      };

      console.log('📷 Solicitando acceso a la cámara...');
      console.log('   Constraints:', constraints);

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        console.log('✅ Stream obtenido:', stream.id);
        console.log('✅ Tracks activos:', stream.getTracks().length);
        
        currentStream.value = stream;
        camera.value.srcObject = stream;
        
        await new Promise((resolve) => {
          camera.value.onloadedmetadata = () => {
            console.log('✅ Metadata cargada');
            console.log('   Video width:', camera.value.videoWidth);
            console.log('   Video height:', camera.value.videoHeight);
            resolve();
          };
        });
        
        await camera.value.play();
        console.log('✅ Video reproduciéndose');
        
        isLoading.value = false;
        
      } catch (error) {
        console.error('❌ Error al acceder a la cámara:', error);
        console.error('  - Error name:', error.name);
        console.error('  - Error message:', error.message);
        
        isLoading.value = false;
        
        switch (error.name) {
          case 'NotAllowedError':
          case 'PermissionDeniedError':
            errorMessage.value = `<strong>🚫 Permiso Denegado</strong><br><br>
              <strong>Para Chrome:</strong><br>
              1. Haz clic en el 🔒 candado o ⓘ icono junto a la URL<br>
              2. Busca "Cámara" y selecciona "Permitir"<br>
              3. Recarga la página (F5)<br><br>
              <strong>O también:</strong><br>
              • Haz clic en "Abrir Configuración de Chrome" abajo<br>
              • Busca este sitio en la lista<br>
              • Permite el acceso a la cámara`;
            break;
            
          case 'NotFoundError':
          case 'DevicesNotFoundError':
            errorMessage.value = `<strong>📷 Cámara No Encontrada</strong><br><br>
              No se detectó ninguna cámara.<br><br>
              <strong>Verifica:</strong><br>
              • La cámara está conectada<br>
              • Los drivers están instalados<br>
              • La cámara funciona en otras apps`;
            break;
            
          case 'NotReadableError':
          case 'TrackStartError':
            errorMessage.value = `<strong>⚠️ Cámara en Uso</strong><br><br>
              La cámara está siendo usada por otra aplicación.<br><br>
              <strong>Cierra estas apps:</strong><br>
              • Zoom, Teams, Skype<br>
              • Otras pestañas del navegador<br>
              • Aplicaciones de videoconferencia`;
            break;
            
          case 'OverconstrainedError':
            errorMessage.value = '<strong>🔧 Configuración No Compatible</strong><br><br>Intentando con configuración básica...';
            retryWithBasicConstraints();
            return;
            
          case 'SecurityError':
            errorMessage.value = `<strong>🔒 Error de Seguridad</strong><br><br>
              Chrome bloqueó el acceso a la cámara.<br><br>
              <strong>URL actual:</strong> ${window.location.protocol}//${window.location.host}<br><br>
              <strong>Requisitos:</strong><br>
              • HTTPS en producción<br>
              • localhost en desarrollo`;
            break;
            
          default:
            errorMessage.value = `<strong>❌ Error Desconocido</strong><br><br>${error.name}: ${error.message}`;
        }
      }
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    };

    const retryWithBasicConstraints = async () => {
      try {
        console.log('🔄 Intentando con configuración básica...');
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: false 
        });
        
        currentStream.value = stream;
        camera.value.srcObject = stream;
        
        await new Promise((resolve) => {
          camera.value.onloadedmetadata = resolve;
        });
        
        await camera.value.play();
        errorMessage.value = '';
        isLoading.value = false;
        console.log('✅ Cámara activada con configuración básica');
        
      } catch (retryError) {
        console.error('❌ Error en reintento:', retryError);
        errorMessage.value = '<strong>❌ Error</strong><br><br>No se pudo activar la cámara incluso con configuración básica.';
      }
    };

    const retryCamera = () => {
      errorMessage.value = '';
      isLoading.value = false;
      createCameraElement();
    };

    const openChromeSettings = () => {
      window.open('chrome://settings/content/camera', '_blank');
    };

    const stopCameraStream = () => {
      if (currentStream.value) {
        currentStream.value.getTracks().forEach(track => {
          track.stop();
          console.log('🛑 Track detenido:', track.kind);
        });
        currentStream.value = null;
      }
      
      if (camera.value && camera.value.srcObject) {
        camera.value.srcObject = null;
      }
      
      console.log('🛑 Cámara completamente detenida');
    };

    const takePhoto = async () => {
      if (!isPhotoTaken.value) {
        console.log('📸 Tomando foto...');
        
        isShotPhoto.value = true;
        setTimeout(() => {
          isShotPhoto.value = false;
        }, 100);
        
        if (!canvas.value || !camera.value) {
          console.error('❌ Canvas o camera ref no disponible');
          return;
        }
        
        // ✅ SOLUCIÓN PARA EL ESTIRAMIENTO: Calcular proporciones correctas
        const video = camera.value;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const aspectRatio = videoWidth / videoHeight;
        
        console.log('📐 Dimensiones del video:');
        console.log('   Width:', videoWidth);
        console.log('   Height:', videoHeight);
        console.log('   Aspect Ratio:', aspectRatio);
        
        // Establecer el canvas con las proporciones correctas
        // Usar un ancho fijo y calcular la altura proporcionalmente
        const canvasWidth = 640;
        const canvasHeight = canvasWidth / aspectRatio;
        
        canvas.value.width = canvasWidth;
        canvas.value.height = canvasHeight;
        
        console.log('📐 Dimensiones del canvas:');
        console.log('   Width:', canvasWidth);
        console.log('   Height:', canvasHeight);
        
        const context = canvas.value.getContext('2d');
        
        // Dibujar el video completo en el canvas sin estiramiento
        context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
        
        isPhotoTaken.value = true;

        let file = null;
        await new Promise(function(resolve) {
          canvas.value.toBlob(
            function(blob) {
              file = new File(
                [blob], 
                `webcam_${Date.now()}.jpeg`, 
                { type: 'image/jpeg' }
              );
              console.log('✅ Archivo creado:', file.name, file.size, 'bytes');
              console.log('✅ Sin estiramiento - proporciones correctas');
              resolve(blob);
            }, 
            'image/jpeg',
            0.95
          );
        });
        
        stopCameraStream();
        emit('file-updated', file);
        console.log('✅ Foto emitida al componente padre');
        
      } else {
        console.log('🔄 Tomando otra foto...');
        isPhotoTaken.value = false;
        createCameraElement();
      }
    };

    return {
      showModal,
      isLoading,
      isPhotoTaken,
      isShotPhoto,
      camera,
      canvas,
      openModal,
      closeModal,
      takePhoto,
      retryCamera,
      openChromeSettings,
      isClient,
      errorMessage
    };
  }
}
</script>

<style scoped>
.webcam-input-container {
  width: 100%;
}

.btn-open-webcam {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
}

.btn-open-webcam:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
}

.btn-open-webcam:active {
  transform: translateY(0);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 1rem;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.icon-title {
  width: 1.5rem;
  height: 1.5rem;
}

.btn-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-body {
  padding: 1.5rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
}

.loading-container {
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
  margin: 0.5rem 0;
}

.loading-subtext {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.error-container {
  text-align: center;
  padding: 2rem;
  max-width: 500px;
}

.error-icon {
  width: 3rem;
  height: 3rem;
  color: #ef4444;
  margin: 0 auto 1rem;
}

.error-text {
  color: #dc2626;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 1.5rem;
  text-align: left;
}

.btn-retry,
.btn-settings {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0.25rem;
}

.btn-retry {
  background: #ef4444;
}

.btn-retry:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.btn-settings {
  background: #3b82f6;
}

.btn-settings:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.camera-container {
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.camera-video,
.camera-canvas {
  width: 100%;
  height: auto;
  display: block;
  background: #000;
}

.hidden {
  display: none !important;
}

.flash-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  animation: flash 0.15s ease-out;
  z-index: 10;
  pointer-events: none;
}

@keyframes flash {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-capture {
  background: #10b981;
  color: white;
}

.btn-capture:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-retake {
  background: #3b82f6;
  color: white;
}

.btn-retake:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-cancel {
  background: #6b7280;
  color: white;
}

.btn-cancel:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .modal-container {
    margin: 0;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-body {
    min-height: 300px;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn-action {
    width: 100%;
    justify-content: center;
  }
}
</style>