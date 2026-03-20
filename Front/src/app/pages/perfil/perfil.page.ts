import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { SwalService } from '../../core/services/swal.service';
import { Empleado } from '../../core/models';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div>
      <div class="page-top">
        <h1 class="font-display text-xl font-bold text-ink">Mi Perfil</h1>
      </div>

      <div class="px-5 pt-6">

        @if (loading()) {
          <div class="flex items-center justify-center py-16">
            <div class="spinner-brand w-8 h-8"></div>
          </div>
        } @else {

          <!-- Avatar + nombre -->
          <div class="flex flex-col items-center mb-8 animate-bounce-in">
            <div class="relative mb-4">
              @if (perfil()?.foto_url) {
                <img [src]="perfil()!.foto_url" alt="Foto de perfil"
                     class="w-24 h-24 rounded-full object-cover border-2 border-brand/30 shadow-glow-sm">
              } @else {
                <div class="avatar-xl">{{getInitials()}}</div>
              }
              <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-teal rounded-full border-2 border-surface flex items-center justify-center">
                <span class="text-xs">✓</span>
              </div>
            </div>
            <h2 class="font-display text-2xl font-bold text-ink">{{perfil()?.nombre_completo}}</h2>
            <p class="text-ink-dim text-sm mt-1">{{perfil()?.rol || 'Empleado'}}</p>
            <span class="pill pill-activo mt-2">{{perfil()?.estado || 'activo'}}</span>
          </div>

          <!-- Info cards -->
          <div class="space-y-3 animate-fade-up">

            <div class="card p-5">
              <h3 class="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-4">Información personal</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <span class="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center text-base flex-shrink-0">✉️</span>
                  <div>
                    <div class="text-[0.68rem] text-ink-muted">Email</div>
                    <div class="text-sm font-medium text-ink">{{perfil()?.email}}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="w-9 h-9 rounded-xl bg-teal/15 flex items-center justify-center text-base flex-shrink-0">📅</span>
                  <div>
                    <div class="text-[0.68rem] text-ink-muted">Fecha de ingreso</div>
                    <div class="text-sm font-medium text-ink">{{perfil()?.fecha_ingreso | date:'dd/MM/yyyy'}}</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="w-9 h-9 rounded-xl bg-warning/15 flex items-center justify-center text-base flex-shrink-0">🏢</span>
                  <div>
                    <div class="text-[0.68rem] text-ink-muted">Departamento</div>
                    <div class="text-sm font-medium text-ink">{{perfil()?.Departamento?.nombre || 'No asignado'}}</div>
                  </div>
                </div>
                @if (perfil()?.Turno) {
                  <div class="flex items-center gap-3">
                    <span class="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center text-base flex-shrink-0">🕐</span>
                    <div>
                      <div class="text-[0.68rem] text-ink-muted">Turno</div>
                      <div class="text-sm font-medium text-ink">
                        {{perfil()!.Turno!.nombre}} · {{perfil()!.Turno!.hora_inicio}} – {{perfil()!.Turno!.hora_fin}}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Session info -->
            <div class="card p-5">
              <h3 class="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-4">Sesión activa</h3>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-ink-dim">Token JWT</span>
                <span [class]="tokenExpira() < 30 ? 'text-warning' : 'text-teal'"
                      class="text-sm font-bold font-display">{{tiempoSesion()}}</span>
              </div>
              <div class="h-2 bg-surface-border rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-500"
                     [class]="tokenExpira() < 30 ? 'bg-warning' : 'bg-teal'"
                     [style.width]="tokenPct() + '%'"></div>
              </div>
              <p class="text-ink-muted text-xs mt-2">La sesión es válida 8 horas desde el inicio de sesión</p>
            </div>

            <!-- Logout -->
            <button class="btn-danger w-full" (click)="logout()">
              <span>⎋</span> Cerrar sesión
            </button>

          </div>
        }
      </div>
      <div class="h-8"></div>
    </div>
  `
})
export class PerfilPage implements OnInit {
  loading = signal(true);
  perfil  = signal<Empleado | null>(null);
  private readonly TOKEN_DURATION = 8 * 60 * 60 * 1000;

  constructor(private auth: AuthService, private api: ApiService, private swal: SwalService) {}

  ngOnInit() {
    const id = this.auth.currentUser()?.id;
    if (!id) return;
    this.api.getMiPerfil(id).subscribe({
      next: p => { this.perfil.set(p); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  tokenExpira(): number {
    return Math.floor(this.auth.getTokenExpiresIn() / 60000);
  }

  tiempoSesion(): string {
    const mins = this.tokenExpira();
    if (mins <= 0) return 'Expirada';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m.toString().padStart(2,'0')}m` : `${m}m`;
  }

  tokenPct(): number {
    const rem = this.auth.getTokenExpiresIn();
    return Math.max(0, Math.min(100, (rem / this.TOKEN_DURATION) * 100));
  }

  getInitials(): string { return this.auth.getInitials(this.perfil()?.nombre_completo || ''); }

  async logout() {
    const r = await this.swal.confirm('¿Cerrar sesión?', 'Tendrás que volver a introducir tus credenciales.', 'Sí, salir');
    if (r.isConfirmed) this.auth.logout();
  }
}