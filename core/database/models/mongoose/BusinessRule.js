const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

// Deve ser implementada de forma generica e contemplando direcionamento de falhas Ex: consultaSaldo / 

let BusinessRuleSchema = new mongoose.Schema({
    channelId: mongoose.Schema.Types.ObjectId,  //  Cada regra de negocio está associada a um canal de atendimento Web/Voice/SMS/Chat/Rest/etc
    name: { type: String, unique: true, required: true, dropDups: true },
    inputList: [{
        _id: mongoose.Schema.Types.ObjectId 
    }],
    description: String,
    example: String,
    output: {   //  retorna um dataPath, mas a partir do output será tratado como metadataPath
        metadataPathList: [{ metadataPathId: mongoose.Schema.Types.ObjectId, value: String }]  // retorna o dataPath : SIEBEL.tipoPlano
        // scale- outros retornos podem ser adicionados de acordo com a necessidade
    },
    documents: [Object],
    modeltype: "BusinessRule"

});

module.exports = mongoose.model('BusinessRules', BusinessRuleSchema)