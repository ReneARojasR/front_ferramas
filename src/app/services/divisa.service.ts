import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {
  private apiUrl = 'https://mindicador.cl/api/dolar';

  constructor(private http: HttpClient) {}

  obtenerTipoCambioUSD(): Observable<number> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        const valor = res.serie?.[0]?.valor || res.serie?.[0]?.valor; //mindicador usa "serie" con "valor"
        return parseFloat(valor) || 1;
      })
    );
  }
}
