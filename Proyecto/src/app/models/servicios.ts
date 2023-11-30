export class Servicio{
    id_servicio?: number;
    nombre:string;
    descripcion:string;
	

    constructor(id_servicio: number, nombre:string, descripcion:string){
        this.id_servicio = id_servicio,
        this.nombre = nombre,
        this.descripcion = descripcion
    }
}