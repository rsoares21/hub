const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let LeadSchema = new mongoose.Schema({
    path: { type: String, unique: true, required: true },
    description: String
});

module.exports = mongoose.model('Leads', LeadSchema)