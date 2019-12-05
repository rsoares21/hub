const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let PluginSchema = new mongoose.Schema({
    pluginFileName: String,
    name: String,
    descricao: String,
    onError: String,
});

module.exports = mongoose.model('Plugins', PluginSchema)