const mongoose = require('mongoose')
const mongoDB_hub = require('../../core/database/mongoDB_hub')

let IntegrationSchema = new mongoose.Schema({
    name: {type: String, unique : true, required : true}
});

module.exports = mongoose.model('Integration', IntegrationSchema)