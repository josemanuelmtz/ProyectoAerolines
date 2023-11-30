import { pool } from '../model.js'

export const getCiudades = async (req, res) =>{
    const[rows]=await pool.query('SELECT nombre FROM ciudad')
    res.json(rows)
}