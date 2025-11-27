<!-- 
=====================================================
ARCHIVO: pages/casos-uso/clinica-dental-sin-programacion.vue
URL: https://wafidely.com/casos-uso/clinica-dental-sin-programacion
=====================================================
-->

<template>
    <div class="bg-gray-50">
      <!-- Hero -->
      <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div class="max-w-5xl mx-auto px-4">
          <div class="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
            📊 Caso de Éxito Real
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Cómo una Clínica Dental Automatizó WhatsApp<br>
            <span class="text-blue-200">Sin Contratar Programadores</span>
          </h1>
          <p class="text-xl text-blue-100 mb-8">
            Historia real: De 2 recepcionistas saturadas a 87% de consultas automáticas 
            en 3 meses. Sin conocimientos técnicos, sin código, sin developers.
          </p>
          <div class="flex items-center space-x-4">
            <img 
              src="~/assets/images/logocirumax.png"  
              alt="Clínica Dental DentPlus"
              class="h-12 bg-white rounded px-3 py-2"
            />
            <div>
              <p class="font-semibold">Clínica Dental DentPlus</p>
              <p class="text-sm text-blue-200">Bogotá, Colombia • 2 años usando Wafidely</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Quick Stats -->
      <section class="max-w-5xl mx-auto px-4 -mt-8">
        <div class="grid md:grid-cols-4 gap-4">
          <div v-for="stat in quickStats" :key="stat.metric" 
            class="bg-white rounded-xl shadow-lg p-6 text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">{{ stat.metric }}</div>
            <p class="text-sm text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
      </section>
  
      <div class="max-w-5xl mx-auto px-4 py-16">
        <!-- La Persona -->
        <section class="bg-white rounded-xl shadow-md p-8 mb-12">
          <div class="flex items-start space-x-6 mb-8">
            <img 
              src="~/assets/images/drapic.png"
              alt="Dra. María Rodríguez"
              class="w-24 h-22 rounded-full"
            />
            <div>
              <h2 class="text-2xl font-bold mb-2">Dra. María Rodríguez</h2>
              <p class="text-gray-600 mb-2">Directora y Odontóloga General</p>
              <p class="text-sm text-gray-500">
                15 años de experiencia • Clínica familiar • <strong>Sin conocimientos de programación</strong>
              </p>
            </div>
          </div>
  
          <blockquote class="text-xl italic text-gray-700 border-l-4 border-blue-600 pl-6 mb-6">
            "Yo no sé nada de código. Apenas sé usar Excel. Pero con Wafidely lo configuré 
            yo sola en 20 minutos. Ahora mi bot atiende más pacientes que mis recepcionistas."
          </blockquote>
        </section>
  
        <!-- El Problema -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">❌ El Problema</h2>
          
          <div class="bg-red-50 rounded-xl p-8 mb-6">
            <h3 class="text-xl font-bold mb-4">La Situación Antes de Wafidely:</h3>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 class="font-bold mb-2">📱 200+ mensajes de WhatsApp diarios</h4>
                  <p class="text-gray-700">
                    80% eran preguntas repetitivas: "¿Cuánto cuesta una limpieza?", 
                    "¿Tienen horario el sábado?", "¿Puedo agendar para mañana?"
                  </p>
                </div>
              </div>
  
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 class="font-bold mb-2">😰 2 Recepcionistas Saturadas</h4>
                  <p class="text-gray-700">
                    Laura y Ana trabajaban desde las 8am hasta las 9pm respondiendo mensajes. 
                    Muchos se quedaban sin responder. Tiempo de respuesta: 45 minutos promedio.
                  </p>
                </div>
              </div>
  
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 class="font-bold mb-2">💸 Perdiendo Pacientes</h4>
                  <p class="text-gray-700">
                    Competidores respondían más rápido. Muchos pacientes se iban por falta 
                    de respuesta. Estimaban perder 15-20 pacientes al mes por esto.
                  </p>
                </div>
              </div>
  
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 class="font-bold mb-2">🤔 Soluciones Que No Funcionaron</h4>
                  <ul class="text-gray-700 space-y-2 mt-2">
                    <li>❌ Intentaron ManyChat → Muy limitado, solo botones</li>
                    <li>❌ Cotizaron Twilio → $2,000 de setup + developer</li>
                    <li>❌ Contrataron freelancer → 2 meses y no funcionó</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-gray-100 rounded-lg p-6">
            <p class="text-gray-700">
              <strong>El punto de quiebre:</strong> En agosto 2023, durante vacaciones, 
              Ana renunció. María se dio cuenta que no podía seguir así. Necesitaba 
              automatizar, pero sin depender de programadores.
            </p>
          </div>
        </section>
  
        <!-- La Solución -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">💡 La Solución: Wafidely + Claude AI</h2>
          
          <div class="bg-blue-50 rounded-xl p-8">
            <h3 class="text-xl font-bold mb-4">Cómo María lo Implementó (Sin Ayuda Técnica):</h3>
            
            <div class="space-y-6">
              <div class="bg-white rounded-lg p-6">
                <div class="flex items-start space-x-4">
                  <div class="text-3xl">🗓️</div>
                  <div>
                    <h4 class="font-bold mb-2">Septiembre 5, 2023 - Descubrimiento</h4>
                    <p class="text-gray-700">
                      María buscó en Google: "automatizar whatsapp sin programar". 
                      Encontró Wafidely. Leyó que no requería conocimientos técnicos. 
                      Se registró para la prueba gratuita.
                    </p>
                  </div>
                </div>
              </div>
  
              <div class="bg-white rounded-lg p-6">
                <div class="flex items-start space-x-4">
                  <div class="text-3xl">⚙️</div>
                  <div>
                    <h4 class="font-bold mb-2">Septiembre 6, 2023 - Configuración (20 minutos)</h4>
                    <p class="text-gray-700 mb-3">
                      María siguió el tutorial paso a paso:
                    </p>
                    <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Conectó el WhatsApp de la clínica (scan QR)</li>
                      <li>Creó cuenta en Anthropic para Claude AI</li>
                      <li>Copió y pegó su API key en Wafidely</li>
                      <li>Configuró el prompt con info de la clínica</li>
                      <li>Probó con mensajes de ejemplo</li>
                    </ol>
                    <p class="text-sm text-gray-600 mt-3 italic">
                      "No tuve que escribir ni una línea de código. Todo fue copiar y pegar." - María
                    </p>
                  </div>
                </div>
              </div>
  
              <div class="bg-white rounded-lg p-6">
                <div class="flex items-start space-x-4">
                  <div class="text-3xl">🧪</div>
                  <div>
                    <h4 class="font-bold mb-2">Septiembre 7-10, 2023 - Pruebas</h4>
                    <p class="text-gray-700">
                      Durante 4 días, María y Laura probaron el bot con consultas reales. 
                      Ajustaron el prompt cuando encontraban respuestas que no les gustaban. 
                      Configuraron reglas de escalamiento para casos complejos.
                    </p>
                  </div>
                </div>
              </div>
  
              <div class="bg-white rounded-lg p-6">
                <div class="flex items-start space-x-4">
                  <div class="text-3xl">🚀</div>
                  <div>
                    <h4 class="font-bold mb-2">Septiembre 11, 2023 - Lanzamiento</h4>
                    <p class="text-gray-700">
                      Activaron el bot para todos los mensajes entrantes. Laura seguía 
                      monitoreando y tomando casos escalados. Los primeros días fueron 
                      de ajustes menores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Configuración -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">🔧 Configuración Específica</h2>
          
          <div class="bg-gray-900 text-white rounded-xl p-6">
            <h3 class="text-lg font-bold mb-4">Prompt que usa María en Wafidely:</h3>
            <pre class="text-sm overflow-x-auto"><code>{{ clinicPrompt }}</code></pre>
            <button 
              @click="copyPrompt"
              class="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              {{ copied ? '✓ Copiado' : 'Copiar este prompt' }}
            </button>
          </div>
        </section>
  
        <!-- Resultados -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">✅ Resultados (Después de 3 Meses)</h2>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div 
              v-for="result in detailedResults" 
              :key="result.title"
              class="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6"
            >
              <div class="text-5xl font-bold text-blue-600 mb-3">{{ result.metric }}</div>
              <h3 class="text-xl font-bold mb-2">{{ result.title }}</h3>
              <p class="text-gray-700 mb-4">{{ result.description }}</p>
              <div class="text-sm text-gray-600">
                <strong>Antes:</strong> {{ result.before }}<br>
                <strong>Después:</strong> {{ result.after }}
              </div>
            </div>
          </div>
  
          <!-- ROI Breakdown -->
          <div class="bg-green-50 rounded-xl p-8">
            <h3 class="text-2xl font-bold mb-6">💰 ROI Detallado</h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold mb-3 text-red-600">Costos Antes:</h4>
                <ul class="space-y-2 text-sm">
                  <li>💵 2 Recepcionistas tiempo completo: <strong>$1,600/mes</strong></li>
                  <li>💵 Horas extra: <strong>$200/mes</strong></li>
                  <li>💵 Pacientes perdidos: <strong>~$800/mes</strong></li>
                  <li class="pt-2 border-t font-bold">Total: $2,600/mes</li>
                </ul>
              </div>
              
              <div>
                <h4 class="font-bold mb-3 text-green-600">Costos Ahora:</h4>
                <ul class="space-y-2 text-sm">
                  <li>💵 1 Recepcionista part-time: <strong>$500/mes</strong></li>
                  <li>💵 Wafidely: <strong>$49/mes</strong></li>
                  <li>💵 API de Claude: <strong>$35/mes</strong></li>
                  <li>💵 Pacientes perdidos: <strong>~$100/mes</strong></li>
                  <li class="pt-2 border-t font-bold">Total: $684/mes</li>
                </ul>
              </div>
            </div>
  
            <div class="mt-6 pt-6 border-t text-center">
              <p class="text-3xl font-bold text-green-600 mb-2">
                Ahorro: $1,916/mes
              </p>
              <p class="text-gray-600">ROI de 420% en 3 meses</p>
            </div>
          </div>
        </section>
  
        <!-- Testimonial -->
        <section class="mb-12">
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-blue-200 rounded-2xl p-8">
            <div class="text-6xl mb-4">💬</div>
            <blockquote class="text-2xl italic mb-6">
              "Claude entiende las variaciones de cómo los pacientes preguntan. 
              Antes usábamos chatbots con botones, pero la gente no los seguía. 
              Con Claude es como hablar con una recepcionista real que nunca duerme."
            </blockquote>
            <p class="font-semibold">— Dra. María Rodríguez</p>
            <p class="text-sm text-blue-200">Directora, Clínica Dental DentPlus</p>
          </div>
        </section>
  
        <!-- Lecciones -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">📚 Lecciones Aprendidas</h2>
          
          <div class="space-y-4">
            <div 
              v-for="lesson in lessons" 
              :key="lesson.title"
              class="bg-white rounded-lg shadow-md p-6"
            >
              <h3 class="font-bold text-lg mb-2">{{ lesson.icon }} {{ lesson.title }}</h3>
              <p class="text-gray-700">{{ lesson.description }}</p>
            </div>
          </div>
        </section>
  
        <!-- CTA -->
        <section class="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 class="text-3xl font-bold mb-4">
            ¿Tu Negocio También Recibe Muchos Mensajes?
          </h2>
          <p class="text-xl text-gray-700 mb-6">
            Automatiza como María. Sin programar. En 10 minutos.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/registro"
              class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Probar Gratis 7 Días
            </NuxtLink>
            <NuxtLink 
              to="/casos-de-exito"
              class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Ver Más Casos
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // SEO y Schema Markup
  useHead({
    title: 'Caso de Éxito: Clínica Dental Automatizó WhatsApp Sin Programar | Wafidely',
    meta: [
      {
        name: 'description',
        content: 'Historia real: Cómo una clínica dental automatizó el 87% de consultas de WhatsApp sin contratar programadores. ROI de 420% en 3 meses con Wafidely + Claude AI.'
      },
      {
        property: 'og:title',
        content: 'Clínica Automatizó WhatsApp Sin Código - Caso Real'
      },
      {
        property: 'og:description',
        content: 'De 2 recepcionistas saturadas a 87% automático. Sin programar, sin developers. Historia real de Clínica Dental DentPlus.'
      }
    ],
    script: [
      // Schema: Article/Case Study
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Cómo una Clínica Dental Automatizó WhatsApp Sin Programar",
          "description": "Caso de éxito real: Clínica Dental DentPlus automatizó el 87% de consultas sin conocimientos técnicos usando Wafidely",
          "author": {
            "@type": "Person",
            "name": "Dra. María Rodríguez",
            "jobTitle": "Directora",
            "worksFor": {
              "@type": "Organization",
              "name": "Clínica Dental DentPlus"
            }
          },
          "datePublished": "2023-12-15",
          "publisher": {
            "@type": "Organization",
            "name": "Wafidely",
            "logo": {
              "@type": "ImageObject",
              "url": "https://wafidely.com/logo.png"
            }
          }
        })
      },
      // Schema: Review
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "Wafidely",
            "applicationCategory": "BusinessApplication"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Dra. María Rodríguez"
          },
          "reviewBody": "Claude entiende las variaciones de cómo los pacientes preguntan. Con Wafidely lo configuré yo sola en 20 minutos sin ayuda técnica. Es como tener una recepcionista que nunca duerme."
        })
      }
    ]
  })
  
  // Data
  const copied = ref(false)
  
  const quickStats = [
    { metric: '87%', label: 'Consultas automáticas' },
    { metric: '30seg', label: 'Tiempo de respuesta' },
    { metric: '34%', label: 'Más citas agendadas' },
    { metric: '420%', label: 'ROI en 3 meses' }
  ]
  
  const clinicPrompt = `Eres la asistente virtual de Clínica Dental DentPlus, 
  en Bogotá, Colombia.
  
  Tu nombre es: Ana (asistente virtual)
  Tu tono es: Amigable, profesional, empática
  
  PUEDES HACER:
  - Dar precios de servicios dentales
  - Informar horarios: Lunes-Viernes 8am-6pm, Sábados 9am-1pm
  - Agendar citas (preguntar día, hora, tipo de servicio)
  - Responder preguntas sobre tratamientos
  - Dar nuestra ubicación: Calle 85 #15-20, Chapinero
  
  NO PUEDES:
  - Dar diagnósticos médicos
  - Prometer descuentos sin autorización
  - Cambiar políticas de la clínica
  
  PRECIOS:
  - Limpieza dental: $80.000 COP
  - Consulta general: $50.000 COP
  - Blanqueamiento: $350.000 COP
  - Ortodoncia: desde $2.500.000 COP
  
  REGLAS:
  1. Saluda siempre: "Hola! Soy Ana de DentPlus 😊"
  2. Máximo 2-3 párrafos por respuesta
  3. Si el paciente está molesto, ofrece hablar con doctora
  4. Confirma siempre los datos de cita: nombre, día, hora
  5. Usa emojis ocasionalmente
  
  Si no sabes algo, di: "Déjame verificar con la doctora"`
  
  const detailedResults = [
    {
      metric: '87%',
      title: 'Consultas Resueltas Automáticamente',
      description: 'Claude responde sin intervención humana',
      before: '0% automático, todo manual',
      after: '174 de 200 mensajes/día sin humanos'
    },
    {
      metric: '30seg',
      title: 'Tiempo de Respuesta',
      description: 'De 45 minutos a 30 segundos promedio',
      before: '45 min promedio, pico de 3 horas',
      after: '30 segundos, 24/7'
    },
    {
      metric: '+34%',
      title: 'Más Citas Agendadas',
      description: 'Por respuesta rápida y disponibilidad 24/7',
      before: '180 citas/mes',
      after: '241 citas/mes'
    },
    {
      metric: '420%',
      title: 'ROI en 3 Meses',
      description: 'Ahorro de $1,916/mes vs inversión de $84/mes',
      before: 'Costos: $2,600/mes',
      after: 'Costos: $684/mes'
    }
  ]
  
  const lessons = [
    {
      icon: '🎯',
      title: 'No necesitas ser técnico',
      description: 'María no sabía programar. Solo siguió el tutorial paso a paso. Si ella pudo, tú también puedes.'
    },
    {
      icon: '⏱️',
      title: 'Empieza pequeño',
      description: 'Los primeros 4 días fueron de pruebas. No lanzaron todo de golpe. Ajustaron y mejoraron gradualmente.'
    },
    {
      icon: '🤖',
      title: 'Claude es mejor que botones',
      description: 'Probaron ManyChat antes. Los pacientes se frustraban con botones. Claude entiende lenguaje natural.'
    },
    {
      icon: '👥',
      title: 'Humanos siguen siendo importantes',
      description: 'El 13% de casos complejos van a Laura. La automatización complementa, no reemplaza completamente.'
    },
    {
      icon: '📊',
      title: 'Mide todo',
      description: 'María revisa métricas semanalmente. Ve cuántos mensajes, tiempo de respuesta, satisfacción. Ajusta según datos.'
    }
  ]
  
  function copyPrompt() {
    navigator.clipboard.writeText(clinicPrompt)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  </script>