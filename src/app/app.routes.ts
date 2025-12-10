import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ClientesComponent } from './pages/clientes/clientes/clientes'; 


export const routes: Routes = [
  { path: '', component: LoginComponent },
   { path: 'dashboard', component: DashboardComponent },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./pages/clientes/clientes/clientes')
        .then(c => c.ClientesComponent)
  },
  { path: '**', redirectTo: '' }
];
