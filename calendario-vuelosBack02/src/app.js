import express from 'express'
import cors from 'cors'
import vuelosRoutes from './routes/vuelos.routes.js'
import ciudadesRoutes from './routes/ciudades.routes.js'
import serviciosRoutes from './routes/servicios.routes.js'

const app = express()
app.use(cors())
app.set('port', process.env.PORT || 3002);
app.listen(app.get('port'), () =>{
    console.log(`Server is running on port ${app.get('port')}`)
})
app.use(express.json())
app.use(vuelosRoutes)
app.use(ciudadesRoutes)
app.use(serviciosRoutes)