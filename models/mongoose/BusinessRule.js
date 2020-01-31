const mongoose = require('mongoose')
const mongoDB_hub = require('../../core/database/mongoDB_hub')

// Deve ser implementada de forma generica e contemplando direcionamento de falhas Ex: consultaSaldo / 

let BusinessRuleSchema = new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true }, 
    inputList: [{   
                inputType: String,   // dataPath/metadataPath/parameter/text
                value: { type = String, required: function() { return this.inputList.inputType === 'text'; }}, // required when type == 'text'
                _id: mongoose.Schema.Types.ObjectId // required when type in ['dataPath','metadataPath','param']
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