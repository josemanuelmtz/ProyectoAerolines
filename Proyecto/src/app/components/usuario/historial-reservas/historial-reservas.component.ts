import { Component,OnInit } from '@angular/core';
import { ReservaService } from '../../../service/historial-reserva.service'; 

@Component({
  selector: 'app-historial-reservas',
  templateUrl: './historial-reservas.component.html',
  styleUrls: ['./historial-reservas.component.css']
})
export class HistorialReservasComponent implements OnInit {
  reservas: any[] = []; 

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
    this.reservaService.obtenerReservas().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al obtener reservas', error);
      }
    );
  }
}
