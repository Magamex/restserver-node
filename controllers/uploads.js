const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const cargarArchivo = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: "No hay archivos que subir"});
        return;
    }

    //Imagenes
    try {
        // const nombre = await subirArchivo(req.files,'textos',['txt']);
        const nombre = await subirArchivo(req.files,'imgs',undefined);
        res.json({ nombre })
    } catch (msg) {
        res.status(400).json({ msg })
    }

}



module.exports = {
    cargarArchivo
}