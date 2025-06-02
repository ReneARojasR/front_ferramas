import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticarLoginService {

  private apiUrl = 'http://localhost:5000';

  currentUser: any = null;
  private discountSubject = new BehaviorSubject<number>(0); // nuevo sujeto
  discount$ = this.discountSubject.asObservable(); // observable público

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }



  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, payload).pipe(
      switchMap(response => {
        this.currentUser = response.user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.currentUserSubject.next(this.currentUser);
        if (this.currentUser?.id) {
          // Consultar descuento para este usuario
          return this.getDiscount(this.currentUser.id).pipe(
            switchMap(discount => {
              // this.currentDiscount = discount;
               const porcentaje = parseFloat(discount.porcentaje) || 0;
              this.discountSubject.next(porcentaje); // emitimos
              return of(response);
            })
          );
        }
        return of(response);
      })
    );
  }

  getDiscount(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/descuentos/${usuarioId}`);

  }

  logout(): void {
    this.currentUser = null;
     this.discountSubject.next(0);
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
  }

  getUsuarioActual() {
    return this.currentUserSubject.value;
  }
}
