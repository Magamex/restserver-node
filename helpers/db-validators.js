const mongoose = require('mongoose');

// const Role = require('../models/role')
// const Usuario = require('../models/usuario')
// const Categoria = require('../models/categoria')

const { Role, Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const correoExiste = async(correo)=> {
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
        throw new Error(`El correo: ${correo}, ya se encuentra registrado`)
    }
}

const existeUsuarioPorId = async(id)=> {
    const idExiste = await Usuario.findById(id)
    if (!idExiste){
        throw new Error(`El id: ${id}, No existe`)
    }
}

const existeCategoriaPorId = async(id)=> {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria){
        throw new Error(`El id: ${id}, No existe`)
    }
}

const existeProductoPorId = async(id)=> {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto){
        throw new Error(`El id: ${id}, No existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = [])=>{
    if(!colecciones.includes(coleccion)){
        throw new Error(`La coleccion ${coleccion} no esta permitida - ${colecciones}`)
    }

    return true;
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}