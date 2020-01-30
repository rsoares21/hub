const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let IntegrationDataPathSchema = new mongoose.Schema({
    name: {type: String, unique : true, required : true},
    dataPathList: [{ _id: mongoose.Schema.Types.ObjectId}]  // Lista de dataPaths da Interface
});

module.exports = mongoose.model('IntegrationDataPath', IntegrationDataPathSchema)