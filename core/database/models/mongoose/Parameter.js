const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let ParameterSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    value: { type: String, unique: true, required: true },
    modeltype: "Parameter"
});

module.exports = mongoose.model('Parameter', ParameterSchema)