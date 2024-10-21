//Rutas del modulo
const express = require('express');
const router = express.Router();

//AUT
const  controller  = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/auth.middleware');


//Metodo POST
router.post('/register', controller.register);
router.post('/login', controller.login);



// Ejemplo de ruta protegida
router.get('/protected', authenticateToken, (req, res) => {
res.status(200).send(`Hola Usuario número ${req.user.id}`);
});
 //exportar routers
module.exports = router;

