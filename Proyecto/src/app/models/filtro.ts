export class Filtro {
    id_? : number;
    origen : string;
    destino : string;
    fecha_vuelo : Date;
    costo: Number;
    tipo_avion: string;

    constructor(id_ : number, origen : string, destino : string, fecha_vuelo : Date, costo : Number , tipo_avion : string){
        this.id_ = id_;
        this.origen = origen;
        this.destino = destino;
        this.fecha_vuelo = fecha_vuelo;
        this.costo = costo;
        this.tipo_avion = tipo_avion;
    }
}
