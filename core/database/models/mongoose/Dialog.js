const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')


// Um dialog representa uma interacão com o usuário, abstraindo o front end e respondendo dinamicamente com o parser
// O objetivo é abstrair os tipos de entradas e saídas (omni)

let DialogSchema = new mongoose.Schema({

    name: { type: String, unique: true, required: true, dropDups: true },   // Nome do dialogo/interação.
    description: String,
    application: mongoose.Schema.Types.ObjectId,    // nome da aplicação
    //channel: mongoose.Schema.Types.ObjectId, // Recebido no body do request. Vai definir qual o output sera gerado. Tratamento omni

    itemsList: [{
        modelId: mongoose.Schema.Types.ObjectId,
        modelType: String,  //  Prompt/BusinessRule
        index: Number   //  Ordem do item na contrucao do Dialog
    }],
    nextDialog: mongoose.Schema.Types.ObjectId,  //  Para Dialogs informativos, sem menu. Gera tag de <goto> para o próximo Dialog. (voice)
    integrationFault: { dialog: mongoose.Schema.Types.ObjectId, lead: mongoose.Schema.Types.ObjectId }, //  Dialog a ser chamado em caso de erro na integracão
    integrationSuccess: { dialog: mongoose.Schema.Types.ObjectId, lead: mongoose.Schema.Types.ObjectId },    //  Dialog a ser executado apos sucesso no Dialog atual
    lead: { leadId: mongoose.Schema.Types.ObjectId, info: String }, //  Lead que será gerado ao entrar no Dialog

    hubResponse: String,  // retorno principal do Dialog formatado pelo Parser de acordo com o Channel

    version: Number,   // usado pra controle de versionamento do dialogo
    active: Boolean,
    //process: Boolean, //  Caso o dialogo nao tenha nenhum prompt com option, será considerado um processo

});

module.exports = mongoose.model('Dialogs', DialogSchema)
