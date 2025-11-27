// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader"

export default defineNuxtConfig({


  vite: {
    plugins: [
      svgLoader({
        /* ... */
      })
    ]
  },

  ssr: false,

  // Hooks para errores (opcional)
  hooks: {
    "render:errorMiddleware": (app) => {
      app.use((error, req, res, next) => {
        console.log("Error capturado:", error)
        next(error)
      })
    }
  },

  app: {
    head: {
      // Título optimizado para SEO (más corto y directo)
      title: "Wafidely - Automatiza WhatsApp Business con IA Sin Programar",
      titleTemplate: "%s | Wafidely",
      
      htmlAttrs: {
        lang: "es",
      },

      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        
        // Meta description optimizada (más corta y clara)
        {
          hid: "description",
          name: "description",
          content: "Plataforma no-code para automatizar WhatsApp Business con Claude, Gemini y ChatGPT. Setup en 10 minutos, sin programar. Prueba gratis 7 días."
        },
        
        { name: "format-detection", content: "telephone=no" },
        
        // Keywords optimizadas para AEO
        {
          name: "keywords",
          content: "automatizar whatsapp sin programar, plataforma no-code whatsapp, integrar claude whatsapp, chatbot whatsapp ia, wafidely, whatsapp business automatizacion"
        },

        // Open Graph mejorado
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "Wafidely"
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website"
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://wafidely.com"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Wafidely - Automatiza WhatsApp con IA Sin Programar"
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Conecta WhatsApp Business con Claude, Gemini o ChatGPT en 10 minutos. No requiere código."
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://wafidely.com/images/og-image.jpg"
        },
        {
          hid: "og:image:width",
          property: "og:image:width",
          content: "1200"
        },
        {
          hid: "og:image:height",
          property: "og:image:height",
          content: "630"
        },

        // Twitter Card
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          hid: "twitter:site",
          name: "twitter:site",
          content: "@wafidely"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Wafidely - Automatiza WhatsApp con IA"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Plataforma no-code para WhatsApp Business + Claude, Gemini, ChatGPT"
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://wafidely.com/images/og-image.jpg"
        },

        // Datos adicionales
        {
          name: "author",
          content: "Wafidely"
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      ],

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css' },
        
        // Canonical URL (importante para SEO)
        { rel: "canonical", href: "https://wafidely.com" }
      ],
      
      script: [
      
        
        // Schema.org Organization (global en todas las páginas)
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wafidely",
            "url": "https://wafidely.com",
            "logo": "https://wafidely.com/logo.png",
            "description": "Plataforma no-code para automatizar WhatsApp Business con inteligencia artificial",
            "foundingDate": "2024",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+593983314957",
              "contactType": "customer service",
              "availableLanguage": ["es", "en"],
              "areaServed": ["EC", "US", "MX", "CO", "AR", "CL", "PE"]
            },
            "sameAs": [
              "https://www.facebook.com/wafidely1",
              "https://www.linkedin.com/company/wappiad-s-a-s",
              "https://www.instagram.com/wafidely"
            ]
          })
        }
      ],
    },
  },

