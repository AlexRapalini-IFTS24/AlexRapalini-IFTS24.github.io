const mysql = require("mysql2"); // Requiere el módulo 'mysql2', que es un cliente de MySQL para Node.js.

// CONEXION A LA BBDD
const connection = mysql.createConnection({
    host: "localhost", // Dirección del servidor de la base de datos.
    user: "root", // Nombre de usuario para autenticar en la base de datos.
    password: "", // Contraseña del usuario para autenticar en la base de datos.
    database: "el bolson" // Nombre de la base de datos a la que se conecta.
});

connection.connect((error) => { // Intenta establecer una conexión con la base de datos.
    if (error) { // Si ocurre un error durante la conexión.
        return console.error(error); // Imprime el error en la consola y detiene la ejecución.
    }
    console.log("Conectado con la base de datos El Bolson"); // Mensaje de éxito si la conexión se establece correctamente.
});

// EXPORTAR DEL MODULO LA FUNCION CONNECTION
module.exports = connection; // Exporta la conexión para que pueda ser utilizada en otros módulos del proyecto.
