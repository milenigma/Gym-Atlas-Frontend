import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'clientes', loadComponent: () => import('./clientes/listar/listar-clientes.component').then(m => m.ListarClientesComponent) },
  { path: 'clientes/nuevo', loadComponent: () => import('./clientes/crear/crear-cliente.component').then(m => m.CrearClienteComponent) },
  { path: 'clientes/editar/:id', loadComponent: () => import('./clientes/editar/editar-cliente.component').then(m => m.EditarClienteComponent) },

  { path: '**', redirectTo: '' }
];
