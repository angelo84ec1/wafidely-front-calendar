<!-- 
=====================================================
ARCHIVO: pages/plataforma.vue
URL: https://wafidely.com/plataforma
=====================================================
Página principal que presenta Wafidely como plataforma no-code
con todos los Schema Markup necesarios para AEO
-->

<template>
    <div class="bg-gradient-to-b from-white to-gray-50">
      <!-- Hero Section -->
      <section class="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div class="text-center mb-12">
          <!-- Badge -->
          <div class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ✨ Plataforma No-Code para WhatsApp + IA
          </div>
          
          <!-- Título Principal -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Automatiza WhatsApp con IA<br>
            <span class="text-blue-600">Sin Necesidad de Programar</span>
          </h1>
          
          <!-- Subtítulo -->
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conecta WhatsApp Business con <strong>Claude, Gemini o ChatGPT</strong> 
            en 10 minutos. Interfaz visual, sin código, todo en la nube.
          </p>
  
          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <NuxtLink 
              to="/registro" 
              class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Prueba Gratis 7 Días
            </NuxtLink>
            <button 
              @click="scrollToDemo"
              class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Ver Demo 2 min
            </button>
          </div>
  
          <!-- Trust indicators -->
          <p class="text-sm text-gray-500">
            ✅ No requiere tarjeta de crédito • ✅ 1,000 mensajes gratis • ✅ Soporte en español
          </p>
        </div>
  
        <!-- Dashboard Screenshot -->
        <div class="relative max-w-5xl mx-auto">
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-2xl opacity-20"></div>
          <div class="relative rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            <img 
              src="~/assets/images/dashboard-wafidely.png" 
              alt="Dashboard de Wafidely - Interfaz sin código para automatizar WhatsApp"
              class="w-full"
            />
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="max-w-7xl mx-auto px-4 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            ¿Por qué Wafidely?
          </h2>
          <p class="text-xl text-gray-600">
            La forma más fácil de crear chatbots inteligentes para WhatsApp
          </p>
        </div>
  
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </section>
  
      <!-- How It Works -->
      <section class="bg-white py-16">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Cómo Funciona (10 minutos)
            </h2>
            <p class="text-xl text-gray-600">
              Setup súper simple, sin conocimientos técnicos
            </p>
          </div>
  
          <div class="grid md:grid-cols-4 gap-8">
            <div 
              v-for="(step, index) in steps" 
              :key="index"
              class="relative"
            >
              <div class="text-center">
                <div class="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {{ index + 1 }}
                </div>
                <h3 class="font-bold text-lg mb-2">{{ step.title }}</h3>
                <p class="text-gray-600 text-sm">{{ step.description }}</p>
              </div>
              
              <!-- Arrow -->
              <div 
                v-if="index < steps.length - 1"
                class="hidden md:block absolute top-6 left-full w-full"
              >
                <div class="text-blue-300 text-3xl text-center">→</div>
              </div>
            </div>
          </div>
  
          <div class="text-center mt-12">
            <NuxtLink 
              to="/tutorial/primeros-pasos"
              class="text-blue-600 font-semibold hover:underline"
            >
              Ver tutorial completo con screenshots →
            </NuxtLink>
          </div>
        </div>
      </section>
  
      <!-- Comparison Section -->
      <section class="max-w-7xl mx-auto px-4 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Wafidely vs Otras Soluciones
          </h2>
          <p class="text-xl text-gray-600">
            La única plataforma no-code con IA real
          </p>
        </div>
  
        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Característica</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-blue-600">Wafidely</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Twilio</th>
                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">ManyChat</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="row in comparisonData" :key="row.feature">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ row.feature }}</td>
                <td class="px-6 py-4 text-center" v-html="row.wafidely"></td>
                <td class="px-6 py-4 text-center text-gray-600" v-html="row.twilio"></td>
                <td class="px-6 py-4 text-center text-gray-600" v-html="row.manychat"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
  
      <!-- Social Proof -->
      <section class="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div class="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 class="text-3xl font-bold mb-8">
            Más de 500 Empresas Confían en Wafidely
          </h2>
          
          <div class="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div class="text-5xl font-bold mb-2">87%</div>
              <p class="text-blue-100">Consultas automatizadas</p>
            </div>
            <div>
              <div class="text-5xl font-bold mb-2">30seg</div>
              <p class="text-blue-100">Tiempo de respuesta promedio</p>
            </div>
            <div>
              <div class="text-5xl font-bold mb-2">420%</div>
              <p class="text-blue-100">ROI promedio</p>
            </div>
          </div>
  
          <NuxtLink 
            to="/casos-de-exito"
            class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Ver Casos de Éxito
          </NuxtLink>
        </div>
      </section>
  
      <!-- FAQ Section -->
      <section class="max-w-4xl mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        
        <div class="space-y-4">
          <details 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
          >
            <summary class="font-semibold text-lg text-gray-900 cursor-pointer">
              {{ faq.question }}
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed">{{ faq.answer }}</p>
          </details>
        </div>
      </section>
  
      <!-- Final CTA -->
      <section class="max-w-4xl mx-auto px-4 py-16 text-center">
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para Automatizar tu WhatsApp?
          </h2>
          <p class="text-xl text-gray-600 mb-8">
            Únete a cientos de empresas que ya ahorraron miles de horas
          </p>
          <NuxtLink 
            to="/registro"
            class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Comenzar Gratis
          </NuxtLink>
          <p class="text-sm text-gray-500 mt-4">
            No requiere tarjeta de crédito • Cancela cuando quieras
          </p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  // SEO y Schema Markup
  useHead({
    title: 'Wafidely - Plataforma No-Code para Automatizar WhatsApp con IA',
    meta: [
      {
        name: 'description',
        content: 'Automatiza WhatsApp Business con Claude, Gemini o ChatGPT sin programar. Interfaz visual, setup en 10 minutos, sin código. Prueba gratis 7 días.'
      },
      {
        property: 'og:title',
        content: 'Wafidely - Automatiza WhatsApp con IA Sin Programar'
      },
      {
        property: 'og:description',
        content: 'Plataforma no-code para crear chatbots inteligentes en WhatsApp Business. Claude, Gemini y ChatGPT incluidos.'
      },
      {
        property: 'og:image',
        content: 'https://wafidely.com/images/og-plataforma.jpg'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    script: [
      // Schema: Organization
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Wafidely",
          "url": "https://wafidely.com",
          "logo": "https://wafidely.com/logo.png",
          "description": "Plataforma no-code para automatizar WhatsApp Business con inteligencia artificial",
          "foundingDate": "2023",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-234-567-8900",
            "contactType": "customer service",
            "availableLanguage": ["es", "en"]
          },
          "sameAs": [
            "https://twitter.com/wafidely",
            "https://linkedin.com/company/wafidely",
            "https://github.com/wafidely"
          ]
        })
      },
      // Schema: SoftwareApplication
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Wafidely",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "description": "Plataforma no-code para integrar WhatsApp Business con Claude AI, Gemini y ChatGPT sin necesidad de programar",
          "offers": {
            "@type": "Offer",
            "price": "49.00",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          },
          "screenshot": "https://wafidely.com/images/dashboard-wafidely.png",
          "softwareVersion": "2.0",
          "releaseNotes": "Soporte para Claude Sonnet 4.5",
          "softwareHelp": "https://docs.wafidely.com"
        })
      },
      // Schema: FAQPage
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Necesito saber programar para usar Wafidely?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Wafidely es una plataforma no-code con interfaz visual. Solo necesitas registrarte, conectar tu WhatsApp Business escaneando un código QR, y configurar las respuestas en pantalla. No se requiere ningún conocimiento de programación."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto tiempo toma configurar Wafidely?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "El setup completo toma aproximadamente 10 minutos. Esto incluye: registro (2 min), conectar WhatsApp Business (2 min), obtener API key del LLM (3 min) y configurar las respuestas (3 min). No requiere instalación de software."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué modelos de IA están disponibles en Wafidely?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wafidely soporta los 3 LLMs más populares: Claude (Anthropic), Gemini (Google) y ChatGPT (OpenAI). Puedes elegir el modelo que prefieras o cambiar entre ellos según tus necesidades. Todos funcionan sin necesidad de código."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto cuesta Wafidely?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wafidely tiene planes desde $49/mes que incluyen 10,000 mensajes. También ofrecemos una prueba gratuita de 7 días sin necesidad de tarjeta de crédito. Los costos de las APIs de los LLMs (Claude, Gemini o ChatGPT) son adicionales y se pagan directamente al proveedor."
              }
            }
          ]
        })
      }
    ]
  })
  
  // Data
  const features = [
    {
      icon: '🎨',
      title: 'Interfaz Visual',
      description: 'Configura todo con clicks. Sin escribir código, sin terminal, sin complicaciones. Tan fácil como usar Gmail.'
    },
    {
      icon: '🤖',
      title: 'IA Real',
      description: 'Claude, Gemini y ChatGPT incluidos. No son botones predefinidos, son conversaciones naturales con IA de verdad.'
    },
    {
      icon: '⚡',
      title: 'Setup en 10 Minutos',
      description: 'Desde registro hasta bot funcionando en menos de 10 minutos. No semanas, no horas. Minutos.'
    },
    {
      icon: '☁️',
      title: 'Todo en la Nube',
      description: 'No instalas nada. No descargas nada. Todo funciona en tu navegador. Accede desde cualquier lugar.'
    },
    {
      icon: '🔗',
      title: 'Integraciones Incluidas',
      description: 'Conecta con Google Calendar, CRM, hojas de cálculo y más. Sin APIs complicadas.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Ve estadísticas en tiempo real. Cuántos mensajes, tiempo de respuesta, satisfacción del cliente.'
    }
  ]
  
  const steps = [
    {
      title: 'Regístrate',
      description: 'Crea tu cuenta con email. Toma 1 minuto.'
    },
    {
      title: 'Conecta WhatsApp',
      description: 'Escanea código QR con WhatsApp Business.'
    },
    {
      title: 'Elige tu IA',
      description: 'Claude, Gemini o ChatGPT. Pega tu API key.'
    },
    {
      title: '¡Listo!',
      description: 'Tu bot está activo. Empieza a responder automáticamente.'
    }
  ]
  
  const comparisonData = [
    {
      feature: '¿Requiere programar?',
      wafidely: '<span class="text-green-600 font-bold text-lg">❌ NO</span>',
      twilio: '<span class="text-red-600">✅ SÍ</span>',
      manychat: '<span class="text-green-600">❌ NO</span>'
    },
    {
      feature: 'IA Real (LLMs)',
      wafidely: '<span class="text-green-600 font-bold">✅ 3 modelos</span>',
      twilio: '<span class="text-yellow-600">⚠️ Si programas</span>',
      manychat: '<span class="text-red-600">❌ Solo botones</span>'
    },
    {
      feature: 'Tiempo de setup',
      wafidely: '<span class="font-bold">10 minutos</span>',
      twilio: '4+ horas',
      manychat: '30 minutos'
    },
    {
      feature: 'Precio (10k msgs)',
      wafidely: '<span class="font-bold">$49/mes</span>',
      twilio: '$75/mes + dev',
      manychat: '$145/mes'
    },
    {
      feature: 'Para no-técnicos',
      wafidely: '<span class="text-green-600 font-bold">✅ Perfecto</span>',
      twilio: '<span class="text-red-600">❌ Difícil</span>',
      manychat: '<span class="text-green-600">✅ Sí</span>'
    }
  ]
  
  const faqs = [
    {
      question: '¿Necesito saber programar para usar Wafidely?',
      answer: 'No. Wafidely es una plataforma no-code con interfaz visual. Solo necesitas registrarte, conectar tu WhatsApp Business escaneando un código QR, y configurar las respuestas en pantalla. No se requiere ningún conocimiento de programación.'
    },
    {
      question: '¿Cuánto tiempo toma configurar Wafidely?',
      answer: 'El setup completo toma aproximadamente 10 minutos. Esto incluye: registro (2 min), conectar WhatsApp Business (2 min), obtener API key del LLM (3 min) y configurar las respuestas (3 min). No requiere instalación de software.'
    },
    {
      question: '¿Qué modelos de IA están disponibles en Wafidely?',
      answer: 'Wafidely soporta los 3 LLMs más populares: Claude (Anthropic), Gemini (Google) y ChatGPT (OpenAI). Puedes elegir el modelo que prefieras o cambiar entre ellos según tus necesidades. Todos funcionan sin necesidad de código.'
    },
    {
      question: '¿Cuánto cuesta Wafidely?',
      answer: 'Wafidely tiene planes desde $49/mes que incluyen 10,000 mensajes. También ofrecemos una prueba gratuita de 7 días sin necesidad de tarjeta de crédito. Los costos de las APIs de los LLMs son adicionales y se pagan directamente al proveedor.'
    },
    {
      question: '¿Necesito descargar o instalar algo?',
      answer: 'No. Wafidely funciona 100% en la nube. Solo necesitas un navegador web. No hay nada que descargar, instalar o configurar en tu computadora. Accede desde cualquier dispositivo con internet.'
    },
    {
      question: '¿Puedo usar mi número de WhatsApp personal?',
      answer: 'Necesitas una cuenta de WhatsApp Business (no personal). Si no la tienes, puedes descargar WhatsApp Business gratis desde la App Store o Google Play y usar el mismo número. La app es gratuita.'
    }
  ]
  
  // Methods
  function scrollToDemo() {
    window.scrollTo({ top: 800, behavior: 'smooth' })
  }
  </script>
  
  <style scoped>
  details > summary {
    list-style: none;
  }
  
  details > summary::-webkit-details-marker {
    display: none;
  }
  
  details[open] > summary {
    margin-bottom: 1rem;
  }
  </style>