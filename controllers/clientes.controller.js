//CONTROLADORES DEL MODULO//
const db = require("../db/db")

//METODO GET//

//Para todos los clientes
const allClientes = (req, res) => {
    const sql = "SELECT * FROM clientes";
    db.query(sql, (error,rows) => {
        if(error) {
        return res.status(500).json({error : "ERROR : Intente más tarde"});
        }
        res.json(rows);
    });
};

//Para un cliente
const showCliente = (req, res) => {
    const{id} = req.params;
    const sql = "SELECT * FROM clientes  WHERE id_cliente = ?";
    db.query(sql,[id], (error,rows) => {
        console.log(rows);
        if(error) {
        return res.status(500).json({error : "ERROR : Intente más tarde"});
        }
        if(rows.length ==0){
            return res.status(404).send({error : "ERROR: No existe el cliente"});
        };
        res.json(rows[0]);
        //me muestra el elemento en la posicion 0 si existe
    });
};

//METODO POST//

const storeCliente = (req, res) => {
    const {nombre, apellido, celular, fecha_nac, ciudad} = req.body;
    const sql = "INSERT INTO clientes (nombre, apellido, celular, fecha_nac, ciudad) VALUES (?,?,?,?,?)";
    db.query(sql,[nombre, apellido, celular, fecha_nac, ciudad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const cliente = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(cliente); // muestra creado con exito el elemento
    });     

};

//METODO PUT//
const updateCliente = (req, res) => {
    const{id} = req.params;
    const {nombre, apellido, celular, fecha_nac, ciudad} = req.body;
    const sql = "UPDATE clientes SET nombre = ?, apellido = ?, celular = ?, fecha_nac = ?, ciudad = ? WHERE id_cliente = ?";
    db.query(sql,[nombre, apellido, celular, fecha_nac, ciudad, id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error cliente a modificar no existe"});
        };
        const cliente = {...req.body, ...req.params}; // ... reconstruir el objeto del body
        res.json(cliente);//muestro el elemento q existe
    });     
};

//METODO DELETE//
const destroyCliente = (req, res) => {
    const {id} = req.params;
    const sql ="DELETE FROM cliente WHERE id_cliente = ?";
    db.query(sql,[id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El cliente a eliminar no existe"});
        };
        res.json({mensaje : "Cliente eliminado"});
    });     
};

//EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allClientes,
    showCliente,
    storeCliente,
    updateCliente, 
    destroyCliente
};