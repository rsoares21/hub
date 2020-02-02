const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')


// Um dialog representa uma interacão com o usuário, abstraindo o front end e respondendo dinamicamente com o parser
// O objetivo é abstrair os tipos de entradas e saídas (omni)

let DialogSchema = new mongoose.Schema({
    application: mongoose.Schema.Types.ObjectId,    // nome da aplicação
    name: { type: String, unique: true, required: true, dropDups: true },   // Nome do dialogo/interação. 
    initPrompt: String,     //slot reservado para mensagem fixa de inicio do dialog
    menuOptions: [{
        input: String,
        dialog: String
    }],

    //hubModelsResponse: [{ _id: mongoose.Schema.Types.ObjectId }], // objetos que serão retornados e apresentados ao usuario pelo DialogRunner
    //hubSimpleTextResponse: String,  // slot pra preenchimento caso profile = TEXT/JSON

    dialogVersion: Number,   // usado pra controle de versionamento do dialogo
    flagActive: boolean,
    channel: String // Recebido no body do request. Vai definir qual o output sera gerado. Tratamento omni

});

module.exports = mongoose.model('Dialogs', DialogSchema)