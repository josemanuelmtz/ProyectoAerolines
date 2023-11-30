import { Router } from 'express'
import { getServicios } from '../controller/servicio.controller.js'

const router = Router()

router.get('/servicio', getServicios)

export default router