import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservasService } from 'src/app/service/reservas.service';
import { IdUsuarioService } from 'src/app/service/id-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-reserva',
  templateUrl: './gestion-reserva.component.html',
  styleUrls: ['./gestion-reserva.component.css']
})
export class GestionReservaComponent {
  Reserva : any [] = [];
  reserva : any[] = [];
  reservasS: any[] = [];
  id_us = 1;
  id_usuario = 1;

  constructor(private http: HttpClient, private idUsuarioService: IdUsuarioService, private reservasService: ReservasService) {}
  
  rMIncorrect(): void {
    Swal.fire({
      position: 'center', icon: 'error', title: 'Faltan Datos por Llenar', showConfirmButton: false, timer: 3000
    })
  }

  ngOnInit(): void {
    
  }

  getFechaDelSistema(): Date {
    return new Date();
  }

  esHoraPasada(fechaReserva: Date): boolean {
    const fechaSistema = this.getFechaDelSistema();
    return fechaSistema > fechaReserva;
  }

  reservas(id_usuario: number) {
    const id_usua = id_usuario;
    this.reservasService.reservas(id_usua).subscribe(
      (data) => {
        if (data) {
          console.log('Datos de la reserva:', data);
          this.reservasS = data;
        } else {
          console.error('La reserva no existe.');
          // Muestra un mensaje al usuario o maneja el caso de reserva inexistente.
        }
      },
      (error) => {
        console.error('Error al obtener la reserva:', error);
        // Maneja el error, muestra un mensaje al usuario, etc.
      }
    );
  }

  mostrarNotificacionExitosa(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Operación Exitosa',
      showConfirmButton: true,
      timer: 3000,
    });
  }
  
  cancelReserva(id_reserva: number) {
    this.reservasService.cancelReserva(id_reserva).subscribe(
      () => {
        console.log('Reserva eliminada con éxito');
        // Realiza cualquier otra acción necesaria, como actualizar la lista de reservas.
      },
      (error) => {
        console.error('Error al eliminar reserva:', error);
        // Maneja el error, muestra un mensaje al usuario, etc.
      }
    );
    this.mostrarNotificacionExitosa();
    window.location.reload();
  }
  
  /*eliminarReserva(idReserva: number) {
    this.reservasService.deleteReserva(idReserva).subscribe(
      (data) => {
        console.log('Reserva eliminada con éxito', data);
        // Realiza cualquier otra acción necesaria, como actualizar la lista de reservas.
        
      },
      (error) => {
        console.error('Error al eliminar reserva:', error);
        // Maneja el error, muestra un mensaje al usuario, etc.     
      }
    );
  }*/


}
