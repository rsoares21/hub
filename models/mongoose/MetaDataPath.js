const mongoose = require('mongoose')
const mongoDB_hub = require('../../databases/mongoDB_hub')

let MetaDataPathSchema = new mongoose.Schema({
    name: {type: String, unique : true, required : true},
    metaDataPathList: [{ _id: mongoose.Schema.Types.ObjectId}]  // Lista de metaDataPaths do usuario
});

module.exports = mongoose.model('MetaDataPath', MetaDataPathSchema)