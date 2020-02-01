const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let IntegrationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    modeltype: "Integration",    // Identificador do tipo de objeto parent (diferenciando metadataPath e dataPath)
    intergrationManager: String,  // Nome da classe client manager da integração
    endpoints: [{
        name: { type: String, unique: true, required: true },   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
        description: String
    }]
});

module.exports = mongoose.model('Integration', IntegrationSchema)