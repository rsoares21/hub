const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PluginSchema = new mongoose.Schema({
    name: String,
    description: String,
    businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }],
    pluginWorker: String,  //   nome da classe tratadora desse plugin Ex: SiebelTranslator
    pluginMethods: [{ name: String }]   //  nome da function no plugin Ex: isPrepago, isPosPago  fullpath={pluginWorker.pluginMethod}
});

module.exports = mongoose.model('Plugins', PluginSchema) 