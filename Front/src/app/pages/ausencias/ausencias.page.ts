import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { SwalService } from '../../core/services/swal.service';
import { Ausencia } from '../../core/models';

@Component({
  selector: 'app-ausencias',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  template: `
    <div>
      <div class="page-top flex items-center justify-between">
        <div>
          <h1 class="font-display text-xl font-bold text-ink">Mis Ausencias</h1>
          <p class="text-ink-muted text-xs mt-0.5">Solicitudes y permisos</p>
        </div>
        <button class="btn-ghost text-sm gap-2 py-2.5 px-4" (click)="showSheet.set(true)">
          <span>+</span> Solicitar
        </button>
      </div>

      <div class="px-5 pt-5">

        @if (loading()) {
          <div class="flex items-center justify-center py-16">
            <div class="spinner-brand w-8 h-8"></div>
          </div>
        } @else if (ausencias().length === 0) {
          <div class="text-center py-16 animate-fade-up">
            <span class="text-5xl block mb-3 opacity-25">📅</span>
            <p class="text-ink-dim font-medium">Sin solicitudes</p>
            <p class="text-ink-muted text-sm mt-1">Crea una nueva pulsando el botón de arriba</p>
          </div>
        } @else {
          <div class="space-y-3 animate-fade-up">
            @for (a of ausencias(); track a.id) {
              <div class="card p-5">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl">{{tipoIcon(a.tipo)}}</span>
                    <div>
                      <div class="font-display font-bold text-ink text-sm">{{tipoLabel(a.tipo)}}</div>
                      <div class="text-xs text-ink-muted">{{calcDias(a.fecha_inicio, a.fecha_fin)}} días</div>
                    </div>
                  </div>
                  <span [class]="'pill pill-' + a.estado">{{a.estado}}</span>
                </div>

                <div class="flex items-center gap-2 p-3 bg-surface-raised rounded-2xl mb-3">
                  <div class="flex-1 text-center">
                    <div class="text-[0.65rem] text-ink-muted mb-0.5">DESDE</div>
                    <div class="font-display font-bold text-brand text-sm">{{a.fecha_inicio | date:'dd/MM/yyyy'}}</div>
                  </div>
                  <span class="text-ink-muted text-sm">→</span>
                  <div class="flex-1 text-center">
                    <div class="text-[0.65rem] text-ink-muted mb-0.5">HASTA</div>
                    <div class="font-display font-bold text-teal text-sm">{{a.fecha_fin | date:'dd/MM/yyyy'}}</div>
                  </div>
                </div>

                @if (a.motivo) {
                  <p class="text-ink-muted text-xs line-clamp-2">📝 {{a.motivo}}</p>
                }
                @if (a.notas_aprobacion) {
                  <div class="mt-2 p-3 rounded-xl bg-surface-raised border-l-2"
                       [class]="a.estado === 'rechazada' ? 'border-danger/40' : 'border-teal/40'">
                    <p class="text-xs text-ink-muted italic">💬 {{a.notas_aprobacion}}</p>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
      <div class="h-6"></div>
    </div>

    <!-- Bottom Sheet - Nueva solicitud -->
    @if (showSheet()) {
      <div class="sheet-overlay" (click)="closeSheet()">
        <div class="sheet" (click)="$event.stopPropagation()">
          <div class="sheet-handle"></div>
          <h2 class="font-display text-lg font-bold text-ink mb-5">Nueva solicitud</h2>

          <div class="space-y-4">
            <div>
              <label class="inp-label">Tipo de ausencia</label>
              <select class="inp" [(ngModel)]="form.tipo">
                <option value="">Selecciona un tipo...</option>
                @for (t of tipos; track t.value) {
                  <option [value]="t.value">{{t.icon}} {{t.label}}</option>
                }
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="inp-label">Fecha inicio</label>
                <input type="date" class="inp" [(ngModel)]="form.fecha_inicio">
              </div>
              <div>
                <label class="inp-label">Fecha fin</label>
                <input type="date" class="inp" [(ngModel)]="form.fecha_fin">
              </div>
            </div>

            <div>
              <label class="inp-label">Motivo <span class="normal-case text-ink-muted font-normal">(opcional)</span></label>
              <textarea class="inp resize-none" rows="3" [(ngModel)]="form.motivo"
                        placeholder="Explica el motivo de la ausencia..."></textarea>
            </div>
          </div>

          <button class="btn-primary mt-6" (click)="enviar()" [disabled]="enviando()">
            @if (enviando()) {
              <span class="spinner w-5 h-5"></span> Enviando...
            } @else {
              <span>📨</span> Enviar solicitud
            }
          </button>
        </div>
      </div>
    }
  `
})
export class AusenciasPage implements OnInit {
  loading  = signal(true);
  enviando = signal(false);
  showSheet = signal(false);
  ausencias = signal<Ausencia[]>([]);
  form: Partial<Ausencia & { motivo: string }> = {};

  tipos = [
    { value:'vacaciones',            label:'Vacaciones',            icon:'🏖️' },
    { value:'baja_medica',           label:'Baja médica',           icon:'🏥' },
    { value:'permiso',               label:'Permiso',               icon:'📋' },
    { value:'ausencia_justificada',  label:'Ausencia justificada',  icon:'✅' },
    { value:'ausencia_injustificada',label:'Ausencia injustificada',icon:'⚠️' },
    { value:'teletrabajo',           label:'Teletrabajo',           icon:'🏠' },
  ];

  constructor(private api: ApiService, private auth: AuthService, private swal: SwalService) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    const id = this.auth.currentUser()?.id;
    if (!id) return;
    this.loading.set(true);
    this.api.getMisAusencias(id).subscribe({
      next: a => {
        this.ausencias.set([...a].sort((x,y) => y.fecha_inicio.localeCompare(x.fecha_inicio)));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  closeSheet() { this.showSheet.set(false); this.form = {}; }

  async enviar() {
    if (!this.form.tipo || !this.form.fecha_inicio || !this.form.fecha_fin) {
      this.swal.error('Faltan datos', 'Selecciona tipo y fechas de la ausencia.'); return;
    }
    if (this.form.fecha_fin < this.form.fecha_inicio!) {
      this.swal.error('Fechas incorrectas', 'La fecha de fin debe ser igual o posterior a la de inicio.'); return;
    }
    this.enviando.set(true);
    const id = this.auth.currentUser()!.id;
    this.api.solicitarAusencia({ ...this.form, empleado_id: id }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.closeSheet();
        this.cargar();
        this.swal.success('Solicitud enviada ✓', 'Tu responsable la revisará pronto.');
      },
      error: err => {
        this.enviando.set(false);
        this.swal.error('Error', err.error?.error || 'No se pudo enviar la solicitud.');
      }
    });
  }

  tipoLabel(t: string) { return this.tipos.find(x => x.value === t)?.label || t; }
  tipoIcon(t: string)  { return this.tipos.find(x => x.value === t)?.icon  || '📅'; }

  calcDias(inicio: string, fin: string): number {
    return Math.max(1, Math.round((new Date(fin).getTime() - new Date(inicio).getTime()) / 86400000) + 1);
  }
}