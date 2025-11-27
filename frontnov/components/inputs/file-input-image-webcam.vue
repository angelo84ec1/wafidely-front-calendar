<template>
  <label class="input__file-label" :for="$attrs['for']">
    <span style="font-weight: 600;">{{ label }}</span>
    <div class="input--file">
      <input type="file" :accept="accept" :disabled="disabled" :name="name" @click.prevent="openModal">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:v="https://vecta.io/nano"><path d="M329.143 424.272c68.721-28.66 117.029-96.478 117.029-175.587 0-105.029-85.143-190.171-190.171-190.171-25.92 0-50.625 5.195-73.143 14.585V0h-43.886v98.782c-44.521 34.807-73.143 89.01-73.143 149.903 0 79.108 48.307 146.928 117.029 175.587v43.842h-73.143V512h292.571v-43.886h-73.143v-43.842zM109.714 248.686c0-80.662 65.624-146.286 146.286-146.286s146.286 65.624 146.286 146.286S336.662 394.971 256 394.971s-146.286-65.623-146.286-146.285zm175.543 219.428h-58.514v-31.497c9.536 1.473 19.307 2.24 29.257 2.24s19.719-.766 29.257-2.24v31.497zM256 146.286c-56.554 0-102.4 45.846-102.4 102.4s45.846 102.4 102.4 102.4 102.4-45.846 102.4-102.4-45.846-102.4-102.4-102.4zm0 160.914c-32.265 0-58.514-26.25-58.514-58.514s26.25-58.514 58.514-58.514 58.514 26.25 58.514 58.514S288.265 307.2 256 307.2z"/></svg>
      <span class="name">Subir una imágen desde la webcam</span>
    </div>

    <!-- The Modal -->
  <div id="myModal" class="modal" :style="{display:showModal?'block':'none'}">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>

    <div v-show="isLoading" class="camera-loading">
      <ul class="loader-circle">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <div v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
    
      <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
        
      <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
      
      <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
    </div>
    
    <div v-if="!isLoading" class="camera-shoot">
      <button type="button" class="button" @click="takePhoto">
        <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
      </button>
    </div>

  </div>

</div>

  </label>
</template>
<script>
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
  data(){
    return {
      showModal:false,
      isLoading: false,
      isPhotoTaken:false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    openModal(event){
      this.showModal = !this.showModal;
      if(this.showModal){
        this.isPhotoTaken = false;
        this.createCameraElement();
      }else{
        this.isLoading = false;
      }
    }, 
    createCameraElement() {
      this.isLoading = true;
      
      const constraints = (window.constraints = {
				audio: false,
				video: true
			});


			navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
          this.isLoading = false;
					this.$refs.camera.srcObject = stream;
				})
				.catch(error => {
          this.isLoading = false;
					alert("May the browser didn't support or there is some errors.");
				});
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

			tracks.forEach(track => {
				track.stop();
			});
    },
    async takePhoto() {
      if(!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken = !this.isPhotoTaken;
      
      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);

      let file = null;

      await new Promise( function(resolve, reject) {
        document.getElementById("photoTaken").toBlob(
          function(blob) {
            file = new File([blob], 'webcam.jpeg', { type: 'image/jpeg' });
            resolve(blob);
          }, 
        'image/jpeg')
      }
      )
      this.stopCameraStream();
      this.openModal();
      this.$emit('file-updated', file);

    }
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

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  border: 1px solid #888;
  width: fit-content;
  height: fit-content;
  max-width: 550px;
  border-radius: 1rem;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  width: 3rem;
  text-align:center;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.camera-loading {
  overflow: hidden;
  height: 50%;
  width: 50%;
  min-height: 150px;
  margin:auto
}
.camera-loading ul {
  height: 100%;
  width: 100%;
  z-index: 999999;
  margin: 0;
}
.camera-loading .loader-circle {
  display: block;
  height: 14px;
  margin: 0 auto;
  top: 40%;
  left: 100%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  position: absolute;
  width: 100%;
  padding: 0;
}
.camera-loading .loader-circle li {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  line-height: 10px;
  padding: 0;
  position: relative;
  margin: 0 0 0 4px;
  background: #999;
  animation: preload 1s infinite;
  top: -50%;
  border-radius: 100%;
}
.camera-loading .loader-circle li:nth-child(2) {
  animation-delay: 0.2s;
}
.camera-loading .loader-circle li:nth-child(3) {
  animation-delay: 0.4s;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(2) {
  animation-delay: 0.2s;
}
.web-camera-container .camera-loading .loader-circle li:nth-child(3) {
  animation-delay: 0.4s;
}

.camera-box{
  display:grid;
  justify-items: center;
  margin-top:3rem;
}

.camera-shoot{
  display:grid;
  justify-content: center;
  margin-top:0.5rem;
}

.button{
  height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      border: 1px solid rgb(206, 206, 206);
      margin-bottom: 1rem;
}

@keyframes preload {
  0% {
    opacity: 1;
 }
  50% {
    opacity: 0.4;
 }
  100% {
    opacity: 1;
 }
}
</style>
