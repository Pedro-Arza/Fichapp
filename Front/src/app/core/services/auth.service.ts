import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse, AuthUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API       = 'http://localhost:3000/api';
  private readonly TOKEN_KEY = 'fichapp_token';
  private readonly USER_KEY  = 'fichapp_user';

  currentUser = signal<AuthUser | null>(this.loadUser());

  constructor(private http: HttpClient, private router: Router) {
    if (this.isTokenExpired()) this.clearSession();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/auth/login`, { email, password }).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        const user: AuthUser = {
          id: res.empleado.id, email: res.empleado.email,
          rol: res.empleado.rol, nombre_completo: res.empleado.nombre_completo,
          foto_url: res.empleado.foto_url
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }

  logout(): void { this.clearSession(); this.router.navigate(['/login']); }
  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  isLoggedIn(): boolean { return !!this.getToken() && !this.isTokenExpired(); }

  isTokenExpired(): boolean {
    const t = localStorage.getItem(this.TOKEN_KEY);
    if (!t) return true;
    try { const p = JSON.parse(atob(t.split('.')[1])); return p.exp * 1000 < Date.now(); }
    catch { return true; }
  }

  getTokenExpiresIn(): number {
    const t = localStorage.getItem(this.TOKEN_KEY);
    if (!t) return 0;
    try { const p = JSON.parse(atob(t.split('.')[1])); return p.exp * 1000 - Date.now(); }
    catch { return 0; }
  }

  getInitials(name: string): string {
    return name.split(' ').filter(Boolean).slice(0,2).map(w => w[0]).join('').toUpperCase();
  }

  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
  }
  private loadUser(): AuthUser | null {
    const s = localStorage.getItem(this.USER_KEY);
    return s ? JSON.parse(s) : null;
  }
}