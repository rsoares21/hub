const mongoose = require('mongoose')
const mongoDB_hub = require('../../databases/mongoDB_hub')

let VoiceEventSchema = new mongoose.Schema({
    type: String,
    counter: Number,
    prompt: String,
    action: String,
    value: String, 
    dialogId: mongoose.Schema.Types.ObjectId

});

module.exports = mongoose.model('VoiceEvents', VoiceEventSchema)