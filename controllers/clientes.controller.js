// CONTROLADORES DEL MODULO
const db = require("../db/db"); // Requiere la configuración de la base de datos desde el archivo '../db/db'

// METODO GET
// Para todos los clientes
const allClientes = (req, res) => {
    const sql = "SELECT * FROM clientes"; // Consulta SQL para seleccionar todos los clientes
    db.query(sql, (error, rows) => { // Ejecuta la consulta con el ID proporcionado
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Envía un error 500 al cliente
        }
        res.json(rows); // Envía la lista de clientes como respuesta
    });
};

// Para un cliente específico
const showCliente = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const sql = "SELECT * FROM clientes WHERE id_cliente = ?"; // Consulta SQL para seleccionar un cliente específico por ID
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta con el ID proporcionado
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde" }); // Envía un error 500 al cliente
        }
        if (rows.length == 0) { // Si no se encuentra el cliente
            return res.status(404).send({ error: "ERROR: No existe el cliente" }); // Envía un error 404 al cliente
        }
        res.json(rows[0]); // Envía el cliente encontrado como respuesta
    });
};

// METODO POST
// Para crear un nuevo cliente
const storeCliente = (req, res) => {
    const { fk_usuario, fecha_nac, fk_provincia, fk_genero, fk_tipo_cerveza } = req.body; // Extraemos los campos del cuerpo de la solicitud
    const sql = "INSERT INTO clientes (fk_usuario, fecha_nac, fk_provincia, fk_genero, fk_tipo_cerveza) VALUES (?,?,?,?,?)"; // Consulta SQL para insertar un nuevo cliente en la base de datos
    db.query(sql, [fk_usuario, fecha_nac, fk_provincia, fk_genero, fk_tipo_cerveza], (error, result) => { // Ejecutamos la consulta en la base de datos
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        const cliente = { ...req.body, id: result.insertId }; // Reconstruimos el objeto del cliente con los datos del body y el ID insertado
        res.status(201).json(cliente); // Enviamos una respuesta exitosa con el cliente creado
    });
};

// METODO PUT
// Para actualizar un cliente existente
const updateCliente = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const { fk_usuario, fecha_nac, fk_provincia, fk_genero, fk_tipo_cerveza } = req.body; // Extraemos los campos del cuerpo de la solicitud
    const sql = "UPDATE clientes SET fk_usuario = ?, fecha_nac = ?, fk_provincia = ?, fk_genero = ?, fk_tipo_cerveza = ? WHERE id_cliente = ?"; // Consulta SQL para actualizar el cliente en la base de datos
    db.query(sql, [fk_usuario, fecha_nac, fk_provincia, fk_genero, fk_tipo_cerveza, id], (error, result) => { // Ejecutamos la consulta en la base de datos
        //console.log(rows); // Imprime el resultado en la consola para depuración
        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se actualizó ningún registro
            return res.status(404).send({ error: "Error: Cliente a modificar no existe" }); // Enviamos un error 404 al cliente
        }
        const cliente = { ...req.body, ...req.params }; // Reconstruimos el objeto del cliente con los datos del body y los parámetros
        res.json(cliente); // Mostramos el cliente actualizado
    });
};

// METODO DELETE
// Para eliminar un cliente
const destroyCliente = (req, res) => {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    const sql = "DELETE FROM clientes WHERE id_cliente = ?"; // Consulta SQL para eliminar un cliente de la base de datos
    db.query(sql, [id], (error, result) => { // Ejecutamos la consulta en la base de datos
    //console.log(rows); // Imprime el resultado en la consola para depuración

        if (error) { // Si ocurre un error durante la consulta
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Enviamos un error 500 al cliente
        }
        if (result.affectedRows == 0) { // Si no se eliminó ningún registro
            return res.status(404).send({ error: "ERROR: El cliente a eliminar no existe" }); // Enviamos un error 404 al cliente
        }
        res.json({ mensaje: "Cliente eliminado" }); // Enviamos una respuesta exitosa con el mensaje "Cliente eliminado"
    });
};

// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allClientes,
    showCliente,
    storeCliente,
    updateCliente,
    destroyCliente
};
