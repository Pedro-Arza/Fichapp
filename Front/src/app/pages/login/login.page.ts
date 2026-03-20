import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SwalService } from '../../core/services/swal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen min-h-dvh bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">

      <!-- BG glows -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-0 w-56 h-56 bg-teal/8 rounded-full blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-sm animate-fade-up">

        <!-- Logo -->
        <div class="text-center mb-10">
          <h1 class="font-display text-3xl font-bold text-ink">FichApp</h1>
          <p class="text-ink-dim text-sm mt-2">Tu control de presencia digital</p>
        </div>

        <!-- Expired warning -->
        @if (expired) {
          <div class="mb-5 flex items-center gap-3 p-4 bg-warning/10 border border-warning/30 rounded-2xl text-warning text-sm animate-fade-in">
            <span>⚠️</span>
            <span>Tu sesión expiró. Vuelve a entrar.</span>
          </div>
        }

        <!-- Form card -->
        <div class="card p-7" style="box-shadow: 0 20px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(108,99,255,.1)">

          <div class="mb-5">
            <label class="inp-label">Correo electrónico</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">✉️</span>
              <input type="email" [(ngModel)]="email" name="email"
                     placeholder="tu@empresa.com"
                     class="inp pl-11" autocomplete="email" inputmode="email">
            </div>
          </div>

          <div class="mb-7">
            <label class="inp-label">Contraseña</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">🔒</span>
              <input [type]="showPass() ? 'text' : 'password'"
                     [(ngModel)]="password" name="password"
                     placeholder="••••••••"
                     class="inp pl-11 pr-12" autocomplete="current-password">
              <button type="button" (click)="showPass.set(!showPass())"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted text-lg">
                {{showPass() ? '🙈' : '👁️'}}
              </button>
            </div>
          </div>

          <button (click)="onLogin()" [disabled]="loading()"
                  class="btn-primary">
            @if (loading()) {
              <span class="spinner w-5 h-5"></span>
              <span>Verificando...</span>
            } @else {
              <span>Entrar</span>
              <span class="text-xl">→</span>
            }
          </button>
        </div>

        <p class="text-center text-ink-muted text-xs mt-8">
          FichApp v1.0 · Sesión segura con JWT
        </p>
      </div>
    </div>
  `
})
export class LoginPage implements OnInit {
  email = ''; password = '';
  loading = signal(false); showPass = signal(false);
  expired = false;

  constructor(
    private auth: AuthService, private swal: SwalService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => this.expired = !!p['expired']);
  }

  onLogin() {
    if (!this.email || !this.password) { this.swal.error('Campos requeridos', 'Introduce tu email y contraseña.'); return; }
    this.loading.set(true);
    this.auth.login(this.email, this.password).subscribe({
      next: () => { this.loading.set(false); this.router.navigate(['/home']); },
      error: err => { this.loading.set(false); this.swal.error('Acceso denegado', err.error?.error || 'Credenciales incorrectas.'); }
    });
  }
}