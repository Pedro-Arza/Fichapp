import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  {
    path: '',
    loadComponent: () => import('./pages/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: 'home',      loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
      { path: 'historial', loadComponent: () => import('./pages/historial/historial.page').then(m => m.HistorialPage) },
      { path: 'ausencias', loadComponent: () => import('./pages/ausencias/ausencias.page').then(m => m.AusenciasPage) },
      { path: 'perfil',    loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage) },
    ]
  },
  { path: '**', redirectTo: 'home' }
];