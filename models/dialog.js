const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

const VoiceEvent = require('../core/models/VoiceEvent')

let DialogSchema = new mongoose.Schema({
    ivrProfile: mongoose.Schema.Types.ObjectId,
    name: String,

    voiceEvents: [{ _id: mongoose.Schema.Types.ObjectId }],
    initPlugins: [{ _id: mongoose.Schema.Types.ObjectId }],
    exitPlugins: [{ _id: mongoose.Schema.Types.ObjectId }],
    initPrompt: String,
    menuOptions: [{
        input: String,
        dialog: String
    }],
    dialogVersion: Number

});

module.exports = mongoose.model('Dialogs', DialogSchema)