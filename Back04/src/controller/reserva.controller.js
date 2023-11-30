import { pool } from '../model.js'

export const origen = async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT id_vuelos, origen FROM calendario_vuelos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos de origen:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de origen' });
  }
}

export const destino = async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT id_vuelos, destino FROM calendario_vuelos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos de destino:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de destino' });
  }
}

export const buscador = async (req, res) => {
  const { origen, destino, fecha } = req.query; // Obtén los parámetros de filtro de la solicitud

  // Crea una consulta SQL parametrizada
  const sql = 'SELECT * FROM calendario_vuelos WHERE origen = ? AND destino = ? AND fecha_vuelos = ?';

  try {
    const [rows, fields] = await pool.execute(sql, [origen, destino, fecha]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener vuelos por filtro:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los vuelos por filtro' });
  }
}

  export const detalles = async (req, res) => {
    const { id_vuelos } = req.query; // Obtén los parámetros de filtro de la solicitud
    // Crea una consulta SQL parametrizada
    const sql = 'SELECT cv.id_vuelos, cv.origen, cv.destino, cv.fecha_vuelos, cv.hora_salida, cv.costo, e.nombre AS nombre_empresa, s.nombre AS nombre_servicio, s.descripcion AS descripcion_servicio FROM calendario_vuelos cv INNER JOIN empresa e ON cv.id_empresa = e.id_empresa INNER JOIN servicio s ON cv.id_servicio = s.id_servicio WHERE cv.id_vuelos = ?';

    try {
      const [rows, fields] = await pool.execute(sql, [id_vuelos]);
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener detalles de los vuelos:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener detalles de los vuelos' });
    }

  }

  
  let reservaGuardada = false;

  export const createReserva = async (req, res) => {
    try {
      if (reservaGuardada) {
        // Ya se ha guardado una reserva, no permitir otra inserción
        res.status(400).json('Solo se permite una reserva');
        return;
      }
  
      const nuevaReserva = req.body;
      const [result] = await pool.query('INSERT INTO reserva SET ?', [nuevaReserva]);
      reservaGuardada = true;
      res.json('Reserva insertada');
    } catch (error) {
      console.error('Error al obtener datos de la reserva:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la reserva' });
    }
  }
  
  export const cancelReserva = async (req, res) => {
    const { id_reserva } = req.query;
    const sql = ('DELETE FROM reserva WHERE id_reserva = ?');
    try{
      const[result]=await pool.execute(sql,[id_reserva]);
      res.json('Eliminado');
    }catch(error){
      console.error('Error al obtener datos de reservas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de reservas' });
    }
}

export const reservas = async (req, res) => {
  const { id_usuario } = req.query;

  const sql = ('SELECT * FROM reserva WHERE id_usuario = ?');
  try {
    const [rows, fields] = await pool.execute(sql, [id_usuario]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos de reservas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de reservass' });
  }
}
  

//  export const createReserva = async (req, res) =>{
//     try {
//       const nuevaReserva = req.body
//       const[result]= await pool.query('INSERT INTO reserva SET ?', [nuevaReserva])
//       res.json('insertado')
//     } catch (error) {
//       console.error('Error al obtener datos de la reserva:', error);
//       res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la reserva' });
//     }
//   }