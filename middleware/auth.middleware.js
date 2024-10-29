const jwt = require('jsonwebtoken'); // Requiere el módulo 'jsonwebtoken', que se utiliza para crear y verificar tokens JSON Web.

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtiene el encabezado de autorización de las cabeceras de la solicitud.

  if (!authHeader) { // Verifica si el encabezado de autorización está presente.
    return res.status(403).send({ auth: false, message: "No se proveyo token" }); // Si el encabezado está en blanco, envía un error 403.
  }

  const token = authHeader && authHeader.split(' ')[1]; // Divide el encabezado y obtiene el token (se espera que el formato sea "Bearer <token>").
  
  if (token == null) { // Verifica si el token está presente.
    return res.status(403).send({ auth: false, message: "Token mal formado" }); // Si el token está ausente o mal formado, envía un error 403.
  }

  // Verifica el token usando el secreto JWT.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) { // Si hay un error durante la verificación (por ejemplo, token inválido o expirado).
      return res.status(500).send({ auth: false, message: "Falló la autenticación del token" }); // Envía un error 500.
    }

    req.user = user; // Si el token es válido, guarda la información del usuario en la solicitud.
    next(); // Llama a la siguiente función middleware en el ciclo de vida de la solicitud.
  });
};

module.exports = authenticateToken; // Exporta la función 'authenticateToken' para que pueda ser utilizada en otras partes de la aplicación.
