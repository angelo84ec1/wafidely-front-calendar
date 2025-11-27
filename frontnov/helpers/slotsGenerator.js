/**
 * @typedef {Object} MeetingSlot
 * @property {Date} date - Date of the meeting
 * any other props
 */

/**
 * @typedef {Object} Time
 * @property {number} hours - Hours
 * @property {number} minutes - Minutes
 */

/**
 * @typedef {Object} ScheduleConfig
 * @property {string} diasActivos - 'lunes-viernes' o 'lunes-sabado'
 * @property {string} horarioLaboral - Formato 'HH:MM-HH:MM' ej: '08:00-18:00'
 * @property {number} duracionCita - Duración en minutos (15, 30, 45, 60)
 * @property {Array<{fecha: string, motivo: string}>} diasBloqueados - Array de días bloqueados
 */

// Nombres de días y meses en español
const DAYS_SPANISH = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MONTHS_SPANISH = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Obtiene el nombre del día en español
 * @param {Date} date - Fecha
 * @return {String} Nombre del día en español
 */
function getDayNameSpanish(date) {
  return DAYS_SPANISH[date.getDay()];
}

/**
 * Obtiene el nombre del mes en español
 * @param {Date} date - Fecha
 * @return {String} Nombre del mes en español
 */
function getMonthNameSpanish(date) {
  return MONTHS_SPANISH[date.getMonth()];
}

/**
 * Formatea la fecha en español
 * @param {Date} date - Fecha
 * @return {String} Fecha formateada en español
 */
function formatDateSpanish(date) {
  const dayName = getDayNameSpanish(date);
  const day = date.getDate();
  const monthName = getMonthNameSpanish(date);
  return `${dayName} ${day} ${monthName}`;
}

/**
 * Used to format a date, to compare with other date without time
 * @param {Date} date - Date to decompose
 * @return {String} YYYY-MM-DD
 */
