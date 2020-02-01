const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let DataPathSchema = new mongoose.Schema({
    parent: { type: String, unique: true, required: true },  // Nome da BusinessRule/Integracao atendida. Tbm possivel identificar se meta ou datapath pelo parent
    path: { type: String, unique: true, required: true },   // METADATA.{USER}.<{BRuleName}.{PluginName}.{PluginMethod}>.FIELD /  & DATA.<{IntegrationName}.{IntegrationEndpoint}>.FIELD
});

module.exports = mongoose.model('DataPath', DataPathSchema)