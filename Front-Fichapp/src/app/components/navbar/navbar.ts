import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  empleado = this.auth.empleadoActual;

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
