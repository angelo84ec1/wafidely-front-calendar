<template>
  <main>
    <button class="button button--secondary" @click="sendDataToIPAddress()">
      <img src="~/assets/images/email-green.png" alt="" />Enviar Json Coris
    </button>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

async function sendDataToIPAddress() {
  const store = useAuthStore();
  const res = await store.generateToken();
  console.log(JSON.stringify({
    "CLI_EMP": "409",
    "PLAN_CLIENTE": "plane.value",
    "IDENTIFICACION": "iCedula.value",
    "PRIMER_APELLIDO": "lastnames.value",
    "SEGUNDO_APELLIDO": "lastnames.value",
    "PRIMER_NOMBRE": "names.value",
    "SEGUNDO_NOMBRE": " names.value",
    "FECHA_NACIMIENTO": "birthDate.value",
    "DIRECCION": "direction.value",
    "CELULAR": "cellphone.value",
    "EMAIL": "email.value",
    "Celular": "cellphone.value",
    "FECHA_INICIO_VIGENCIA": "fecha_compra.value",
    "FECHA_FIN_VIGENCIA": "fecha_fin.value",
    "PLACA": " pPlaca.value",
    "MARCA": "pVehicle.value",
    "MODELO": " pModel.value",
    "ANIO": "pAno.value"
  }))
  console.log(res);
  const res2 = await store.sendInfo({
    "CLI_EMP": "409",
    "PLAN_CLIENTE": "plane.value",
    "IDENTIFICACION": "iCedula.value",
    "PRIMER_APELLIDO": "lastnames.value",
    "SEGUNDO_APELLIDO": "lastnames.value",
    "PRIMER_NOMBRE": "names.value",
    "SEGUNDO_NOMBRE": " names.value",
    "FECHA_NACIMIENTO": "birthDate.value",
    "DIRECCION": "direction.value",
    "CELULAR": "cellphone.value",
    "EMAIL": "email.value",
    "Celular": "cellphone.value",
    "FECHA_INICIO_VIGENCIA": "fecha_compra.value",
    "FECHA_FIN_VIGENCIA": "fecha_fin.value",
    "PLACA": " pPlaca.value",
    "MARCA": "pVehicle.value",
    "MODELO": " pModel.value",
    "ANIO": "pAno.value"
  }) //escribe un example de data aqui por favor

  console.log(res2)
};


</script>
