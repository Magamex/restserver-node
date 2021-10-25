const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


const usuariosGet = async(req = request,res=response)=>{
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    // Esto estaria mal porque tardaria mas tiempo...
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    // Mejor utilizar Promise.all... mas eficiente
    // Si alguna de las 2 esta mal se cancela...
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
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

const usuariosPut = async(req,res=response)=>{

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body

    //TODO validar contra la base de datos
    if ( password ){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt)
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto)

    res.json(usuario)
}

const usuariosDelete = async(req,res=response)=>{
    const { id } = req.params
    
    const uid = req.uid

    //Borrado Fisicamente - No recomendado
    // const usuario = await Usuario.findByIdAndDelete(id)

    //Borrado Logico
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    // const usuarioAutenticado = req.usuario

    res.json(usuario)
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




