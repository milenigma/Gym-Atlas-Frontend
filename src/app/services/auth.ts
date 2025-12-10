import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface UsuarioSistema {
  idUsuario?: number;
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

  private apiUrl = 'http://localhost:8081/api/usuarios/login';
  private usuarioKey = 'usuarioActual';

  constructor(private http: HttpClient) {}

  // LOGIN al backend
  login(username: string, password: string): Observable<UsuarioSistema> {
    return this.http.post<UsuarioSistema>(this.apiUrl, { username, password }).pipe(
      tap(usuario => {
        if (usuario) {
          localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
        }
      })
    );
  }

  // OBTENER USUARIO LOGUEADO
  obtenerUsuario(): UsuarioSistema | null {
    const data = localStorage.getItem(this.usuarioKey);
    return data ? JSON.parse(data) : null;
  }

  // VALIDAR SI HAY SESIÓN
  estaAutenticado(): boolean {
    return !!localStorage.getItem(this.usuarioKey);
  }

  // CERRAR SESIÓN
  cerrarSesion(): void {
    localStorage.removeItem(this.usuarioKey);
  }
}

