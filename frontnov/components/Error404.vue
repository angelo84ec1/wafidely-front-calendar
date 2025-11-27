<template>
    <div class="error-404-container flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-100">
      <img
        src="~/assets/images/error404.png"
        alt="Página no encontrada"
        class="w-64 mb-6"
      />

      <h2 class="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p class="text-gray-600 mb-6">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <NuxtLink
        to="/ai"
        class="px-8 py-4 p-10 bg-[#232c4d] text-white rounded hover:bg-[#232c4d] transition"
      >
        Volver al inicio
      </NuxtLink>
    </div>
  </template>
  
  <script setup>
  // Aquí puedes agregar lógica si necesitas
  </script>
  
  <style scoped>
  .error-404-container {
    /* Puedes añadir estilos adicionales aquí si quieres */
  }
  </style>
  