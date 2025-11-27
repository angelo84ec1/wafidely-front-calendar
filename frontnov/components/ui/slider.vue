<template>
    <div class="relative overflow-hidden">
      <!-- Flecha Izquierda -->
      <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
  
      <!-- Contenedor del Slider -->
      <div class="flex transition-transform duration-300 transform" :style="{ 'translateX': `-${currentSlide * 100}%` }">
        <!-- Imágenes -->
        <div v-for="(image, index) in images" :key="index" class="w-full">
          <img :src="image" alt="Slide" class="w-full">
        </div>
      </div>
  
      <!-- Flecha Derecha -->
      <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </template>
  
  <script> 
  export default {
    data() {
      return {
        currentSlide: 0,
        images: [
            '~/assets/images/banner_home21.png' ,
            
       
        ]
      };
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos CSS personalizados aquí */
  </style>
  