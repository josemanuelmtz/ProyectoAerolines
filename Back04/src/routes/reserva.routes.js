import { Router } from 'express'
import { destino, buscador, detalles, createReserva, origen, reservas, cancelReserva } from '../controller/reserva.controller.js'

const router = Router()
 router.get('/calendario/vuelos', buscador);
 router.get('/calendario/origen', origen);  
 router.get('/calendario/destino', destino);  
 router.get('/calendario/detalles', detalles);
 router.post('/calendario/creaReserva', createReserva);
 router.delete('/calendario/cancelReserva', cancelReserva);
 router.get('/calendario/reservas', reservas);
export default router