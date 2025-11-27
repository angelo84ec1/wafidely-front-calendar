<template>
  <div class="modiplan">
    <form @submit.prevent="sendMail">
        <label for="nombre">Seleccione el nombre del plan</label>
    <select v-model="formData.nombre" id="nombre" name="nombre" class="w-full mb-4 p-2 rounded-md">
    <option value="Silver">Plan Silver</option>
    <option value="Gold">Plan Gold</option>
    <option value="Black">Plan Black</option>
    </select>
      
      <label for="correo">Correo:</label>
      <input v-model="formData.correo" type="email" id="correo" name="correo" class="w-full mb-4 p-2 rounded-md">

      <label for="requerimiento">Campos a modificar:</label>
      <textarea v-model="formData.requerimiento" id="requerimiento" name="requerimiento"
        class="w-full mb-4 p-2 rounded-md" placeholder="Indicar el campo a modificar: ejemplo Placa: IBA-8767; Motor:CFG5678REEEEEEE, etc"></textarea>

      <button type="submit" class="estil1 bg-[#FFF200]   rounded-md">Enviar</button>
    </form>
    <div style="display: flex; flex-direction: column; margin-top: 15px;">
    <label>Si tienes que modificar más de un plan, debes enviar un formulario por cada plan.</label>
    <label><strong>Nota:</strong> Solo se permitirá modificar en ciertos casos.</label>
</div>

  </div>
</template>
  
<script>
import { useToast } from 'vue-toastification';



const {
  public: { baseURL, MAILTO },
} = useRuntimeConfig();
const toast = useToast();
export default {
  name: 'FormularioColumnaModificaPlanes',
  layout: "private",
  data() {
    return {
      formData: {
        nombre: '',
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
        !this.formData.correo.trim() ||
        !this.formData.requerimiento.trim()
      ) {
        toast.error('Completa todos los campos');
        return;
      }

      const emailData = {
        to: "amc@automotorsclub.com",
        subject: 'Modificar campos Plan Socio',
        text: `
          Nombre del plan: ${this.formData.nombre}
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
  color: #000000;
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

.modiplan{

    padding: 30px;

}
</style>


