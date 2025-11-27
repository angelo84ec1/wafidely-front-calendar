export interface Pais {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Nacionalidad {
  Nacionalidad: string;
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CargaCivil {  
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}


export interface TipoSangre {
  Tipo_de_sangre: string;
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TipoProyecto {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TipoServicio {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Ocupacion {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Profesion {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface DeclaracionJurada {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Banco {
  tipo: string;
  createdAt: string;
  id: string;
  Nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
  pais: Pais;
}

export interface TipoCuenta {
  createdAt: string;
  id: string;
  Tipo: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Corregimiento {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Provincia {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}



export interface Departamento {
  createdAt: string;
  id: string;
  Nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}


export interface Canton {
  Canton: string;
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Ciudad {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Parentesco {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TipoSolicitud {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TituloCaso {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface PrioridadPeticion {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface EncuentaSolicitud {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CompromisoContratacion {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface Role {
  description: string;
  id: string;
  name: string;
  nb_users: number;
  type: string;
  __v: number;
  _id: string;
}

export interface Cargo {
  createdAt: string;
  id: string;
  nombre: string;
  published_at: string;
  updatedAt: string;
  __v: number;
  _id: string;
}