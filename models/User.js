const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let UserSchema = new mongoose.Schema({
    nome: String,
    ani: String,
    scoreAnatel: Number,
    tipoPlano: String 
});

module.exports = mongoose.model('Users', UserSchema)