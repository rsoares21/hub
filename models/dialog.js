const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let DialogSchema = new mongoose.Schema({
    nome: String
});

module.exports = mongoose.model('Dialogs', DialogSchema)