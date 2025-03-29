import { Routes } from '@angular/router';
import { ClientesListaComponent } from './clientes/pages/clientes-lista/clientes-lista.component';

export const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesListaComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clientes'
  }
];
