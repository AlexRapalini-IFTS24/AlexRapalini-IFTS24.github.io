//CONTROLADORES DEL MODULO//
const db = require("../db/db")

//METODO GET//

//Para todos las provincias
const allProvincias = (req, res) => {
    const sql = "SELECT * FROM provincias";
    db.query(sql, (error,rows) => {
        if(error) {
        return res.status(500).json({error : "ERROR : Intente más tarde"});
        }
        res.json(rows);
    });
};

//Para una provincia
const showProvincia = (req, res) => {
    const{id} = req.params;
    const sql = "SELECT * FROM provincias  WHERE id_provincia = ?";
    db.query(sql,[id], (error,rows) => {
        console.log(rows);
        if(error) {
        return res.status(500).json({error : "ERROR : Intente más tarde"});
        }
        if(rows.length ==0){
            return res.status(404).send({error : "ERROR: No existe la provincia"});
        };
        res.json(rows[0]);
        //me muestra el elemento en la posicion 0 si existe
    });
};

//METODO POST//

const storeProvincia = (req, res) => {
    const {nombre_provincia} = req.body;
    const sql = "INSERT INTO provincias (nombre_provincia) VALUES (?)";
    db.query(sql,[nombre_provincia], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const cliente = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(cliente); // muestra creado con exito el elemento
    });     

};

//METODO PUT//
const updateProvincia = (req, res) => {
    const{id} = req.params;
    const {nombre_provincia} = req.body;
    const sql = "UPDATE provincias SET nombre_provincia = ? WHERE id_provincia = ?";
    db.query(sql,[nombre_provincia, id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error, provincia a modificar no existe"});
        };
        const cliente = {...req.body, ...req.params}; // ... reconstruir el objeto del body
        res.json(cliente);//muestro el elemento q existe
    });     
};

//METODO DELETE//
const destroyProvincia = (req, res) => {
    const {id} = req.params;
    const sql ="DELETE FROM provincias WHERE id_provincia = ?";
    db.query(sql,[id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La provincia a eliminar no existe"});
        };
        res.json({mensaje : "Provincia eliminada"});
    });     
};

//EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allProvincias,
    showProvincia,
    storeProvincia,
    updateProvincia, 
    destroyProvincia
};