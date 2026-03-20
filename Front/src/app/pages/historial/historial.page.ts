import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Fichaje } from '../../core/models';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  template: `
    <div>
      <!-- Top bar -->
      <div class="page-top">
        <h1 class="font-display text-xl font-bold text-ink">Mis Fichajes</h1>
        <p class="text-ink-muted text-xs mt-0.5">Historial de presencia</p>
      </div>

      <div class="px-5 pt-5">

        <!-- Date filter -->
        <div class="card p-4 mb-5">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="inp-label">Desde</label>
              <input type="date" class="inp" [(ngModel)]="desde" (change)="cargar()">
            </div>
            <div>
              <label class="inp-label">Hasta</label>
              <input type="date" class="inp" [(ngModel)]="hasta" (change)="cargar()">
            </div>
          </div>
        </div>

        @if (loading()) {
          <div class="flex items-center justify-center py-16">
            <div class="spinner-brand w-8 h-8"></div>
          </div>
        } @else if (grouped().length === 0) {
          <div class="text-center py-16">
            <span class="text-5xl block mb-3 opacity-25">📋</span>
            <p class="text-ink-dim font-medium">Sin fichajes en este período</p>
            <p class="text-ink-muted text-sm mt-1">Cambia el rango de fechas</p>
          </div>
        } @else {
          <div class="space-y-4 animate-fade-up">
            @for (dia of grouped(); track dia.fecha) {
              <div class="card overflow-hidden">
                <!-- Day header -->
                <div class="flex items-center justify-between px-5 py-3 border-b border-surface-border bg-surface-raised/50">
                  <span class="font-display font-bold text-sm text-ink capitalize">
                    {{dia.fecha | date:"EEEE d 'de' MMMM":undefined:'es'}}
                  </span>
                  <span class="text-xs text-ink-muted">{{dia.fichajes.length}} registros</span>
                </div>
                <!-- Fichajes del día -->
                <div class="px-5">
                  @for (f of dia.fichajes; track f.id; let last = $last) {
                    <div class="fichaje-item" [class.border-b-0]="last">
                      <div [class]="'fichaje-dot ' + dotClass(f.tipo)">{{tipoIcon(f.tipo)}}</div>
                      <div class="flex-1 min-w-0">
                        <div class="font-medium text-ink text-sm">{{tipoLabel(f.tipo)}}</div>
                        @if (f.ubicacion) {
                          <div class="text-xs text-ink-muted truncate">📍 {{f.ubicacion}}</div>
                        }
                      </div>
                      <div class="font-display font-bold text-ink text-base">
                        {{f.fecha_hora | date:'HH:mm'}}
                      </div>
                    </div>
                  }
                </div>
                <!-- Resumen del día -->
                @if (dia.duracion) {
                  <div class="px-5 py-3 border-t border-surface-border flex items-center justify-between bg-surface-raised/30">
                    <span class="text-xs text-ink-muted">⏱ Tiempo registrado</span>
                    <span class="font-display font-bold text-teal text-sm">{{dia.duracion}}</span>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
      <div class="h-6"></div>
    </div>
  `
})
export class HistorialPage implements OnInit {
  loading = signal(true);
  fichajes = signal<Fichaje[]>([]);
  grouped = signal<{fecha: Date, fichajes: Fichaje[], duracion: string}[]>([]);
  desde = '';
  hasta = '';

  constructor(private api: ApiService, private auth: AuthService) {
    const now = new Date();
    const primerDia = new Date(now.getFullYear(), now.getMonth(), 1);
    this.hasta = now.toISOString().split('T')[0];
    this.desde = primerDia.toISOString().split('T')[0];
  }

  ngOnInit() { this.cargar(); }

  cargar() {
    const id = this.auth.currentUser()?.id;
    if (!id) return;
    this.loading.set(true);
    this.api.getMisFichajesPorFechas(id, this.desde, this.hasta).subscribe({
      next: f => {
        this.fichajes.set(f);
        this.agrupar(f);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  private agrupar(fichajes: Fichaje[]) {
    const map = new Map<string, Fichaje[]>();
    for (const f of fichajes) {
      const key = f.fecha_hora.split('T')[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(f);
    }
    const result = [...map.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, list]) => {
        const sorted = [...list].sort((a, b) => a.fecha_hora.localeCompare(b.fecha_hora));
        const entrada = sorted.find(x => x.tipo === 'entrada');
        const salida  = sorted.find(x => x.tipo === 'salida');
        let duracion = '';
        if (entrada && salida) {
          const ms = new Date(salida.fecha_hora).getTime() - new Date(entrada.fecha_hora).getTime();
          const h = Math.floor(ms / 3600000);
          const m = Math.floor((ms % 3600000) / 60000);
          duracion = `${h}h ${m.toString().padStart(2,'0')}m`;
        }
        return { fecha: new Date(key + 'T12:00:00'), fichajes: sorted, duracion };
      });
    this.grouped.set(result);
  }

  tipoLabel(t: string): string {
    const m: Record<string,string> = { entrada:'Entrada', salida:'Salida', salida_comida:'Salida comida', vuelta_comida:'Vuelta comida', inicio_descanso:'Inicio descanso', fin_descanso:'Fin descanso' };
    return m[t] || t;
  }
  tipoIcon(t: string): string {
    const m: Record<string,string> = { entrada:'🟢', salida:'🔴', salida_comida:'🍽️', vuelta_comida:'🔄', inicio_descanso:'☕', fin_descanso:'💪' };
    return m[t] || '⚪';
  }
  dotClass(t: string): string {
    const m: Record<string,string> = { entrada:'bg-brand/15', salida:'bg-danger/15', salida_comida:'bg-warning/15', vuelta_comida:'bg-teal/15', inicio_descanso:'bg-warning/15', fin_descanso:'bg-brand/15' };
    return m[t] || 'bg-surface-raised';
  }
}