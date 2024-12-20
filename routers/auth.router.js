//Rutas del modulo
const express = require('express'); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.

// AUT
const controller = require('../controllers/auth.controller'); // Importa el controlador de autenticación.
const authenticateToken = require('../middleware/auth.middleware'); // Importa el middleware de autenticación de tokens.

// MULTER
 const multer = require("multer"); // Requiere el módulo 'multer', que es un middleware para manejar la subida de archivos en Node.js.
const path = require("path"); // Requiere el módulo 'path', que proporciona utilidades para trabajar con rutas de archivos y directorios.

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    // Define el destino donde se guardarán los archivos subidos
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Define la carpeta 'uploads' como destino, esta carpeta debe existir en la raíz del proyecto
    },
    // Define el nombre del archivo subido
    filename: (req, file, cb) => {
        console.log(file); // Imprime información del archivo en la consola para depuración
        cb(null, Date.now() + path.extname(file.originalname)); // Define el nombre del archivo como la marca de tiempo actual + la extensión original del archivo
    },
});

// Inicializa Multer con la configuración de almacenamiento
const upload = multer({
    storage, // Utiliza la configuración de almacenamiento definida anteriormente
    fileFilter: (req, file, cb) => {
        //console.log(file); // Imprime información del archivo en la consola para depuración
        const fileTypes = /jpg|jpeg|png/; // Define los tipos de archivo permitidos (jpg, jpeg, png)
        const mimetype = fileTypes.test(file.mimetype); // Verifica que el tipo MIME del archivo sea válido
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Verifica que la extensión del archivo sea válida
        if (mimetype && extname) { // Si el tipo MIME y la extensión son válidos
            return cb(null, true); // Acepta el archivo
        }
        cb("Tipo de archivo no soportado"); // Si el archivo no es válido, devuelve un error
    },
    limits: { fileSize: 1024 * 1024 * 1 }, // Define el límite de tamaño del archivo (aproximadamente 1Mb)
});

// Método POST para registrar un nuevo usuario con una imagen de perfil
router.post('/register', upload.single('imagen_perfil'), controller.register);

// Método POST para iniciar sesión
router.post('/login', controller.login);

// Ruta protegida
// Define una ruta GET en el enrutador para la URL '/protected' y aplica el middleware de autenticación 'authenticateToken'
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send(`Hola Usuario número ${req.user.id}`); // Envía un mensaje de respuesta con el ID del usuario autenticado
});

// Exportar routers
module.exports = router; // Exporta el enrutador para ser utilizado en otras partes de la aplicación.


