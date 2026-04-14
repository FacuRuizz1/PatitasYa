import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/Auth';
import { Observable, tap } from 'rxjs';
import { Usuario, UsuarioRequest } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';


  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest) : Observable<LoginResponse> {
    localStorage.removeItem('token');
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
    .pipe(
      tap(response => {
        if(response.token){
          localStorage.setItem(this.tokenKey, response.token)
        }
      })
    );
  }

  register(usuario: UsuarioRequest) : Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario/crear`, usuario);
  }

   logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

   getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    // Decodificar token para verificar expiración
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirado = payload.exp * 1000 < Date.now();
      return !expirado;
    } catch {
      return false;
    }
  }

  // Obtener el email del usuario desde el token
  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return null;
    }
  }
  
   // Obtener el rol del usuario desde el token
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // El rol puede venir como "rol", "ROLE" o en authorities
      return payload.rol || payload.ROLE || null;
    } catch {
      return null;
    }
  }

   // Verificar si es admin
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN' || role === 'ROLE_ADMIN';
  }

  // Obtener nombre del usuario (podés setearlo al login)
  private userNameKey = 'userName';
  
  setUserName(name: string): void {
    localStorage.setItem(this.userNameKey, name);
  }
  
  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
  }
}
