import { Injectable } from '@angular/core';
import { Filtro } from '../models/filtro';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  filtros: Filtro | undefined
  
  private baseUrl = 'http://localhost:3004/';

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  //Obtiene el objeto origen de baseURL 
  getOrigenDatos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}calendario/origen`);
  }

  //Obtiene el objeto destino de baseURL  
  getDestinoDatos(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}calendario/destino`);
  }
  
  //Manda y obtiene el objeto que se buscó con los parámetros del usuario de baseURL 
  obtenerVuelosPorFiltro(origen: string, destino: string, fecha: Date): Observable<any> {
    const url = `${this.baseUrl}calendario/vuelos?origen=${origen}&destino=${destino}&fecha=${fecha}`;
    return this.http.get(url);
}

//Manda y obtiene el objeto que se buscó con los parámetros del usuario de baseURL 
obtenerDetalles(): Observable<any> {
  const url = `${this.baseUrl}calendario/detalles`;
  return this.http.get(url);
}

obtenerDetallePorId(id_vuelos: number): Observable<any> {
  // Supongamos que tienes una URL para obtener detalles de un vuelo por su ID
  const url = `${this.baseUrl}calendario/detalles?id_vuelos=${id_vuelos}`;
  // Realiza una solicitud HTTP GET para obtener los detalles del vuelo
  return this.http.get(url);
}

createReserva(data: Reserva): Observable<any> {
  return this.http.post(`${this.baseUrl}calendario/creaReserva`, data);
}

reservas(id_usua:number): Observable<any> {
  const url = `${this.baseUrl}calendario/reservas?id_usuario=${id_usua}`;
  return this.http.get(url);
}

cancelReserva(id_reserva: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}calendario/cancelReserva?id_reserva=${id_reserva}`);
}

}
