const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    value: { type: String, unique: true, required: true },
    modeltype: "Prompt"
});

module.exports = mongoose.model('Prompts', PromptSchema)