function formatingDate(date) {
    const d = new Date(date);
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * Function to random a number between min and max
 * @param {Number} min - A date
 * @param {Number} max - time of the date
 * @return {number}
  */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Set a time to a date
 * @param {Date} date - A date
 * @param {Time} time - time of the date
 * @return {Date} date with the good time
  */
function setTime(date, time) {
  const d = new Date(date);
  d.setHours(time.hours);
  d.setMinutes(time.minutes);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

/**
 * Redondea al tiempo más cercano según el intervalo
 * @param {Date} date - Fecha a redondear
 * @param {number} interval - Intervalo en minutos
 * @return {Date} Fecha redondeada
 */
function roundToClosestTime(date, interval) {
  const d = new Date(date);
  const minutes = d.getMinutes();
  const minutesToAdd = minutes % interval;
  d.setMinutes(minutes + (interval - minutesToAdd));
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

/**
 * Verifica si un día debe ser bloqueado según la configuración
 * @param {Date} date - Fecha a verificar
 * @param {ScheduleConfig} config - Configuración de horarios
 * @return {boolean} true si el día debe ser bloqueado
 */
function isDayBlocked(date, config) {
  const dayOfWeek = date.getDay();
  const fechaString = formatingDate(date);
  
  // Verificar si es domingo (siempre bloqueado)
  if (dayOfWeek === 0) {
    return true;
  }
  
  // Verificar si es sábado y la configuración es lunes-viernes
  if (dayOfWeek === 6 && config.diasActivos === 'lunes-viernes') {
    return true;
  }
  
  // Verificar si está en la lista de días bloqueados
  if (config.diasBloqueados && Array.isArray(config.diasBloqueados)) {
    return config.diasBloqueados.some(bloqueo => bloqueo.fecha === fechaString);
  }
  
  return false;
}

/**
 * Parsea el horario laboral desde string a objeto Time
 * @param {string} horarioLaboral - Formato 'HH:MM-HH:MM'
 * @return {{start: Time, end: Time}} Horarios de inicio y fin
 */
function parseHorarioLaboral(horarioLaboral) {
  const [inicio, fin] = horarioLaboral.split('-');
  const [startHour, startMinute] = inicio.split(':').map(Number);
  const [endHour, endMinute] = fin.split(':').map(Number);
  
  return {
    start: { hours: startHour, minutes: startMinute },
    end: { hours: endHour, minutes: endMinute }
  };
}

/**
 * Generates time slots between start and end times with specified intervals.
 * @param {Date} start - Start time.
 * @param {Date} end - End time.
 * @param {number} interval - Interval in minutes.
 * @param {number} randomSlotsToDelete - Number of slots to delete randomly.
 * @param {Array<Date>} disabledTimes - Array of times to disable.
 * @return {MeetingSlot[]} Generated slots.
 */
function generateSlots(start, end, interval, randomSlotsToDelete = 0, disabledTimes = []) {
  const slots = [];
  let currentTime = new Date(start);
  
  while (currentTime <= end) {
      const isDisabled = disabledTimes.some(disabledTime => 
        currentTime.getTime() === disabledTime.getTime()
      );
      
      if (!isDisabled) {
          slots.push({ 
            date: new Date(currentTime),
            // Agregar información en español para el slot
            timeSpanish: currentTime.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })
          });
      }
      
      currentTime = new Date(currentTime.getTime() + interval * 60000);
  }

  // Eliminar slots aleatorios si se especifica
  for (let i = 0; i < randomSlotsToDelete; i++) {
      if (slots.length > 0) {
        const indexToDelete = randomNumber(0, slots.length);
        slots.splice(indexToDelete, 1);
      }
  }

  return slots;
}

/**
 * Function to generate the first slot of the week used
 * @param {Date} date - date used to disable
 * @param {Number} interval - Interval between two meetings (minutes)
 * @param {Time} startTime - startTime of the meetings
 * @param {Time} endTime - endTime of the meetings
 * @param {Array<Date>} disabledTimes - Array of disabled times
 * @param {number} randomSlotsToDelete - Number of slots to delete randomly
 * @return {MeetingSlot} - A meetingSlot returned
 */
function generateFirstDate(date, interval, startTime, endTime, disabledTimes = [], randomSlotsToDelete = 0) {
  let start;
  if (formatingDate(date) <= formatingDate(new Date())) {
    start = roundToClosestTime(date, interval);
    if (start.getTime() < setTime(date, startTime).getTime()) {
      start = setTime(date, startTime);
    }
  } else {
    start = setTime(date, startTime);
  }
  const end = setTime(date, endTime);
  const slots = generateSlots(start, end, interval, randomSlotsToDelete, disabledTimes);
  
  return {
    date,
    slots,
    // Agregar información en español para el día
    dayNameSpanish: getDayNameSpanish(date),
    dateSpanish: formatDateSpanish(date),
    dayOfWeek: date.getDay(),
    formattedDate: formatingDate(date)
  };
}

/**
 * Function to generate days with dynamic configuration
 * @param {Date} date - date used to start
 * @param {Number} nbDays - number of days to generate
 * @param {Time} startTime - startTime of the meetings
 * @param {Time} endTime - endTime of the meetings
 * @param {Number} interval - Interval between two meetings (minutes)
 * @param {Array<Date>} disabledTimes - Array of disabled times
 * @param {number} randomSlotsToDelete - Number of slots to delete randomly
 * @param {ScheduleConfig} config - Schedule configuration (optional)
 * @return {MeetingSlot[]} - list of slots
 */
function generateDays(date, nbDays, startTime, endTime, interval, disabledTimes = [], randomSlotsToDelete = 0, config = null) {
  const days = [];
  
  // Si no se pasa configuración, usar comportamiento original
  if (!config) {
    days.push(generateFirstDate(date, interval, startTime, endTime, disabledTimes, randomSlotsToDelete));
    
    const startingDay = new Date(date);
    for (let i = 1; i < nbDays; i += 1) {
      startingDay.setDate(startingDay.getDate() + 1);
      const slotsDate = new Date(startingDay);
      
      const startDate = setTime(slotsDate, startTime);
      const endDate = setTime(slotsDate, endTime);
      const slots = generateSlots(
        startDate,
        endDate,
        interval,
        randomSlotsToDelete,
        disabledTimes
      );
      
      const meetingsDay = {
        date: new Date(startingDay),
        slots,
        dayNameSpanish: getDayNameSpanish(slotsDate),
        dateSpanish: formatDateSpanish(slotsDate),
        dayOfWeek: slotsDate.getDay(),
        formattedDate: formatingDate(slotsDate)
      };
      days.push(meetingsDay);
    }
    return days;
  }
  
  // Comportamiento con configuración dinámica
  const horarios = parseHorarioLaboral(config.horarioLaboral);
  const intervalo = config.duracionCita || interval;
  
  // Verificar si el primer día está bloqueado
  if (!isDayBlocked(date, config)) {
    days.push(generateFirstDate(date, intervalo, horarios.start, horarios.end, disabledTimes, randomSlotsToDelete));
  }
  
  const startingDay = new Date(date);
  let daysGenerated = days.length;
  
  // Generar días hasta alcanzar el número solicitado
  while (daysGenerated < nbDays) {
    startingDay.setDate(startingDay.getDate() + 1);
    const slotsDate = new Date(startingDay);
    
    // Verificar si el día debe ser bloqueado
    if (isDayBlocked(slotsDate, config)) {
      continue;
    }
    
    const startDate = setTime(slotsDate, horarios.start);
    const endDate = setTime(slotsDate, horarios.end);
    const slots = generateSlots(
      startDate,
      endDate,
      intervalo,
      randomSlotsToDelete,
      disabledTimes
    );
    
    const meetingsDay = {
      date: new Date(startingDay),
      slots,
      dayNameSpanish: getDayNameSpanish(slotsDate),
      dateSpanish: formatDateSpanish(slotsDate),
      dayOfWeek: slotsDate.getDay(),
      formattedDate: formatingDate(slotsDate),
      isBlocked: false
    };
    days.push(meetingsDay);
    daysGenerated++;
  }
  
  return days;
}

/**
 * Genera slots simples para calendario basado en configuración
 * Similar a slotsGeneratorDynamic pero retorna formato del calendario original
 * @param {ScheduleConfig} config - Configuración de horarios
 * @param {number} daysAhead - Días hacia adelante a generar (default: 60)
 * @return {Date[]} Array de fechas disponibles
 */
function generateSlotsFromConfig(config, daysAhead = 60) {
  // Configuración por defecto
  const defaultConfig = {
    diasActivos: 'lunes-viernes',
    horarioLaboral: '08:00-18:00',
    duracionCita: 30,
    diasBloqueados: []
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  const horarios = parseHorarioLaboral(finalConfig.horarioLaboral);
  const slots = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generar slots para los próximos N días
  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    
    // Verificar si el día está bloqueado
    if (isDayBlocked(currentDate, finalConfig)) {
      continue;
    }
    
    // Generar slots de tiempo para este día
    const startTime = new Date(currentDate);
    startTime.setHours(horarios.start.hours, horarios.start.minutes, 0, 0);
    
    const endTime = new Date(currentDate);
    endTime.setHours(horarios.end.hours, horarios.end.minutes, 0, 0);
    
    let currentSlot = new Date(startTime);
    
    while (currentSlot <= endTime) {
      // Solo agregar slots futuros
      if (currentSlot > new Date()) {
        slots.push(new Date(currentSlot));
      }
      
      // Avanzar según duración de cita
      currentSlot = new Date(currentSlot.getTime() + finalConfig.duracionCita * 60000);
    }
  }
  
  return slots;
}

/**
 * Obtiene información de bloqueo para un día específico
 * @param {Date} date - Fecha a verificar
 * @param {ScheduleConfig} config - Configuración de horarios
 * @return {{isBlocked: boolean, motivo: string}} Info de bloqueo
 */
function getBlockInfo(date, config) {
  const fechaString = formatingDate(date);
  
  if (!config.diasBloqueados || !Array.isArray(config.diasBloqueados)) {
    return { isBlocked: false, motivo: '' };
  }
  
  const bloqueo = config.diasBloqueados.find(b => b.fecha === fechaString);
  
  return {
    isBlocked: !!bloqueo,
    motivo: bloqueo?.motivo || ''
  };
}

/**
 * Verifica si una hora está bloqueada
 * @param {Date} slotDate - Fecha/hora del slot a verificar
 * @param {Array} horasBloqueadas - Array de horas bloqueadas
 * @return {boolean} true si está bloqueado
 */
function isTimeBlocked(slotDate, horasBloqueadas) {
  if (!horasBloqueadas || !Array.isArray(horasBloqueadas) || horasBloqueadas.length === 0) {
    return false;
  }

  const slotDay = DAYS_SPANISH[slotDate.getDay()].substring(0, 3).toLowerCase();
  const slotHour = slotDate.getHours();
  const slotMinute = slotDate.getMinutes();
  const slotTimeInMinutes = slotHour * 60 + slotMinute;

  return horasBloqueadas.some(bloqueo => {
    // Verificar si aplica para este día
    if (!bloqueo.dias || !bloqueo.dias.includes(slotDay)) {
      return false;
    }

    // Parsear horas de bloqueo
    const [inicioH, inicioM] = bloqueo.horaInicio.split(':').map(Number);
    const [finH, finM] = bloqueo.horaFin.split(':').map(Number);
    
    const inicioEnMinutos = inicioH * 60 + inicioM;
    const finEnMinutos = finH * 60 + finM;

    // Verificar si el slot está dentro del rango bloqueado
    return slotTimeInMinutes >= inicioEnMinutos && slotTimeInMinutes < finEnMinutos;
  });
}

/**
 * Obtiene el horario especial aplicable para una fecha
 * @param {Date} date - Fecha a verificar
 * @param {Array} horariosEspeciales - Array de horarios especiales
 * @return {Object|null} Horario especial o null
 */
function getSpecialSchedule(date, horariosEspeciales) {
  if (!horariosEspeciales || !Array.isArray(horariosEspeciales) || horariosEspeciales.length === 0) {
    return null;
  }

  const fechaString = formatingDate(date);
  
  return horariosEspeciales.find(especial => {
    return fechaString >= especial.fechaInicio && fechaString <= especial.fechaFin;
  });
}

/**
 * Genera slots con soporte para horas bloqueadas y horarios especiales
 * @param {ScheduleConfig} config - Configuración de horarios
 * @param {number} daysAhead - Días hacia adelante a generar (default: 60)
 * @return {Date[]} Array de fechas disponibles
 */
function generateAdvancedSlots(config, daysAhead = 60) {
  const defaultConfig = {
    diasActivos: 'lunes-viernes',
    horarioLaboral: '08:00-18:00',
    duracionCita: 30,
    diasBloqueados: [],
    horasBloqueadas: [],
    horariosEspeciales: []
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  const slots = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Generar slots para los próximos N días
  for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);
    
    // Verificar si el día está bloqueado
    if (isDayBlocked(currentDate, finalConfig)) {
      continue;
    }
    
    // Verificar si hay horario especial para este día
    const horarioEspecial = getSpecialSchedule(currentDate, finalConfig.horariosEspeciales);
    
    let horarios;
    let diasActivos;
    
    if (horarioEspecial) {
      // Usar horario especial
      horarios = parseHorarioLaboral(horarioEspecial.horario);
      diasActivos = horarioEspecial.dias;
      
      // Verificar si el día actual está activo según el horario especial
      const dayOfWeek = currentDate.getDay();
      if (diasActivos === 'lunes-viernes' && (dayOfWeek === 0 || dayOfWeek === 6)) {
        continue;
      }
      if (diasActivos === 'lunes-sabado' && dayOfWeek === 0) {
        continue;
      }
      // Si es 'todos', no hacer nada
    } else {
      // Usar horario normal
      horarios = parseHorarioLaboral(finalConfig.horarioLaboral);
    }
    
    // Generar slots de tiempo para este día
    const startTime = new Date(currentDate);
    startTime.setHours(horarios.start.hours, horarios.start.minutes, 0, 0);
    
    const endTime = new Date(currentDate);
    endTime.setHours(horarios.end.hours, horarios.end.minutes, 0, 0);
    
    let currentSlot = new Date(startTime);
    
    while (currentSlot <= endTime) {
      // Solo agregar slots futuros
      if (currentSlot > new Date()) {
        // Verificar si está en hora bloqueada
        if (!isTimeBlocked(currentSlot, finalConfig.horasBloqueadas)) {
          slots.push(new Date(currentSlot));
        }
      }
      
      // Avanzar según duración de cita
      currentSlot = new Date(currentSlot.getTime() + finalConfig.duracionCita * 60000);
    }
  }
  
  return slots;
}

// Exportar funciones adicionales para uso en componentes
export {
  getDayNameSpanish,
  getMonthNameSpanish,
  formatDateSpanish,
  formatingDate,
  isDayBlocked,
  parseHorarioLaboral,
  generateSlotsFromConfig,
  generateAdvancedSlots,
  isTimeBlocked,
  getSpecialSchedule,
  getBlockInfo,
  DAYS_SPANISH,
  MONTHS_SPANISH
};

export default generateDays;