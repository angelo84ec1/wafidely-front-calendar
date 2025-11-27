<template>
  <!-- <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
            <img src="~/assets/images/banner_chica.png" class=" " alt="...">
        </div>
        <div class="swiper-slide">
            <img src="~/assets/images/banners_news_home.png" class=" " alt="...">
        </div>
        <div class="swiper-slide">
            <img src="~/assets/images/banner_chica.png" class=" " alt="...">
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div> -->
  <swiper
    :slides-per-view="1"
    :space-between="50"
    :pagination="{ clickable: true }"
    :modules="modules"
    :mousewheel="false"
    :autoplay="{
      delay: 12000,
      disableOnInteraction: true,
    }"
  >
    <swiper-slide
      >
      <a href="/planes">
      
      <img src="~/assets/images/banner_chica.png" class=" image-container" alt="..."
    />
  </a>
    </swiper-slide>

    <swiper-slide
      >
      <a href="/planes">
      <img src="~/assets/images/2.png" class="image-container " alt="..."
    />
  </a>
    </swiper-slide>
    <swiper-slide>
      <a href="/planes">
      <img src="~/assets/images/img_planes.png" class="image-container " alt="..."
    />
  </a>
    </swiper-slide>
   

    <swiper-slide
      >
      <a href="/planes">
      <img src="~/assets/images/banner_auxilio_mecanico.png" class="image-container " alt="..."
    />
  </a>
    </swiper-slide>
    <swiper-slide
      >
      <a href="/planes">
      <img src="~/assets/images/3.png" class="image-container" alt="..."
    />
  </a>
    </swiper-slide>
    <swiper-slide
      >
      <a href="/planes">
      <img src="~/assets/images/7.png" class="image-container " alt="..."
    />
  </a>
    </swiper-slide>
  </swiper>
</template>

<script>
// import Swiper from 'swiper/bundle';
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import { Swiper } from "swiper/vue";
import "swiper/css/pagination";
import "swiper/css";

// import SwiperCore, { Autoplay } from 'swiper/core';
// import 'swiper/swiper-bundle.css';

// SwiperCore.use([Autoplay]);

export default {
  data() {
    return {
      modules: [Mousewheel, Pagination, Autoplay],
    };
  },
  // mounted() {
  //   const swiper = new Swiper(".swiper-container", {
  //     // Configuración de Swiper (ajusta según tus necesidades)
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //     pagination: {
  //       el: ".swiper-pagination",
  //     },
  //   });
  // },
};
</script>

<style scoped>
/* Estilo personalizado para las flechas */
.custom-prev,
.swiper-slide {
  color: black; /* Color negro */
  font-size: 24px; /* Tamaño de fuente personalizado */
  /* Otros estilos personalizados si es necesario */
}
</style>

<style>
.swiper-pagination-bullet-active {
  background: #df2f91 !important;
}


.image-container {

  display: inline-block;

  /* Establecer la altura mínima del contenedor al 100% del alto de la ventana gráfica (viewport) */
  position: relative;
  /* Estilos para pantallas de 13 y 14 pulgadas */
  width: 100%;
  height: 100%;


  @media screen and (max-device-width : 1680px) {

    display: inline-block;

    /* Establecer la altura mínima del contenedor al 100% del alto de la ventana gráfica (viewport) */
    position: relative;
  /* Estilos para pantallas de 13 y 14 pulgadas */
  width: 100%;
  height: 100%;

  }
}


</style>
