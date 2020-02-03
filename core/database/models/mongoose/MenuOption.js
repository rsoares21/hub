const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

// Representa uma opcão de um menu usado em Dialogs

let MenuOptionSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    option: String, //  Opção selecionada quando tiver com o preencihmento de acordo com option Ex: "1" ou "sim"
    targetDialog: { _id: mongoose.Schema.Types.ObjectId },  //  Destino da opção selecionada
});

module.exports = mongoose.model('MenuOption', MenuOptionSchema)