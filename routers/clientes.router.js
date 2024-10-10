
const express = require("express");
const router = express.Router();

const controller = require("../controllers/clientes.controller");


//METODO GET//
//Para todos los clientes
router.get('/', controller.allClientes)

//Para un producto
router.get('/:id', controller.showCliente);

//METODO POST//
router.post('/', controller.storeCliente);

//EXPORTAR ROUTERS
module.exports = router;

//METODO PUT//
router.put('/:id', controller.updateCliente);


//METODO DELETE//
router.delete('/:id', controller.destroyCliente);