<template>
  <label :for="$attrs['for']">
    <span style="font-weight: 600">{{ label }}</span>
    <div class="inputWrapper">
      
      <slot name="icon" />
      <input
        :id="$attrs['for']"
        :name="name"
        :class="{ 'has-icon': hasIcon, error: v?.$error }"
        :type="showPassword ? 'text' : type"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        :maxlength="max"
        :disabled="disabled"
        :required="required"
        @input="onInput"
      />
  
      <div class="img-right-container">
        
      


       
      </div>
    </div>
    <span v-if="v && v?.$error" class="error">{{ v.$errors[0]?.$message }}</span>
  </label>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({


  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  hasIcon: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean, null],
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  max: {
    type: Number,
    default: 255,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  v: {
    type: Object,
    required: false,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean, null],
    default: "",
  },
  isTextArea: {
    type: Boolean,
    default: false,
  },
});


const emit = defineEmits(["update:modelValue"]);
const showPassword = ref(false);

const onInput = (e) => {
  if (props.v) {
    props.v.$touch();
  }
  emit("update:modelValue", e.target.value);
};

const toggleInputType = () => {
  showPassword.value = !showPassword.value;
};



</script>
<style scoped>
.inputWrapper {
  height: 2.5rem;
  padding: 0 0.2rem;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.inputWrapper svg {
  position: absolute;
  left: 10px;
  width: 1em;
  height: 1em;
}

.inputWrapper input {
  padding: 0 0.5rem;
  overflow: auto;
  word-break: break-word;
  border-radius: 8px;
}

.inputWrapper > input {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}


/* Estilos para el placeholder */
.inputWrapper > input::placeholder {
  color: gray; /* Color gris para el placeholder */
  font-size: 0.58rem; /* Tamaño de letra más pequeño para el placeholder */
}

.inputWrapper > input.has-icon {
  padding-left: 40px;
  
}

.inputWrapper :deep(img) {
  position: relative;
  width: 24px;
  height: auto;
  z-index: 2;
  left: 0.25rem;
}




/* Estilos para el contenedor de img-right */
.img-right-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  background-repeat: no-repeat;
  margin-top: 0px;
}



@media (min-width: 768px) {
  /* Para pantallas más grandes, como PC */
  .img-right-container {
    margin-left: 350px; /* Ajusta el valor según tus necesidades */
  }
}

@media (max-width: 480px) {
  /* Para pantallas más pequeñas, como dispositivos móviles */
  .img-right-container {
    position: relative;
  display: flex;
  padding: 0 0.8rem;
    margin-left: auto; /* Ajusta el valor según tus necesidades */
  }
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.error {
  color: red;
  margin-top: 0.25rem;
}

input.error {
  border: 1px solid red;
}

/* Oculta todos los iconos SVG dentro de los elementos de entrada */
.password-input svg {
  display: none;
}

</style>
