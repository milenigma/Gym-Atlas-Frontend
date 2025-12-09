import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: any[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService.listar().subscribe({
      next: (data) => this.clientes = data
    });
  }

  nuevo() {
    this.router.navigate(['/clientes/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/clientes/editar', id]);
  }

  eliminar(id: number) {
    this.clienteService.eliminar(id).subscribe({
      next: () => this.ngOnInit()
    });
  }
}
