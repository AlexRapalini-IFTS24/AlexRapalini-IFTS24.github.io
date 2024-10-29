const express = require("express"); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.
const controller = require("../controllers/generos.controller"); // Importa el controlador de generos.

// METODO GET
// Para obtener todas los generos
router.get('/', controller.allGeneros);

// Para obtener un genero específica por ID
router.get('/:id', controller.showGenero);

// METODO POST
// Para crear un nuevo genero
router.post('/', controller.storeGenero);

// METODO PUT
// Para actualizar un genero existente por ID
router.put('/:id', controller.updateGenero);

// METODO DELETE
// Para eliminar un genero por ID
router.delete('/:id', controller.destroyGenero);

// EXPORTAR ROUTERS
module.exports = router; // Exporta el enrutador para ser utilizado en otras partes de la aplicación.
