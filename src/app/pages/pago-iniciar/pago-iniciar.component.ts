import { Component } from '@angular/core';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-pago-iniciar',
  template: `
    <button (click)="pagar()">Pagar</button>
  `
})
export class PagoIniciarComponent {
  constructor(private pagoService: PagoService) {}

  pagar() {
    const amount = 10000; // ejemplo, monto a pagar
    const sessionId = 'sesion123'; // puede ser cualquier string único por sesión
    const buyOrder = 'orden123'; // número o string identificador único de la orden
    const returnUrl = 'http://localhost:4200/pago/respuesta'; // donde Webpay redirige después del pago

    this.pagoService.iniciarPago(amount, sessionId, buyOrder, returnUrl).subscribe({
      next: (res) => {
        if (res && res.url) {
          // Redirigir a Webpay para que el usuario pague
          window.location.href = res.url;
        } else {
          alert('No se pudo iniciar el pago');
        }
      },
      error: (err) => {
        console.error('Error iniciando pago', err);
        alert('Error iniciando el pago');
      }
    });
  }
}
