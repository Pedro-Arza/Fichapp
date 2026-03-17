import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { PerfilUser } from './pages/perfil-user/perfil-user';
import { Error404Component } from './pages/error404/error404';
import { PersonalComponent } from './pages/personal/personal';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',       component: Landing, pathMatch: 'full' },
  { path: 'login',  component: Login },
  { path: 'home',   component: Home,      canActivate: [authGuard] },
  { path: 'perfil', component: PerfilUser, canActivate: [authGuard] },
  { path: 'personal', component: PersonalComponent, canActivate: [authGuard] },
  { path: 'error404', component: Error404Component },
  { path: '**',     component: Error404Component }
];
