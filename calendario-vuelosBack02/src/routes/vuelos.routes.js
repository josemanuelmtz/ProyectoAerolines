import { Router } from 'express'
import {getVuelos, getVuelo, createVuelo, updateVuelo, deleteVuelo} from '../controller/vuelos.controller.js'

const router = Router()

router.get('/vuelos/emp/:id', getVuelos)

router.get('/vuelos/:id', getVuelo)

router.post('/vuelos/new', createVuelo)

router.put('/vuelos/update/:id', updateVuelo)

router.delete('/vuelos/delete/:id', deleteVuelo)

export default router