import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  empleado: {
    id: string;
    nombre_completo: string;
    email: string;
    rol: string;
    foto_url?: string;
    departamento_id?: string;
    turno_id?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';

  private _empleadoActual = signal<LoginResponse['empleado'] | null>(this.cargarEmpleadoGuardado());

  get empleadoActual() {
    return this._empleadoActual.asReadonly();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('empleado', JSON.stringify(res.empleado));
        this._empleadoActual.set(res.empleado);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('empleado');
    this._empleadoActual.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }

  private cargarEmpleadoGuardado(): LoginResponse['empleado'] | null {
    const data = localStorage.getItem('empleado');
    if (!data || data === 'undefined' || data === 'null') {
      localStorage.removeItem('empleado');
      return null;
    }
    try {
      return JSON.parse(data);
    } catch {
      localStorage.removeItem('empleado');
      return null;
    }
  }
}
