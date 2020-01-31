const mongoose = require('mongoose')
const mongoDB_hub = require('../../databases/mongoDB_hub')

let DataPathSchema = new mongoose.Schema({
    parentIntegration: {type: String, unique : true, required : true},  // Nome da integracão que retorna as informações
    path: {type: String, unique : true, required : true},   // path unico representando o endereco da informação Ex: plano.tipo
    dataPathList: [{ _id: mongoose.Schema.Types.ObjectId}]  // Lista de dataPaths da Interface
});

module.exports = mongoose.model('DataPath', DataPathSchema)