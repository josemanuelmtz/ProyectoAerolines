//const express = require('express');
import express from 'express'
//import { reservaRoutes } from './routes/reserva.routes.js'
import  reservaRoutes  from './routes/reserva.routes.js';
import cors from 'cors'
import PagosRoutes from './routes/pagos.routes.js';
import { PORT } from './config.js';
import path from "path";
import morgan from "morgan";
//const cors = require('cors');

const app = express()

app.use(cors())
//app.set('port', process.env.PORT || 3001);
app.use(morgan("dev"));
app.use(PagosRoutes);
app.use(express.static(path.resolve("./src/public")));
app.listen(PORT)
console.log(`Server on port http://localhost:${PORT}`);
console.log(`environment: ${process.env.NODE_ENV}`);

app.get('/pago', (req, res) => {
    // Renderiza la página HTML en el backend
    const pageHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>My Website.com</title>
        </head>
        <body>
          <button id="checkout">Checkout!</button>
  
          <script>
            const checkout = document.getElementById("checkout");
            checkout.addEventListener("click", async () => {
              const response = await fetch("/create-order", {
                method: "POST",
              });
              const data = await response.json();
              window.location.href = data.links[1].href
            });
          </script>
        </body>
      </html>
    `;
  
    res.send(pageHTML);
  });
  
/*
app.listen(app.get('port'), () =>{
    console.log(`Server is running on port ${app.get('port')}`)
})*/
console.log('Puerto',PORT)
app.use(express.json())
app.use(reservaRoutes)