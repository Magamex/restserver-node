const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port= process.env.PORT
        this.usuarioPath = '/api/usuarios'
        //Continuar por video 14

        //Conectar a base de datos
        this.conectarDB();

        //Middlawares
        this.middlewares();

        //Lectura y Parseo - Body
        this.app.use(express.json());

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Directorio Publico
        this.app.use(express.static('public'))
    }
    
    routes(){
        this.app.use(this.usuarioPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;