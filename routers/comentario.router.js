/// RUTAS DEL MODULO ///
const express = require("express"); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.

// MULTER
const multer = require("multer"); // Requiere el módulo 'multer', que es un middleware para manejar la subida de archivos en Node.js.
const path = require("path"); // Requiere el módulo 'path', que proporciona utilidades para trabajar con rutas de archivos y directorios.

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    // Define el destino donde se guardarán los archivos subidos
    destination: (req, file, cb) => {
        cb(null, 'uploadsComentarios'); // Define la carpeta 'uploadsComentarios' como destino, esta carpeta debe existir en la raíz del proyecto
    },
    // Define el nombre del archivo subido
    filename: (req, file, cb) => {
        console.log(file); // Imprime información del archivo en la consola para depuración
        cb(null, Date.now() + path.extname(file.originalname)); // Define el nombre del archivo como la marca de tiempo actual + la extensión original del archivo
    },
});

// Inicializa Multer con la configuración de almacenamiento
const uploadsComentarios = multer({
    storage, // Utiliza la configuración de almacenamiento definida anteriormente
    fileFilter: (req, file, cb) => {
        console.log(file); // Imprime información del archivo en la consola para depuración
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

///////////////////////////////////////////

const controller = require("../controllers/comentario.controller"); // Importa el controlador de comentarios.

// METODO GET
// Para obtener todos los comentarios
router.get('/', controller.allComentario);

// Para obtener un comentario específico por ID
router.get('/:id', controller.showComentario);

// METODO POST
// Para crear un nuevo comentario con imagen
router.post('/', uploadsComentarios.single('imagen'), controller.storeComentario);

// METODO PUT
// Para actualizar un comentario existente por ID con imagen
router.put('/:id', uploadsComentarios.single('imagen'), controller.updateComentario);

// METODO DELETE
// Para eliminar un comentario por ID
router.delete('/:id', controller.destroyComentario);

// EXPORTAR ROUTERS
module.exports = router; // Exporta el enrutador para ser utilizado en otras partes de la aplicación.
