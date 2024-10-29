//CONTROLADORES DEL MODULO//
const db = require("../db/db")
const express = require('express'); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const multer = require('multer'); // Requiere el módulo 'multer', que es un middleware para manejar la subida de archivos en Node.js.

const app = express(); // Crea una instancia de la aplicación Express.

const upload = multer({ dest: 'uploadsComentarios/' }); // Define el directorio donde se guardarán las imágenes subidas

// METODO GET
// Para todos los comentarios
const allComentario = (req, res) => {
    const sql = "SELECT * FROM comentario"; // Consulta SQL para seleccionar todos los comentarios
    db.query(sql, (error, rows) => { // Ejecuta la consulta
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Envía un error 500 al cliente
        }
        res.json(rows); // Envía la lista de comentarios como respuesta
    });
};

// Para un comentario específico
const showComentario = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const sql = "SELECT * FROM comentario WHERE id_comentario = ?"; // Consulta SQL para seleccionar un comentario específico por ID
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta con el ID proporcionado
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Envía un error 500 al cliente
        }
        if (rows.length == 0) { // Si no se encuentra el comentario
            return res.status(404).send({ error: "ERROR: No existe el comentario" }); // Envía un error 404 al cliente
        }
        res.json(rows[0]); // Envía el comentario encontrado como respuesta
    });
};




//METODO POST//

const storeComentario = (req, res) => {
    console.log(req.file); // Imprime información del archivo en la consola para depuración
    let imageName = ""; // Creo la variable en blanco para almacenar el nombre de la imagen
    if (req.file) { // Verifico si se ha subido un archivo
        imageName = req.file.filename; // Asigno el nombre del archivo subido a la variable imageName
    }
    
    // Extraigo los campos del cuerpo de la solicitud
    const { fk_cliente, comentario } = req.body;
    
    // Consulta SQL para insertar un nuevo comentario en la base de datos
    const sql = "INSERT INTO comentario (fk_cliente, comentario, imagen) VALUES (?,?,?)";
    
    // Ejecutamos la consulta en la base de datos
    db.query(sql, [fk_cliente, comentario, imageName], (error, result) => {
        //console.log(result); // Imprimimos el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            console.error('Error en la consulta SQL:', error); // Imprimimos el error completo en la consola
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        
        // Reconstruimos el objeto del comentario con los datos proporcionados y el ID insertado
        const comentario = { ...req.body, id: result.insertId };
        
        res.status(201).json(comentario); // Enviamos una respuesta exitosa con el comentario creado
    });
};



    


//METODO PUT//
const updateComentario = (req, res) => {
    const userId = req.params.id; // Obtenemos el ID de los parámetros de la URL
    
    let imageName = ""; // Variable para almacenar el nombre de la imagen
    if (req.file) { // Verificamos si se ha subido un archivo
        imageName = req.file.filename; // Asignamos el nombre del archivo subido a la variable imageName
    }
    
    // Extraemos los campos del cuerpo de la solicitud
    const { fk_cliente, comentario } = req.body;
    if (!fk_cliente || !comentario) { // Verificamos que todos los campos estén presentes
        return res.status(400).send('Todos los campos son requeridos.'); // Si falta algún campo, enviamos un error 400
    }

    // Consulta SQL para actualizar el usuario en la base de datos
    const query = `
        UPDATE comentario SET fk_cliente = ?, comentario = ?, imagen = ? WHERE id_comentario = ?`;

    // Valores a actualizar en la base de datos
    const values = [fk_cliente, comentario, imageName, userId];

    // Ejecutamos la consulta en la base de datos
    db.query(query, values, (error, results) => {
        //console.log(result); // Imprimimos el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            console.error('Error actualizando comentario:', error); // Lo registramos en la consola
            return res.status(500).send({ error: 'Error actualizando comentario' }); // Enviamos un error 500 al cliente
        }

        if (results.affectedRows == 0) { // Si no se actualizó ningún registro
            return res.status(404).send({ error: "Comentario no encontrado" }); // Enviamos un error 404 al cliente
        }

        // Enviamos una respuesta exitosa
        // res.status(200).send({ message: "Comentario actualizado correctamente", id: userId });
        const comentario = {...req.body, ...req.params}; // ... reconstruir el objeto del body
        res.json(comentario);//muestro el elemento q existe
    });
};





// METODO DELETE
const destroyComentario = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const sql = "DELETE FROM comentario WHERE id_comentario = ?"; // Consulta SQL para eliminar un comentario de la base de datos
    
    db.query(sql, [id], (error, result) => { // Ejecuta la consulta en la base de datos
        //console.log(result); // Imprime el resultado en la consola para depuración
        
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Envía un error 500 al cliente
        }
        
        if (result.affectedRows == 0) { // Si no se eliminó ningún registro
            return res.status(404).send({ error: "ERROR: El comentario a eliminar no existe" }); // Envía un error 404 al cliente
        }
        
        res.json({ mensaje: "Comentario eliminado" }); // Envía una respuesta exitosa con el mensaje "Comentario eliminado"
    });
};




//EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allComentario,
    showComentario,
    storeComentario, 
    updateComentario,
    destroyComentario
};