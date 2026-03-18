import { Component } from '@angular/core';  // ← verificar que esté

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',   // ojo: SIN .component
  styleUrl: './footer.css'
})
export class FooterComponent {}   // ← debe llamarse exactamente así