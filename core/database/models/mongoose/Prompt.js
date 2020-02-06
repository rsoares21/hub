const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    contents: [{ value: String }],    //  Conteudo em formato texto contendo tags de metadata
    files: [{ filename: String }],  //  Nome da midia, Ex: bomdia.wav (Voice Channel)
    businessrule: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Prompts', PromptSchema)