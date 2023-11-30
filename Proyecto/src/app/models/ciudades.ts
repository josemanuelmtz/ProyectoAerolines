export class Ciudad{
    id_ciudad?: number;
    nombre:string;
	

    constructor(id_ciudad: number, nombre:string){
        this.id_ciudad = id_ciudad,
        this.nombre = nombre
    }
}