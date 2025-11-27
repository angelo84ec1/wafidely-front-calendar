<template>
  <div class="input__file-previewer">
    <!-- Buttons on left -->
    <div class="input__file-buttons" v-show="buttonsOnLeft">
      <div class="button__with-label" @click="uploadFile(inputId)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
        <label>subir</label>
      </div>
      <a class="button__with-label" :href="downloadUrl?downloadUrl:'#'" style="color:black" target="_blank">
        <label>descargar</label>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 rotated-down">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
      </a>
    </div>
    
    <!-- File input label and preview -->
    <div class="input__file-label">
      <label style="font-weight: 600;" :for="inputId">{{ label }}</label>
      <div class="input--file" @click="uploadFile(inputId)">
        <input 
          type="file" 
          :accept="accept" 
          :disabled="disabled" 
          :name="name" 
          @change="onFileChange($event)" 
          :id="inputId"
          ref="fileInput"
        >
        
        <!-- Preview si hay archivo seleccionado -->
        <div v-if="fileUrl" class="preview-container">
          <embed v-if="isPdf" :src="fileUrl" class="pdf-preview">
          <img v-else-if="isImage" :src="fileUrl" alt="Preview" class="image-preview">
          <div v-else class="file-info">
            <svg class="w-8 h-8 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm text-gray-600">{{ fileName }}</span>
          </div>
        </div>
        
        <!-- Download link si hay URL de descarga pero no preview -->
        <div v-else-if="downloadUrl" class="input__descargar" @click.stop>
          <a :href="downloadUrl" target="_blank" class="download-link">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Descargar Documento
          </a>
        </div>
        
        <!-- Default state: no file selected -->
        <div v-else class="input--file_preview">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-gray-400 mb-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <span class="input_clic">Click aquí para cargar un archivo</span>
          <span class="name">{{ placeholder }}</span>
        </div>
      </div>
      
      <!-- Progress bar -->
      <div v-if="fillPercentage > 0 && fillPercentage < 100" class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${fillPercentage}%` }"></div>
        <span>{{ fillPercentage }}%</span>
      </div>
    </div>

    <!-- Buttons on right -->
    <div class="input__file-buttons" v-show="!buttonsOnLeft">
      <div class="button__with-label" @click="uploadFile(inputId)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
        <label>subir</label>
      </div>
      <a class="button__with-label" :href="downloadUrl" style="color: black" target="_blank">
        <label>descargar</label>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 rotated-down">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  accept: {
    type: String,
    default: 'image/png, image/jpeg, application/pdf'
  },
  placeholder: {
    type: String,
    default: 'Solo archivos PNG, JPG, JPEG o PDF'
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
  },
  buttonsOnLeft: {
    type: Boolean,
    default: true
  },
  inputId: {
    type: String,
    required: true
  },
  downloadUrl: {
    type: String,
    default: ''
  },
  fillPercentage: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'on-change-file'])

// Data
const fileUrl = ref<string | null>(null)
const fileName = ref<string>('')
const fileInput = ref<HTMLInputElement | null>(null)

// Computed
const isImage = computed(() => {
  if (!fileName.value) return false
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const ext = fileName.value.split('.').pop()?.toLowerCase()
  return imageExtensions.includes(ext || '')
})

const isPdf = computed(() => {
  return fileName.value.toLowerCase().endsWith('.pdf')
})

// Methods
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) {
    console.warn('No se seleccionó ningún archivo')
    return
  }

  console.log('📁 Archivo seleccionado:', {
    name: file.name,
    size: file.size,
    type: file.type
  })

  fileName.value = file.name
  fileUrl.value = URL.createObjectURL(file)
  
  // Emitir el archivo al componente padre
  emit('update:modelValue', file)
  emit('on-change-file', file)
}

const uploadFile = (inputId: string) => {
  const inputElement = document.getElementById(inputId) as HTMLInputElement
  if (inputElement) {
    inputElement.click()
  }
}

// Cleanup
const cleanup = () => {
  if (fileUrl.value) {
    URL.revokeObjectURL(fileUrl.value)
  }
}

// Lifecycle
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  cleanup()
})
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label > input {
  height: 40px;
  padding: 0 0.5rem;
}

input[type="file"] {
  display: none;
}

.input__file-label {
  color: var(--gray-900, #111827);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  flex: 1;
}

.input--file {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white, #ffffff);
  border: 1px solid var(--gray-500, #6b7280);
  min-height: 160px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.input--file:hover {
  border-color: var(--indigo-500, #6366f1);
  background-color: var(--gray-50, #f9fafb);
}

.input--file > svg {
  margin-bottom: 1rem;
  width: 3rem;
  height: 3rem;
  color: var(--gray-700, #374151);
}

.input--file > span {
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--gray-700, #374151);
}

/* Preview styles */
.preview-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px;
}

.pdf-preview {
  width: 100%;
  height: 200px;
  border: none;
  border-radius: 4px;
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Buttons styles */
.input__file-previewer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
}

.input__file-buttons {
  width: 15%;
  max-width: 50px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
}

.input__file-buttons .rotated-down {
  transform: rotate(180deg);
}

.button__with-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button__with-label:hover {
  opacity: 0.7;
  transform: translateY(-2px);
}

.button__with-label label {
  cursor: pointer;
  font-size: 0.75rem;
  color: var(--gray-700, #374151);
}

.input--file_preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
  text-align: center;
}

.input__descargar {
  color: rgb(10, 113, 10);
  font-weight: 500;
}

.download-link {
  display: flex;
  align-items: center;
  color: rgb(10, 113, 10);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.download-link:hover {
  background-color: rgba(10, 113, 10, 0.1);
}

.input_clic {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--indigo-600, #4f46e5);
  margin-bottom: 0.5rem;
}

.name {
  font-size: 0.75rem;
  color: var(--gray-500, #6b7280);
}

/* Progress bar */
.progress-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  background-color: var(--gray-200, #e5e7eb);
  border-radius: 9999px;
  height: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
  transition: width 0.3s ease-in-out;
  border-radius: 9999px;
}

.progress-bar-container span {
  margin-left: 0.75rem;
  color: var(--gray-600, #4b5563);
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 3rem;
  text-align: right;
}
</style>