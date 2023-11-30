import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpClient) { }

  obtenerReservas() {
    return this.http.get<any[]>('/reservas');
  }

  // Otros métodos relacionados con reservas
}

