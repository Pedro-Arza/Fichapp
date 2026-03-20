import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { SwalService } from '../../core/services/swal.service';
import { Fichaje } from '../../core/models';

type TipoFichaje = 'entrada' | 'salida_comida' | 'vuelta_comida' | 'inicio_descanso' | 'fin_descanso' | 'salida';

interface BtnConfig {
  tipo: TipoFichaje;
  label: string;
  sublabel: string;
  icon: string;
  cls: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="px-5 pt-6 pb-4">

      <!-- Header -->
      <div class="flex items-center justify-between mb-7">
        <div>
          <p class="text-ink-muted text-sm">{{greeting}}</p>
          <h1 class="font-display text-2xl font-bold text-ink mt-0.5">
            {{(user()?.nombre_completo || '').split(' ')[0]}} 👋
          </h1>
        </div>
        <div class="avatar-md text-base">{{getInitials()}}</div>
      </div>

      <!-- Live clock -->
      <div class="card p-5 mb-6 text-center animate-fade-up">
        <div class="font-display text-5xl font-bold text-ink tracking-tight">{{hora}}</div>
        <div class="text-ink-dim text-sm mt-2 capitalize">{{now | date:"EEEE, d 'de' MMMM":undefined:'es'}}</div>
      </div>

      <!-- Estado jornada -->
      @if (loading()) {
        <div class="flex items-center justify-center py-8">
          <div class="spinner-brand w-7 h-7"></div>
        </div>
      } @else {
        <!-- Botón principal de fichaje -->
        <div class="flex flex-col items-center mb-8 animate-bounce-in">
          @if (btnActual(); as btn) {
            <div class="relative">
              <!-- Ping ring -->
              <div [class]="'absolute inset-0 rounded-full animate-ping-slow opacity-20 ' +
                (btn.tipo === 'entrada' ? 'bg-brand' :
                 btn.tipo === 'salida'  ? 'bg-danger' : 'bg-warning')"></div>
              <button [class]="btn.cls" (click)="fichar(btn)" [disabled]="fichando()">
                @if (fichando()) {
                  <span class="spinner w-10 h-10"></span>
                } @else {
                  <span class="text-5xl leading-none">{{btn.icon}}</span>
                  <span class="text-lg font-display font-bold">{{btn.label}}</span>
                  <span class="text-sm opacity-75">{{btn.sublabel}}</span>
                }
              </button>
            </div>
            <p class="text-ink-muted text-xs mt-4 text-center max-w-48">
              Pulsa para registrar tu <strong class="text-ink-dim">{{btn.label.toLowerCase()}}</strong>
            </p>
          } @else {
            <!-- Jornada completada -->
            <div class="flex flex-col items-center gap-3">
              <div class="w-32 h-32 rounded-full bg-teal/15 border-2 border-teal/40 flex items-center justify-center animate-bounce-in">
                <span class="text-5xl">✅</span>
              </div>
              <p class="font-display font-bold text-teal text-lg">¡Jornada completada!</p>
              <p class="text-ink-muted text-sm">Buen trabajo, hasta mañana 😊</p>
            </div>
          }
        </div>

        <!-- Timeline del día -->
        <div class="card p-5 animate-fade-up" style="animation-delay:.1s">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-display font-bold text-base text-ink">Mis fichajes de hoy</h2>
            <span class="text-ink-muted text-xs">{{fichajesHoy().length}} registros</span>
          </div>

          @if (fichajesHoy().length === 0) {
            <div class="text-center py-6">
              <span class="text-3xl block mb-2 opacity-30">🖊️</span>
              <p class="text-ink-muted text-sm">Sin fichajes todavía</p>
            </div>
          } @else {
            <div>
              @for (f of fichajesHoy(); track f.id; let last = $last) {
                <div class="fichaje-item" [class.border-b-0]="last">
                  <div [class]="'fichaje-dot ' + dotClass(f.tipo)">{{tipoIcon(f.tipo)}}</div>
                  <div class="flex-1">
                    <div class="font-medium text-ink text-sm">{{tipoLabel(f.tipo)}}</div>
                    @if (f.ubicacion) {
                      <div class="text-xs text-ink-muted">📍 {{f.ubicacion}}</div>
                    }
                  </div>
                  <div class="text-right">
                    <div class="font-display font-bold text-ink text-sm">{{f.fecha_hora | date:'HH:mm'}}</div>
                    <div class="text-[0.65rem] text-ink-muted">{{f.fecha_hora | date:'dd/MM'}}</div>
                  </div>
                </div>
              }
            </div>

            <!-- Horas trabajadas -->
            @if (horasTrabajadas()) {
              <div class="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
                <span class="text-ink-muted text-xs">Tiempo en jornada</span>
                <span class="font-display font-bold text-teal text-sm">{{horasTrabajadas()}}</span>
              </div>
            }
          }
        </div>
      }
    </div>
  `
})
export class HomePage implements OnInit, OnDestroy {
  loading  = signal(true);
  fichando = signal(false);
  fichajesHoy = signal<Fichaje[]>([]);
  user = this.auth.currentUser;
  now = new Date();
  hora = '';
  greeting = '';
  private clockTimer: any;

  private readonly SECUENCIA: TipoFichaje[] = [
    'entrada', 'salida_comida', 'vuelta_comida', 'inicio_descanso', 'fin_descanso', 'salida'
  ];

  private readonly BTNS: Record<TipoFichaje, BtnConfig> = {
    entrada:          { tipo:'entrada',          label:'Entrada',          sublabel:'Comenzar jornada',   icon:'🟢', cls:'fichar-btn-entrada' },
    salida_comida:    { tipo:'salida_comida',    label:'Salida comida',    sublabel:'Pausa para comer',   icon:'🍽️',  cls:'fichar-btn-comida' },
    vuelta_comida:    { tipo:'vuelta_comida',    label:'Vuelta comida',    sublabel:'Retomar jornada',    icon:'🔄', cls:'fichar-btn-entrada' },
    inicio_descanso:  { tipo:'inicio_descanso',  label:'Inicio descanso',  sublabel:'Pausa breve',        icon:'☕', cls:'fichar-btn-descanso' },
    fin_descanso:     { tipo:'fin_descanso',     label:'Fin descanso',     sublabel:'Retomar trabajo',    icon:'💪', cls:'fichar-btn-entrada' },
    salida:           { tipo:'salida',           label:'Salida',           sublabel:'Fin de jornada',     icon:'🔴', cls:'fichar-btn-salida' },
  };

  btnActual = computed<BtnConfig | null>(() => {
    const fichajes = this.fichajesHoy();
    if (fichajes.length === 0) return this.BTNS['entrada'];
    const ultimo = fichajes[fichajes.length - 1].tipo;
    const idx = this.SECUENCIA.indexOf(ultimo);
    if (idx === -1 || idx === this.SECUENCIA.length - 1) return null;
    return this.BTNS[this.SECUENCIA[idx + 1]];
  });

  constructor(private api: ApiService, private auth: AuthService, private swal: SwalService) {
    this.updateClock();
    const h = new Date().getHours();
    this.greeting = h < 12 ? 'Buenos días' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
  }

  ngOnInit() {
    this.clockTimer = setInterval(() => { this.now = new Date(); this.updateClock(); }, 1000);
    this.loadFichajes();
  }

  ngOnDestroy() { clearInterval(this.clockTimer); }

  loadFichajes() {
    const id = this.user()?.id;
    if (!id) return;
    this.loading.set(true);
    this.api.getMisFichajesHoy(id).subscribe({
      next: f => { this.fichajesHoy.set(f); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }

  async fichar(btn: BtnConfig) {
    const ok = await this.swal.confirm(
      `Registrar ${btn.label.toLowerCase()}`,
      `Confirmas que quieres registrar tu ${btn.label.toLowerCase()} ahora (${this.hora}).`,
      `✓ Confirmar`
    );
    if (!ok.isConfirmed) return;

    this.fichando.set(true);
    const id = this.user()!.id;

    // Intenta obtener geolocalización
    const ubicacion = await this.getUbicacion();

    this.api.registrarFichaje(id, btn.tipo, ubicacion).subscribe({
      next: () => {
        this.fichando.set(false);
        this.swal.success(`${btn.label} registrada ✓`, `${this.hora} — ${ubicacion || 'Sin ubicación'}`);
        this.loadFichajes();
      },
      error: err => {
        this.fichando.set(false);
        this.swal.error('Error al fichar', err.error?.error || 'No se pudo conectar con el servidor.');
      }
    });
  }

  private getUbicacion(): Promise<string | undefined> {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve(undefined);
      navigator.geolocation.getCurrentPosition(
        pos => resolve(`${pos.coords.latitude.toFixed(5)},${pos.coords.longitude.toFixed(5)}`),
        () => resolve(undefined),
        { timeout: 4000 }
      );
    });
  }

  horasTrabajadas(): string {
    const f = this.fichajesHoy();
    const entrada = f.find(x => x.tipo === 'entrada');
    if (!entrada) return '';
    const ms = Date.now() - new Date(entrada.fecha_hora).getTime();
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${h}h ${m.toString().padStart(2,'0')}m`;
  }

  tipoLabel(t: string): string {
    const map: Record<string,string> = {
      entrada:'Entrada', salida:'Salida', salida_comida:'Salida comida',
      vuelta_comida:'Vuelta comida', inicio_descanso:'Inicio descanso', fin_descanso:'Fin descanso'
    };
    return map[t] || t;
  }

  tipoIcon(t: string): string {
    const map: Record<string,string> = {
      entrada:'🟢', salida:'🔴', salida_comida:'🍽️',
      vuelta_comida:'🔄', inicio_descanso:'☕', fin_descanso:'💪'
    };
    return map[t] || '⚪';
  }

  dotClass(t: string): string {
    const map: Record<string,string> = {
      entrada:'bg-brand/15', salida:'bg-danger/15', salida_comida:'bg-warning/15',
      vuelta_comida:'bg-teal/15', inicio_descanso:'bg-warning/15', fin_descanso:'bg-brand/15'
    };
    return map[t] || 'bg-surface-raised';
  }

  getInitials() { return this.auth.getInitials(this.user()?.nombre_completo || ''); }

  private updateClock() {
    const d = new Date();
    this.hora = d.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  }
}