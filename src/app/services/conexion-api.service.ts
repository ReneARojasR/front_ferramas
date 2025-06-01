import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private url = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<any> {
    return this.http.get(this.url + 'products', this.httpOptions);
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get(this.url + 'products/' + id, this.httpOptions);
  }

  public getTiposProducto(): Observable<{ id: number; nombre: string }[]> {
    return this.http.get<{ id: number; nombre: string }[]>(this.url + 'api/tipos-producto', this.httpOptions);
  }
}
