import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error404.html',
  styleUrls: ['./error404.css']
})
export class Error404Component implements OnInit, OnDestroy {

  timestamp: string = '';
  private clockInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateTimestamp();
    this.clockInterval = setInterval(() => this.updateTimestamp(), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  /** Navega a la landing page principal */
  goHome(): void {
    this.router.navigate(['/']);
  }

  /** Navega al panel de fichaje */
  goPanel(): void {
    this.router.navigate(['/home']);
  }

  /** Actualiza el timestamp en tiempo real */
  private updateTimestamp(): void {
    const d = new Date();
    const pad = (n: number): string => String(n).padStart(2, '0');
    this.timestamp =
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} · ` +
      `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} · ` +
      `Sesión activa`;
  }
}