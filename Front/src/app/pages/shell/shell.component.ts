import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <!-- Page content -->
      <div class="flex-1 overflow-y-auto pb-24">
        <router-outlet />
      </div>

      <!-- Bottom nav -->
      <nav class="bottom-nav">
        <div class="flex items-center">
          <a routerLink="/home" routerLinkActive="active" class="nav-btn">
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Inicio</span>
          </a>
          <a routerLink="/historial" routerLinkActive="active" class="nav-btn">
            <span class="nav-icon">📋</span>
            <span class="nav-label">Historial</span>
          </a>
          <a routerLink="/ausencias" routerLinkActive="active" class="nav-btn">
            <span class="nav-icon">📅</span>
            <span class="nav-label">Ausencias</span>
          </a>
          <a routerLink="/perfil" routerLinkActive="active" class="nav-btn">
            <span class="nav-icon">👤</span>
            <span class="nav-label">Perfil</span>
          </a>
        </div>
      </nav>
    </div>
  `
})
export class ShellComponent {}