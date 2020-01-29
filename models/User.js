const mongoose = require('mongoose')
const mongoDB_hub = require('../databases/mongoDB_hub')

let UserSchema = new mongoose.Schema({
    data: [{ model }]//
});

module.exports = mongoose.model('Users', UserSchema)