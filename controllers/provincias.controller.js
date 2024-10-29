// CONTROLADORES DEL MÓDULO

// Requiere la configuración de la base de datos desde el archivo '../db/db'
const db = require("../db/db");

// METODO GET
// Para todas las provincias
const allProvincias = (req, res) => {
    const sql = "SELECT * FROM provincias"; // Consulta SQL para obtener todas las provincias
    db.query(sql, (error, rows) => { // Ejecuta la consulta en la base de datos
        // console.log(rows); // Imprime los resultados en la consola para depuración

        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Enviamos un error 500 al cliente
        }
        res.json(rows); // Enviamos la respuesta con todas las provincias
    });
};

// Para una provincia específica
const showProvincia = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const sql = "SELECT * FROM provincias WHERE id_provincia = ?"; // Consulta SQL para obtener una provincia por ID
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta en la base de datos
       // console.log(rows); // Imprime los resultados en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Enviamos un error 500 al cliente
        }
        if (rows.length == 0) { // Si no se encuentra la provincia
            return res.status(404).send({ error: "ERROR: No existe la provincia" }); // Enviamos un error 404 al cliente
        }
        res.json(rows[0]); // Enviamos la respuesta con la provincia encontrada
    });
};

// METODO POST
const storeProvincia = (req, res) => {
    const { nombre_provincia } = req.body; // Extraemos el nombre de la provincia del cuerpo de la solicitud
    const sql = "INSERT INTO provincias (nombre_provincia) VALUES (?)"; // Consulta SQL para insertar una nueva provincia
    db.query(sql, [nombre_provincia], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        const provincia = { ...req.body, id: result.insertId }; // Reconstruimos el objeto del body con el ID insertado
        res.status(201).json(provincia); // Enviamos una respuesta exitosa con la provincia creada
    });
};

// METODO PUT
const updateProvincia = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const { nombre_provincia } = req.body; // Extraemos el nombre de la provincia del cuerpo de la solicitud
    const sql = "UPDATE provincias SET nombre_provincia = ? WHERE id_provincia = ?"; // Consulta SQL para actualizar una provincia
    db.query(sql, [nombre_provincia, id], (error, result) => { // Ejecuta la consulta en la base de datos
       // console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se actualiza ninguna fila
            return res.status(404).send({ error: "Error, provincia a modificar no existe" }); // Enviamos un error 404 al cliente
        }
        const provincia = { ...req.body, ...req.params }; // Reconstruimos el objeto del body con los datos actualizados
        res.json(provincia); // Enviamos la respuesta con la provincia actualizada
    });
};

// METODO DELETE
const destroyProvincia = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const sql = "DELETE FROM provincias WHERE id_provincia = ?"; // Consulta SQL para eliminar una provincia
    db.query(sql, [id], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se elimina ninguna fila
            return res.status(404).send({ error: "ERROR: La provincia a eliminar no existe" }); // Enviamos un error 404 al cliente
        }
        res.json({ mensaje: "Provincia eliminada" }); // Enviamos una respuesta exitosa indicando que la provincia fue eliminada
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allProvincias,
    showProvincia,
    storeProvincia,
    updateProvincia,
    destroyProvincia
};
