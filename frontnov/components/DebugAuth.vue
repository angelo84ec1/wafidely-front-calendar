<template>

  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '~/store/auth';
  import { useRoute } from 'vue-router';
  
  const authStore = useAuthStore();
  const route = useRoute();

  </script>