const mongoose = require('mongoose')
const mongoDB_hub = require('../../databases/mongoDB_hub')


// Um dialog representa uma interacão com o usuário, abstraindo o front end e respondendo dinamicamente
// O objetivo é abstrair os tipos de entradas e saídas

let DialogSchema = new mongoose.Schema({
    profile: mongoose.Schema.Types.ObjectId,    // vai definir o tipo de resposta que sera retornada Ex: TEXT, VXML, HTML, JSON, etc...
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