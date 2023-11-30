export class Empresa {
    id_empresa? : number;
    nombre : string;
    estatus : number;
    correo : string;
    direccion : string;
    telefono : string;
    poli_condi : string;
    id_usuario: number;

    constructor(id_empresa : number, nombre : string, estatus : number, correo : string, direccion : string, telefono : string, poli_condi : string, id_usuario : number){
        this.id_empresa = id_empresa;
        this.nombre = nombre;
        this.estatus = estatus;
        this.correo = correo;
        this.direccion = direccion;
        this.telefono = telefono;
        this.poli_condi = poli_condi;
        this.id_usuario = id_usuario;
    }
}
