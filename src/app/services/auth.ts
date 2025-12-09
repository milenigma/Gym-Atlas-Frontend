import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

// Ajusta estos campos según lo que devuelva tu backend
export interface UsuarioSistema {
  idUsuario: number;
  username: string;
  nombres: string;
  apellidos: string;
  rol: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Ajusta esta URL a tu backend real
  private baseUrl = 'http://localhost:8081/api/usuarios';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<UsuarioSistema> {
    return this.http.post<UsuarioSistema>(`${this.baseUrl}/login`, credentials);
  }

  guardarUsuario(usuario: UsuarioSistema): void {
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  }

  obtenerUsuario(): UsuarioSistema | null {
    const data = localStorage.getItem('usuarioLogueado');
    return data ? JSON.parse(data) : null;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
  }
}

