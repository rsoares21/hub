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
            description: String,
            datapaths: [{ _id: mongoose.Schema.Types.ObjectId }], // Siebel.user.numeroCelular
            metadata: [{ _id: mongoose.Schema.Types.ObjectId }, { value: '5e3afe03f4bcee04480d10fc' }] // AlteraPlanoControleResult, AlteraPlanoControleMsg

        }]
    }
});

module.exports = mongoose.model('Integrations', IntegrationSchema)