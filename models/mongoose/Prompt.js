const mongoose = require('mongoose')
const mongoDB_hub = require('../../core/database/mongoDB_hub')

let PromptSchema = new mongoose.Schema({
    name: String,
    text: String 
});

module.exports = mongoose.model('Prompts', PromptSchema)