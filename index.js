//CONFIRMAR LO QUE SERÍA UN SERVIDOR CON LAS MISMAS PRESTACIONES PARA CORRER EXPRESS
//Que este escuchando y tengamos una ruta principal "/" en el proyecto

const express = require("express");
const app = express();

app.use(express.json());
//en el cuerpo de la peticion viene un json , lo voy a transformar en un objeto JS
//y de esta manera lo voy a poder utilizar

const clientesRouter = require('./routers/clientes.router');
app.use('/clientes', clientesRouter);
//siempre q me refiera a clientes le coloco el prefijo

const provinciasRouter = require('./routers/provincias.router');
app.use('/provincias', provinciasRouter);

app.get("/", (req, res) => {
    res.send("Hola Cinema");
});
//esta es la ruta principal del proyecto "/"

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
