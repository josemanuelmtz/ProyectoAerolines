import express from 'express'
import empresasRoutes from './routes/empresa.routes.js'
import cors from 'cors'
const app = express()

app.use(cors())
app.set('port', process.env.PORT || 3003);
//app.listen(3001)
app.listen(app.get('port'), () =>{
    console.log(`Server is running on port ${app.get('port')}`)
})
app.use(express.json())
app.use(empresasRoutes)

/*app.get('/datos', async (req, res) => {
    await pool.query('SELECT * From empresa WHERE ')
})*/