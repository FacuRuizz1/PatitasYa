import { Usuario } from "./Usuario";

export interface LoginRequest {
    email: string,
    password: string;
}

export interface LoginResponse {
    token: string;
    nombre: string;
    rol: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: Usuario | null;
}