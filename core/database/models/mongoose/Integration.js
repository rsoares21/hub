const mongoose = require('mongoose')
const mongoDB_hub = require('../../mongoDB_hub')

let IntegrationSchema = new mongoose.Schema({
    name: {type: String, unique : true, required : true},
});

module.exports = mongoose.model('Integration', IntegrationSchema)