const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let DataInterfaceSchema = new mongoose.Schema({
    name: String,
    items: [String] 
});

module.exports = mongoose.model('DataInterface', DataInterfaceSchema)