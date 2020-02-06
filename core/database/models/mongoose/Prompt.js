const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }], // O publisher preenche essa lista de acordo com os metadatas usados no content
    contents: [{ type: String, unique: true, required: true }],    //  Conteudo em formato texto contendo tags de metadata
    filenames: [String],  //  Nome da midia, Ex: bomdia.wav (Voice Channel)
    body: String    //  Concluido pelo Parser
});

module.exports = mongoose.model('Prompts', PromptSchema)