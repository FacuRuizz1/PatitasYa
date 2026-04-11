export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  rol: 'USER' | 'ADMIN';
  activo: boolean;
  createdAt?: Date;
}

export interface UsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  email: string;
}