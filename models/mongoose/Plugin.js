const mongoose = require('mongoose')
const mongoDB_hub = require('../../databases/mongoDB_hub')

let PluginSchema = new mongoose.Schema({
    name: String,
    description: String,
    businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }],
    pluginWorker: String,  //nome da classe e do metodo que vai tratar esse plugin Ex: SiebelTranslator
    pluginMethod:{ name: String }   //nome da function que vai ser chamada no plugin Ex: isPrepago, isPosPago
});

module.exports = mongoose.model('Plugins', PluginSchema) 