<template>
  <div class="input__file-previewer">
    <label class="input__file-label" :for="$attrs['for']">
      <span style="font-weight: 600;">{{ label }}</span>
      <div class="input--file">
        <input type="file" :accept="accept" :disabled="disabled" :name="name" @change="onFileChange($event)">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
        </svg>

        <span class="name">Click aquí para cargar un archivo</span>
        <span class="name">{{ placeholder }}</span>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'BaseFileInput',
  props: {
    accept: {
      type: String,
      default: 'image/png, image/jpeg'
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
    }
  },
  emits: ['update:modelValue'],
  methods: {
    onFileChange(event) {
      const target = event.target
      if (target.files === null) return;
      const file = target.files[0]
      // Check to see if there has been a file actually uploaded
      if (file) {
        this.$emit('update:modelValue', file);
      }
    },
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
</style>
