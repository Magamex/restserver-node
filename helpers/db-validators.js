const mongoose = require('mongoose');

const Role = require('../models/role')
const Usuario = require('../models/usuario')

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

module.exports = {
    esRoleValido,correoExiste,existeUsuarioPorId
}