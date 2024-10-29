const jwt = require("jsonwebtoken"); // Requiere el módulo 'jsonwebtoken', que se utiliza para crear y verificar tokens JSON Web.
const bcrypt = require('bcrypt'); // Requiere el módulo 'bcrypt', que se utiliza para encriptar y comparar contraseñas.
const db = require('../db/db'); // Requiere la configuración de la base de datos desde el archivo '../db/db'.
const express = require('express'); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const multer = require('multer'); // Requiere el módulo 'multer', que es un middleware para manejar la subida de archivos en Node.js.
const app = express(); // Crea una instancia de la aplicación Express.
const upload = multer({ dest: 'uploads/' }); // Define el directorio donde se guardarán las imágenes subidas.



//METODO POST//
const register = (req, res) => {
  let imageName = ""; // Creo la variable en blanco para almacenar el nombre de la imagen
  if (req.file) { // Verifico si se ha subido un archivo
      imageName = req.file.filename; // Asigno el nombre del archivo subido a la variable imageName
  }

  // Extraigo los campos del cuerpo de la solicitud
  const { nombre, apellido, fk_rol_usuario, email, password } = req.body;
  if (!nombre || !apellido || !fk_rol_usuario || !email || !password) { // Verifico que todos los campos estén presentes
      return res.status(400).send('Todos los campos son requeridos.'); // Si falta algún campo, envío un error 400
  }

  // Encripto la contraseña utilizando bcrypt
  bcrypt.hash(password, 8, (err, hashedPassword) => {
      if (err) { // Si ocurre un error durante el proceso de encriptación
         // console.error('Error al encriptar la contraseña:', err); // Lo registro en la consola
          return res.status(500).send('Error al encriptar la contraseña'); // Envío un error 500 al cliente
      }

      // Consulta SQL para insertar un nuevo usuario en la base de datos
      const query = 'INSERT INTO usuarios (nombre, apellido, imagen_perfil, fk_rol_usuario, email, password) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [nombre, apellido, imageName, fk_rol_usuario, email, hashedPassword]; // Valores a insertar en la base de datos

      // Ejecuto la consulta en la base de datos
      db.query(query, values, (error, results) => {
          if (error) { // Si ocurre un error durante la consulta
              //console.error('Error registrando usuario:', error); // Lo registro en la consola
              return res.status(500).send({ auth: false, token: null }); // Envío un error 500 al cliente
          }

          const userId = results.insertId; // Obtengo el ID del nuevo usuario insertado
          // Genero un token JWT para el usuario registrado
          const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          // Envío una respuesta exitosa con el ID del usuario y el token
          res.status(201).send({ userId, auth: true, token });
      });
  });
};




const login = (req, res) => {
  const { email, password } = req.body; // Extraemos el email y la contraseña del cuerpo de la solicitud

  // Consulta SQL para seleccionar el usuario con el email proporcionado
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
    if (error) { // Si ocurre un error durante la consulta
      console.error('Error al iniciar sesión:', error); // Lo registramos en la consola
      return res.status(500).send('Error al iniciar sesión'); // Enviamos un error 500 al cliente
    }

    if (results.length === 0) return res.status(404).send('Usuario no encontrado'); // Si no se encuentra el usuario, enviamos un error 404

    const user = results[0]; // Obtenemos el usuario del resultado de la consulta

    // Comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos
    bcrypt.compare(password, user.password, (err, isValidPassword) => {
      if (err || !isValidPassword) return res.status(401).send({auth: false, token: null}); // Si hay un error o las contraseñas no coinciden, enviamos un error 401

      // Generamos un token JWT para el usuario autenticado
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Enviamos una respuesta exitosa con el token de autenticación
      res.status(200).json({ auth: true, token });
    });
  });
};


  



module.exports = { register, login };