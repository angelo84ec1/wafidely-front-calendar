
/** @type {import('tailwindcss').Config} */

import animations from '@midudev/tailwind-animations'

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],

  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms',
      },
      borderRadius: {
        '4xl': '0.5rem',
      },

      screens: {
        'pho': '362px',
        'mini': '400px',
        'micro': '418px',
        'mob': '500px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'tab': '850px',
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'desk': '1100px',
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },

      keyframes: {
        spin: {
          '0%' : { content:'marketing' },
          '20%' : { content:'content' },
          '40%' :{ content:'engineering' },
          '60%' : { content:'crypto' },
          '80%' : { content:'consulting' },
          '100%' :{ content:'business' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        // ✨ Nuevas animaciones para Wafidely AI
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },

      width: {
        '7/10': '70%', // Define la clase personalizada para el 70% de ancho
      },
      
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        // ✨ Nuevas animaciones para Wafidely AI
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },

      colors: {
        'primary': '#00f800',
        'secondary': '#000000',
        'accent': '#4f4f4f',
        'tercery': '#f3f1f6',
        
        // ✨ Colores corporativos de Wafidely AI
        'wafidely-green': '#25D366',
        'wafidely-dark-green': '#128C7E',
        'wafidely-light-green': '#DCF8C6',
        'wafidely-blue': '#2563EB',
        'wafidely-dark-blue': '#1E40AF',
        'wafidely-light-blue': '#DBEAFE',
        'wafidely-purple': '#7C3AED',
        'wafidely-dark-purple': '#5B21B6',
        'wafidely-light-purple': '#EDE9FE',
        'wafidely-gray': '#6B7280',
        'wafidely-light-gray': '#F3F4F6',
        'wafidely-dark-gray': '#374151',
        'wafidely-dark': '#111827',
        'wafidely-accent': '#F59E0B',
        'wafidely-success': '#10B981',
        'wafidely-warning': '#F59E0B',
        'wafidely-error': '#EF4444',
        
        // Paleta extendida de WhatsApp
        'whatsapp': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#25D366',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        
        // Paleta extendida de azul corporativo
        'brand': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563EB',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Paleta extendida de púrpura
        'accent-purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#7C3AED',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21b6',
          900: '#581c87',
          950: '#3b0764',
        }
      },

      // ✨ Tipografía mejorada para Wafidely AI
      fontFamily: {
        'sans': [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif'
        ],
        'heading': [
          'Inter',
          'system-ui',
          'sans-serif'
        ]
      },

      // ✨ Espaciado adicional
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // ✨ Sombras personalizadas para Wafidely AI
      boxShadow: {
        'wafidely': '0 10px 25px -3px rgba(37, 211, 102, 0.1), 0 4px 6px -2px rgba(37, 211, 102, 0.05)',
        'wafidely-lg': '0 20px 25px -5px rgba(37, 211, 102, 0.1), 0 10px 10px -5px rgba(37, 211, 102, 0.04)',
        'blue-glow': '0 0 20px rgba(37, 99, 235, 0.3)',
        'green-glow': '0 0 20px rgba(37, 211, 102, 0.3)',
        'purple-glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow': '0 0 30px rgba(37, 211, 102, 0.3)',
        'glow-lg': '0 0 40px rgba(37, 211, 102, 0.4)',
      },

      // ✨ Gradientes personalizados
      backgroundImage: {
        'gradient-wafidely': 'linear-gradient(135deg, #25D366 0%, #2563EB 50%, #7C3AED 100%)',
        'gradient-wafidely-light': 'linear-gradient(135deg, #DCF8C6 0%, #DBEAFE 50%, #EDE9FE 100%)',
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-warning': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'gradient-hero': 'linear-gradient(135deg, #25D366 0%, #2563EB 50%, #7C3AED 100%)',
        'hero-pattern': 'radial-gradient(circle at 25% 25%, rgba(37, 211, 102, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
      },

      // ✨ Backdrop blur personalizado
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },

  variants: {
    fill: [],
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
      // ✨ Variantes adicionales para Wafidely AI
      scale: ['group-hover'],
      transform: ['group-hover'],
      backdropBlur: ['hover', 'focus'],
      backgroundImage: ['hover', 'focus'],
      boxShadow: ['hover', 'focus'],
    }
  },

  plugins: [
    animations,
    require('flowbite/plugin'),
    require('tailwindcss-animate'),
    require('tailwindcss-animated'),
    require("flowbite/plugin"),
    
    // ✨ Plugin personalizado para utilidades de Wafidely AI
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.gradient-text': {
          background: 'linear-gradient(135deg, #25D366 0%, #2563EB 50%, #7C3AED 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.hero-pattern': {
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(37, 211, 102, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)',
        },
        '.scroll-indicator': {
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounceGentle 2s ease-in-out infinite',
        },
        '.shadow-glow': {
          boxShadow: '0 0 30px rgba(37, 211, 102, 0.3)',
        },
        '.shadow-blue-glow': {
          boxShadow: '0 0 30px rgba(37, 99, 235, 0.3)',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}