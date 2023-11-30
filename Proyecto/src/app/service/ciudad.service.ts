import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudades';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  ciudad: Ciudad | undefined

  private url = 'http://localhost:3002/ciudad'

  constructor(private http: HttpClient) { }

  public getCiudad(): Observable<any>{
    return this.http.get<any>(`${this.url}`)
  }
}
