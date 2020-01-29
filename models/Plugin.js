const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')
const BusinessRules = require('../models/BusinessRule')

let PluginSchema = new mongoose.Schema({
    businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }],
    pluginFileName: String,
    name: String,
    description: String,
    onError: String,
    version: Number,
    output: String
});

module.exports = mongoose.model('Plugins', PluginSchema)