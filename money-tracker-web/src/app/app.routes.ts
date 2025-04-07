import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth-component/auth.component').then(
        (m) => m.AuthComponent
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./dashboard/components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./dashboard/components/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./dashboard/components/statistics/statistics.component').then(
            (m) => m.StatisticsComponent
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
