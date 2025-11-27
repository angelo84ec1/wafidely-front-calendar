/**
 * Utilidades para manejo de fechas en zona horaria de Ecuador (GMT-5)
 * 
 * Problema: JavaScript convierte automáticamente fechas a UTC, causando que:
 * - 21:09 PM del 5 de noviembre (Ecuador) → 02:09 AM del 6 de noviembre (UTC)
 * 
 * Solución: Estas funciones mantienen las fechas en hora de Ecuador
 */

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD en zona horaria de Ecuador
 * @returns {string} Fecha en formato YYYY-MM-DD
 * @example
 * // Si son las 21:09 PM del 5 de noviembre en Ecuador
 * getEcuadorDateString() // → "2025-11-05" (correcto)
 * // En lugar de "2025-11-06" (incorrecto con toISOString)
 */
export const getEcuadorDateString = (): string => {
    const now = new Date()
    
    // Obtener componentes de fecha en zona horaria de Ecuador (America/Guayaquil)
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Guayaquil',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    
    // Retorna directamente en formato YYYY-MM-DD
    return formatter.format(now)
  }
  
  /**
   * Obtiene un objeto Date ajustado a la zona horaria de Ecuador
   * @returns {Date} Objeto Date en hora de Ecuador
   */
  export const getEcuadorDate = (): Date => {
    const dateStr = getEcuadorDateString()
    const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10))
    return new Date(year, month - 1, day)
  }
  
  /**
   * Convierte un objeto Date a string YYYY-MM-DD manteniendo la fecha local
   * @param {Date} date - Fecha a convertir
   * @returns {string} Fecha en formato YYYY-MM-DD
   */
  export const dateToLocalString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  /**
   * Calcula la fecha de fin basada en el tipo de tarjeta
   * Mantiene la zona horaria de Ecuador
   * @param {Date} fechaInicio - Fecha de inicio
   * @param {string} tipoTarjeta - Tipo de tarjeta (demo/free, mensual, anual)
   * @returns {Date} Fecha de fin
   */
  export const calculateFechaFinEcuador = (fechaInicio: Date, tipoTarjeta: string): Date => {
    const fechaFin = new Date(fechaInicio)
    
    switch (tipoTarjeta) {
      case 'demo':
      case 'free':
        // Plan WAFree (demo): 5 días
        fechaFin.setDate(fechaFin.getDate() + 5)
        break
      case 'mensual':
        // Plan mensual: 30 días exactos
        fechaFin.setDate(fechaFin.getDate() + 30)
        break
      case 'anual':
        // Plan anual: 365 días exactos
        fechaFin.setDate(fechaFin.getDate() + 365)
        break
      default:
        // Por defecto: 5 días (plan demo)
        fechaFin.setDate(fechaFin.getDate() + 5)
    }
    
    return fechaFin
  }
  
  /**
   * Calcula días restantes entre hoy y una fecha fin
   * Usa zona horaria de Ecuador para cálculos precisos
   * @param {string} fechaFinString - Fecha de fin en formato YYYY-MM-DD
   * @returns {number} Días restantes
   */
  export const calcularDiasRestantes = (fechaFinString: string): number => {
    if (!fechaFinString) return 0
    
    // Fecha actual en Ecuador
    const hoy = getEcuadorDate()
    hoy.setHours(0, 0, 0, 0)
    
    // Parsear fecha_fin sin zona horaria
    const [year, month, day] = fechaFinString.split('-').map(num => parseInt(num, 10))
    const fechaFin = new Date(year, month - 1, day)
    fechaFin.setHours(0, 0, 0, 0)
    
    const diffTime = fechaFin.getTime() - hoy.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  }
  
  /**
   * Formatea una fecha YYYY-MM-DD a texto legible en español
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {string} Fecha formateada (ej: "5 de noviembre de 2025")
   */
  export const formatDateES = (dateString: string): string => {
    if (!dateString) return 'No disponible'
    
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10))
    const date = new Date(year, month - 1, day)
    
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  /**
   * Ejemplo de uso completo:
   * 
   * // Al crear un nuevo plan
   * import { getEcuadorDateString, calculateFechaFinEcuador, dateToLocalString } from '~/utils/ecuadorDates'
   * 
   * const fechaCompra = getEcuadorDateString() // "2025-11-05" (correcto)
   * const fechaInicio = new Date(fechaCompra)
   * const fechaFin = calculateFechaFinEcuador(fechaInicio, 'demo')
   * 
   * const paymentObject = {
   *   fecha_compra: fechaCompra,
   *   fecha_fin: dateToLocalString(fechaFin)
   * }
   */