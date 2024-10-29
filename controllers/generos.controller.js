// CONTROLADORES DEL MÓDULO

// Requiere la configuración de la base de datos desde el archivo '../db/db'
const db = require("../db/db");

// METODO GET
// Para todas las generos
const allGeneros = (req, res) => {
    const sql = "SELECT * FROM generos"; // Consulta SQL para obtener todas los generos
    db.query(sql, (error, rows) => { // Ejecuta la consulta en la base de datos
        // console.log(rows); // Imprime los resultados en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Enviamos un error 500 al cliente
        }
        res.json(rows); // Enviamos la respuesta con todas los generos
    });
};

// Para un genero específico
const showGenero = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const sql = "SELECT * FROM generos WHERE id_genero = ?"; // Consulta SQL para obtener un genero por ID
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta en la base de datos
        console.log(rows); // Imprime los resultados en la consola para depuración
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
const storeGenero = (req, res) => {
    const { nombre_genero } = req.body; // Extraemos el nombre del genero del cuerpo de la solicitud
    const sql = "INSERT INTO generos (nombre_genero) VALUES (?)"; // Consulta SQL para insertar un nuevo genero
    db.query(sql, [nombre_genero], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        const genero = { ...req.body, id: result.insertId }; // Reconstruimos el objeto del body con el ID insertado
        res.status(201).json(genero); // Enviamos una respuesta exitosa con la provincia creada
    });
};

// METODO PUT
const updateGenero = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const { nombre_genero } = req.body; // Extraemos el nombre del genero del cuerpo de la solicitud
    const sql = "UPDATE generos SET nombre_genero = ? WHERE id_genero = ?"; // Consulta SQL para actualizar un genero
    db.query(sql, [nombre_genero, id], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se actualiza ninguna fila
            return res.status(404).send({ error: "Error, género a modificar no existe" }); // Enviamos un error 404 al cliente
        }
        const genero = { ...req.body, ...req.params }; // Reconstruimos el objeto del body con los datos actualizados
        res.json(genero); // Enviamos la respuesta con la provincia actualizada
    });
};

// METODO DELETE
const destroyGenero = (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    const sql = "DELETE FROM generos WHERE id_genero = ?"; // Consulta SQL para eliminar un genero
    db.query(sql, [id], (error, result) => { // Ejecuta la consulta en la base de datos
        console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se elimina ninguna fila
            return res.status(404).send({ error: "ERROR: El género a eliminar no existe" }); // Enviamos un error 404 al cliente
        }
        res.json({ mensaje: "Género eliminado" }); // Enviamos una respuesta exitosa indicando que el género fue eliminada
    });
};

// EXPORTAR DEL MÓDULO TODAS LAS FUNCIONES
module.exports = {
    allGeneros,
    showGenero,
    storeGenero,
    updateGenero,
    destroyGenero
};
