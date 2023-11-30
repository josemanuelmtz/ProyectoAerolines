const express = require('express');
const app = express();
const port = 3001;

const router = express.Router();

const cors = require('cors'); 
app.use(cors()); 

const mysql = require('mysql');
app.use(express.json());

const bcrypt = require('bcrypt');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Proyecto1'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');

});

// Ruta de registro
app.post('/registrar', (req, res) => {
  const { usuario, contrasena, rol } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }
  const newUser = { usuario, contrasena, rol };
  db.query('INSERT INTO usuario SET ?', newUser, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  });
});

// Ruta de login
app.get('/login', (req, res) => {
  const { usuario, contrasena } = req.query;

  if (!usuario || !contrasena) {
    return res.status(400).json({ message: 'Por favor, proporcione usuario y contraseña' });
  }

  const query = 'SELECT * FROM usuario WHERE usuario = ? AND contrasena = ?';
  db.query(query, [usuario, contrasena], (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos: ' + err.message);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      // El usuario ha iniciado sesión con éxito
      const idUsuario = results[0].id_usuario;
      const rolUsuario = results[0].rol;
      // Guarda el id_usuario en app.locals para que esté disponible en otras rutas
      app.locals.idUsuario = idUsuario;
      app.locals.rolUsuario = rolUsuario;
      //usuario
      const usuario = results[0];
      return res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: {
        idUsuario,
        rolUsuario
      } });
    } else {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

app.get('/id', (req, res) => {
  const idUsuario = app.locals.idUsuario;

  if (idUsuario) {
    // Utiliza el ID de usuario para realizar alguna acción
    res.status(200).json({ message: 'ID de usuario disponible', idUsuario });
  } else {
    res.status(401).json({ message: 'ID de usuario no disponible' });
  }
});

// Ruta para usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    res.status(200).json(results);
  });
});

// Ruta de reservas
app.get('/reservas', (req, res) => {
  const idUsuario = app.locals.idUsuario;

  if (!idUsuario) {
    return res.status(401).json({ message: 'No has iniciado sesión' });
  }

  db.query('SELECT * FROM reserva WHERE id_usuario = ?', [idUsuario], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    res.status(200).json(results);
  });
});

//andrea 
// Crea una empresa
app.post('/empresa', (req, res) => {
  const empresa = req.body;
  db.query('INSERT INTO empresa SET ?', empresa, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    res.status(201).json({ message: 'Empresa creada con éxito' });
  });
});
// Lee una empresa por ID
app.get('/empresa/:id', (req, res) => {
  const idEmpresa = req.params.id;
  db.query('SELECT * FROM empresa WHERE id_empresa = ?', [idEmpresa], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Empresa no encontrada' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Actualiza una empresa por ID
app.put('/empresa/:id', (req, res) => {
  const idEmpresa = req.params.id;
  const nuevaEmpresa = req.body;
  db.query('UPDATE empresa SET ? WHERE id_empresa = ?', [nuevaEmpresa, idEmpresa], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Empresa no encontrada' });
    } else {
      res.status(200).json({ message: 'Empresa actualizada con éxito' });
    }
  });
});

// Borra una empresa por ID
app.delete('/empresa/:id', (req, res) => {
  const idEmpresa = req.params.id;
  db.query('DELETE FROM empresa WHERE id_empresa = ?', [idEmpresa], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Empresa no encontrada' });
    } else {
      res.status(200).json({ message: 'Empresa eliminada con éxito' });
    }
  });
});

module.exports = router;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
