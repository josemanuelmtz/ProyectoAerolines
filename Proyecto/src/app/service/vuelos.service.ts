import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vuelos } from '../models/vuelos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  vuelo: Vuelos | undefined

  private url = 'http://localhost:3002/vuelos/'

  constructor(private http: HttpClient) {}

  public getVuelos(id:any): Observable<any>{
    return this.http.get<any>(`${this.url}emp/${id}`);  
  }

  public getVuelo(id:any): Observable<any>{
    return this.http.get<any>(`${this.url}${id}`)
  }

  public createVuelo(nuevoVuelo: Vuelos): Observable<any> {
    return this.http.post(`${this.url}new`, nuevoVuelo);
  }

  public updateVuelo(id:any, vuelo:Vuelos): Observable <any>{
    return this.http.put(`${this.url}update/${id}`, vuelo)
  }
  public deleteVuelo(id:any): Observable <any>{
    return this.http.delete(`${this.url}delete/${id}`)
  }
}
