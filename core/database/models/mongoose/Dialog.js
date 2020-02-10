const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')


// Um dialog representa uma interacão com o usuário, abstraindo o front end e respondendo dinamicamente com o parser
// O objetivo é abstrair os tipos de entradas e saídas (omni)

let DialogSchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true, dropDups: true },   // Nome do dialogo/interação.
    application: mongoose.Schema.Types.ObjectId,    // nome da aplicação
    channel: mongoose.Schema.Types.ObjectId, // Recebido no body do request. Vai definir qual o output sera gerado. Tratamento omni
    userRequest: String,    //  Recebe qualquer tipo de informacao em json e repassa para a integracao/plugin

    itemsList: [{
        modelId: mongoose.Schema.Types.ObjectId,
        modelType: String,  //  Prompt/BusinessRule
        index: Number   //  Ordem do item na contrucao do Dialog
    }],

    hubResponse: String,  // retorno principal do Dialog formatado pelo Parser de acordo com o Channel

    version: Number,   // usado pra controle de versionamento do dialogo
    active: Boolean,
    process: Boolean, //  Caso o dialogo nao tenha nenhum prompt com option, será considerado um processo

});

module.exports = mongoose.model('Dialogs', DialogSchema)
