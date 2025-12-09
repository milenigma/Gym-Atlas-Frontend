import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest, UsuarioSistema } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.mensajeError = '';
    this.cargando = true;

    const request: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: (usuario: UsuarioSistema) => {
        this.cargando = false;
        this.authService.guardarUsuario(usuario);
        alert(`Bienvenido ${usuario.nombres}`);

        // Cuando crees el dashboard, lo rediriges así:
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
