export interface DatosPersonales {
  id?: string;
  _id?: string;
  foto?: {
    url: string;
  } | null;
  nombres?: string;
  apellidos?: string;
  compania?: string;
  cedula_ruc?: string;
  cedula?: string;
  pasaporte?: string;
  nacionalidad?: string;
  estado_civil?: string;
  celular?: string;
  telefono_convencional?: string;
  correo?: string;
  pais?: string;
  ciudad?: string;
  provincia?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  tipo_persona?: string;
  direccion?: string;
  plan?: string;
  status?: boolean;
  paymentType?: string;
}

export interface ConfiguracionPago {
  id?: string;
  _id?: string;
  producto?: string;
  fecha_compra?: string;
  pais?: string;
  descuento?: string;
  total?: string;
  estado?: string;
  respapi1?: string;
  respapi2?: string;
  fecha_fin?: string;
  tipo_tarjeta?: string;
  poliza?: string;
  certificado?: string;
  modelo?: string;
  anio?: string;
  color?: string;
  placa?: string;
  motor?: string;
  chasis?: string;
  marca?: string;
  birthDate?: string;
  fecha_nacimiento?: string;
  user?: User;
}

export interface Establecimiento {
  id?: string;
  _id?: string;
  nombre?: string;
  ruc?: string;
  telefono?: string;
  correo?: string;
  fechainicio?: string;
  fechafin?: string;
  logo?: {
    url: string;
  }[];
  banner?: {
    url: string;
  } | null;
  galeria1?: any[];
  galeria2?: any[];
  galeria3?: any[];
  galeria4?: any[];
  galeria5?: any[];
  activateLanding?: string;
  categoria?: string;
  descripcion?: string;
  numerocontacto?: string;
  whatsapp?: string;
  formulario?: string;
  servicios?: string;
  googlemaps?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  googleCalendarSyncEnabled?: boolean;
  titulodescripcion1?: string;
  titulodescripcion2?: string;
  titulodescripcion3?: string;
  titulodescripcion4?: string;
  titulodescripcion5?: string;
  titulodescripcion6?: string;
  titulodescripcion7?: string;
  titulodescripcion8?: string;
  titulodescripcion9?: string;
  titulodescripcion10?: string;
  detalledescripcion1?: string;
  detalledescripcion2?: string;
  detalledescripcion3?: string;
  detalledescripcion4?: string;
  detalledescripcion5?: string;
  detalledescripcion6?: string;
  detalledescripcion7?: string;
  detalledescripcion8?: string;
  detalledescripcion9?: string;
  detalledescripcion10?: string;
}

// Alias para mantener compatibilidad
export interface EstableCimientos extends Establecimiento {}

export interface Role {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
  type?: string;
  __v?: number;
}

export interface User {
  id?: string;
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  estado?: string;
  cargo?: string | null;
  role?: Role;
  
  // ✅ CORREGIDO: configuracion_pago es un ARRAY
  configuracion_pago?: ConfiguracionPago[] | null;
  
  // ✅ AGREGADO: datos_personales puede ser opcional
  datos_personales?: DatosPersonales | null;
  
  // ✅ AGREGADO: establecimiento (singular) - relación directa
  establecimiento?: Establecimiento | null;
  
  // ✅ AGREGADO: establecimientos (plural) - array de establecimientos
  establecimientos?: Establecimiento[] | null;
  
  // Campos adicionales que pueden venir del backend
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}