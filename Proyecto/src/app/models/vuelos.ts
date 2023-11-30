// Interfaz para los observadores
interface Observer {
    update(vuelo: Vuelos): void;
}

export class Vuelos{
    id_vuelos?: number;
    id_empresa:number;
	id_servicio: number;
    origen: string;
    destino: string;
    hora_salida: string;
    asientos_dis: number;
    fecha_vuelos: string;
    tipo_avion: string;
    costo: number;

    constructor(id_vuelos: number,id_empresa:number, id_servicio: number, origen: string, destino: string, hora_salida: string, asientos_dis: number, fecha_vuelos: string, tipo_avion: string, costo: number){
        this.id_vuelos = id_vuelos,
        this.id_empresa = id_empresa,
	    this.id_servicio = id_servicio,
        this.origen = origen,
        this.destino = destino,
        this.hora_salida = hora_salida,
        this.asientos_dis = asientos_dis,
        this.fecha_vuelos = fecha_vuelos,
        this.tipo_avion= tipo_avion,
        this.costo = costo
    }

// Clase Vuelos

    // ... (resto del código de la clase)

    // Lista de observadores
    private observadores: Observer[] = [];

    // Método para agregar observadores
    agregarObservador(observador: Observer) {
        this.observadores.push(observador);
    }

    // Método para eliminar observadores
    eliminarObservador(observador: Observer) {
        this.observadores = this.observadores.filter(obs => obs !== observador);
    }

    // Método para notificar a los observadores
    notificarObservadores() {
        this.observadores.forEach(observador => {
            observador.update(this);
        });
    }

    // Otros métodos de la clase...

    // Por ejemplo, un método que actualiza los datos y notifica a los observadores
    actualizarDatos() {
        // ... (realizar la actualización de datos)
        // Después de la actualización, notificar a los observadores
        this.notificarObservadores();
    }
}

// Ejemplo de un observador concreto (podría haber más)
class ObservadorEjemplo implements Observer {
    update(vuelo: Vuelos) {
        console.log(`Notificación: Los datos del vuelo con ID ${vuelo.id_vuelos} han cambiado.`);
    }
}

// Uso de la clase Vuelos y el patrón Observer
const vuelo = new Vuelos(
        1,                  // id_vuelos
        123,                // id_empresa
        456,                // id_servicio
        'Ciudad A',         // origen
        'Ciudad B',         // destino
        '12:00 PM',         // hora_salida
        100,                // asientos_dis
        '2023-12-01',       // fecha_vuelos
        'Avión Tipo X',     // tipo_avion
        500.00              // costo    
);

const observador1 = new ObservadorEjemplo();
const observador2 = new ObservadorEjemplo();

// Agregar observadores al vuelo
vuelo.agregarObservador(observador1);
vuelo.agregarObservador(observador2);

// Realizar cambios en los datos del vuelo
vuelo.actualizarDatos();