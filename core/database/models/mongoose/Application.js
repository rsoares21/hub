const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

// Representa uma aplicacao parent para todos os Dialogs

let ApplicationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    descricao: { type: String, required: true }
});

module.exports = mongoose.model('Applications', ApplicationSchema)