import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth-component/auth.component').then(
        (m) => m.AuthComponent
      ),
  },

  {
    path: '**',
    redirectTo: 'auth',
  }
];
