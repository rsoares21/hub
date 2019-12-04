const mongoose = require('mongoose')
const procedurePrincipal = require('../databases/ProcedurePrincipal')

let userSchema = new mongoose.Schema({
    nome: String,
    ani: String,
    scoreAnatel: Number,
    tipoPlano: String 
});

module.exports = mongoose.model('Users', userSchema)