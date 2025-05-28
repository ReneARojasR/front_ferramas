import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-respuesta',
  template: `
   <div *ngIf="respuesta">
  <h2>Pago {{ respuesta?.status === 'AUTHORIZED' ? 'exitoso ✅' : 'fallido ❌' }}</h2>
  <pre>{{ respuesta | json }}</pre>
</div>
<div *ngIf="error">
  <p>Error: {{ error }}</p>
</div>

 `,
 imports: [CommonModule],

})
export class PagoRespuestaComponent implements OnInit {
  respuesta: any;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token_ws');

    if (token) {
      this.http.post<any>('http://localhost:5000/api/pago/confirmar', { token })
        .subscribe({
          next: res => this.respuesta = res,
          error: err => this.error = 'Hubo un problema al confirmar el pago.'
        });
    } else {
      this.error = 'Token no proporcionado';
    }
  }
}
