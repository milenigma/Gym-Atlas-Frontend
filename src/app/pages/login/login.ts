import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    this.error = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (usuario) => {
        this.router.navigate(['/dashboard']); // REDIRECCIÓN CORRECTA
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    });
  }
}
