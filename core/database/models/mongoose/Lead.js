const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let LeadSchema = new mongoose.Schema({
    datapathId: mongoose.Schema.Types.ObjectId,
    created_at: { type: Date, default: Date.now },
    ani: String,
    mobile: String,
    email:String,
    cpf:String,
    info:String //  Aditional Info
});

module.exports = mongoose.model('Leads', LeadSchema)