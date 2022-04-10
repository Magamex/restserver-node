const mongoose = require('mongoose');
const { response } = require('express');
const { dbConnection } = require('../database/config')

const { Usuario, Categoria, Producto } = require('../models');

//[ 'usuarios', 'categorias', 'roles', 'productos' ]
const coleccionesPermitidas = Object.keys(mongoose.connection.collections);

const buscarUsuarios = async(termino = '', res = response)=>{
    const esMongoID = mongoose.isValidObjectId(termino); //true/false

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario)? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {email: regex}],
        $and: [{estado: true}]
    });
    res.json({
            results: (usuarios)? [usuarios] : []
        })
}

const buscarCategorias = async(termino = '', res = response)=>{
    const esMongoID = mongoose.isValidObjectId(termino); //true/false

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria)? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });
    res.json({
            results: (categorias)? [categorias] : []
        })
}

const buscarProductos = async(termino = '', res = response)=>{
    const esMongoID = mongoose.isValidObjectId(termino); //true/false

    if(esMongoID){
        const producto = await Producto.findById(termino)
                                        .populate('categoria','nombre')
                                        .populate('usuario','nombre');
        return res.json({
            results: (producto)? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true })
                                            .populate('categoria','nombre')
                                            .populate('usuario','nombre');
    res.json({
            results: (productos)? [productos] : []
        })
}

const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
}

module.exports = {
    buscar
}