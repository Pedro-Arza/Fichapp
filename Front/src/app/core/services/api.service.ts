import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado, Fichaje, Ausencia } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly BASE = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  // Mi perfil
  getMiPerfil(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.BASE}/empleados/${id}/perfil`);
  }

  // Mis fichajes de hoy
  getMisFichajesHoy(id: string): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(`${this.BASE}/fichajes/empleado/${id}/hoy`);
  }

  // Mis fichajes por rango
  getMisFichajesPorFechas(id: string, inicio: string, fin: string): Observable<Fichaje[]> {
    const params = new HttpParams().set('fecha_inicio', inicio).set('fecha_fin', fin);
    return this.http.get<Fichaje[]>(`${this.BASE}/fichajes/empleado/${id}/fechas`, { params });
  }

  // Registrar fichaje (la hora la pone el servidor)
  registrarFichaje(empleado_id: string, tipo: string, ubicacion?: string): Observable<Fichaje> {
    return this.http.post<Fichaje>(`${this.BASE}/fichajes`, { empleado_id, tipo, ubicacion });
  }

  // Mis ausencias
  getMisAusencias(id: string): Observable<Ausencia[]> {
    return this.http.get<Ausencia[]>(`${this.BASE}/ausencias/empleado/${id}`);
  }

  // Solicitar ausencia
  solicitarAusencia(data: Partial<Ausencia>): Observable<Ausencia> {
    return this.http.post<Ausencia>(`${this.BASE}/ausencias`, data);
  }
}