<template>
  <header
    class="fixed top-0 left-0 right-0 w-full p-4 flex justify-between items-center transition-all duration-300 ease-in-out glass-effect"
    :class="{ scrolled: scrolled }"
    ref="navbar"
    style="z-index: 999999 !important;"
  >
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center space-x-3 relative" style="z-index: 1000001 !important;">
      <div>
        <!-- Logo dinámico basado en el estado del scroll -->
        <img 
          :src="scrolled ? logoDefault  : logoScrolled"
          class="image-container transition-all duration-300 ease-in-out" 
          style="width: 179px; height: 35px;"
          alt="Logo Wafidely"
        />
        <p class="text-[8px] transition-colors ml-2" :class="scrolled ? 'text-gray-600' : 'text-gray-200'">
          {{ menuTexts.tagline }}
        </p>
      </div>
    </NuxtLink>
    
    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-6" style="z-index: 1000001 !important;">
      <a 
        href="#features" 
        @click.prevent="scrollToSection('features')"
        class="nav-link transition-all cursor-pointer font-medium px-3 py-2 rounded-lg"
        :class="[
          activeSection === 'features' ? 'nav-link-active' : '',
          scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
        ]"
      >
        {{ menuTexts.features }}
      </a>

      <a 
        href="#testimonials" 
        @click.prevent="scrollToSection('testimonials')"
        class="nav-link transition-all cursor-pointer font-medium px-3 py-2 rounded-lg"
        :class="[
          activeSection === 'testimonials' ? 'nav-link-active' : '',
          scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
        ]"
      >
        {{ menuTexts.testimonials }}
      </a>

      <a 
        href="#pricing" 
        @click.prevent="scrollToSection('pricing')"
        class="nav-link transition-all cursor-pointer font-medium px-3 py-2 rounded-lg"
        :class="[
          activeSection === 'pricing' ? 'nav-link-active' : '',
          scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
        ]"
      >
        {{ menuTexts.pricing }}
      </a>

      <a 
        href="#preguntasfrecuentes" 
        @click.prevent="scrollToSection('preguntasfrecuentes')"
        class="nav-link transition-all cursor-pointer font-medium px-3 py-2 rounded-lg"
        :class="[
          activeSection === 'preguntasfrecuentes' ? 'nav-link-active' : '',
          scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
        ]"
      >
        {{ menuTexts.faq }}
      </a>

      <!-- Documentación y Select de País -->
      <div class="flex items-center space-x-3">
        <a 
          href="https://docs.ai.wafidely.com/" 
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link transition-all cursor-pointer font-medium px-3 py-2 rounded-lg"
          :class="[
            activeSection === 'testimonials' ? 'nav-link-active' : '',
            scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-300'
          ]"
        >
          {{ menuTexts.documentation }}
        </a>
        
        <!-- Country Select Desktop -->
        <div class="relative" ref="countrySelectDesktop">
          <button
            @click="toggleCountrySelect"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200"
            :class="[
              scrolled ? 'text-gray-700 hover:text-green-600 hover:bg-green-50' : 'text-white hover:text-green-300 hover:bg-white/10'
            ]"
          >
            <div v-html="selectedCountry.flag" class="w-5 h-4"></div>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showCountrySelect }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Dropdown -->
          <div 
            v-if="showCountrySelect"
            class="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 max-h-80 overflow-y-auto z-[1000002]"
          >
            <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              {{ menuTexts.selectCountry }}
            </div>
            <button
              v-for="country in countries"
              :key="country.code"
              @click="selectCountry(country)"
              class="w-full flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors duration-150 text-left"
              :class="{ 'bg-green-50 text-green-700': selectedCountry.code === country.code }"
            >
              <div v-html="country.flag" class="w-6 h-5 flex-shrink-0"></div>
              <span class="text-sm font-medium text-gray-800">{{ country.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <button 
        @click="startFreeTrial"
        class="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-lg"
      >
        {{ menuTexts.tryFree }}
      </button>
    </div>
    
    <!-- Mobile Menu Button -->
    <div class="mobile-menu md:hidden" style="z-index: 1000001 !important;">
      <button @click="toggleMobileMenu" class="relative w-10 h-10 flex items-center justify-center focus:outline-none">
        <!-- Hamburger Menu Animation -->
        <div class="hamburger-menu" :class="{ 'active': mobileMenuOpen }">
          <span class="line line-1" :class="scrolled ? 'bg-gray-800' : 'bg-white'"></span>
          <span class="line line-2" :class="scrolled ? 'bg-gray-800' : 'bg-white'"></span>
          <span class="line line-3" :class="scrolled ? 'bg-gray-800' : 'bg-white'"></span>
        </div>
      </button>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div 
    v-if="mobileMenuOpen"
    class="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300"
    @click="closeMobileMenu"
    style="z-index: 999998 !important;"
  ></div>

  <!-- Mobile Menu Panel -->
  <div 
    v-if="mobileMenuOpen"
    class="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
    :class="mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    style="z-index: 1000000 !important;"
  >
    <!-- Mobile Menu Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-900 flex-shrink-0">
      <div class="flex items-center space-x-3">
        <div>
          <!-- Logo fijo para móviles - siempre blanco sin transparencia -->
          <img 
            :src="logoScrolled"
            class="image-container" 
            style="width: 179px; height: 35px;"
            alt="Logo Wafidely"
          />
        </div>
      </div>
      
      <!-- Close Button -->
      <button 
        @click="closeMobileMenu"
        class="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Content -->
    <div class="flex-1 flex flex-col">
      <!-- Navigation Menu -->
      <div class="flex-1 py-6 overflow-y-auto">
        <ul class="space-y-2 px-6">
          <li>
            <a 
              href="#features" 
              @click.prevent="scrollToSection('features')"
              class="mobile-nav-link flex items-center px-4 py-4 rounded-lg transition-all duration-200 cursor-pointer group"
              :class="activeSection === 'features' ? 'mobile-nav-link-active' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'"
            >
              <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="font-medium">{{ menuTexts.features }}</span>
            </a>
          </li>

          <li>
            <a 
              href="#testimonials" 
              @click.prevent="scrollToSection('testimonials')"
              class="mobile-nav-link flex items-center px-4 py-4 rounded-lg transition-all duration-200 cursor-pointer group"
              :class="activeSection === 'testimonials' ? 'mobile-nav-link-active' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'"
            >
              <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span class="font-medium">{{ menuTexts.testimonials }}</span>
            </a>
          </li>
          
          <li>
            <a 
              href="#pricing" 
              @click.prevent="scrollToSection('pricing')"
              class="mobile-nav-link flex items-center px-4 py-4 rounded-lg transition-all duration-200 cursor-pointer group"
              :class="activeSection === 'pricing' ? 'mobile-nav-link-active' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'"
            >
              <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <span class="font-medium">{{ menuTexts.pricing }}</span>
            </a>
          </li>

          <li>
            <a 
              href="#preguntasfrecuentes" 
              @click.prevent="scrollToSection('preguntasfrecuentes')"
              class="mobile-nav-link flex items-center px-4 py-4 rounded-lg transition-all duration-200 cursor-pointer group"
              :class="activeSection === 'preguntasfrecuentes' ? 'mobile-nav-link-active' : 'text-gray-700 hover:bg-green-50 hover:text-green-600'"
            >
              <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span class="font-medium">{{ menuTexts.faq }}</span>
            </a>
          </li>

          <li class="pt-6">
            <a 
              href="#" 
              @click.prevent="scrollToSection('features')"
              class="flex items-center px-4 py-3 text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
            >
              <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ menuTexts.howItWorks }}</span>
            </a>
          </li>
          
          <!-- Documentación y Select de País Mobile -->
          <li>
            <a 
              href="https://docs.ai.wafidely.com/" 
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center px-4 py-3 text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
            >
              <svg class="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ menuTexts.documentation }}</span>
            </a>
          </li>

          <!-- Mobile Country Select -->
          <li>
            <div class="px-4 py-3">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {{ menuTexts.selectCountry }}
              </div>
              <div class="relative" ref="countrySelectMobile">
                <button
                  @click="toggleCountrySelectMobile"
                  class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div class="flex items-center space-x-3">
                    <div v-html="selectedCountry.flag" class="w-6 h-5 flex-shrink-0"></div>
                    <span class="text-sm font-medium text-gray-800">{{ selectedCountry.name }}</span>
                  </div>
                  <svg class="w-4 h-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': showCountrySelectMobile }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <!-- Mobile Dropdown -->
                <div 
                  v-if="showCountrySelectMobile"
                  class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-60 overflow-y-auto z-[1000002]"
                >
                  <button
                    v-for="country in countries"
                    :key="country.code"
                    @click="selectCountryMobile(country)"
                    class="w-full flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors duration-150 text-left"
                    :class="{ 'bg-green-50 text-green-700': selectedCountry.code === country.code }"
                  >
                    <div v-html="country.flag" class="w-6 h-5 flex-shrink-0"></div>
                    <span class="text-sm font-medium text-gray-800">{{ country.name }}</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Mobile CTA Button - Fixed at bottom -->
      <div class="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
        <button 
          @click="startFreeTrial"
          class="w-full bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span>{{ menuTexts.tryFree }}</span>
        </button>
        
        <p class="text-center text-xs text-gray-500 mt-3">
          {{ menuTexts.freeTrialText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import logoDefault from '~/assets/images/wafidelynegroturquesaverde.png'
import logoScrolled from '~/assets/images/wafidelyblanco.png'

// Reactive variables
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const navbar = ref(null)
const activeSection = ref('')
const showCountrySelect = ref(false)
const showCountrySelectMobile = ref(false)
const countrySelectDesktop = ref(null)
const countrySelectMobile = ref(null)

// Countries data with SVG flags - Ordered alphabetically by country name
const countries = ref([
  {
    code: 'AR',
    name: 'Argentina',
    url: '/automatizar-whatsapp-business-con-inteligencia-artificial-argentina',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="200" fill="#74ACDF"/>
      <rect width="900" height="200" y="200" fill="#FFFFFF"/>
      <rect width="900" height="200" y="400" fill="#74ACDF"/>
      <circle cx="450" cy="300" r="60" fill="none" stroke="#F8DC00" stroke-width="4"/>
      <polygon points="450,250 460,280 485,280 465,295 470,325 450,310 430,325 435,295 415,280 440,280" fill="#F8DC00"/>
    </svg>`
  },

  {
    code: 'BR',
    name: 'Brasil',
    url: '/automatizar-negocios-do-whatsapp-com-ia',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="600" fill="#009639"/>
      <polygon points="450,75 750,300 450,525 150,300" fill="#FFD700"/>
      <circle cx="450" cy="300" r="108" fill="#002776"/>
    </svg>`
  },
  {
    code: 'CL',
    name: 'Chile',
    url: '/automatizar-whatsapp-business-con-ia-chile',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="300" fill="#FFFFFF"/>
      <rect width="900" height="300" y="300" fill="#CE1126"/>
      <rect width="360" height="300" fill="#0033A0"/>
      <polygon points="180,150 200,190 245,190 210,218 220,260 180,232 140,260 150,218 115,190 160,190" fill="#FFFFFF"/>
    </svg>`
  },
  {
    code: 'CO',
    name: 'Colombia',
    url: '/automatizar-whatsapp-business-con-inteligencia-artificial-colombia',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="300" fill="#FFD700"/>
      <rect width="900" height="150" y="300" fill="#0033A0"/>
      <rect width="900" height="150" y="450" fill="#CE1126"/>
    </svg>`
  },
  {
    code: 'CR',
    name: 'Costa Rica',
    url: '/automatizar-whatsapp-business-con-chatgpt-ia-costa-rica',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="120" fill="#0033A0"/>
      <rect width="900" height="120" y="120" fill="#FFFFFF"/>
      <rect width="900" height="240" y="240" fill="#CE1126"/>
      <rect width="900" height="120" y="480" fill="#FFFFFF"/>
      <rect width="900" height="120" y="600" fill="#0033A0"/>
    </svg>`
  },
  {
    code: 'EC',
    name: 'Ecuador',
    url: '/automatizar-whatsapp-business-con-chatgpt-ia-ecuador',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
  <!-- Franja amarilla (doble altura) -->
  <rect width="900" height="300" fill="#FFD700"/>
  <!-- Franja azul -->
  <rect width="900" height="150" y="300" fill="#0072CE"/>
  <!-- Franja roja -->
  <rect width="900" height="150" y="450" fill="#CE1126"/>
  
  <!-- Escudo central -->
  <g transform="translate(450, 300)">
    <!-- Fondo del escudo -->
    <ellipse cx="0" cy="0" rx="80" ry="100" fill="white" stroke="#8B4513" stroke-width="3"/>
    
    <!-- Monte Chimborazo (montaña) -->
    <path d="M -60 20 L -30 -20 L 0 -30 L 30 -20 L 60 20 Z" fill="#8B4513"/>
    <path d="M -30 -20 L 0 -40 L 30 -20" fill="white"/>
    
    <!-- Sol -->
    <circle cx="0" cy="-15" r="12" fill="#FFD700"/>
    <g stroke="#FFD700" stroke-width="2">
      <line x1="0" y1="-35" x2="0" y2="-45"/>
      <line x1="15" y1="-15" x2="25" y2="-15"/>
      <line x1="-15" y1="-15" x2="-25" y2="-15"/>
      <line x1="11" y1="-26" x2="18" y2="-33"/>
      <line x1="-11" y1="-26" x2="-18" y2="-33"/>
      <line x1="11" y1="-4" x2="18" y2="3"/>
      <line x1="-11" y1="-4" x2="-18" y2="3"/>
    </g>
    
    <!-- Río -->
    <path d="M -50 30 Q -25 25 0 30 Q 25 35 50 30" stroke="#0072CE" stroke-width="4" fill="none"/>
    
    <!-- Barco -->
    <path d="M -10 35 L 10 35 L 8 40 L -8 40 Z" fill="#8B4513"/>
    <line x1="0" y1="35" x2="0" y2="25" stroke="#8B4513" stroke-width="2"/>
    
    <!-- Cóndor -->
    <g transform="translate(0, -120)">
      <!-- Cuerpo del cóndor -->
      <ellipse cx="0" cy="0" rx="12" ry="20" fill="#2F4F4F"/>
      
      <!-- Alas extendidas -->
      <path d="M -12 -5 Q -35 -15 -50 -10 Q -45 0 -35 5 Q -25 8 -12 5" fill="#2F4F4F"/>
      <path d="M 12 -5 Q 35 -15 50 -10 Q 45 0 35 5 Q 25 8 12 5" fill="#2F4F4F"/>
      
      <!-- Detalles de las alas -->
      <path d="M -15 -2 Q -30 -8 -40 -5" stroke="#000" stroke-width="1" fill="none"/>
      <path d="M -20 2 Q -32 0 -38 2" stroke="#000" stroke-width="1" fill="none"/>
      <path d="M 15 -2 Q 30 -8 40 -5" stroke="#000" stroke-width="1" fill="none"/>
      <path d="M 20 2 Q 32 0 38 2" stroke="#000" stroke-width="1" fill="none"/>
      
      <!-- Cabeza -->
      <circle cx="0" cy="-15" r="8" fill="#2F4F4F"/>
      
      <!-- Pico -->
      <path d="M 0 -20 L 6 -18 L 3 -15 Z" fill="#FFD700"/>
      
      <!-- Ojo -->
      <circle cx="3" cy="-17" r="2" fill="white"/>
      <circle cx="4" cy="-17" r="1" fill="black"/>
      
      <!-- Cresta/collar característico -->
      <path d="M -6 -10 Q 0 -12 6 -10" stroke="#FF6B6B" stroke-width="2" fill="none"/>
    </g>
    
    <!-- Ramas de olivo y palma a los lados del escudo -->
    <g stroke="#228B22" stroke-width="2" fill="none">
      <!-- Rama izquierda -->
      <path d="M -90 -50 Q -95 -20 -90 20 Q -88 50 -85 80"/>
      <path d="M -92 -30 L -100 -35"/>
      <path d="M -91 -10 L -99 -15"/>
      <path d="M -90 10 L -98 5"/>
      <path d="M -89 30 L -97 25"/>
      
      <!-- Rama derecha -->
      <path d="M 90 -50 Q 95 -20 90 20 Q 88 50 85 80"/>
      <path d="M 92 -30 L 100 -35"/>
      <path d="M 91 -10 L 99 -15"/>
      <path d="M 90 10 L 98 5"/>
      <path d="M 89 30 L 97 25"/>
    </g>
  </g>
</svg>`
  },
  {
    code: 'ES',
    name: 'España',
    url: '/automatizar-whatsapp-business-con-inteligencia-artificial-espana',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="150" fill="#C60B1E"/>
      <rect width="900" height="300" y="150" fill="#FFC400"/>
      <rect width="900" height="150" y="450" fill="#C60B1E"/>
    </svg>`
  },
  {
    code: 'US',
    name: 'United States',
    url: '/automate-whatsApp-business-with-ai-in-the-united-states',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="600" fill="#FFFFFF"/>
      <rect width="900" height="46" y="0" fill="#B22234"/>
      <rect width="900" height="46" y="92" fill="#B22234"/>
      <rect width="900" height="46" y="184" fill="#B22234"/>
      <rect width="900" height="46" y="276" fill="#B22234"/>
      <rect width="900" height="46" y="368" fill="#B22234"/>
      <rect width="900" height="46" y="460" fill="#B22234"/>
      <rect width="900" height="46" y="552" fill="#B22234"/>
      <rect width="360" height="322" fill="#3C3B6E"/>
    </svg>`
  },
  {
    code: 'MX',
    name: 'México',
    url: '/automatizar-whatsapp-business-con-ia-mexico',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="300" height="600" fill="#006847"/>
      <rect width="300" height="600" x="300" fill="#FFFFFF"/>
      <rect width="300" height="600" x="600" fill="#CE1126"/>
    </svg>`
  },
  {
    code: 'PA',
    name: 'Panamá',
    url: '/ai',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="450" height="300" fill="#FFFFFF"/>
      <rect width="450" height="300" x="450" fill="#CE1126"/>
      <rect width="450" height="300" y="300" fill="#0033A0"/>
      <rect width="450" height="300" x="450" y="300" fill="#FFFFFF"/>
      <polygon points="225,150 235,175 265,175 242,192 250,220 225,203 200,220 208,192 185,175 215,175" fill="#0033A0"/>
      <polygon points="675,450 685,475 715,475 692,492 700,520 675,503 650,520 658,492 635,475 665,475" fill="#CE1126"/>
    </svg>`
  },
  {
    code: 'PE',
    name: 'Perú',
    url: '/ai',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="300" height="600" fill="#D91023"/>
      <rect width="300" height="600" x="300" fill="#FFFFFF"/>
      <rect width="300" height="600" x="600" fill="#D91023"/>
    </svg>`
  },
  {
    code: 'DO',
    name: 'República Dominicana',
    url: '/ai',
    flag: `<svg viewBox="0 0 900 600" class="w-full h-full">
      <rect width="900" height="300" fill="#0033A0"/>
      <rect width="900" height="300" y="300" fill="#CE1126"/>
      <rect width="900" height="60" y="270" fill="#FFFFFF"/>
      <rect width="60" height="600" x="420" fill="#FFFFFF"/>
    </svg>`
  }
])

const selectedCountry = ref(countries.value.find(country => country.code === 'PE') || countries.value[0]) // Peru as default

// Computed property for menu texts based on selected country
const menuTexts = computed(() => {
  const isEnglish = selectedCountry.value.code === 'US'
  
  return {
    tagline: isEnglish ? 'WhatsApp Loyalty' : 'Fidelidad en Whatsapp',
    features: isEnglish ? 'Features' : 'Características',
    testimonials: isEnglish ? 'Testimonials' : 'Testimonios',
    pricing: isEnglish ? 'Pricing' : 'Precios',
    faq: isEnglish ? 'FAQ' : 'Preguntas Frecuentes',
    documentation: isEnglish ? 'Documentation' : 'Documentación',
    howItWorks: isEnglish ? 'How it works?' : '¿Cómo funciona?',
    selectCountry: isEnglish ? 'Select Country' : 'Seleccionar País',
    tryFree: isEnglish ? 'Try Free' : 'Probar Gratis',
    freeTrialText: isEnglish ? 'No credit card • 5 days free' : 'Sin tarjeta de crédito • 5 días gratis'
  }
})

// Methods
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  
  // Prevent body scroll when menu is open
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  showCountrySelectMobile.value = false
  document.body.style.overflow = 'auto'
}

const toggleCountrySelect = () => {
  showCountrySelect.value = !showCountrySelect.value
}

const toggleCountrySelectMobile = () => {
  showCountrySelectMobile.value = !showCountrySelectMobile.value
}

const selectCountry = (country) => {
  selectedCountry.value = country
  showCountrySelect.value = false
  
  // Navigate to country-specific URL (e.g., /ar, /cl, /co, etc.)
  navigateTo(country.url, {
    external: false
  })
  
  console.log('Navigating to:', `wafidely.com${country.url}`)
}

const selectCountryMobile = (country) => {
  selectedCountry.value = country
  showCountrySelectMobile.value = false
  
  // Close mobile menu
  closeMobileMenu()
  
  // Navigate to country-specific URL (e.g., /ar, /cl, /co, etc.)
  navigateTo(country.url, {
    external: false
  })
  
  console.log('Navigating to:', `wafidely.com${country.url}`)
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Set active section immediately for better UX
    activeSection.value = sectionId
    
    // Close mobile menu first
    closeMobileMenu()
    
    // Small delay to let menu close animation finish
    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }
}

const startFreeTrial = () => {
  navigateTo('https://ai.wafidely.com/register', { 
    external: true,
    open: {
      target: '_blank'
    }
  })
  console.log('Starting free trial...')
  closeMobileMenu()
}

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset
  
  // Activate scrolled state
  if (currentScrollPosition > 50) {
    scrolled.value = true
  } else {
    scrolled.value = false
  }

  // Update active section based on scroll position
  const sections = ['features', 'pricing', 'testimonials', 'preguntasfrecuentes']
  let currentActiveSection = ''
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      // Check if section is in viewport (considering header height)
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentActiveSection = sectionId
        break
      }
    }
  }
  
  // Only update if different to prevent unnecessary re-renders
  if (currentActiveSection && currentActiveSection !== activeSection.value) {
    activeSection.value = currentActiveSection
  }
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (countrySelectDesktop.value && !countrySelectDesktop.value.contains(event.target)) {
    showCountrySelect.value = false
  }
  if (countrySelectMobile.value && !countrySelectMobile.value.contains(event.target)) {
    showCountrySelectMobile.value = false
  }
}

// Detect current country from URL
const detectCurrentCountry = () => {
  const currentPath = window.location.pathname
  const countryCode = currentPath.split('/')[1]?.toLowerCase()
  
  if (countryCode) {
    const foundCountry = countries.value.find(country => 
      country.url.toLowerCase() === `/${countryCode}`
    )
    
    if (foundCountry) {
      selectedCountry.value = foundCountry
    } else {
      // Default to Peru if country code not found
      selectedCountry.value = countries.value.find(country => country.code === 'PE') || countries.value[0]
    }
  } else {
    // Default to Peru if no country code in URL
    selectedCountry.value = countries.value.find(country => country.code === 'PE') || countries.value[0]
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
  
  // Detect current country from URL
  detectCurrentCountry()
  
  // Set initial active section
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.body.style.overflow = 'auto'
})

// Watch for escape key to close menu
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      if (mobileMenuOpen.value) {
        closeMobileMenu()
      }
      if (showCountrySelect.value) {
        showCountrySelect.value = false
      }
      if (showCountrySelectMobile.value) {
        showCountrySelectMobile.value = false
      }
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>

/* Glass effect for header */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Header base styles */
header {
  transition: all 0.3s ease-in-out;
  z-index: 999999 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
}

/* Scrolled state styles */
header.scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: headerAppear 0.3s ease-in-out;
}

/* Keyframe animation for header appearance */
@keyframes headerAppear {
  from {
    opacity: 0.7;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Desktop Navigation Link Active States */
.nav-link {
  position: relative;
  border-radius: 9px;
}

.nav-link-active {
  background: rgba(34, 197, 94, 0.1) !important;
  border: 2px solid #22c55e !important;
  color: #16a34a !important;
  font-weight: 600;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
}

/* Header scrolled state - active links */
header.scrolled .nav-link-active {
  background: rgba(34, 197, 94, 0.15) !important;
  border: 2px solid #22c55e !important;
  color: #16a34a !important;
}

/* Mobile Navigation Link Active States */
.mobile-nav-link {
  border-radius: 9px;
  position: relative;
}

.mobile-nav-link-active {
  background: rgba(34, 197, 94, 0.15) !important;
  border: 2px solid #22c55e !important;
  color: #16a34a !important;
  font-weight: 600;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
}

.mobile-nav-link-active .group-hover\:text-green-600 {
  color: #16a34a !important;
}

/* Enhanced transitions for active states */
.nav-link,
.mobile-nav-link {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hamburger Menu Animation */
.hamburger-menu {
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;
}

.line {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 1px;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
  position: absolute;
}

.line-1 {
  top: 0;
}

.line-2 {
  top: 50%;
  transform: translateY(-50%);
}

.line-3 {
  bottom: 0;
}

/* Active state - Transform to X */
.hamburger-menu.active .line-1 {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-menu.active .line-2 {
  opacity: 0;
  transform: translateY(-50%) scale(0);
}

.hamburger-menu.active .line-3 {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile menu styles */
.mobile-menu {
  display: none;
  z-index: 1000001 !important;
}

.mobile-menu button {
  z-index: 1000001 !important;
  position: relative;
}

/* Mobile responsive */
@media only screen and (max-width: 768px) {
  .mobile-menu {
    display: block !important;
    z-index: 1000001 !important;
  }
  
  header {
    padding: 16px;
  }
}

/* Mobile menu custom width */
@media (max-width: 380px) {
  .fixed.top-0.right-0.w-80 {
    width: 100vw;
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

/* Enhanced hover effects */
.group:hover .group-hover\:text-green-600 {
  color: #16a34a;
}

/* Better focus states */
button:focus,
a:focus {
  outline: 2px solid #22c55e;
  outline-offset: 2px;
}

/* Prevent body scroll when menu is open */
body.menu-open {
  overflow: hidden;
}

/* Animation for active state changes */
@keyframes activeGlow {
  0% {
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  }
  50% {
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.3);
  }
  100% {
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  }
}

.nav-link-active,
.mobile-nav-link-active {
  animation: activeGlow 2s ease-in-out infinite;
}

/* Country Select Dropdown Styles */
.country-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #22c55e #f1f5f9;
}

.country-dropdown::-webkit-scrollbar {
  width: 6px;
}

.country-dropdown::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.country-dropdown::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 3px;
}

.country-dropdown::-webkit-scrollbar-thumb:hover {
  background: #16a34a;
}

/* Flag container */
.flag-container {
  overflow: hidden;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Dropdown animation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.country-dropdown {
  animation: slideDown 0.2s ease-out;
}

/* Estilo para links del drawer - EXCEPTO el logo */
.drawer__link--active:not(.logo-link) {
  color: #9b2f2f;
  font-weight: 600;
  background-color: rgba(143, 49, 49, 0.32);
}

/* O más específico: */
.drawer__link--active {
  color: #9b2f2f;
  font-weight: 600;
  background-color: rgba(143, 49, 49, 0.32);
}

/* Excepción para el logo */
.logo-link.drawer__link--active,
a[href="/"].drawer__link--active {
  background-color: transparent !important;
}
</style>