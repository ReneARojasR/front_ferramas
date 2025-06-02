// moneda.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private monedaSubject = new BehaviorSubject<'CLP' | 'USD'>('CLP');
  moneda$ = this.monedaSubject.asObservable();

  private valorDolarSubject = new BehaviorSubject<number>(1);
  valorDolar$ = this.valorDolarSubject.asObservable();

  setMoneda(moneda: 'CLP' | 'USD') {
    this.monedaSubject.next(moneda);
  }

  setValorDolar(valor: number) {
    this.valorDolarSubject.next(valor);
  }
}
