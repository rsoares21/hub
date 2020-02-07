const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    content: [{ value: String }],  //  Conteudo legivel do prompt
    files: [{ filename: String }],  //  Nome da midia, Ex: bomdia.wav (Voice Channel)
    businessrule: mongoose.Schema.Types.ObjectId,
    options: [{ //  Lista de Dialogs e options correspondentes
        option: String, //  Prenchimento que será tratada Ex: "1" ou "sim"
        targetDialog: mongoose.Schema.Types.ObjectId,  //  Dialog destino da opção selecionada
    }], //  Opcões do Menu que formam o Dialog.

});

module.exports = mongoose.model('Prompts', PromptSchema)