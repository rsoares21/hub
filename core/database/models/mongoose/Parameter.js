const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

// Parametros sao usados para dados de entrada nos plugins, Ex: 

let ParameterSchema = new mongoose.Schema({
    path: { type: String, unique: true, required: true }
    //modeltype: String  // Identificador do tipo de objeto parent (diferenciando metadataPath e dataPath)
});

module.exports = mongoose.model('Parameter', ParameterSchema)