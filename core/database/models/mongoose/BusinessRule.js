const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

// Deve ser implementada de forma generica e contemplando direcionamento de falhas Ex: consultaSaldo / 

let BusinessRuleSchema = new mongoose.Schema({
    channelId: mongoose.Schema.Types.ObjectId,  //  Cada regra de negocio está associada a um canal de atendimento Web/Voice/SMS/Chat/Rest/etc
    name: { type: String, unique: true, required: true, dropDups: true },
    type:String,    //  plugin/integration
    class: mongoose.Schema.Types.ObjectId,
    method: mongoose.Schema.Types.ObjectId,
    inputList: [{
        modelId: mongoose.Schema.Types.ObjectId,
        modeltype: String
    }],
    description: String,
    example: String,
    output: {   //  retorna um obj dataPath, mas a partir do output será tratado como metadataPath
        metadataPathList: [{ metadataPathId: mongoose.Schema.Types.ObjectId }]  // retorna o dataPath : SIEBEL.tipoPlano
        // scale- outros retornos podem ser adicionados de acordo com a necessidade
    },
    //modeltype: "BusinessRule",   // Identificador do tipo de objeto parent (diferenciando metadataPath e dataPath)
    expiration: Number    //  controla quando a regra deve ser revalidada e atualizada no redis

});

module.exports = mongoose.model('BusinessRules', BusinessRuleSchema)