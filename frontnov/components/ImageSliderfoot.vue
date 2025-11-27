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
    :slides-per-view="4"
    :space-between="2"
    :pagination="{ clickable: true }"
    :modules="modules"
    :mousewheel="false"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
    }"
  >
  <swiper-slide>
    <a href="/plansilver">
        <div class="text-overlay">Multas Tránsito</div>
    <img src="~/assets/images/multastransito.png" class="rounded-image" alt="...">

  </a>
</swiper-slide>
    <swiper-slide>
    <a href="/plansilver">
        <div class="text-overlay">Mecánica Ligera</div>
      <img src="~/assets/images/mecanicaligera.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide>
        <a href="/planblack">
        <div class="text-overlay">Permiso de Conducción</div>
      <img src="~/assets/images/permisoconduccion.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide>
      <a href="/alianzas">
        <div class="text-overlay">Alianzas</div>
      <img src="~/assets/images/pic_alianzas.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide >
        <a href="/plangold">
        <div class="text-overlay">Remolque Auto</div>
      <img src="~/assets/images/remolqueauto.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Reposición Retrovisores</div>
      <img src="~/assets/images/reposicionretrovisores.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Golpes Leves Autos</div>
      <img src="~/assets/images/golpeslevesautos.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide>
      <a href="/plangold">
        <div class="text-overlay">Angel Guardian</div>
      <img src="~/assets/images/angelguardian.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>

    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Auxilio Vial</div>
      <img src="~/assets/images/auxiliovial.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>

    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Asistencia Telefónica</div>
      <img src="~/assets/images/asistencialegaltelefonica.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>

    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Cambio Neumáticos</div>
      <img src="~/assets/images/cambioneumaticos.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>

    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Coordinación de Taller</div>
      <img src="~/assets/images/coordinaciontaller.png" class="rounded-image" alt="..."
    />
</a>
    </swiper-slide>
    <swiper-slide>
      <a href="/planblack">
        <div class="text-overlay">Auxilio Mecánico</div>
      <img src="~/assets/images/auxiliomecanico.png" class="rounded-image" alt="..."
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
  top: -20px;
}

.text-overlay {
  position: absolute;
  display: flex;
  align-items: center; /* Centra verticalmente en el eje Y */
  justify-content: center; /* Centra horizontalmente en el eje X */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 250;
  font-size: 1vw; /* Establece el tamaño del texto a 8px */
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 2px;
  border-radius: 3px;
}

@media screen and (min-width: 600px) {
  /* Aplica un tamaño de texto mayor para pantallas más grandes */
  .text-overlay {
    display: flex;
    text-align: center;
    font-size: 0.9vw;/* O ajusta el tamaño que desees */
    
  }
}

.rounded-image {
  border-radius: 4px;
}


</style>
