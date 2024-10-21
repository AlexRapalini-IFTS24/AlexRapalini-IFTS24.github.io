const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; 

  if (!authHeader) {
    return res.status(403).send({ auth: false, message: "No se proveyo token" });//Campo en blanco
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(403).send({ auth: false, message: "Token mal formado" });//campo solo con Bearer
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(500).send({ auth: false, message: "Falló la autenticación del token" });//token mal escrito
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

