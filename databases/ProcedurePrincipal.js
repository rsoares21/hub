let mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/hub', { useNewUrlParser: true,  useUnifiedTopology: true})
//const uri_mongodb = 'mongodb://ivr:Voice$2020@ds251618.mlab.com:51618/hub' 

const server = '127.0.0.1:27017';
const database = 'hub';
const user = 'ivr';
const pwd = encodeURIComponent('Voice$2020')

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(`mongodb://${user}:${pwd}@${server}/${database}`, { useNewUrlParser: true,  useUnifiedTopology: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database() 