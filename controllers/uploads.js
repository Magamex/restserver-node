const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require('express');

const { subirArchivo } = require('../helpers/subir-archivo');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async(req, res = response) => {
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

    //Limpiar imagenes previas
    
    if(modelo.img){
        //Hay que borrar la imagen anterior
        const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files,coleccion,undefined);
    modelo.img = nombre;

    await modelo.save();

    res.json({modelo});
}

const actualizarArchivoCloudinary = async(req, res = response)=>{
    
    const { id, coleccion } = req.params;

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

    //Limpiar imagenes previas
    
    if(modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        console.log(public_id);
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async(req, res = response) => {
     const { id, coleccion } = req.params;

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

    //Limpiar imagenes previas
    
    if(modelo.img){
        const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    // return res.json({ msg: 'Falta PlacHolder'})
    const pathNotFound = path.join(__dirname,'../assets','images','no-image.jpg');
    return res.sendFile(pathNotFound)
}


module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
    actualizarArchivoCloudinary
}