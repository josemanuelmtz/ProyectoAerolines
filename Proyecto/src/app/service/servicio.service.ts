import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicios';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url = 'http://localhost:3002/servicio'

  constructor(private http: HttpClient) { }

  public getServicio(): Observable<any>{
    return this.http.get<any>(`${this.url}`)
  }
}
