const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let DataPathSchema = new mongoose.Schema({
    path: { type: String, unique: true, required: true },   // METADATA.{USER}.<{BRuleName}.{PluginName}.{PluginMethod}>.FIELD / DATA.<{IntegrationName}.{IntegrationEndpoint}>.FIELD
    integration: mongoose.Schema.Types.ObjectId,
    endPoint: mongoose.Schema.Types.ObjectId,
    description: String,
    paramValue: String  //  Caso o campo seja um parametro
    //modelType: String

});

module.exports = mongoose.model('DataPaths', DataPathSchema)