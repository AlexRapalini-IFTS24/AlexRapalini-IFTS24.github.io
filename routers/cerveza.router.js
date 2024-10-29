const express = require("express"); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.
const controller = require("../controllers/cerveza.controller"); // Importa el controlador de cervezas.

// METODO GET
// Para obtener todas las cervezas
router.get('/', controller.allCerveza);

// Para obtener una cerveza específica por ID
router.get('/:id', controller.showCerveza);

// METODO POST
// Para crear una nueva cerveza
router.post('/', controller.storeCerveza);

// METODO PUT
// Para actualizar una cerveza existente por ID
router.put('/:id', controller.updateCerveza);

// METODO DELETE
// Para eliminar una cerveza por ID
router.delete('/:id', controller.destroyCerveza);

// EXPORTAR ROUTERS
module.exports = router; // Exporta el enrutador para ser utilizado en otras partes de la aplicación.
