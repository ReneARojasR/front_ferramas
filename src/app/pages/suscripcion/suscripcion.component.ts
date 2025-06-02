import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suscripcion',
  imports: [],
  template: `
    <h2>Página de suscripción</h2>
    <p>Aquí podrías implementar los planes y pagos.</p>
    <button (click)="volver()">Volver</button>
  `,
  styleUrl: './suscripcion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuscripcionComponent {
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/']);
  }
}
