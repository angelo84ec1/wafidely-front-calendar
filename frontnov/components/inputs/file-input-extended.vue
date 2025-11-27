<template>
  <div class="input__file-previewer">
    <!--  Code from Saeed  -->
    <div class="input__file-buttons" v-show="buttonsOnLeft">
      <div class="button__with-label" @click="uploadFile(inputId)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
        <label>subir</label>
      </div>
      <a class="button__with-label" :href="downloadUrl?downloadUrl:'#'" style="color:black" target="_blank">
        <label>descargar</label>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6 rotated-down">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
      </a>
    </div>
    <!--  Code from Saeed  -->
    <div class="input__file-label" >
      <label style="font-weight: 600;" :for="$attrs['for']">{{ label }}</label>
      <div class="input--file">
        <input type="file" :accept="accept" :disabled="disabled" :name="name" @change="onFileChange($event)" :id="inputId">
        <embed v-if="fileUrl" :src="fileUrl">
        <div v-else-if="downloadUrl" :src="downloadUrl">Download Document</div>
        <div v-else class="input--file_preview">
          <span class="name">Click aquí para cargar un archivo</span>
          <span class="name">{{ placeholder }}</span>
        </div>
      </div>
    </div>
    <!--  Code from Saeed  -->
    <div class="input__file-buttons" v-show="!buttonsOnLeft">
      <div class="button__with-label" @click="uploadFile(inputId)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
        <label>subir</label>
      </div>
      <a class="button__with-label" :href="downloadUrl" style="color: black" target="_blank">
        <label>descargar</label>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6 rotated-down">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>
      </a>
    </div>
    <!--  Code from Saeed  -->
  </div>
</template>
<script>
import fs from 'fs'
export default {
  name: 'BaseFileInputExtended',
  data(){
    return {
      file: null,
      fileUrl: null,
      downFilePrevUrl: null
    }
  },
  props: {
    accept: {
      type: String,
      default: 'image/png, image/jpeg, application/pdf'
    },
    placeholder: {
      type: String,
      default: 'Solo archivos PNG,JPG o JPEG'
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
    // added code by Saeed
    buttonsOnLeft: {
      type: Boolean,
      default: true
    },

    inputId: {
      type: String,
      default: ''
    },

    downloadUrl: {
      type: String,
      default: ''
    }
    // added code by Saeed
  },
  emits: ['update:modelValue'],
  methods: {
    onFileChange(event) {
      const target = event.target
      if (target.files === null) return;
      const file = target.files[0]
      // Check to see if there has been a file actually uploaded
      if (file) {
        console.log(file);
        this.fileUrl = URL.createObjectURL(file);
        console.log(this.fileUrl)
        this.$emit('update:modelValue', file);
      }
    },

    // added code by Saeed
    uploadFile(inputId){
      const inputTag = document.getElementById(inputId);
      inputTag.click();
    },

    // downloadFilePrevewUrl(){
    //   const downloadUrlBlob = new Blob([this.downloadUrl])
    //   console.log(downloadUrlBlob);
    // }
    // added code by Saeed
  }
}
</script>
<style scoped>
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label>input {
  height: 40px;
  padding: 0 0.5rem;
}

input[type="file"] {
  visibility: hidden;
}

.input__file-label {
  color: var(--gray-900);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
}

.input--file {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border: 1px solid var(--gray-500);
  height: 160px;
}

.input--file>svg {
  margin-bottom: 1rem;
  width: 3rem;
  height: 3rem;
  color: var(--gray-700);
}

.input--file>span {
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--gray-700);
}

/* Styles Added by Saeed */
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
}

.input__file-buttons .rotated-down {
  transform: rotate(180deg);
}

.button__with-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.button__with-label:hover {
  cursor: pointer;
}

.input--file_preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Styles Added by Saeed */

</style>
