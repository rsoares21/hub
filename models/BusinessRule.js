const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')


let BusinessRuleSchema = new mongoose.Schema({
    name: String,
    input: [{ fieldName: String }],
    description: String,
    example: String,
    outputList: {
        promptIds: [{_id: mongoose.Schema.Types.ObjectId}],
        dialogIds: [{_id: mongoose.Schema.Types.ObjectId}]
    },


});

module.exports = mongoose.model('BusinessRules', BusinessRuleSchema)