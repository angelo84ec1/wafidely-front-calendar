<!-- error.vue en la raíz del proyecto -->
<template>
    <div>
      <component :is="is404 ? Error404 : DefaultError" />
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from "vue"
  import Error404 from "./components/Error404.vue"
  
  // Fallback por si es otro error
  const DefaultError = {
    template: "<div><h1>Ocurrió un error inesperado</h1></div>"
  }
  
  const props = defineProps({
    error: Object
  })
  
  const is404 = computed(() => props.error?.statusCode === 404)
  
  useHead({
    title: is404.value ? "404 - Página no encontrada" : "Error",
    meta: [
      {
        name: "description",
        content: is404.value
          ? "La página que buscas no existe."
          : "Ha ocurrido un error inesperado."
      },
      { name: "robots", content: "noindex, nofollow" }
    ]
  })
  </script>
  