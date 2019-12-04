const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    nome: String,
    ani: String,
    scoreAnatel: Number,
    tipoPlano: String 
});

module.exports = userSchema