import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TipoFichaje =
  | 'entrada'
  | 'salida_comida'
  | 'vuelta_comida'
  | 'inicio_descanso'
  | 'fin_descanso'
  | 'salida';

export interface Fichaje {
  id: string;
  empleado_id: string;
  tipo: TipoFichaje;
  fecha_hora: string;
  ubicacion?: string;
  notas?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FichajesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/fichajes';

  obtenerHoy(empleadoId: string): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(`${this.apiUrl}/empleado/${empleadoId}/hoy`);
  }

  registrar(empleadoId: string, tipo: TipoFichaje): Observable<Fichaje> {
    return this.http.post<Fichaje>(this.apiUrl, {
      empleado_id: empleadoId,
      tipo,
      fecha_hora: new Date().toISOString(),
      ubicacion: 'Oficina'
    });
  }

  listarPorEmpleado(empleadoId: string): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(`${this.apiUrl}/empleado/${empleadoId}`);
  }
}
