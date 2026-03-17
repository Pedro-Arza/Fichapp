import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmpleadosService, Empleado } from '../../services/empleados.service';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './personal.html',
  styleUrls: ['./personal.css']
})
export class PersonalComponent implements OnInit {
  private empleadosService = inject(EmpleadosService);
  
  personal = signal<Empleado[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarPersonal();
  }

  cargarPersonal(): void {
    this.loading.set(true);
    this.empleadosService.listarEmpleados().subscribe({
      next: (data) => {
        this.personal.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando personal:', err);
        this.error.set('No se pudo cargar el directorio de personal.');
        this.loading.set(false);
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
}
