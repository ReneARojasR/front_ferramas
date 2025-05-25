import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  httpOptiosns = {
    headers: new HttpHeaders({'content-type': 'application/json','access-control-allow-origin':'*'})
  };

  url: string = 'http://localhost:5000/';
  constructor(private http:HttpClient) { }

  public gerAllPRoducts(): Observable<any> {
    return this.http.get(this.url + 'products',this.httpOptiosns);
  }
  public getProductById(id: number): Observable<any> {
    return this.http.get(this.url + 'products/' + id);
  }
}
