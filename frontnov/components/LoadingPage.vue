<template>
    <Transition name="fade">
      <div v-if="show" class="loading-wrapper">
        <!-- Elementos decorativos flotantes -->
        <div class="floating-element top-left"></div>
        <div class="floating-element top-right"></div>
        <div class="floating-element bottom-left"></div>
        <div class="floating-element bottom-right"></div>
        
        <div class="loading-content">
          <!-- Logo -->
          <div class="brand-container">
            <img 
              :src="logoDefault" 
              alt="Wafidely" 
              class="brand-logo"
            />
          </div>
          
          <!-- Spinner mejorado -->
          <div class="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          
          <!-- Texto con glassmorphism -->
          <div class="loading-text">
            <h2 class="loading-title">{{ message.title }}</h2>
            <p class="loading-subtitle">{{ message.subtitle }}</p>
          </div>
          
          <!-- Barra de progreso animada -->
          <div class="progress-container">
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import logoDefault from '~/assets/images/wafidelynegroturquesaverde.png';
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: true
    }
  });
  
  const messages = {
    es: { title: 'Cargando experiencia', subtitle: 'Preparando tu asistente inteligente...' },
    en: { title: 'Loading experience', subtitle: 'Preparing your intelligent assistant...' },
    pt: { title: 'Carregando experiência', subtitle: 'Preparando seu assistente inteligente...' }
  };
  
  const message = computed(() => {
    if (process.client) {
      const lang = navigator.language.split('-')[0];
      return messages[lang] || messages.es;
    }
    return messages.es;
  });
  </script>
  
  <style scoped lang="scss">
  .loading-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #25D366 0%, #2563EB 50%, #7C3AED 100%);
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  // Elementos flotantes decorativos
  .floating-element {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    animation: float 6s ease-in-out infinite;
  }
  
  .top-left {
    width: 100px;
    height: 100px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }
  
  .top-right {
    width: 150px;
    height: 150px;
    top: 15%;
    right: 15%;
    animation-delay: 1.5s;
  }
  
  .bottom-left {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 15%;
    animation-delay: 3s;
  }
  
  .bottom-right {
    width: 120px;
    height: 120px;
    bottom: 15%;
    right: 10%;
    animation-delay: 4.5s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-30px) scale(1.1);
      opacity: 0.5;
    }
  }
  
  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    position: relative;
    z-index: 10;
  }
  
  // Logo
  .brand-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeInDown 0.8s ease-out;
  }
  
  .brand-logo {
    max-width: 250px;
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3));
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  // Transición fade
  .fade-enter-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  // Spinner mejorado
  .lds-spinner {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: white;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  
  .lds-spinner div:nth-child(1) { transform: rotate(0deg); animation-delay: -1.1s; }
  .lds-spinner div:nth-child(2) { transform: rotate(30deg); animation-delay: -1s; }
  .lds-spinner div:nth-child(3) { transform: rotate(60deg); animation-delay: -0.9s; }
  .lds-spinner div:nth-child(4) { transform: rotate(90deg); animation-delay: -0.8s; }
  .lds-spinner div:nth-child(5) { transform: rotate(120deg); animation-delay: -0.7s; }
  .lds-spinner div:nth-child(6) { transform: rotate(150deg); animation-delay: -0.6s; }
  .lds-spinner div:nth-child(7) { transform: rotate(180deg); animation-delay: -0.5s; }
  .lds-spinner div:nth-child(8) { transform: rotate(210deg); animation-delay: -0.4s; }
  .lds-spinner div:nth-child(9) { transform: rotate(240deg); animation-delay: -0.3s; }
  .lds-spinner div:nth-child(10) { transform: rotate(270deg); animation-delay: -0.2s; }
  .lds-spinner div:nth-child(11) { transform: rotate(300deg); animation-delay: -0.1s; }
  .lds-spinner div:nth-child(12) { transform: rotate(330deg); animation-delay: 0s; }
  
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  
  // Texto con glassmorphism
  .loading-text {
    text-align: center;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1.5rem 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-out 0.3s both;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .loading-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  .loading-subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }
  
  // Barra de progreso
  .progress-container {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .progress-bar {
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  
  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  // Responsive
  @media (max-width: 768px) {
    .brand-logo {
      max-width: 200px;
    }
    
    .loading-title {
      font-size: 1.25rem;
    }
    
    .loading-subtitle {
      font-size: 0.875rem;
    }
    
    .loading-text {
      padding: 1rem 1.5rem;
    }
    
    .lds-spinner {
      width: 60px;
      height: 60px;
    }
    
    .lds-spinner div {
      transform-origin: 30px 30px;
    }
    
    .lds-spinner div:after {
      left: 27px;
    }
    
    .floating-element {
      display: none;
    }
    
    .progress-container {
      width: 150px;
    }
  }
  
  @media (max-width: 480px) {
    .brand-logo {
      max-width: 160px;
    }
    
    .loading-content {
      gap: 2rem;
    }
  }
  </style>