const express = require("express");
const router = express.Router();

const controller = require("../controllers/provincias.controllers");


//METODO GET//
//Para todos los provincias
router.get('/', controller.allProvincias)

//Para un producto
router.get('/:id', controller.showProvincia);

//METODO POST//
router.post('/', controller.storeProvincia);

//EXPORTAR ROUTERS
module.exports = router;

//METODO PUT//
router.put('/:id', controller.updateProvincia);


//METODO DELETE//
router.delete('/:id', controller.destroyProvincia);