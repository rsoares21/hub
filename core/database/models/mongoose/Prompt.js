const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    logic: [{ datapath: mongoose.Schema.Types.ObjectId, value: String, index: Number }],
    syncContent: [{ value: String }],  //  Conteudo do prompt sincrono (interações em tempo real). Prompts de voz são síncronos pois dependem de resposta rápida.
    asyncContent: [{ value: String }],  //  Conteudo do prompt para interacões assincronas como SMS, whatsapp, etc...
    textContent: [{ value: String }],  //  Conteudo em formato texto para canais apropriados
    files: [{ filename: String }],  //  Nome da midia, Ex: bomdia.wav (Voice Channel)
    //businessrule: mongoose.Schema.Types.ObjectId,
    options: [[{
        value: String, //  Prenchimento que será tratada Ex: "1" ou "sim"
        dialog: mongoose.Schema.Types.ObjectId,  //  Dialog ou Processo destino da opção selecionada
        queryString: String
    }]]
});

module.exports = mongoose.model('Prompts', PromptSchema)