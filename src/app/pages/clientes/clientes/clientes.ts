import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente, ClienteService } from '../../../services/cliente';


@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css'],
  imports: [CommonModule, FormsModule]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteActual: Cliente = this.nuevoCliente();

  mostrarModal = false;
  mostrarModalEliminar = false;
  modoEdicion = false;
  clienteAEliminar: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  nuevoCliente(): Cliente {
    return {
      dni: '',
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      fechaNacimiento: null,
      direccion: null,
      contactoEmergencia: null,
      notasMedicas: null,
      fotoUrl: null
    };
  }

  cargarClientes() {
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  abrirNuevoCliente() {
    this.modoEdicion = false;
    this.clienteActual = this.nuevoCliente();
    this.mostrarModal = true;
  }

  abrirEditar(cliente: Cliente) {
    this.modoEdicion = true;
    this.clienteActual = { ...cliente };
    this.mostrarModal = true;
  }

  guardarCliente() {
    const operacion = this.modoEdicion
      ? this.clienteService.actualizar(this.clienteActual)
      : this.clienteService.registrar(this.clienteActual);

    operacion.subscribe(() => {
      this.cargarClientes();
      this.cerrarModal();
    });
  }

  abrirEliminar(c: Cliente) {
    this.clienteAEliminar = c;
    this.mostrarModalEliminar = true;
  }

  eliminarCliente() {
    if (!this.clienteAEliminar?.idCliente) return;

    this.clienteService.eliminar(this.clienteAEliminar.idCliente).subscribe(() => {
      this.cargarClientes();
      this.cerrarModalEliminar();
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
  }
}
