import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../services/cliente.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  cargando = false;
  error?: string;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.error = undefined;

    this.clienteService.listar().subscribe({
      next: data => {
        this.clientes = data;
        this.cargando = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No se pudo cargar la lista de clientes';
        this.cargando = false;
      }
    });
  }
}
