const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')
const DataInterface = require('./IntegrationDataPath')


let BusinessRuleSchema = new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true }, 
    inputList: [{   
                type: String,   // integrationDataPath/metadataPath/parameter/text
                value: String,  // required when type == 'text'
                _id: mongoose.Schema.Types.ObjectId // required when type in ['integrationDataPath','metadataPath','param']
            }], 
    description: String,
    example: String,
    output: {
        metadataPathList: [{ _id: mongoose.Schema.Types.ObjectId, value: String }]  // retorna o dataPath : SIEBEL.tipoPlano
        // scale- outros retornos podem ser adicionados de acordo com a necessidade
    },
    documents:[Object]

});

module.exports = mongoose.model('BusinessRules', BusinessRuleSchema)