// Sitemap configuration (actualizado con páginas AEO)
sitemap: {
  hostname: "https://wafidely.com",
  gzip: true,
  
  // ⭐ NUEVO: Conectar con sitemap.xsl
  xsl: '/sitemap.xsl',
  
  routes: async () => {
    // Rutas estáticas existentes + nuevas AEO
    const staticRoutes = [
      // ========================================
      // RUTAS EXISTENTES
      // ========================================
      {
        url: "/",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date()
      },
      {
        url: "/ai",
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date()
      },
      {
        url: "/caracteristicas",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date()
      },
      {
        url: "/testimonios",
        changefreq: "monthly",
        priority: 0.7,
        lastmod: new Date()
      },
      {
        url: "/precios",
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date()
      },

      // ========================================
      // NUEVAS PÁGINAS AEO (Solo las que TIENES)
      // ========================================
      
      // Página principal plataforma
      {
        url: "/plataforma",
        changefreq: "weekly",
        priority: 0.95,
        lastmod: new Date()
      },

      // Integraciones (MUY IMPORTANTE PARA AEO)
      {
        url: "/integraciones/whatsapp-claude-sin-codigo",
        changefreq: "weekly",
        priority: 0.95,
        lastmod: new Date()
      },

      // Casos de uso
      {
        url: "/casos-uso/clinica-dental-sin-programacion",
        changefreq: "monthly",
        priority: 0.85,
        lastmod: new Date()
      },

      // Comparativas
      {
        url: "/comparativas/wafidely-vs-twilio",
        changefreq: "monthly",
        priority: 0.9,
        lastmod: new Date()
      },
      {
        url: "/comparativas/claude-vs-gemini-vs-chatgpt-whatsapp",
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date()
      }
    ]
    
    // Rutas dinámicas (si tienes blog o más casos de uso)
    let dynamicRoutes = []
    try {
      // Si tienes una API para obtener rutas dinámicas
      // const posts = await $fetch("https://tu-api.com/posts")
      // dynamicRoutes = posts.map(post => ({
      //   url: `/blog/${post.slug}`,
      //   changefreq: "weekly",
      //   priority: 0.6,
      //   lastmod: new Date(post.updatedAt)
      // }))
    } catch (error) {
      console.log("Error fetching dynamic routes for sitemap:", error)
    }
    
    return [...staticRoutes, ...dynamicRoutes]
  },
  
  defaults: {
    changefreq: "weekly",
    priority: 0.7,
    lastmod: new Date()
  }
},

  // Robots.txt mejorado para LLMs
  robots: {
    UserAgent: "*",
    Allow: "/",
    Disallow: [
      "/admin/",
      "/private/",
      "/_nuxt/",
      "/api/",
      "/*.json$"
    ],
    Sitemap: "https://wafidely.com/sitemap.xml",
    CrawlDelay: 1,
    
    // Reglas específicas para crawlers de LLMs (IMPORTANTE PARA AEO)
    rules: [
      {
        UserAgent: "GPTBot",
        Allow: "/",
        CrawlDelay: 1
      },
      {
        UserAgent: "ClaudeBot", 
        Allow: "/",
        CrawlDelay: 1
      },
      {
        UserAgent: "Google-Extended",
        Allow: "/",
        CrawlDelay: 1
      },
      {
        UserAgent: "anthropic-ai",
        Allow: "/",
        CrawlDelay: 1
      },
      {
        UserAgent: "ChatGPT-User",
        Allow: "/",
        CrawlDelay: 1
      }
    ]
  },

  runtimeConfig: {
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    
    public: {
      baseURL: process.env.STRAPI_URL || "http://localhost:1337",
      MAILTO: process.env.MAILTO || "websecuador.net@gmail.com",
      pagomedioToken: process.env.PAGOMEDIO_TOKEN,
      gtmContainerId: process.env.NUXT_PUBLIC_GTM_CONTAINER_ID,
      
      GOOGLE_MAPS_API: 'AIzaSyAMQ-DzRcCKRrOWJWjPkPSTUHqwyQkyVH8',
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,

        

                // ✅ PayPal - Variables públicas (cliente)
      // En .env deben ser: NUXT_PUBLIC_PAYPAL_CLIENT_ID y NUXT_PUBLIC_PAYPAL_MODE
      paypalClientId: process.env.NUXT_PUBLIC_PAYPAL_CLIENT_ID,
      paypalMode: process.env.NUXT_PUBLIC_PAYPAL_MODE || 'sandbox',

      // Configuración del sitio (útil para componentes)
      siteUrl: "https://wafidely.com",
      siteName: "Wafidely",
      siteDescription: "Plataforma no-code para automatizar WhatsApp Business con IA"
    },
  },

  // Global CSS
  css: [
    "~/assets/css/reset.css",
    "~/assets/css/global.css", 
    "~/assets/css/main.css",
    "~/assets/css/calendar-override.css",
    "~/assets/scss/_swiper.scss"
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: [
    "~/plugins/toastification.client.ts"
  ],

  components: true,

  modules: [
    "@pinia/nuxt",
    "@sidebase/nuxt-pdf", 

    "nuxt-swiper",
    "@nuxtjs/sitemap" ,
    // "@nuxt/image" // Descomentar si quieres optimización de imágenes
  ],

  swiper: {
    // Configuración de swiper aquí si es necesaria
  },

  build: {
    transpile: ["defu"],
  },

  carousel: {
    prefix: 'MyPrefix'
  },

  router: {
    options: {
      sensitive: false,
      linkActiveClass: "drawer__link--active",
      // Rutas estrictas para mejor SEO
      strict: false
    },
  },

  // Configuración de optimización para SEO
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
  },

  // Headers de seguridad y SEO
  nitro: {
    prerender: {
      // Pre-renderizar páginas importantes (mejora velocidad y SEO)
      routes: [
        '/',
        '/plataforma',
        '/integraciones/whatsapp-claude-sin-codigo',
        '/integraciones/whatsapp-gemini-google',
        '/integraciones/whatsapp-chatgpt-openai',
        '/casos-uso/clinica-dental-sin-programacion',
        '/comparativas/wafidely-vs-twilio',
        '/comparativas/claude-vs-gemini-vs-chatgpt-whatsapp',
        '/precios',
        '/casos-de-exito'
      ],
      crawlLinks: true
    },
    
    // Headers personalizados
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'geolocation=(), camera=(), microphone=()'
        }
      },
      // Cache para páginas estáticas (mejora velocidad)
      '/plataforma': { 
        swr: 3600, // Cache por 1 hora
        cache: {
          maxAge: 3600
        }
      },
      '/integraciones/**': { 
        swr: 3600 
      },
      '/comparativas/**': { 
        swr: 3600 
      },
      '/casos-uso/**': { 
        swr: 3600 
      }
    }
  },

  compatibilityDate: "2024-11-27",
});