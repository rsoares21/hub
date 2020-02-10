const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let ParameterSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: String,
    value: String
});

module.exports = mongoose.model('Parameters', ParameterSchema)