const { response } = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')



const login = async(req, res=response)=>{

    const { correo, password } = req.body

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario| Password no son correctos - correo'
            })
        }

        //Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario| Password no son correctos - estado'
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario| Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Algo salio Mal'
        })
    }

}

const googleSingIn = async(req,res=response) =>{
    const {id_token} = req.body
    
    try {
        const googleUser = await googleVerify(id_token);
        console.log(googleUser)
        res.json({
            msg: "Todo OK!! Google Sign In"
        });
    }catch(error){
        res.status(400),json({msg: 'Token de google no es valido'})
    }
}

module.exports = {
    login,
    googleSingIn
}