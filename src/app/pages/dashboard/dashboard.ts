import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UsuarioSistema } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  usuario: UsuarioSistema | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();

    // Si no hay usuario logueado, lo mandamos al login
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

  irAClientes(): void {
    this.router.navigate(['/clientes']);
  }

  irAPlanes(): void {
    this.router.navigate(['/planes']);
  }

  irAMembresias(): void {
    this.router.navigate(['/membresias']);
  }

  irAIngresos(): void {
    this.router.navigate(['/ingresos']);
  }

  irAPagos(): void {
    this.router.navigate(['/pagos']);
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}

