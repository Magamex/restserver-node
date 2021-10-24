const { response, request } = require('express')

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

const usuariosPost = (req,res=response)=>{
    const {nombre} = req.body
    res.json({
        msg:'post api - controlador',
        nombre
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




