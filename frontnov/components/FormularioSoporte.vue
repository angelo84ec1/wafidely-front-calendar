<template>
    <div  style="width: 100%;" >
      <div class="spacer"></div>
      <p class="ml-12 font-semibold  inline-block sm:inline ">Tus opiniones son importantes para nosotros, ingresa tus datos y pronto te atenderemos:</p>
      <div class="spacer"></div>
      <form @submit.prevent="sendMail" class="formcontact w-full  rounded-md">
        <label for="nombre">Nombres:</label>
        <input v-model="formData.nombre" type="text" id="nombre" name="nombre" class="w-full mb-4 p-2 rounded-md">
  
        <label for="telefono">Teléfono:</label>
        <input v-model="formData.telefono" type="tel" id="telefono" name="telefono" class="w-full mb-4 p-2 rounded-md">
  
        <label  for="correo">Correo:</label>
        <input v-model="formData.correo"  type="email" id="correo" name="correo" class="w-full mb-4 p-2 rounded-md">
  
        <label for="requerimiento">Requerimiento:</label>
        <textarea v-model="formData.requerimiento" id="requerimiento" name="requerimiento" class="w-full mb-4 p-2 rounded-md"></textarea>
    

  <button type="submit" class="estil1 bg-[#FFF200] rounded-md  animate-squeeze  ">Enviar Solicitud</button>

        
      </form>
    </div>
  </template>
  
  <script>

  import { useToast } from 'vue-toastification';
  const {
  public: { baseURL, MAILTO },
} = useRuntimeConfig();
const toast = useToast();
export default {
  name: 'FormularioColumna',
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


      const emailData = {
        to: "amc@automotorsclub.com",
        subject: 'Formulario de contacto App Web AMC',
        text: `
          Nombre de la empresa: ${this.formData.nombre}
          Teléfono: ${this.formData.telefono}
          Correo: ${this.formData.correo}
          Descripción de la alianza: ${this.formData.requerimiento}
        `,
      };

      // Use strapi email plugin to send email
      fetch(`${baseURL}/email/`, {
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
    background-color: #FFF200;
    color: #000000; /* Color del texto negro */
    transition: color 0.3s; /* Agrega una transición suave para el cambio de color */
    padding: 6px;
  }

  /* Efecto hover para cambiar el color del texto a blanco */
  .estil1:hover {
    color: #FFFFFF;
    padding: 6px;
  }
  .spacer {
 height: 15px; /* Altura del espacio entre los divs */
}

.formcontact {
  padding: 10px 500px 10px 80px;
  left: 18%; /* Coloca el texto en el centro horizontal */
  margin: 0 auto; /* Centra el elemento horizontalmente */
}


@media only screen and (max-width: 1076px) {
  .formcontact  {
    padding: 0px;
  margin: 0 auto; /* Centra el elemento horizontalmente */
  max-width: 600px; /* Establece un ancho máximo para el formulario */

  left: 2%;
  }
}
</style>


