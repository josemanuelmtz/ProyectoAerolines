import { Time } from "@angular/common";

export class obtenerDetalles {
    id_? : number;
    origen : string;
    destino : string;
    fecha_vuelo : Date;
    horallegada: Time;
    costo: Number;
    empresa: string;
    servicio: string;
    descripcion: string;
    

    constructor(id_ : number, origen : string, destino : string, fecha_vuelo : Date, costo : Number , horallegada : Time, empresa : string, servicio : string, descripcion : string){
        this.id_ = id_;
        this.origen = origen;
        this.destino = destino;
        this.fecha_vuelo = fecha_vuelo;
        this.costo = costo;
        this.horallegada = horallegada;
        this.empresa = empresa;
        this.servicio = servicio;
        this.descripcion = descripcion;
    }
}