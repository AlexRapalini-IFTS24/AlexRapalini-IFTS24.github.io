const bcrypt = require('bcrypt');
const db = require('../db/db');

// Metodo GET
// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => { // Ejecuta una consulta para seleccionar todos los usuarios
       // console.log(results); // Imprime el resultado en la consola
        if (error) { // Si ocurre un error durante la consulta
            // console.error('Error al obtener los usuarios:', error); // Opción para imprimir el error en la consola para depuración (comentado)
            return res.status(500).send('Error al obtener los usuarios'); // Envía un error 500 al cliente
        }
        res.status(200).json(results); // Envía la lista de usuarios como respuesta en formato JSON
    });
};

// Obtener un usuario por ID
const getUser = (req, res) => {
    const userId = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL
    db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [userId], (error, results) => { // Ejecuta una consulta para seleccionar un usuario específico por ID
        // console.log(results); // Imprime el resultado en la consola
        if (error) { // Si ocurre un error durante la consulta
            // console.error('Error al obtener el usuario:', error); // Opción para imprimir el error en la consola 
            return res.status(500).send('Error al obtener el usuario'); // Envía un error 500 al cliente
        }
        if (results.length === 0) return res.status(404).send('Usuario no encontrado'); // Si no se encuentra el usuario, envía un error 404
        res.status(200).json(results[0]); // Envía el usuario encontrado como respuesta en formato JSON
    });
};




const express = require('express'); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const multer = require('multer'); // Requiere el módulo 'multer', que es un middleware para manejar la subida de archivos en Node.js.
const jwt = require('jsonwebtoken'); // Requiere el módulo 'jsonwebtoken', que se utiliza para crear y verificar tokens JSON Web.


const app = express(); // Crea una instancia de la aplicación Express.

const upload = multer({ dest: 'uploads/' }); // Define el directorio donde se guardarán las imágenes subidas

app.use(express.json()); // Middleware para parsear JSON
//cualquier dato en formato JSON enviado al servidor es automáticamente transformado en un objeto JavaScript accesible en los controladores o rutas.




//Metodo PUT
//Actualizar usuario por ID
const updateUser = (req, res) => {
    const userId = req.params.id; // Obtenemos el ID de los parámetros de la URL
    let imageName = ""; // Variable para almacenar el nombre de la imagen
    if (req.file) { // Verificamos si se ha subido un archivo
        imageName = req.file.filename; // Asignamos el nombre del archivo subido a la variable imageName
    }
 // Extraemos los campos del cuerpo de la solicitud
    const { nombre, apellido, fk_rol_usuario, email, password } = req.body;
    if (!nombre || !apellido || !fk_rol_usuario || !email || !password) {// Verificamos que todos los campos estén presentes
        return res.status(400).send('Todos los campos son requeridos.');// Si falta algún campo, enviamos un error 400
    }

    // Encriptamos la contraseña utilizando bcrypt
    bcrypt.hash(password, 8, (err, hashedPassword) => {
        if (err) { // Si ocurre un error durante el proceso de encriptación
            //console.error('Error al encriptar la contraseña:', err); // Lo registramos en la consola
            return res.status(500).send('Error al encriptar la contraseña'); // Enviamos un error 500 al cliente
        }
        // Consulta SQL para actualizar el usuario en la base de datos
        const query = `UPDATE usuarios SET nombre = ?, apellido = ?, imagen_perfil = ?, fk_rol_usuario = ?, email = ?, password = ? WHERE id_usuario = ?`;

        // Valores a actualizar en la base de datos
        const values = [nombre, apellido, imageName, fk_rol_usuario, email, hashedPassword, userId];
        // Ejecutamos la consulta en la base de datos
        db.query(query, values, (error, results) => {
            // console.log(results); // Imprime el resultado en la consola
            if (error) { // Si ocurre un error durante la consulta
                console.error('Error actualizando usuario:', error); // Lo registramos en la consola
                return res.status(500).send({ auth: false, token: null }); // Enviamos un error 500 al cliente
            }

             // Generamos un token JWT para el usuario actualizado
            const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
             // Enviamos una respuesta exitosa con el ID del usuario y el token
            res.status(200).send({ id: userId, auth: true, token });
        });
    });
};



// Metodo DELETE
// Eliminar un usuario por ID
const deleteUser = (req, res) => {
    const userId = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL
    db.query('DELETE FROM usuarios WHERE id_usuario = ?', [userId], (error, results) => { // Ejecuta una consulta para eliminar un usuario específico por ID
        // console.log(results); // Imprime el resultado en la consola
        if (error) { // Si ocurre un error durante la consulta
            // console.error('Error deleting user:', error); // Opción para imprimir el error en la consola para depuración (comentado)
            return res.status(500).send('Error eliminando usuario'); // Envía un error 500 al cliente
        }
        if (results.affectedRows === 0) return res.status(404).send('Usuario no encontrado'); // Si no se encuentra el usuario, envía un error 404
        res.status(200).send('Usuario eliminado'); // Envía una respuesta exitosa
    });
};

// Exporta las funciones del módulo
module.exports = 
{ 
    getAllUsers,
    getUser, 
    updateUser, 
    deleteUser 
};

