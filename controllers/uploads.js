const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');

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

const actualizarArchivo = async(req, res = response)=>{
    
    const { id, coleccion } = req.params;
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: "No hay archivos que subir"});
        return;
    }

    let modelo;

    switch (coleccion) {
        case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({msg: 'El usuario no existe'});
                }
            break;
        case 'productos':
                modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({msg: 'El producto no existe'});
                }
            break;
    
        default:
            return res.status(500).json({msg: "Se me olvido validar esto"});
    }

            const nombre = await subirArchivo(req.files,coleccion,undefined);

    modelo.img = nombre;

    await modelo.save();

    res.json({modelo});
}


module.exports = {
    cargarArchivo,
    actualizarArchivo
}