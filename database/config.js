const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos - Online')

    }catch(err){
        console.log(err)
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}