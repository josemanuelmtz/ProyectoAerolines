import { Router } from 'express'
import { getCiudades } from '../controller/ciudades.controller.js'

const router = Router()

router.get('/ciudad',getCiudades)



export default router