const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let IntegrationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    shortname: { type: String, unique: true, required: true },
    description: String,
    integrationManager: {
        name: { type: String, unique: true, required: true },   // Nome da classe client manager da integração
        endpoints: [{
            name: { type: String, unique: true, required: true },   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
            description: String
        }]
    }
});

module.exports = mongoose.model('Integrations', IntegrationSchema)