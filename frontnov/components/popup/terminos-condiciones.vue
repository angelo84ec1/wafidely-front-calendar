<!-- pages/terminos-y-condiciones.vue -->
<template>
    <div class="terms-page">
      <!-- Navigation breadcrumb -->
      <div class="breadcrumb-section">
        <div class="container">
          <nav class="breadcrumb">
            <NuxtLink to="/" class="breadcrumb-link">Inicio</NuxtLink>
            <span class="breadcrumb-separator">→</span>
            <span class="breadcrumb-current">Términos y Condiciones</span>
          </nav>
        </div>
      </div>
  
      <!-- Main content -->
      <div class="container">
        <div class="terms-content">
          <div class="terms-header">
            <h1>Términos y Condiciones</h1>
            <p class="subtitle">Wafidely - Una marca de WAPPIAD SAS</p>
          </div>
          
          <div class="terms-body">
            <div class="section">
              <h2>1. Aceptación de los Términos</h2>
              <p>Al acceder y utilizar los servicios de Wafidely, una marca registrada de WAPPIAD SAS, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.</p>
            </div>
  
            <div class="section">
              <h2>2. Descripción de los Servicios</h2>
              <p>Wafidely proporciona servicios digitales especializados en marketing, publicidad digital y soluciones tecnológicas para empresas. Nuestros servicios incluyen pero no se limitan a:</p>
              <ul>
                <li>Desarrollo de estrategias de marketing digital</li>
                <li>Gestión de campañas publicitarias</li>
                <li>Desarrollo de aplicaciones y plataformas web</li>
                <li>Consultoría en transformación digital</li>
              </ul>
            </div>
  
            <div class="section">
              <h2>3. Registro y Cuentas de Usuario</h2>
              <p>Para acceder a ciertos servicios, es posible que deba crear una cuenta. Usted es responsable de:</p>
              <ul>
                <li>Proporcionar información precisa y actualizada</li>
                <li>Mantener la seguridad de su contraseña</li>
                <li>Todas las actividades que ocurran bajo su cuenta</li>
                <li>Notificar inmediatamente cualquier uso no autorizado</li>
              </ul>
            </div>
  
            <div class="section">
              <h2>4. Uso Aceptable</h2>
              <p>Al utilizar nuestros servicios, usted se compromete a no:</p>
              <ul>
                <li>Violar cualquier ley o regulación aplicable</li>
                <li>Infringir derechos de propiedad intelectual</li>
                <li>Transmitir contenido malicioso o dañino</li>
                <li>Intentar acceder sin autorización a sistemas o datos</li>
                <li>Interferir con el funcionamiento normal de los servicios</li>
              </ul>
            </div>
  
            <div class="section">
              <h2>5. Propiedad Intelectual</h2>
              <p>Todos los contenidos, marcas, logos y materiales disponibles en los servicios de Wafidely son propiedad de WAPPIAD SAS o de sus respectivos propietarios. Está prohibida la reproducción, distribución o modificación sin autorización previa por escrito.</p>
            </div>
  
            <div class="section">
              <h2>6. Privacidad y Protección de Datos</h2>
              <p>El tratamiento de sus datos personales se rige por nuestra Política de Privacidad, que forma parte integral de estos términos. Al utilizar nuestros servicios, usted consiente el tratamiento de sus datos según se describe en dicha política.</p>
            </div>
  
            <div class="section">
              <h2>7. Servicios de Terceros</h2>
              <p>Nuestros servicios pueden integrar o enlazar con servicios de terceros. WAPPIAD SAS no se hace responsable por el contenido, políticas o prácticas de estos terceros. El uso de servicios de terceros está sujeto a sus propios términos y condiciones.</p>
            </div>
  
            <div class="section">
              <h2>8. Facturación y Pagos</h2>
              <p>Los servicios contratados se facturarán según las tarifas y condiciones acordadas. Los pagos deben realizarse en los plazos establecidos. El incumplimiento en los pagos puede resultar en la suspensión temporal o definitiva de los servicios.</p>
            </div>
  
            <div class="section">
              <h2>9. Limitación de Responsabilidad</h2>
              <p>WAPPIAD SAS no será responsable por daños indirectos, incidentales, especiales o consecuentes que puedan surgir del uso o la imposibilidad de usar nuestros servicios, excepto en casos de dolo o culpa grave según lo establecido por la ley colombiana.</p>
            </div>
  
            <div class="section">
              <h2>10. Terminación</h2>
              <p>Cualquiera de las partes puede terminar la relación contractual con previo aviso. WAPPIAD SAS se reserva el derecho de suspender o terminar el acceso a los servicios en caso de violación de estos términos.</p>
            </div>
  
            <div class="section">
              <h2>11. Modificaciones a los Términos</h2>
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones importantes se notificarán con al menos 30 días de anticipación. El uso continuado de los servicios constituye la aceptación de los términos modificados.</p>
            </div>
  
            <div class="section">
              <h2>12. Ley Aplicable y Jurisdicción</h2>
              <p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta en los tribunales competentes de Bogotá, Colombia.</p>
            </div>
  
            <div class="section">
              <h2>13. Contacto</h2>
              <p>Para preguntas sobre estos términos y condiciones:</p>
              <div class="contact-info">
                <p><strong>WAPPIAD SAS</strong></p>
                <p><strong>Email:</strong> legal@wappiad.com</p>
                <p><strong>Teléfono:</strong> +593983314957</p>
                <p><strong>Dirección:</strong> Quito, Ecuador</p>
              </div>
            </div>
  
            <div class="section last-updated">
              <p><strong>Última actualización:</strong> Agosto 2025</p>
              <p><em>Versión 2.0</em></p>
            </div>
          </div>
          
          <div class="terms-footer">
            <button @click="goBack" class="back-btn">Regresar</button>
            <button @click="acceptTerms" class="accept-btn">Aceptar Términos</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Meta tags para SEO
  useHead({
    title: 'Términos y Condiciones - Wafidely | WAPPIAD SAS',
    meta: [
      { name: 'description', content: 'Términos y condiciones de uso de los servicios de Wafidely, una marca de WAPPIAD SAS. Consulta nuestras políticas y condiciones legales.' },
      { name: 'keywords', content: 'términos, condiciones, Wafidely, WAPPIAD, legal, política' }
    ]
  })
  
  // Funciones
  const goBack = () => {
    if (process.client) {
      window.history.back()
    }
  }
  
  const acceptTerms = () => {
    // Aquí puedes agregar lógica para manejar la aceptación
    // Por ejemplo, guardar en localStorage, emitir evento, etc.
    alert('Términos aceptados exitosamente')
    
    // Opcional: redirigir a página principal
    navigateTo('/')
  }
  </script>
  
  <style scoped>
  .terms-page {
    min-height: 100vh;
    background: #f8fafc;
    padding: 20px 0 40px;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .breadcrumb-section {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 0;
    margin-bottom: 30px;
  }
  
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .breadcrumb-link {
    color: #3b82f6;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .breadcrumb-link:hover {
    color: #1d4ed8;
  }
  
  .breadcrumb-separator {
    color: #64748b;
  }
  
  .breadcrumb-current {
    color: #1e293b;
    font-weight: 500;
  }
  
  .terms-content {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    animation: slideUp 0.6s ease;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .terms-header {
    padding: 40px 40px 30px;
    border-bottom: 1px solid #e2e8f0;
    background: linear-gradient(135deg, #38f5b3 0%, #2563EB 50%, #7C3AED 100%);
    color: white;
    text-align: center;
  }
  
  .terms-header h1 {
    margin: 0 0 12px;
    font-size: 32px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .subtitle {
    margin: 0;
    font-size: 18px;
    opacity: 0.9;
    font-weight: 300;
  }
  
  .terms-body {
    padding: 40px;
    max-height: 70vh;
    overflow-y: auto;
  }
  
  .section {
    margin-bottom: 32px;
  }
  
  .section:last-child {
    margin-bottom: 0;
  }
  
  .section h2 {
    color: #1e293b;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 8px;
    position: relative;
  }
  
  .section h2:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(135deg, #38f5b3 0%, #2563EB 50%, #7C3AED 100%);
  }
  
  .section p {
    color: #475569;
    line-height: 1.7;
    margin-bottom: 12px;
    font-size: 15px;
  }
  
  .section ul {
    margin: 16px 0;
    padding-left: 0;
  }
  
  .section li {
    color: #475569;
    line-height: 1.6;
    margin-bottom: 8px;
    font-size: 15px;
    list-style: none;
    position: relative;
    padding-left: 24px;
  }
  
  .section li:before {
    content: '→';
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: bold;
  }
  
  .contact-info {
    background: #f1f5f9;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
  }
  
  .contact-info p {
    margin-bottom: 8px;
  }
  
  .last-updated {
    background: #fef3c7;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #f59e0b;
    text-align: center;
  }
  
  .last-updated p {
    color: #92400e;
    font-weight: 500;
  }
  
  .terms-footer {
    padding: 30px 40px;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
  
  .back-btn {
    background: white;
    color: #64748b;
    border: 2px solid #e2e8f0;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    transition: all 0.2s ease;
  }
  
  .back-btn:hover {
    border-color: #cbd5e1;
    background: #f1f5f9;
    transform: translateY(-1px);
  }
  
  .accept-btn {
    background: linear-gradient(135deg, #38f5b3 0%, #2563EB 50%, #7C3AED 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .accept-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
    
    .terms-header {
      padding: 30px 20px 20px;
    }
    
    .terms-header h1 {
      font-size: 24px;
    }
    
    .subtitle {
      font-size: 16px;
    }
    
    .terms-body {
      padding: 30px 20px;
      max-height: 60vh;
    }
    
    .terms-footer {
      padding: 20px;
      flex-direction: column;
      gap: 12px;
    }
    
    .back-btn,
    .accept-btn {
      width: 100%;
      padding: 14px 24px;
    }
    
    .section h2 {
      font-size: 18px;
    }
  }
  
  @media (max-width: 480px) {
    .terms-page {
      padding: 10px 0 20px;
    }
    
    .terms-content {
      margin: 0 10px;
    }
    
    .terms-header h1 {
      font-size: 20px;
    }
    
    .terms-body {
      padding: 20px 15px;
    }
  }
  
  /* Scroll personalizado */
  .terms-body::-webkit-scrollbar {
    width: 8px;
  }
  
  .terms-body::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  .terms-body::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #38f5b3 0%, #2563EB 100%);
    border-radius: 4px;
  }
  
  .terms-body::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  }
  </style>