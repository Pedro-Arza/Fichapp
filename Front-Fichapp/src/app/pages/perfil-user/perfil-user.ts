import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EmpleadosService, Empleado } from '../../services/empleados.service';
import { FichajesService, Fichaje } from '../../services/fichajes.service';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-perfil-user',
  imports: [DatePipe, NavbarComponent],
  templateUrl: './perfil-user.html',
  styleUrl: './perfil-user.css',
})
export class PerfilUser implements OnInit {
  private auth = inject(AuthService);
  private empleadosService = inject(EmpleadosService);
  private fichajesService = inject(FichajesService);

  empleadoActual = this.auth.empleadoActual;
  perfil = signal<Empleado | null>(null);
  fichajes = signal<Fichaje[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    const emp = this.empleadoActual();
    if (!emp) return;

    this.empleadosService.obtenerPerfil(emp.id).subscribe({
      next: (data) => { this.perfil.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });

    this.fichajesService.listarPorEmpleado(emp.id).subscribe({
      next: (data) => this.fichajes.set(data.slice(-10).reverse()),
      error: () => {}
    });
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
