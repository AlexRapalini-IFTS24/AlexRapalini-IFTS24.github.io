// CONTROLADORES DEL MODULO
const db = require("../db/db"); // Requiere la configuración de la base de datos desde el archivo '../db/db'

// METODO GET
// Para todos los tipos de cerveza
const allCerveza = (req, res) => {
    const sql = "SELECT * FROM tipo_cerveza"; // Consulta SQL para seleccionar todos los tipos de cerveza
    db.query(sql, (error, rows) => { // Ejecuta la consulta
         //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Envía un error 500 al cliente
        }
        res.json(rows); // Envía la lista de tipos de cerveza como respuesta
    });
};

// Para un tipo de cerveza específico
const showCerveza = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const sql = "SELECT * FROM tipo_cerveza WHERE id_tipo_cerveza = ?"; // Consulta SQL para seleccionar un tipo de cerveza específico por ID
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta con el ID proporcionado
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Envía un error 500 al cliente
        }
        if (rows.length == 0) { // Si no se encuentra el tipo de cerveza
            return res.status(404).send({ error: "ERROR: No existe ese tipo de cerveza" }); // Envía un error 404 al cliente
        }
        res.json(rows[0]); // Envía el tipo de cerveza encontrado como respuesta
    });
};


//METODO POST//

const storeCerveza = (req, res) => {
    const { nombre_tipo_cerveza, caracteristica } = req.body; // Extraemos 'nombre_tipo_cerveza' y 'caracteristica' del cuerpo de la solicitud

    // Consulta SQL para insertar un nuevo tipo de cerveza en la base de datos
    const sql = "INSERT INTO tipo_cerveza (nombre_tipo_cerveza, caracteristica) VALUES (?, ?)";
    
    // Ejecutamos la consulta en la base de datos
    db.query(sql, [nombre_tipo_cerveza, caracteristica], (error, result) => {
        //console.log(result); // Imprimimos el resultado en la consola para depuración
        
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }

        // Reconstruimos el objeto de la cerveza con los datos del cuerpo y el ID insertado
        const cerveza = { ...req.body, id: result.insertId };
        
        res.status(201).json(cerveza); // Enviamos una respuesta exitosa con el tipo de cerveza creado
    });
};


// METODO PUT
// Para actualizar un tipo de cerveza existente por ID
const updateCerveza = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const { nombre_tipo_cerveza, caracteristica } = req.body; // Extraemos los campos del cuerpo de la solicitud
    const sql = "UPDATE tipo_cerveza SET nombre_tipo_cerveza = ?, caracteristica = ? WHERE id_tipo_cerveza = ?"; // Consulta SQL para actualizar un tipo de cerveza existente por ID
    db.query(sql, [nombre_tipo_cerveza, caracteristica, id], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Envía un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se actualizó ningún registro
            return res.status(404).send({ error: "Error, tipo de cerveza a modificar no existe" }); // Envía un error 404 al cliente
        }
        const cerveza = { ...req.body, ...req.params }; // Reconstruimos el objeto del cuerpo de la solicitud con el ID de los parámetros
        res.json(cerveza); // Envía el tipo de cerveza actualizado como respuesta
    });
};

// METODO DELETE
// Para eliminar un tipo de cerveza por ID
const destroyCerveza = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const sql = "DELETE FROM tipo_cerveza WHERE id_tipo_cerveza = ?"; // Consulta SQL para eliminar un tipo de cerveza por ID
    db.query(sql, [id], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Envía un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se eliminó ningún registro
            return res.status(404).send({ error: "ERROR: El tipo de cerveza a eliminar no existe" }); // Envía un error 404 al cliente
        }
        res.json({ mensaje: "Tipo de cerveza eliminada" }); // Envía una respuesta exitosa indicando que el tipo de cerveza fue eliminado
    });
};

// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allCerveza,
    showCerveza,
    storeCerveza,
    updateCerveza,
    destroyCerveza
};