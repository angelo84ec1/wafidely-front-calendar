<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { updateTimer, getTimeLeft } from '~/utils/countdown.js';

let intervalId;
const timeLeft = ref(getTimeLeft());

onMounted(() => {
  intervalId = setInterval(updateTimeLeft, 1000);
});

// Limpiamos el intervalo cuando el componente se desmonta
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// Actualizar el tiempo restante en tiempo real
const updateTimeLeft = () => {
  timeLeft.value = getTimeLeft();
};

// Calcular el tiempo restante en formato de texto
const displayTime = computed(() => {
  const diff = timeLeft.value;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
});
</script>




<style>
/* Estilos locales específicos del componente */
.timercount {
  color: white; /* Cambiar el color del texto a blanco */
  font-size: 20px;
  font-weight: bold;
  text-align: center; /* Centrar el texto horizontalmente */
}
</style>

<template>
    <div>
      <p class="timercount">Tiempo restante Descuento: {{ displayTime }}</p>
  </div>
  </template>
  
