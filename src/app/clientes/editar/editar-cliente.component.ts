import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
    // 👆 ESTO es lo que hace que [formGroup] deje de dar error
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  id!: number;
  form: any; // el form vive aquí

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // inicializamos el form CUANDO fb ya existe
    this.form = this.fb.group({
      dni: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: [''],
      telefono: ['']
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.clienteService.obtenerPorId(this.id).subscribe({
      next: (c) => {
        this.form.patchValue({
          dni: c.dni,
          nombres: c.nombres,
          apellidos: c.apellidos,
          email: c.email,
          telefono: c.telefono
        });
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.clienteService.actualizar(this.id, this.form.value).subscribe({
      next: () => this.router.navigate(['/clientes'])
    });
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}
