import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservasService } from 'src/app/service/reservas.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosVuelo } from 'src/app/models/buscar-vuelos';
import { obtenerDetalles } from 'src/app/models/detalles';
import { IdUsuarioService } from 'src/app/service/id-usuario.service';
import Swal from 'sweetalert2';
import { Reserva } from 'src/app/models/reserva';
import { PagoService } from 'src/app/service/pago.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  filtro: any[] = [];
  detalles: any[] = [];
  buscadores: any[] = [];
  origenes: any[] = [];
  destinos: any[] = [];
  detalleSeleccionado: any = null;
  detallesVisible: boolean = false; // Variable para controlar la visibilidad de los detalles
  id_us: any | null;
  Reserva : any [] = [];
  vuelosForm: FormGroup;
  datosDeOrigen$: Observable<any> | undefined;
  datosDeDestino$: Observable<any> | undefined;

  constructor(private http: HttpClient, private idUsuarioService: IdUsuarioService ,private reservasService: ReservasService, private fb: FormBuilder, private pago: PagoService) {
    this.vuelosForm = this.fb.group({
      origen: ["", Validators.required],
      destino: ["", Validators.required],
      fecha: ["", Validators.required]
    });
    this.id_us = 0;
  }



  rMIncorrect(): void {
    Swal.fire({
      position: 'center', icon: 'error', title: 'Faltan Datos por Llenar', showConfirmButton: false, timer: 3000
    })
  }

  get origen() { return this.vuelosForm.get('origen'); }
  get destino() { return this.vuelosForm.get('destino'); }
  get fecha() { return this.vuelosForm.get('fecha'); }

   origenD() {
     this.datosDeOrigen$ = this.reservasService.getOrigenDatos(); // Asegúrate de que el método en el servicio sea getOrigenDatos
     this.datosDeOrigen$.subscribe(
       (data) => {
         this.origenes = data; // Asigna los datos de origen a la variable origenes
         console.log(this.origenes);
       },
       (error) => {
         console.error('Error al obtener datos de origen:', error);
      }
     );
  }

  destinoD() {
  this.datosDeDestino$ = this.reservasService.getDestinoDatos(); // Asegúrate de que el método en el servicio sea getDestinoDatos
  this.datosDeDestino$.subscribe(
       (data) => {
         // Manejar los datos de destino
         this.destinos = data;
         console.log(this.destinos);
       },
       (error) => {
         // Manejar errores
         console.error('Error al obtener datos de destino:', error);
       }
     );
   }
  
  Vue() {
    if (this.vuelosForm.valid) {
      const origenValue = this.vuelosForm.get('origen')?.value;
      const destinoValue = this.vuelosForm.get('destino')?.value;
      const fechaValue = this.vuelosForm.get('fecha')?.value;
      
      console.log('Origen:', origenValue);
      console.log('Destino:', destinoValue);
      console.log('Fecha:', fechaValue);
    }
  }  
  
  ngOnInit(): void {
    this.idUsuarioService.obtenerIdUsuario().subscribe((data: any) => {
      if (data.idUsuario) {
        this.id_us = data.idUsuario;
        console.log('ID de usuario disponible:', this.id_us);
        this.origenD();
        this.destinoD();
      } else {
        console.log('ID de usuario no disponible');
      }
    });
  }

  vuelos() {
    if (this.vuelosForm.valid) {
      const origen = this.vuelosForm.get('origen')?.value;
      const destino = this.vuelosForm.get('destino')?.value;
      const fecha = this.vuelosForm.get('fecha')?.value;

      console.log('Origen:', origen);
      console.log('Destino:', destino);
      console.log('Fecha:', fecha);

      this.reservasService.obtenerVuelosPorFiltro(origen, destino, fecha)
        .subscribe((data) => {
          console.log('Vuelos encontrados:', data);
          this.buscadores = data;
        },
        (error) => {
          console.error('Error al obtener vuelos por filtro:', error);
          // Aquí puedes manejar el error de manera específica, por ejemplo, mostrando un mensaje al usuario.
        });
    } else {
      // Mostrar notificación de llenado de datos
      this.mostrarNotificacionFaltanDatos();
    }
    this.mostrarNotificacionExitosa();
  }

  mostrarNotificacionFaltanDatos(): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Faltan Datos por Llenar',
      showConfirmButton: true,
      timer: 3000,
    });
  }

  detalleVuelos(idVuelo: number | null) {
    if (idVuelo === null) {
      // Si se pasa idVuelo como null, oculta los detalles.
      this.detalleSeleccionado = null;
    } else if (this.detalleSeleccionado && this.detalleSeleccionado.id === idVuelo) {
      // Si los detalles están visibles y el mismo vuelo se ha seleccionado nuevamente, se ocultan
      this.detalleSeleccionado = null;
    } else {
      // Si los detalles están ocultos o se ha seleccionado un vuelo diferente, se muestran los detalles del vuelo seleccionado
      this.reservasService.obtenerDetallePorId(idVuelo).subscribe(
        (detalle) => {
          console.log('Detalle del vuelo seleccionado:', detalle);
          // Almacena el detalle en la variable detalleSeleccionado
          this.detalleSeleccionado = detalle;
        },
        (error) => {
          console.error('Error al obtener detalle del vuelo seleccionado:', error);
          // Aquí puedes manejar el error de manera específica, por ejemplo, mostrando un mensaje al usuario.
        }
      );
      this.mostrarNotificacionExitosa();
    }
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
  
  createReservaFromDetalle(detalle: any) {
    const fecha = new Date(detalle.fecha_vuelos);
    const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
    const id_usuario = (this.id_us);
    if (detalle) {
      // Extraer los campos necesarios del detalle
      const { id_vuelos, fecha_vuelos, costo } = detalle;
      // Crear un objeto reserva con los campos necesarios
      const data: Reserva = {
        id_usuario: id_usuario,
        id_vuelos: id_vuelos,
        fecha_reserva: fechaFormateada, // Ajustar la fecha según tus necesidades
        pago: costo
      };
  
      // Llamar al servicio para realizar la solicitud POST
      this.reservasService.createReserva(data).subscribe(
        (response) => {
          // La solicitud POST se ha completado con éxito.
          console.log('Reserva creada exitosamente', response);
          // Puedes mostrar una notificación o redirigir al usuario a una página de confirmación si es necesario.
          window.location.reload();
        },
        (error) => {
          // Maneja errores en caso de que la solicitud falle.
          console.error('Error al crear la reserva', error);
          // Puedes mostrar un mensaje de error al usuario si lo deseas.
    });
    }
    window.location.reload();
  }


}
