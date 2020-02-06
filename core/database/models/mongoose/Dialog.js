const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')


// Um dialog representa uma interacão com o usuário, abstraindo o front end e respondendo dinamicamente com o parser
// O objetivo é abstrair os tipos de entradas e saídas (omni)

let DialogSchema = new mongoose.Schema({

    application: mongoose.Schema.Types.ObjectId,    // nome da aplicação
    name: { type: String, unique: true, required: true, dropDups: true },   // Nome do dialogo/interação.
    flagSubDialog: Boolean, //  Caso o dialogo nao tenha menuOptionsList, será considerado um subprocesso de um Dialog

    itemsList: [{
        _id: mongoose.Schema.Types.ObjectId,
        modelType: String,  //  Prompt/BusinessRule
        index: Number   //  Ordem do item na contrucao do Dialog
    }],

    optionsList: [{ //  Lista de Dialogs e options correspondentes
        option: String, //  Prenchimento que será tratada Ex: "1" ou "sim"
        targetDialog: mongoose.Schema.Types.ObjectId,  //  Dialog destino da opção selecionada
    }], //  Opcões do Menu que formam o Dialog.

    hubResponse: String,  // retorno principal do Dialog

    version: Number,   // usado pra controle de versionamento do dialogo
    flagActive: Boolean,

    channel: mongoose.Schema.Types.ObjectId // Recebido no body do request. Vai definir qual o output sera gerado. Tratamento omni

});

module.exports = mongoose.model('Dialogs', DialogSchema)
