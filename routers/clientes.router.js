
const express = require("express"); // Requiere el módulo 'express', que es un framework para crear aplicaciones web en Node.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.
const controller = require("../controllers/clientes.controller"); // Importa el controlador de clientes.

// METODO GET
// Para obtener todos los clientes
router.get('/', controller.allClientes);

// Para obtener un cliente específico por ID
router.get('/:id', controller.showCliente);

// METODO POST
// Para crear un nuevo cliente
router.post('/', controller.storeCliente);

// METODO PUT
// Para actualizar un cliente existente por ID
router.put('/:id', controller.updateCliente);

// METODO DELETE
// Para eliminar un cliente por ID
router.delete('/:id', controller.destroyCliente);

// EXPORTAR ROUTERS
module.exports = router; // Exporta el enrutador para ser utilizado en otras partes de la aplicación.
