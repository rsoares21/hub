//require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const welcomeRouter = require('./routes/welcome')


const app = express()
app.use(express.json()) // talvez seja opcional no final
app.use('/welcome', welcomeRouter)

const uri_mongodb = 'mongodb://ivr:Voice$2020@ds251618.mlab.com:51618/hub' 

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/hub', { useNewUrlParser: true,  useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))


app.listen(3000, function(){
    console.log('its happening....')

    app.get('/',(req, res) => {
        res.send('Hello tcp/ip')
        console.log(req.body)
    })
})


