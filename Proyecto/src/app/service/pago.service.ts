import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Reserva } from '../models/reserva';
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor(private http: HttpClient) {}

  realizarPago() {
    return this.http.get('http://localhost:3004/pago');
  }

}
