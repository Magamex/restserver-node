const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = (req = request,res=response)=>{
    const { q, nombre = null, apikey, page=1,limit=5 } = req.query

    res.json({
        msg:'get api - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async(req,res=response)=>{
    const { nombre, correo, password, rol} = req.body
    const usuario = new Usuario({ nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)

    usuario.save();
    res.json({
        msg:'post api - controlador',
        usuario
    })
}

const usuariosPut = (req,res=response)=>{

    const id = req.params.id

    res.json({
        msg:'put api - controlador',
        id
    })
}

const usuariosDelete = (req,res=response)=>{
    res.json({
        msg:'delete api - controlador'
    })
}

const usuariosPatch = (req,res=response)=>{
    res.json({
        msg:'patch api - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}




