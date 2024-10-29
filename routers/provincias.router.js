const express = require("express"); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.
const controller = require("../controllers/provincias.controller"); // Importa el controlador de provincias.

// METODO GET
// Para obtener todas las provincias
router.get('/', controller.allProvincias);

// Para obtener una provincia específica por ID
router.get('/:id', controller.showProvincia);

// METODO POST
// Para crear una nueva provincia
router.post('/', controller.storeProvincia);

// METODO PUT
// Para actualizar una provincia existente por ID
router.put('/:id', controller.updateProvincia);

// METODO DELETE
// Para eliminar una provincia por ID
router.delete('/:id', controller.destroyProvincia);

// EXPORTAR ROUTERS
module.exports = router; // Exporta el enrutador para ser utilizado en otras partes de la aplicación.
