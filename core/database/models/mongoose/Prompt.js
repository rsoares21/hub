const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    content: [{ value: String }],  //  Conteudo legivel do prompt
    files: [{ filename: String }],  //  Nome da midia, Ex: bomdia.wav (Voice Channel)
    businessrule: mongoose.Schema.Types.ObjectId,
    options: [[{
            value: String, //  Prenchimento que será tratada Ex: "1" ou "sim"
            dialog: mongoose.Schema.Types.ObjectId,  //  Dialog ou Processo destino da opção selecionada
            queryString:String
    }]]
});

module.exports = mongoose.model('Prompts', PromptSchema)