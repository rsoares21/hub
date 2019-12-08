//require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
//const welcomeRouter = require('./routes/welcome')

const DialogRunner = require ('./core/modules/DialogRunner')

const app = express()
app.use(express.json()) // talvez seja opcional no final
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/welcome', welcomeRouter)

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    saveUninitialized: false,
    resave: false
}));


app.listen(3000, function () {
    console.log('\n\nHub Server up!')

    app.get('/', (req, res) => {
        //console.log(`session[\'${req.sessionID}\']` )
    }),
    
    app.get('/welcome/:ani/:dialog', (req, res) => {

        console.log(`[${req.sessionID}]` )
        res.set('Content-Type', 'text/xml');
        res.send(DialogRunner.Render(req, req.session))
    })
})


