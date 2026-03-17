import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empleado {
  id: string;
  nombre_completo: string;
  email: string;
  rol: string;
  fecha_ingreso: string;
  estado: string;
  foto_url?: string;
  departamento_id?: string;
  turno_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/empleados';

  listarEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  obtenerPerfil(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}/perfil`);
  }
}
