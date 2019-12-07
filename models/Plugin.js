const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')
const BusinessRules = require('../models/BusinessRule')

let PluginSchema = new mongoose.Schema({
    businessRulesListIds: [{ _id: mongoose.Schema.Types.ObjectId }],
    pluginFileName: String,
    name: String,
    description: String,
    onError: String,
    version: Number
});

module.exports = mongoose.model('Plugins', PluginSchema)