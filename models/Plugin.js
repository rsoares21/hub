const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')
const BusinessRules = require('../models/BusinessRule')

let PluginSchema = new mongoose.Schema({
    businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }],
    pluginWorker: String,  //nome da classe e do metodo que vai tratar esse plugin Ex: SiebelTranslator
    pluginMethods:[{ name: String }],   //nome da function que vai ser chamada no plugin Ex: isPrepago, isPosPago, 
    name: String,
    description: String,
    onError: String,
    version: Number,
    output: String
});

module.exports = mongoose.model('Plugins', PluginSchema) 