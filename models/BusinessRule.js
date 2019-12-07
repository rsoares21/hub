const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')


let BusinessRuleSchema = new mongoose.Schema({
    name: String,
    input: [{ _id:false, fieldName: String }],
    description: String,
    example: String,
    output: {
        promptListIds: [{_id: mongoose.Schema.Types.ObjectId}],
        dialogListIds: [{_id: mongoose.Schema.Types.ObjectId}]
    },
    documents:[Object]

});

module.exports = mongoose.model('BusinessRules', BusinessRuleSchema)