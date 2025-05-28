import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IniciarPagoResponse {
  url: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:5000/api/pago'; // Cambia si tu API corre en otro puerto

  constructor(private http: HttpClient) {}

  iniciarPago(amount: number, sessionId: string, buyOrder: string, returnUrl: string): Observable<IniciarPagoResponse> {
    return this.http.post<IniciarPagoResponse>(`${this.apiUrl}/iniciar`, {
      amount,
      session_id: sessionId,
      buy_order: buyOrder,
      return_url: returnUrl
    });
  }
}
