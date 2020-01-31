const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

// Representa um tipo de resposta para o parser 
// Ex: Voice = vxml format
// Ex: Web = html format
// Ex: Text = texto puro
// Ex: Json = objeto json

let ChannelSchema = new mongoose.Schema({
    name: {type: String, unique : true, required : true},
    descricao: {type: String, required : true}
});

module.exports = mongoose.model('Channel', ChannelSchema)