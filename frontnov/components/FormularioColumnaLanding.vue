<template>
  <div class="">
    <form @submit.prevent="sendMail">
      <label for="nombre">Nombre :</label>
      <input v-model="formData.nombre" type="text" id="nombre" name="nombre" class="w-full mb-4 p-2 rounded-md">

      <label for="telefono">Teléfono:</label>
      <input v-model="formData.telefono" type="tel" id="telefono" name="telefono" class="w-full mb-4 p-2 rounded-md">

      <label for="correo">Correo:</label>
      <input v-model="formData.correo" type="email" id="correo" name="correo" class="w-full mb-4 p-2 rounded-md">

      <label for="requerimiento">Solicitar más información:</label>
      <textarea v-model="formData.requerimiento" id="requerimiento" name="requerimiento"
        class="w-full mb-4 p-2 rounded-md"></textarea>

      <button type="submit" class="estil1 bg-[#232c4d]  rounded-md">Enviar</button>
    </form>
  </div>
</template>
  
<script>
import { useToast } from 'vue-toastification';

// get email from props
const {
  public: { baseURL },
} = useRuntimeConfig();
const toast = useToast();
export default {
  name: 'FormularioColumna',
  props: {
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        nombre: '',
        telefono: '',
        correo: '',
        requerimiento: ''
      }
    }
  },
  methods: {
    sendMail() {
      // All form data should be written as mail body

      if (
        !this.formData.nombre.trim() ||
        !this.formData.telefono.trim() ||
        !this.formData.correo.trim() ||
        !this.formData.requerimiento.trim()
      ) {
        toast.error('Completa todos los campos');
        return;
      }

      // get email from props
      let email = this.email;
      const emailData = {
        to: email,
        subject: 'Formulario Landing WA',
        text: `
          Nombre de la empresa: ${this.formData.nombre}
          Teléfono: ${this.formData.telefono}
          Correo: ${this.formData.correo}
          Descripción de la alianza: ${this.formData.requerimiento}
        `,
      };

      // Use strapi email plugin to send email
      fetch(`${baseURL}/email`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })
        .then((res) => {
          if (res.ok) {
            toast.success('Correo enviado');
            this.formData = {
              nombre: '',
              telefono: '',
              correo: '',
              requerimiento: ''
            }
          } else {
            toast.error('Error al enviar el correo');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

</script>
<style>
/* Estilo inicial del botón */
.estil1 {
  background-color: #232c4d;
  color: #ffffff;
  /* Color del texto negro */
  transition: color 0.3s;
  /* Agrega una transición suave para el cambio de color */
  padding: 6px;
}

/* Efecto hover para cambiar el color del texto a blanco */
.estil1:hover {
  color: #FFFFFF;
  padding: 6px;
}
</style>




