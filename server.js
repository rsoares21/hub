//require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const welcomeRouter = require('./routes/welcome')

const app = express()
app.use(express.json()) // talvez seja opcional no final
app.use('/welcome', welcomeRouter) 

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, function(){
    console.log('server up!')

    app.get('/',(req, res) => {
        res.send('Hello tcp/ip!')
        console.log(req.body)
    })
})


