import { pool } from '../model.js'

export const getIdEmp = async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT id_empresa FROM empresa WHERE id_usuario= ?', [req.params.id]);
    if (rows.length !== 0) {
      const idEmpresa = rows[0].id_empresa;
      res.status(200).json(idEmpresa); // Devuelve un código 200 (OK) con el valor idEmpresa
    } else {
      res.status(404).json(null); // Devuelve un código 404 (Not Found) con un valor nulo
    }
  } catch (error) {
    console.error('Error al obtener datos de empresa:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la empresa' });
  }
}


export const getEmpresa = async (req, res) =>{
  try {
    const[rows]=await pool.query('SELECT * FROM empresa WHERE id_empresa = ?',[req.params.id])
    res.json(rows[0])
  } catch (error) {
    console.error('Error al obtener datos de empresa:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de la empresa' });
  }
    
}

export const newEmpresa = async (req, res) =>{
  try {
    const newEmpresa = req.body
    const[result]= await pool.query('INSERT INTO empresa SET ?', [newEmpresa])
    res.json('insertado')
  } catch (error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
}

export const updateEmpresa = async (req,res) =>{
  try {
    const { id } = req.params; 
    const {nombre, estatus, correo, direccion, telefono, poli_condi } = req.body
    const [result] = await pool.execute(
      'UPDATE empresa SET nombre=?, estatus = ?, correo = ?, direccion = ?, telefono = ?, poli_condi= ? WHERE id_empresa = ?',
      [nombre, estatus, correo, direccion, telefono, poli_condi, id]
    )
    const [rows]= await pool.query('SELECT * FROM empresa WHERE id_empresa = ?',[id])
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
    
}

export const bajaEmpresa = async (req,res) => {
  try{
    const { id } = req.params;
    const {estatus} = req.body
    const [result] = await pool.execute(
    'UPDATE empresa SET estatus = ? WHERE id_empresa = ?',[estatus,id]
    )
    res.json('Actualizado')
  }catch(error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
}

export const altaEmpresa = async (req,res) => {
  try{
    const { id } = req.params;
    const [result] = await pool.execute(
    'UPDATE empresa SET estatus = True WHERE id_empresa = ?',[id]
    )
    res.json('Actualizado')
  }catch(error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
}

export const deleteEmpresa = async (req,res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM empresa WHERE id_empresa = ?',[req.params.id]
    )
    res.json('Empresa Eliminada')
  } catch (error) {
    console.error('Error al obtener datos de vuelos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos de vuelos' });
  }
  
}