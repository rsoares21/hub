const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PluginSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: String,
    businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }],
    pluginWorker: {
        name: { type: String, unique: true, required: true },   // Nome da classe tratadora desse plugin Ex: SiebelTranslator
        pluginMethods: [{
            name: { type: String, unique: true, required: true },   //  Nome da function no plugin Ex: isPrepago, isPosPago  fullpath={pluginWorker.pluginMethod}
            description: String
        }]
    }

});

module.exports = mongoose.model('Plugins', PluginSchema) 