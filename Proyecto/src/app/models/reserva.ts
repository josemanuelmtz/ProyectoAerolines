export class Reserva {
    id_? : number;
    id_usuario : number;
    id_vuelos : number;
    fecha_reserva : string;
    pago : number;

    constructor(id_ : number, id_usuario : number, id_vuelos : number, fecha_reserva : string, pago : number){
        this.id_ = id_;
        this.id_usuario = id_usuario;
        this.id_vuelos = id_vuelos;
        this.fecha_reserva = fecha_reserva; 
        this.pago = pago;
    }
}
