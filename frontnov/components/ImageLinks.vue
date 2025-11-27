<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(image, index) in images" :key="index">
        <a :href="image.link" target="_blank" rel="noopener noreferrer">
          <img :src="image.src" :alt="image.alt" class="w-full h-auto" />
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
import footIMG1 from "@/assets/images/icono_1_escuelas.png";
import footIMG2 from "@/assets/images/icono_2_establecimientos.png";
import footIMG3 from "@/assets/images/icono_3_gasoline.png";
  const images = ref([
    {
      src: footIMG1,
      alt: '',
      link: '#',
    },
    {
      src: footIMG2,
      alt: '',
      link: '#',
    },
    {
      src: footIMG3,
      alt: '',
      link: '#',
    },
  ]);
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales según sea necesario */
  </style>
  