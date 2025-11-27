<template>
    <!-- Este contenido no se verá porque forzamos el error -->
    <div></div>
  </template>
  
  <script setup>
  definePageMeta({
    // Previene la indexación de esta "página" en motores de búsqueda
    layout: false
  })
  
  onBeforeMount(() => {
    throw createError({
      statusCode: 404,
      statusMessage: 'Página No Encontrada'
    })
  })
  </script>