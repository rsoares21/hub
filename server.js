//require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
//const welcomeRouter = require('./routes/welcome')

const DialogRenderer = require ('./core/modules/DialogRenderer')

const app = express()
app.use(express.json()) // talvez seja opcional no final
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/welcome', welcomeRouter)

app.use(session({
    'secret': '343ji43j4n3jn4jk3n',
    resave: false,
    saveUninitialized: true
}))

app.listen(3000, function () {
    console.log('\n\n server up!')

    app.get('/', (req, res) => {
        console.log(`session[\'${req.sessionID}\']` )
    }),
    
    app.get('/welcome/:ani/:dialog', (req, res) => {

        console.log(`session[\'${req.sessionID}\']` )
        DialogRenderer.Render(req, res)
        res.send('done.')
    })
})


