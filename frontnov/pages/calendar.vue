<template>
    <div class="appointment-scheduler">
      <!-- Header -->
      <div class="scheduler-header">
        <h2 class="scheduler-title">
          <Icon name="calendar" />
          Agenda tu Cita
        </h2>
        <p class="scheduler-subtitle">
          Selecciona la fecha y hora que mejor se adapte a tu horario
        </p>
      </div>
  
      <!-- Main Content -->
      <div class="scheduler-content">
        <!-- Step Indicator -->
        <div class="step-indicator">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            :class="['step', { active: currentStep === index, completed: currentStep > index }]"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <span class="step-label">{{ step }}</span>
          </div>
        </div>
  
        <!-- Step 1: Service Selection -->
        <div v-if="currentStep === 0" class="step-content fade-in">
          <h3>Selecciona el tipo de servicio</h3>
          <div class="service-grid">
            <div 
              v-for="service in services" 
              :key="service.id"
              :class="['service-card', { selected: selectedService?.id === service.id }]"
              @click="selectService(service)"
            >
              <div class="service-icon">{{ service.icon }}</div>
              <h4>{{ service.name }}</h4>
              <p>{{ service.description }}</p>
              <div class="service-duration">
                <Icon name="clock" />
                {{ service.duration }} min
              </div>
              <div class="service-price">${{ service.price }}</div>
            </div>
          </div>
        </div>
  
        <!-- Step 2: Date Selection -->
        <div v-if="currentStep === 1" class="step-content fade-in">
          <h3>Elige tu fecha preferida</h3>
          <div class="calendar-container">
            <div class="calendar-header">
              <button @click="previousMonth" class="nav-button">
                <Icon name="chevron-left" />
              </button>
              <h4>{{ formatMonthYear(currentDate) }}</h4>
              <button @click="nextMonth" class="nav-button">
                <Icon name="chevron-right" />
              </button>
            </div>
            
            <div class="calendar-grid">
              <div v-for="day in dayNames" :key="day" class="day-header">
                {{ day }}
              </div>
              <div 
                v-for="date in calendarDates" 
                :key="date.date"
                :class="['calendar-day', { 
                  'other-month': !date.currentMonth,
                  'selected': selectedDate === date.date,
                  'available': date.available,
                  'today': isToday(date.date)
                }]"
                @click="selectDate(date)"
              >
                {{ date.day }}
              </div>
            </div>
          </div>
        </div>
  
        <!-- Step 3: Time Selection -->
        <div v-if="currentStep === 2" class="step-content fade-in">
          <h3>Selecciona la hora</h3>
          <div class="time-slots">
            <div 
              v-for="time in availableTimes" 
              :key="time"
              :class="['time-slot', { selected: selectedTime === time }]"
              @click="selectTime(time)"
            >
              {{ time }}
            </div>
          </div>
        </div>
  
        <!-- Step 4: Contact Information -->
        <div v-if="currentStep === 3" class="step-content fade-in">
          <h3>Información de contacto</h3>
          <form @submit.prevent="scheduleAppointment" class="contact-form">
            <div class="form-group">
              <label>Nombre completo *</label>
              <input 
                v-model="contactInfo.name" 
                type="text" 
                required
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div class="form-group">
              <label>Correo electrónico *</label>
              <input 
                v-model="contactInfo.email" 
                type="email" 
                required
                placeholder="tu@email.com"
              />
            </div>
            
            <div class="form-group">
              <label>Teléfono *</label>
              <input 
                v-model="contactInfo.phone" 
                type="tel" 
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div class="form-group">
              <label>Notas adicionales</label>
              <textarea 
                v-model="contactInfo.notes" 
                placeholder="Cualquier información adicional que consideres relevante"
              ></textarea>
            </div>
          </form>
        </div>
  
        <!-- Step 5: Confirmation -->
        <div v-if="currentStep === 4" class="step-content fade-in">
          <div class="confirmation-card">
            <div class="confirmation-icon">
              <Icon name="check-circle" />
            </div>
            <h3>¡Cita agendada exitosamente!</h3>
            <p>Te hemos enviado los detalles de tu cita por correo electrónico.</p>
            
            <div class="appointment-summary">
              <div class="summary-item">
                <Icon name="service" />
                <span>{{ selectedService?.name }}</span>
              </div>
              <div class="summary-item">
                <Icon name="calendar" />
                <span>{{ formatDate(selectedDate) }}</span>
              </div>
              <div class="summary-item">
                <Icon name="clock" />
                <span>{{ selectedTime }}</span>
              </div>
              <div class="summary-item">
                <Icon name="user" />
                <span>{{ contactInfo.name }}</span>
              </div>
            </div>
            
            <div class="calendar-buttons">
              <button @click="addToGoogleCalendar" class="btn btn-primary">
                <Icon name="google" />
                Agregar a Google Calendar
              </button>
              <button @click="resetScheduler" class="btn btn-secondary">
                Agendar otra cita
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Navigation Buttons -->
      <div class="scheduler-navigation" v-if="currentStep < 4">
        <button 
          @click="previousStep" 
          :disabled="currentStep === 0"
          class="btn btn-secondary"
        >
          <Icon name="chevron-left" />
          Anterior
        </button>
        
        <button 
          @click="nextStep" 
          :disabled="!canProceed"
          class="btn btn-primary"
        >
          {{ currentStep === 3 ? 'Confirmar Cita' : 'Siguiente' }}
          <Icon name="chevron-right" />
        </button>
      </div>
  
      <!-- Loading Overlay -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Procesando tu cita...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  // Reactive state
  const currentStep = ref(0)
  const loading = ref(false)
  const currentDate = ref(new Date())
  const selectedService = ref(null)
  const selectedDate = ref(null)
  const selectedTime = ref(null)
  const contactInfo = ref({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  
  // Constants
  const steps = ['Servicio', 'Fecha', 'Hora', 'Contacto', 'Confirmación']
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  
  const services = ref([
    {
      id: 1,
      name: 'Consulta General',
      description: 'Consulta médica general y revisión de salud',
      duration: 30,
      price: 80,
      icon: '🩺'
    },
    {
      id: 2,
      name: 'Consulta Especializada',
      description: 'Consulta con especialista en área específica',
      duration: 45,
      price: 120,
      icon: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Examen Médico',
      description: 'Examen médico completo con análisis',
      duration: 60,
      price: 150,
      icon: '📋'
    },
    {
      id: 4,
      name: 'Seguimiento',
      description: 'Cita de seguimiento de tratamiento',
      duration: 20,
      price: 60,
      icon: '📈'
    }
  ])
  
  const availableTimes = ref([
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ])
  
  // Computed properties
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 0: return selectedService.value !== null
      case 1: return selectedDate.value !== null
      case 2: return selectedTime.value !== null
      case 3: return contactInfo.value.name && contactInfo.value.email && contactInfo.value.phone
      default: return true
    }
  })
  
  const calendarDates = computed(() => {
    const dates = []
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    // Start from the first day of the week containing the first day of the month
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        currentMonth: date.getMonth() === month,
        available: isDateAvailable(date)
      })
    }
    
    return dates
  })
  
  // Methods
  const selectService = (service) => {
    selectedService.value = service
  }
  
  const selectDate = (date) => {
    if (date.available && date.currentMonth) {
      selectedDate.value = date.date
    }
  }
  
  const selectTime = (time) => {
    selectedTime.value = time
  }
  
  const nextStep = () => {
    if (canProceed.value && currentStep.value < 4) {
      currentStep.value++
    }
  }
  
  const previousStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }
  
  const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  }
  
  const previousMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  }
  
  const isDateAvailable = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today && date.getDay() !== 0 // Not Sunday and not in the past
  }
  
  const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0]
    return dateString === today
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('es-ES', {
      month: 'long',
      year: 'numeric'
    })
  }
  
  const scheduleAppointment = async () => {
    if (!canProceed.value) return
    
    loading.value = true
    
    try {
      // Here you would integrate with your backend API
      // await $fetch('/api/appointments', {
      //   method: 'POST',
      //   body: {
      //     service: selectedService.value,
      //     date: selectedDate.value,
      //     time: selectedTime.value,
      //     contact: contactInfo.value
      //   }
      // })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      currentStep.value = 4
    } catch (error) {
      console.error('Error scheduling appointment:', error)
      // Handle error
    } finally {
      loading.value = false
    }
  }
  
  const addToGoogleCalendar = () => {
    const startDate = new Date(`${selectedDate.value}T${selectedTime.value}:00`)
    const endDate = new Date(startDate.getTime() + (selectedService.value.duration * 60000))
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedService.value.name)}&dates=${startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(`Cita: ${selectedService.value.name}\nDuración: ${selectedService.value.duration} minutos\nContacto: ${contactInfo.value.name}`)}`
    
    window.open(googleCalendarUrl, '_blank')
  }
  
  const resetScheduler = () => {
    currentStep.value = 0
    selectedService.value = null
    selectedDate.value = null
    selectedTime.value = null
    contactInfo.value = {
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  }
  
  // Icon component (you can replace this with your preferred icon library)
  const Icon = {
    props: ['name'],
    template: `
      <span class="icon">
        <span v-if="name === 'calendar'">📅</span>
        <span v-else-if="name === 'clock'">⏰</span>
        <span v-else-if="name === 'chevron-left'">◀</span>
        <span v-else-if="name === 'chevron-right'">▶</span>
        <span v-else-if="name === 'check-circle'">✅</span>
        <span v-else-if="name === 'service'">🏥</span>
        <span v-else-if="name === 'user'">👤</span>
        <span v-else-if="name === 'google'">📅</span>
        <span v-else>{{ name }}</span>
      </span>
    `
  }
  </script>
  
  <style scoped>
  .appointment-scheduler {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #232c4d 0%, #1a2142 100%);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  .scheduler-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .scheduler-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #38f5b3, #9dfa2b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .scheduler-subtitle {
    font-size: 1.1rem;
    opacity: 0.8;
    margin: 0;
  }
  
  .step-indicator {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    gap: 1rem;
  }
  
  .step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .step.active {
    background: linear-gradient(45deg, #38f5b3, #9dfa2b);
    color: #232c4d;
  }
  
  .step.completed {
    background: rgba(56, 245, 179, 0.2);
    color: #38f5b3;
  }
  
  .step-number {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.8rem;
  }
  
  .step.active .step-number {
    background: rgba(35, 44, 77, 0.3);
  }
  
  .step-content {
    margin-bottom: 3rem;
  }
  
  .step-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #38f5b3;
  }
  
  .fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .service-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .service-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    text-align: center;
  }
  
  .service-card:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  .service-card.selected {
    border-color: #38f5b3;
    background: rgba(56, 245, 179, 0.1);
  }
  
  .service-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .service-card h4 {
    margin-bottom: 0.5rem;
    color: #38f5b3;
  }
  
  .service-card p {
    opacity: 0.8;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  .service-duration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .service-price {
    font-size: 1.2rem;
    font-weight: 600;
    color: #9dfa2b;
  }
  
  .calendar-container {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .calendar-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .calendar-header h4 {
    margin: 0;
    color: #38f5b3;
    text-transform: capitalize;
  }
  
  .nav-button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .nav-button:hover {
    background: rgba(56, 245, 179, 0.2);
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
  }
  
  .day-header {
    background: rgba(56, 245, 179, 0.2);
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    color: #38f5b3;
  }
  
  .calendar-day {
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .calendar-day:hover.available {
    background: rgba(56, 245, 179, 0.2);
  }
  
  .calendar-day.selected {
    background: #38f5b3;
    color: #232c4d;
    font-weight: 600;
  }
  
  .calendar-day.other-month {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .calendar-day.today {
    background: rgba(157, 250, 43, 0.2);
  }
  
  .calendar-day:not(.available) {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .time-slots {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .time-slot {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .time-slot:hover {
    background: rgba(56, 245, 179, 0.2);
  }
  
  .time-slot.selected {
    background: #38f5b3;
    color: #232c4d;
  }
  
  .contact-form {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #38f5b3;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #38f5b3;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .confirmation-card {
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .confirmation-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #38f5b3;
  }
  
  .appointment-summary {
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
  }
  
  .summary-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .summary-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  
  .calendar-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .scheduler-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }
  
  .btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }
  
  .btn-primary {
    background: linear-gradient(45deg, #38f5b3, #9dfa2b);
    color: #232c4d;
  }
  
  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(56, 245, 179, 0.3);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(35, 44, 77, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #38f5b3;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .appointment-scheduler {
      padding: 1rem;
    }
    
    .scheduler-title {
      font-size: 2rem;
    }
    
    .step-indicator {
      flex-wrap: wrap;
    }
    
    .service-grid {
      grid-template-columns: 1fr;
    }
    
    .calendar-grid {
      font-size: 0.9rem;
    }
    
    .time-slots {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
    
    .scheduler-navigation {
      flex-direction: column;
      gap: 1rem;
    }
    
    .calendar-buttons {
      flex-direction: column;
    }
  }
  </style>
  Made with
  