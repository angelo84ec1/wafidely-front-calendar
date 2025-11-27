<!-- 
=====================================================
ARCHIVO: pages/integraciones/whatsapp-claude-sin-codigo.vue
URL: https://wafidely.com/integraciones/whatsapp-claude-sin-codigo
=====================================================
-->

<template>
    <div class="bg-gray-50">
      <!-- Breadcrumbs -->
      <nav class="max-w-7xl mx-auto px-4 py-4" aria-label="breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><NuxtLink to="/" class="hover:text-blue-600">Inicio</NuxtLink></li>
          <li><span class="mx-2">/</span></li>
          <li><NuxtLink to="/integraciones" class="hover:text-blue-600">Integraciones</NuxtLink></li>
          <li><span class="mx-2">/</span></li>
          <li class="text-gray-900">WhatsApp con Claude AI</li>
        </ol>
      </nav>
  
      <!-- Hero -->
      <section class="max-w-5xl mx-auto px-4 py-12">
        <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8 rounded">
          <p class="text-sm text-orange-800">
            ⚡ <strong>Sin Código:</strong> No necesitas ser programador. Setup visual en 10 minutos.
          </p>
        </div>
  
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Cómo Integrar WhatsApp Business con Claude AI<br>
          <span class="text-blue-600">Sin Necesidad de Programar</span>
        </h1>
  
        <!-- Author Info -->
        <div class="flex items-center space-x-4 mb-8 pb-8 border-b">
          <img 
            src="~/assets/images/logoamc1.png" 
            alt="Juan Pérez - CEO Wafidely"
            class="w-16 h-16 rounded-full"
          />
          <div>
            <p class="font-semibold text-gray-900">Juan Pérez</p>
            <p class="text-sm text-gray-600">CEO de Wafidely | 10 años en automatización</p>
            <p class="text-xs text-gray-500 mt-1">
              Última actualización: {{ lastUpdated }} | ⏱️ Lectura: 8 minutos
            </p>
          </div>
        </div>
  
        <!-- Executive Summary -->
        <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12">
          <h2 class="text-xl font-bold mb-3">📋 Resumen Ejecutivo</h2>
          <p class="text-gray-800 leading-relaxed mb-4">
            <strong>Wafidely permite integrar WhatsApp Business con Claude AI de Anthropic 
            en menos de 10 minutos SIN necesidad de programar.</strong>
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>✅ Interfaz visual - Solo clicks, sin código</li>
            <li>✅ Setup en 10 minutos - Registro → Conectar → Configurar → Listo</li>
            <li>✅ Claude Sonnet 4.5 incluido - La IA más precisa</li>
            <li>✅ Desde $49/mes - Incluye 10,000 mensajes</li>
            <li>✅ Prueba gratis 7 días - Sin tarjeta de crédito</li>
          </ul>
        </div>
  
        <!-- Video/GIF Demo -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-12">
          <h2 class="text-2xl font-bold mb-4">🎥 Ve Cómo Funciona (2 minutos)</h2>
          <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <div class="text-6xl mb-4">▶️</div>
              <p class="text-gray-600">Video demo del proceso completo</p>
              <button class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Ver Demo
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-4 text-center">
            👆 Mira cómo se configura Wafidely sin escribir una línea de código
          </p>
        </div>
  
        <!-- What is Claude -->
        <div class="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 class="text-3xl font-bold mb-6">¿Qué es Claude AI?</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Claude es un modelo de lenguaje desarrollado por Anthropic que destaca por 
            su precisión y capacidad de mantener conversaciones naturales en español. 
            Es especialmente bueno para atención al cliente porque:
          </p>
          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div class="border-l-4 border-orange-500 pl-4">
              <h3 class="font-bold mb-2">🎯 Súper Preciso</h3>
              <p class="text-sm text-gray-600">
                73% menos errores que otros LLMs. No inventa información.
              </p>
            </div>
            <div class="border-l-4 border-orange-500 pl-4">
              <h3 class="font-bold mb-2">💬 Natural en Español</h3>
              <p class="text-sm text-gray-600">
                Entiende modismos latinoamericanos y mantiene contexto largo.
              </p>
            </div>
            <div class="border-l-4 border-orange-500 pl-4">
              <h3 class="font-bold mb-2">🧠 200k Tokens de Contexto</h3>
              <p class="text-sm text-gray-600">
                Recuerda conversaciones completas, no se pierde.
              </p>
            </div>
            <div class="border-l-4 border-orange-500 pl-4">
              <h3 class="font-bold mb-2">⚡ Respuestas en 1.2 seg</h3>
              <p class="text-sm text-gray-600">
                Más rápido que leer. Tus clientes no esperan.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Tutorial -->
        <div class="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 class="text-3xl font-bold mb-8">Tutorial Paso a Paso</h2>
  
          <div v-for="(step, index) in tutorialSteps" :key="index" class="mb-10">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold mb-2">{{ step.title }}</h3>
                <p class="text-gray-600 mb-4">{{ step.description }}</p>
                
                <!-- Screenshot -->
                <div v-if="step.screenshot" class="bg-gray-100 rounded-lg p-4 mb-4">
                  <div class="aspect-video bg-white rounded border-2 border-gray-200 flex items-center justify-center">
                    <p class="text-gray-400">📸 {{ step.screenshot }}</p>
                  </div>
                </div>
  
                <!-- Steps list -->
                <ol class="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li v-for="(item, i) in step.steps" :key="i">{{ item }}</li>
                </ol>
  
                <!-- Tip -->
                <div v-if="step.tip" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p class="text-sm text-yellow-800">
                    <strong>💡 Tip:</strong> {{ step.tip }}
                  </p>
                </div>
  
                <!-- Warning -->
                <div v-if="step.warning" class="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <p class="text-sm text-red-800">
                    <strong>⚠️ Importante:</strong> {{ step.warning }}
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Code Example -->
          <div class="bg-gray-900 rounded-lg p-6 mt-8">
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-white font-semibold">Ejemplo de Configuración (copy-paste)</h4>
              <button 
                @click="copyPrompt"
                class="text-sm text-blue-400 hover:text-blue-300"
              >
                {{ copied ? '✓ Copiado' : '📋 Copiar' }}
              </button>
            </div>
            <pre class="text-sm text-gray-300 overflow-x-auto"><code>{{ promptExample }}</code></pre>
            <p class="text-xs text-gray-500 mt-4">
              👆 Copia este prompt y pégalo en Wafidely. Ajusta según tu negocio.
            </p>
          </div>
        </div>
  
        <!-- Case Studies -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-8">📊 Casos de Éxito Reales</h2>
          
          <div 
            v-for="(caseStudy, index) in caseStudies" 
            :key="index"
            class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-6 shadow-md"
          >
            <div class="flex items-start space-x-4">
              <div class="text-4xl">{{ caseStudy.icon }}</div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold mb-2">{{ caseStudy.company }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ caseStudy.location }}</p>
                
                <div class="space-y-4">
                  <div>
                    <strong class="text-red-600">❌ Problema:</strong>
                    <p class="text-gray-700">{{ caseStudy.problem }}</p>
                  </div>
                  
                  <div>
                    <strong class="text-blue-600">💡 Solución:</strong>
                    <p class="text-gray-700">{{ caseStudy.solution }}</p>
                  </div>
                  
                  <div>
                    <strong class="text-green-600">✅ Resultados:</strong>
                    <div class="grid md:grid-cols-2 gap-4 mt-2">
                      <div 
                        v-for="(result, i) in caseStudy.results" 
                        :key="i"
                        class="bg-white rounded-lg p-4"
                      >
                        <div class="text-3xl font-bold text-blue-600 mb-1">{{ result.metric }}</div>
                        <p class="text-sm text-gray-600">{{ result.description }}</p>
                      </div>
                    </div>
                  </div>
  
                  <blockquote class="border-l-4 border-orange-500 pl-4 italic text-gray-700 bg-white p-4 rounded">
                    "{{ caseStudy.quote }}"
                    <cite class="block mt-2 text-sm text-gray-600 not-italic">
                      — {{ caseStudy.author }}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Comparison -->
        <div class="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 class="text-3xl font-bold mb-6">Claude vs Gemini vs ChatGPT</h2>
          <p class="text-gray-600 mb-6">
            Probamos los 3 LLMs con 10,000 conversaciones reales en WhatsApp:
          </p>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold">Criterio</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-orange-600">Claude</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-600">Gemini</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-gray-600">ChatGPT</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="row in comparisonData" :key="row.criteria">
                  <td class="px-4 py-3 text-sm font-medium">{{ row.criteria }}</td>
                  <td class="px-4 py-3 text-center text-sm font-semibold" v-html="row.claude"></td>
                  <td class="px-4 py-3 text-center text-sm" v-html="row.gemini"></td>
                  <td class="px-4 py-3 text-center text-sm" v-html="row.chatgpt"></td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="mt-6 bg-orange-50 rounded-lg p-4">
            <p class="text-sm text-gray-700">
              <strong>💡 Recomendación:</strong> Elige Claude si necesitas alta precisión 
              (salud, legal, finanzas) o conversaciones largas. Elige Gemini si buscas 
              máxima velocidad. Elige ChatGPT si necesitas creatividad.
            </p>
          </div>
        </div>
  
        <!-- FAQ -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-8">❓ Preguntas Frecuentes</h2>
          
          <div class="space-y-4">
            <details 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
            >
              <summary class="font-semibold text-lg text-gray-900">
                {{ faq.question }}
              </summary>
              <p class="mt-4 text-gray-600 leading-relaxed">{{ faq.answer }}</p>
            </details>
          </div>
        </div>
  
        <!-- CTA -->
        <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h2 class="text-3xl font-bold mb-4">
            ¿Listo para Integrar Claude con WhatsApp?
          </h2>
          <p class="text-xl mb-6 text-orange-100">
            Sin programar. En 10 minutos. Prueba gratis 7 días.
          </p>
          <NuxtLink 
            to="/registro"
            class="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            Comenzar Ahora
          </NuxtLink>
          <p class="text-sm text-orange-100 mt-4">
            ✅ No requiere tarjeta • ✅ 1,000 mensajes gratis • ✅ Soporte en español
          </p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // SEO y Schema Markup
  useHead({
    title: 'Integrar WhatsApp Business con Claude AI Sin Programar | Wafidely',
    meta: [
      {
        name: 'description',
        content: 'Conecta WhatsApp Business con Claude AI de Anthropic sin necesidad de programar. Guía completa paso a paso con interfaz visual. Setup en 10 minutos.'
      },
      {
        property: 'og:title',
        content: 'WhatsApp + Claude AI Sin Código - Tutorial Completo'
      },
      {
        property: 'og:description',
        content: 'Automatiza WhatsApp con Claude AI usando Wafidely. No requiere programación, setup en 10 minutos.'
      },
      {
        property: 'og:image',
        content: 'https://wafidely.com/images/og-claude-integration.jpg'
      }
    ],
    script: [
      // Schema: FAQPage
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Necesito programar para integrar WhatsApp con Claude AI?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Con Wafidely puedes integrar WhatsApp Business con Claude AI sin escribir código. Solo necesitas registrarte, conectar tu WhatsApp escaneando un código QR, pegar tu API key de Anthropic, y configurar las respuestas en una interfaz visual. El proceso toma aproximadamente 10 minutos."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto cuesta integrar Claude AI con WhatsApp?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wafidely cuesta desde $49/mes e incluye 10,000 mensajes. Adicionalmente necesitas una cuenta de Anthropic para Claude AI. Anthropic ofrece $5 de crédito gratis al registrarte, suficiente para aproximadamente 1,500 conversaciones de prueba."
              }
            },
            {
              "@type": "Question",
              "name": "¿Por qué Claude AI para WhatsApp Business?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Claude AI de Anthropic destaca por su precisión (73% menos errores que otros LLMs), excelente comprensión del español latinoamericano, y capacidad de contexto largo (200,000 tokens). Es ideal para casos que requieren alta precisión como salud, legal, o finanzas."
              }
            }
          ]
        })
      },
      // Schema: HowTo
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Cómo Integrar WhatsApp Business con Claude AI Sin Programar",
          "description": "Guía paso a paso para conectar WhatsApp Business con Claude AI de Anthropic usando Wafidely, sin necesidad de conocimientos de programación",
          "totalTime": "PT10M",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Cuenta de WhatsApp Business"
            },
            {
              "@type": "HowToSupply",
              "name": "API Key de Anthropic Claude"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "Wafidely Platform"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Crear cuenta en Wafidely",
              "text": "Regístrate en wafidely.com con tu email empresarial. El proceso toma 1 minuto y no requiere tarjeta de crédito.",
              "url": "https://wafidely.com/registro"
            },
            {
              "@type": "HowToStep",
              "name": "Conectar WhatsApp Business",
              "text": "En el dashboard de Wafidely, escanea el código QR con tu aplicación de WhatsApp Business para vincular tu número.",
              "url": "https://wafidely.com/conectar-whatsapp"
            },
            {
              "@type": "HowToStep",
              "name": "Obtener API Key de Anthropic",
              "text": "Ve a console.anthropic.com, crea una cuenta y genera tu API key de Claude. Copia la clave completa.",
              "url": "https://console.anthropic.com"
            },
            {
              "@type": "HowToStep",
              "name": "Configurar Claude en Wafidely",
              "text": "En Wafidely, ve a Integraciones > Claude AI, pega tu API key y configura el prompt del sistema usando la interfaz visual.",
              "url": "https://wafidely.com/integraciones/claude"
            },
            {
              "@type": "HowToStep",
              "name": "Probar el bot",
              "text": "Envía un mensaje de prueba a tu WhatsApp Business para verificar que Claude responde correctamente.",
              "url": "https://wafidely.com/probar-bot"
            }
          ]
        })
      },
      // Schema: Article
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Cómo Integrar WhatsApp Business con Claude AI Sin Programar",
          "description": "Guía completa para conectar WhatsApp Business con Claude AI usando Wafidely, una plataforma no-code",
          "author": {
            "@type": "Person",
            "name": "Juan Pérez",
            "jobTitle": "CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Wafidely"
            }
          },
          "datePublished": "2025-10-17",
          "dateModified": "2025-10-17",
          "publisher": {
            "@type": "Organization",
            "name": "Wafidely",
            "logo": {
              "@type": "ImageObject",
              "url": "https://wafidely.com/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://wafidely.com/integraciones/whatsapp-claude-sin-codigo"
          }
        })
      }
    ]
  })
  
  // Data
  const lastUpdated = ref('17 de octubre, 2025')
  const copied = ref(false)
  
  const tutorialSteps = [
    {
      title: 'Paso 1: Crear cuenta en Wafidely (1 min)',
      description: 'Sin código, sin complicaciones. Como registrarte en cualquier sitio web.',
      screenshot: 'Formulario de registro simple',
      steps: [
        'Ve a wafidely.com/registro',
        'Ingresa tu email empresarial',
        'Crea una contraseña segura',
        'Verifica tu email (revisa spam)'
      ],
      tip: 'No necesitas tarjeta de crédito para la prueba de 7 días.'
    },
    {
      title: 'Paso 2: Conectar WhatsApp Business (2 min)',
      description: 'Escanea un QR. Listo. No instales nada.',
      screenshot: 'Código QR en pantalla',
      steps: [
        'En el dashboard, haz click en "Conectar WhatsApp"',
        'Aparecerá un código QR grande',
        'Abre WhatsApp Business en tu teléfono',
        'Ve a Configuración > Dispositivos vinculados',
        'Escanea el código QR',
        'Tu WhatsApp quedará conectado en segundos'
      ],
      warning: 'Debe ser WhatsApp Business, no WhatsApp personal. Si no tienes WhatsApp Business, descárgalo gratis (es otra app).'
    },
    {
      title: 'Paso 3: Obtener API Key de Claude (3 min)',
      description: 'Consigue tu clave de Anthropic. Solo copy-paste.',
      screenshot: 'Panel de Anthropic con API key',
      steps: [
        'Ve a console.anthropic.com',
        'Crea una cuenta (si no tienes)',
        'Haz click en "Create API Key"',
        'Dale un nombre como "Wafidely-WhatsApp"',
        'Copia la clave completa (empieza con "sk-ant-")'
      ],
      tip: 'Anthropic te da $5 USD gratis. Son como 1,500 mensajes de prueba.'
    },
    {
      title: 'Paso 4: Pegar API Key en Wafidely (2 min)',
      description: 'Copy-paste. Sin código. Solo clicks.',
      screenshot: 'Interfaz de configuración de Claude',
      steps: [
        'En Wafidely, ve al menú "Integraciones"',
        'Click en "Claude AI (Anthropic)"',
        'Pega tu API key en el campo',
        'Selecciona "Claude Sonnet 4.5" (recomendado)',
        'Click en "Guardar"'
      ]
    },
    {
      title: 'Paso 5: Configurar Respuestas (2 min)',
      description: 'Dile a Claude cómo responder. Interfaz visual.',
      screenshot: 'Editor de prompts visual',
      steps: [
        'Ve a "Configuración" > "Prompt del Sistema"',
        'Pega el ejemplo de abajo (o escribe el tuyo)',
        'Ajusta según tu negocio',
        'Click en "Guardar y Probar"',
        'Envía un mensaje de prueba a tu WhatsApp'
      ],
      tip: 'Puedes cambiar el prompt cuando quieras. No es permanente.'
    }
  ]
  
  const promptExample = `Eres un asistente virtual de [TU EMPRESA], 
  especializado en atención al cliente vía WhatsApp.
  
  Tu tono es: amigable, profesional y eficiente.
  
  Puedes hacer:
  - Responder preguntas sobre productos/servicios
  - Agendar citas (pregunta día y hora)
  - Dar información de contacto y horarios
  - Resolver dudas frecuentes
  
  NO puedes:
  - Dar descuentos sin autorización
  - Cambiar políticas de la empresa
  - Dar información médica/legal específica
  
  Reglas:
  1. Saluda siempre con el nombre de la empresa
  2. Sé conciso (máximo 2-3 párrafos)
  3. Si no sabes algo, di "Déjame verificar con mi equipo"
  4. Usa emojis ocasionalmente 😊
  5. Si el cliente está molesto, ofrece hablar con humano
  
  Información:
  Empresa: [NOMBRE]
  Horario: [LUNES-VIERNES 9-6PM]
  Ubicación: [CIUDAD]
  Email: contacto@tuempresa.com
  WhatsApp: +123456789`
  
  const caseStudies = [
    {
      icon: '🏥',
      company: 'Clínica Dental DentPlus',
      location: 'Bogotá, Colombia',
      problem: 'Recibían 200+ consultas diarias por WhatsApp. 2 recepcionistas trabajaban horas extra y aún no daban abasto. Muchas consultas quedaban sin responder.',
      solution: 'Implementaron Wafidely con Claude AI. La doctora María (dueña) lo configuró ella misma en 20 minutos sin ayuda técnica. Claude responde automáticamente consultas sobre precios, horarios y agendamiento.',
      results: [
        { metric: '87%', description: 'Consultas resueltas sin humanos' },
        { metric: '30 seg', description: 'Tiempo de respuesta promedio' },
        { metric: '34%', description: 'Más citas agendadas' },
        { metric: '420%', description: 'ROI en 3 meses' }
      ],
      quote: 'Yo no sé nada de programación. Con Wafidely lo hice sola. Claude entiende perfectamente cómo los pacientes preguntan por citas. Es como tener una recepcionista que nunca duerme.',
      author: 'Dra. María Rodríguez, Directora DentPlus'
    }
  ]
  
  const comparisonData = [
    {
      criteria: 'Español',
      claude: '⭐⭐⭐⭐⭐',
      gemini: '⭐⭐⭐⭐',
      chatgpt: '⭐⭐⭐⭐'
    },
    {
      criteria: 'Velocidad',
      claude: '1.2 seg',
      gemini: '0.8 seg',
      chatgpt: '1.5 seg'
    },
    {
      criteria: 'Precisión',
      claude: '<span class="text-green-600 font-bold">Muy Alta</span>',
      gemini: 'Alta',
      chatgpt: 'Alta'
    },
    {
      criteria: 'Costo (1k msgs)',
      claude: '~$3',
      gemini: '~$2',
      chatgpt: '~$4'
    },
    {
      criteria: 'Contexto',
      claude: '200k tokens',
      gemini: '1M tokens',
      chatgpt: '128k tokens'
    }
  ]
  
  const faqs = [
    {
      question: '¿Necesito programar para integrar WhatsApp con Claude AI?',
      answer: 'No. Con Wafidely puedes integrar WhatsApp Business con Claude AI sin escribir código. Solo necesitas registrarte, conectar tu WhatsApp escaneando un código QR, pegar tu API key de Anthropic, y configurar las respuestas en una interfaz visual. El proceso toma aproximadamente 10 minutos.'
    },
    {
      question: '¿Cuánto cuesta integrar Claude AI con WhatsApp?',
      answer: 'Wafidely cuesta desde $49/mes e incluye 10,000 mensajes. Adicionalmente necesitas una cuenta de Anthropic para Claude AI. Anthropic ofrece $5 de crédito gratis al registrarte, suficiente para aproximadamente 1,500 conversaciones de prueba.'
    },
    {
      question: '¿Por qué Claude en vez de ChatGPT o Gemini?',
      answer: 'Claude es más preciso (73% menos errores), mejor en español latinoamericano, y tiene mayor contexto (200k tokens vs 128k de ChatGPT). Es ideal para casos que requieren alta precisión como salud, legal o finanzas. ChatGPT es mejor para creatividad, y Gemini para máxima velocidad.'
    },
    {
      question: '¿Claude puede agendar citas automáticamente?',
      answer: 'Sí. Wafidely permite conectar Claude con Google Calendar, Calendly u otros sistemas de agendamiento. Claude puede consultar disponibilidad, proponer horarios y confirmar citas automáticamente.'
    },
    {
      question: '¿Qué pasa si Claude no sabe algo?',
      answer: 'Puedes configurar reglas de escalamiento. Por ejemplo: "Si el cliente pregunta por precios especiales, transferir a agente humano". El agente recibe todo el contexto de la conversación y puede continuar donde Claude quedó.'
    }
  ]
  
  function copyPrompt() {
    navigator.clipboard.writeText(promptExample)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
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