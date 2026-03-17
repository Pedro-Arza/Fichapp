import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FichajesService, Fichaje, TipoFichaje } from '../../services/fichajes.service';
import { NavbarComponent } from '../../components/navbar/navbar';

interface AccionFichaje {
  tipo: TipoFichaje;
  label: string;
  color: string;
  svgIcon: SafeHtml;
}

@Component({
  selector: 'app-home',
  imports: [DatePipe, NavbarComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private auth = inject(AuthService);
  private fichajesService = inject(FichajesService);
  private sanitizer = inject(DomSanitizer);

  private svg(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  empleadoActual = this.auth.empleadoActual;
  fichajesHoy = signal<Fichaje[]>([]);
  loadingFichajes = signal(true);
  registrando = signal(false);
  errorFichaje = signal<string | null>(null);
  ahora = signal(new Date());
  mostrarModalFichar = false;

  /** Todas las acciones posibles mostradas en el modal */
  readonly todasLasAcciones: AccionFichaje[] = [];

  private inicializarAcciones(): void {
    const acciones: AccionFichaje[] = [
      { tipo: 'entrada',        label: 'Inicio Guardia',  color: 'green',  svgIcon: this.svg(`<svg viewBox="0 0 24 24" fill="none"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="10 17 15 12 10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`) },
      { tipo: 'salida_comida',  label: 'Pausa Médica',    color: 'orange', svgIcon: this.svg(`<svg viewBox="0 0 24 24" fill="none"><path d="M18 8h1a4 4 0 0 1 0 8h-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="1" x2="6" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="14" y1="1" x2="14" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`) },
      { tipo: 'vuelta_comida',  label: 'Vuelta Servicio', color: 'blue',   svgIcon: this.svg(`<svg viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="16 17 21 12 16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`) },
      { tipo: 'inicio_descanso',label: 'Descanso',        color: 'yellow', svgIcon: this.svg(`<svg viewBox="0 0 24 24" fill="none"><path d="M17 8C8 10 5.9 16.17 3.82 19.11a1 1 0 0 0 1.64 1.14 9.3 9.3 0 0 0 1.54-2.25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.17 2A13 13 0 0 1 22 13.17A13 13 0 0 1 9.83 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`) },
      { tipo: 'fin_descanso',   label: 'Fin Descanso',    color: 'teal',   svgIcon: this.svg(`<svg viewBox="0 0 24 24" fill="none"><polyline points="23 4 23 10 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`) },
      { tipo: 'salida',         label: 'Fin Guardia',     color: 'red',    svgIcon: this.svg(`<svg viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polyline points="16 17 21 12 16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`) },
    ];
    this.todasLasAcciones.push(...acciones);
  }

  /** Último fichaje del día */
  ultimoFichaje = computed(() => {
    const lista = this.fichajesHoy();
    return lista.length > 0 ? lista[0] : null;
  });

  /** Jornada completada si el último fichaje es 'salida' */
  jornadaCompletada = computed(() => this.ultimoFichaje()?.tipo === 'salida');

  /** Qué tipos de fichaje están disponibles según el estado actual */
  esAccionDisponible(tipo: TipoFichaje): boolean {
    const ultimo = this.ultimoFichaje()?.tipo;

    switch (ultimo) {
      case undefined:
      case null:
        // Sin fichar: solo puede entrar
        return tipo === 'entrada';
      case 'entrada':
      case 'vuelta_comida':
      case 'fin_descanso':
        // En jornada: puede salir a comer, iniciar descanso o terminar jornada
        return ['salida_comida', 'inicio_descanso', 'salida'].includes(tipo);
      case 'salida_comida':
        // En pausa comida: solo puede volver
        return tipo === 'vuelta_comida';
      case 'inicio_descanso':
        // En descanso: solo puede finalizar descanso
        return tipo === 'fin_descanso';
      case 'salida':
        // Jornada terminada: puede volver a entrar
        return tipo === 'entrada';
      default:
        return false;
    }
  }

  /** Calcula las horas trabajadas hoy */
  horasHoyFormato = computed(() => {
    const fichajes = [...this.fichajesHoy()].reverse();
    let minutos = 0;
    let inicioTs: number | null = null;

    for (const f of fichajes) {
      const ts = new Date(f.fecha_hora).getTime();
      if (['entrada', 'vuelta_comida', 'fin_descanso'].includes(f.tipo)) {
        inicioTs = ts;
      } else if (['salida_comida', 'inicio_descanso', 'salida'].includes(f.tipo) && inicioTs) {
        minutos += (ts - inicioTs) / 60000;
        inicioTs = null;
      }
    }
    // Tramo abierto (en jornada activa)
    if (inicioTs) {
      minutos += (this.ahora().getTime() - inicioTs) / 60000;
    }
    const h = Math.floor(minutos / 60);
    const m = Math.floor(minutos % 60);
    return `${h}h ${m}m`;
  });

  ngOnInit(): void {
    this.inicializarAcciones();
    const emp = this.empleadoActual();
    if (emp) this.cargarFichajesHoy(emp.id);
    setInterval(() => this.ahora.set(new Date()), 60000);
  }

  cargarFichajesHoy(empleadoId: string): void {
    this.fichajesService.obtenerHoy(empleadoId).subscribe({
      next: (data) => { this.fichajesHoy.set(data.reverse()); this.loadingFichajes.set(false); },
      error: () => this.loadingFichajes.set(false)
    });
  }

  ficharTipo(tipo: TipoFichaje): void {
    const emp = this.empleadoActual();
    if (!emp || !this.esAccionDisponible(tipo)) return;

    this.registrando.set(true);
    this.errorFichaje.set(null);

    this.fichajesService.registrar(emp.id, tipo).subscribe({
      next: (nuevo) => {
        this.fichajesHoy.update(lista => [nuevo, ...lista]);
        this.registrando.set(false);
        if (tipo === 'salida') {
          setTimeout(() => { this.mostrarModalFichar = false; }, 1500);
        }
      },
      error: (err) => {
        this.errorFichaje.set(err.error?.error || 'Error al registrar fichaje.');
        this.registrando.set(false);
      }
    });
  }

  cerrarModal(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.mostrarModalFichar = false;
    }
  }

  labelTipo(tipo: string): string {
    const mapa: Record<string, string> = {
      entrada: 'Inicio Guardia',
      salida_comida: 'Pausa Médica',
      vuelta_comida: 'Vuelta Servicio',
      inicio_descanso: 'Descanso',
      fin_descanso: 'Fin Descanso',
      salida: 'Fin Guardia'
    };
    return mapa[tipo] ?? tipo;
  }
}
