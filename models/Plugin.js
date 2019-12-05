const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let PluginSchema = new mongoose.Schema({
    pluginFileName: String,
    name: String,
    description: String,
    output: {
        promptIds: [{_id: mongoose.Schema.Types.ObjectId}],
        dialogId: String
    },
    onError: String,
    version: Double
});

module.exports = mongoose.model('Plugins', PluginSchema)