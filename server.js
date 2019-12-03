const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

const uri_mongodb = 'mongodb://ivr:Voice$2020@ds251618.mlab.com:51618/hub' 

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(uri_mongodb, {useUnifiedTopology: true}, (err, client) => {
    
    if (err) return console.log(err)
    db = client.db('hub')

    app.listen(3000, function(){
        console.log('its happening....')
    
        app.get('/',(req, res) => {
            res.send('Hello tcp/ip')
            console.log(req.body)
        })
    })

})
