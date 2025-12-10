import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ClientesComponent } from './pages/clientes/clientes/clientes'; 


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'clientes', component: ClientesComponent},
  { path: '**', redirectTo: '' }
];
