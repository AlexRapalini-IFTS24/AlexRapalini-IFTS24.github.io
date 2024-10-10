const mysql = require("mysql2");

//CONEXION A LA BBDD//
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"el bolson"
});

connection.connect((error) => {
if(error) {
    return console.error(error);
}
console.log("Estamos conectados");
});

//EXPORTAR DEL MODULO LA FUNCION CONNNECTION
module.exports = connection;