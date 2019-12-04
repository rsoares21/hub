let mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'hub';
const user = 'ivr';
const pwd = encodeURIComponent('Voice$2020')

class Database {
  constructor() {
    console.log(`Mongo Init ${server}:${database}`)
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${user}:${pwd}@${server}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}

module.exports = new Database() 