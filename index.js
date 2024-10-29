// CONFIRMAR LO QUE SERÍA UN SERVIDOR CON LAS MISMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyecto

require('dotenv').config(); // Requiere y configura las variables de entorno desde un archivo .env

const express = require("express"); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const app = express(); // Crea una instancia de la aplicación Express.

app.use(express.json()); // Middleware que transforma el cuerpo de la petición (JSON) en un objeto JavaScript.

const clientesRouter = require('./routers/clientes.router'); // Requiere el enrutador de clientes.
app.use('/clientes', clientesRouter); // Usa el enrutador de clientes con el prefijo '/clientes'.

const provinciasRouter = require('./routers/provincias.router'); // Requiere el enrutador de provincias.
app.use('/provincias', provinciasRouter); // Usa el enrutador de provincias con el prefijo '/provincias'.

const authRouter = require('./routers/auth.router'); // Requiere el enrutador de autenticación.
app.use("/auth", authRouter); // Usa el enrutador de autenticación con el prefijo '/auth'.

const userRouter = require('./routers/user.router'); // Requiere el enrutador de usuarios.
app.use("/user", userRouter); // Usa el enrutador de usuarios con el prefijo '/user'.

const cervezaRouter = require('./routers/cerveza.router'); // Requiere el enrutador de cervezas.
app.use("/cerveza", cervezaRouter); // Usa el enrutador de cervezas con el prefijo '/cerveza'.

const comentarioRouter = require('./routers/comentario.router'); // Requiere el enrutador de comentarios.
app.use("/comentario", comentarioRouter); // Usa el enrutador de comentarios con el prefijo '/comentario'.

const generosRouter = require('./routers/generos.router'); // Requiere el enrutador de géneros.
app.use("/generos", generosRouter); // Usa el enrutador de géneros con el prefijo '/generos'.

// Define la ruta principal del proyecto
app.get("/", (req, res) => {
    res.send("Hola Cliente"); // Envía una respuesta "Hola Cliente" cuando se accede a la ruta principal
});

const PORT = process.env.PORT || 3000; // Obtiene el puerto desde las variables de entorno o usa el puerto 3000 por defecto
app.listen(PORT, () => console.log(`http://localhost:${PORT}`)); // Inicia el servidor y escucha en el puerto definido
