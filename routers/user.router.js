const express = require('express'); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const { getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller'); // Importa las funciones del controlador de usuarios.
const router = express.Router(); // Crea una instancia del enrutador de Express.

// MULTER
const multer = require("multer"); // Requiere el módulo 'multer', que es un middleware para manejar la subida de archivos en Node.js.
const path = require("path"); // Requiere el módulo 'path', que proporciona utilidades para trabajar con rutas de archivos y directorios.

const storage = multer.diskStorage({
    // Configura el destino donde se guardarán los archivos subidos
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Define la carpeta 'uploads' como destino, esta carpeta debe existir en la raíz del proyecto
    },
    // Configura el nombre del archivo subido
    filename: (req, file, cb) => {
        console.log(file); // Imprime información del archivo en la consola para depuración
        cb(null, Date.now() + path.extname(file.originalname)); // Define el nombre del archivo como la marca de tiempo actual + la extensión original del archivo
    },
});

// Configura multer para manejar la subida de archivos
const upload = multer({
    storage, // Utiliza la configuración de almacenamiento definida anteriormente
    fileFilter: (req, file, cb) => {
        //console.log(file); // Imprime información del archivo en la consola para depuración
        const fileTypes = /jpg|jpeg|png/; // Define los tipos de archivo permitidos (jpg, jpeg, png)
        const mimetype = fileTypes.test(file.mimetype); // Verifica que el tipo MIME del archivo sea válido
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        ); // Verifica que la extensión del archivo sea válida
        if (mimetype && extname) { // Si el tipo MIME y la extensión son válidos
            return cb(null, true); // Acepta el archivo
        }
        cb("Tipo de archivo no soportado"); // Si el archivo no es válido, devuelve un error
    },
    limits: { fileSize: 1024 * 1024 * 1 }, // Define el límite de tamaño del archivo (aproximadamente 1Mb)
});


// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    getAllUsers(req, res);
});

// Ruta para obtener un usuario por ID
router.get('/:id', (req, res) => {
    getUser(req, res);
});

// // Ruta para actualizar un usuario por ID
router.put('/:id', upload.single('imagen_perfil'), updateUser); 

// Ruta para eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    deleteUser(req, res);
});

// Exportar el router
module.exports = router;
