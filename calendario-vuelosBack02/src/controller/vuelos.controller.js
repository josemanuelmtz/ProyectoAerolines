import { pool } from '../model.js'

export const getVuelos = async (req, res) =>{
    /*const[rows, fields]=await pool.query('SELECT * FROM calendario_vuelos')
    res.json(rows)*/
    try {
        const [rows, fields] = await pool.query('SELECT * FROM calendario_vuelos WHERE id_empresa=?',[req.params.id]);
        res.json(rows);
      } catch (error) {
        console.error('Error al obtener datos de vuelos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
      }
}

export const getVuelo= async (req, res) =>{
  try {
    const[rows,fiels]= await pool.query('SELECT * FROM calendario_vuelos WHERE id_vuelos=?',[req.params.id])
    res.json(rows[0])
  } catch (error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
    
}

export const createVuelo = async (req, res) =>{
  try {
    const nuevoVuelo = req.body
    const[result]= await pool.query('INSERT INTO calendario_vuelos SET ?', [nuevoVuelo])
    res.json('insertado')
  } catch (error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
}

export const updateVuelo = async (req, res) => {
  try {
    const { id } = req.params; 
    const {id_empresa, id_servicio, origen, destino, hora_salida,  asientos_dis, fecha_vuelos, tipo_avion, costo } = req.body
    const [result] = await pool.execute(
      'UPDATE calendario_vuelos SET id_empresa = ?, id_servicio = ?, origen = ?, destino = ?, hora_salida = ?, asientos_dis = ?, fecha_vuelos = ?, tipo_avion = ?, costo = ? WHERE id_vuelos = ?',
      [id_empresa, id_servicio, origen, destino, hora_salida, asientos_dis, fecha_vuelos, tipo_avion, costo, id]
    )
    res.json('insertado')
  } catch (error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
    
}

export const deleteVuelo = async (req, res) => {
    const [result] = await pool.execute(
        'DELETE FROM calendario_vuelos WHERE id_vuelos = ?',[req.params.id]
      )
      res.json('Vuelo Eliminado')
}

