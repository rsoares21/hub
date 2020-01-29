const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let ParameterSchema = new mongoose.Schema({
    name: String,
    text: String 
});

module.exports = mongoose.model('Parameter', ParameterSchema)