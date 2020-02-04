const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    content: { type: String, unique: true, required: true },    //  Conteudo em formato texto
    filename: String,  //  Nome da midia, Ex: bomdia.wav (Voice)
    businessRuleId: mongoose.Schema.Types.ObjectId, //  Se for um prompt dinamico, deve atender uma regra de negócio
    modeltype: "Prompt"
});

module.exports = mongoose.model('Prompts', PromptSchema)