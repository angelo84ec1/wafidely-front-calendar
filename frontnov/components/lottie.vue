
<template>
  <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
    <lottie-player
      :src="lottieAnimation"
      background="transparent"
      speed="1"
      loop
      autoplay
    ></lottie-player>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Ruta de la animación JSON
const lottieAnimation = ref('~/assets/images/animation_lklw6so3.json');
</script>