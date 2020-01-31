const mongoose = require('mongoose')
const mongoDB_hub = require('../../core/database/mongoDB_hub')


// Um dialog representa uma interacão com o usuário, abstraindo o front end e respondendo dinamicamente
// O objetivo é abstrair os tipos de entradas e saídas

let DialogSchema = new mongoose.Schema({
    application: mongoose.Schema.Types.ObjectId,    // nome da aplicação
    name: String,   // Nome do dialogo/interação
    initPrompt: String,     //slot reservado para mensagem fixa de inicio do dialog
    menuOptions: [{
        input: String,
        dialog: String
    }],


    hubModelsResponse: [{ _id: mongoose.Schema.Types.ObjectId }], // objetos que serão retornados e apresentados ao usuario pelo DialogRunner
    hubSimpleTextResponse: String,  // slot pra preenchimento caso profile = TEXT/JSON

    dialogVersion: Number,   // usado pra controle de versionamento do dialogo
    flagActive: boolean 

});

module.exports = mongoose.model('Dialogs', DialogSchema)