const mongoose = require('mongoose')
const mongoDB_hub = require('../../databases/mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: String,
    text: String 
});

module.exports = mongoose.model('Prompts', PromptSchema)