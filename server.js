//require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();
//const welcomeRouter = require('./api/routes/routes')

const DialogRunner = require ('./core/DialogRunner')

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
        res.end(`Hello There.`)
    }),

    app.get('/hub', (req, res) => {
        res.end(`HUB Up!\nSend more info...\n\nHow can i help you dear REST client ?`)
    }),
    
    app.get('/hub/helper/:dialog', (req, res) => {

        let welcomeMessage = `DIALOG : ${req.params.dialog}`
        console.log(`[${req.session.id}] ${welcomeMessage}`)

        // CREATE TEMPLATE DIALOG *DEVONLY*

        const DialogModel = require('./core/database/models/mongoose/Dialog')
        let Dialog = new DialogModel({
            application: '5de875f9644fbd29805d911c',
            name: `${req.params.dialog}`,
            flagSubDialog: false,
            plugins: [{ _id: '5de848a461b8974a30caf4b3' }],
            optionsList: [{ 
                value: '1', 
                targetDialog: '5de848a461b8974a30caf4b3',  
            },
            { 
                value: 'sim', 
                targetDialog: '5de848a461b8974a30caf4b3',  
            }],
            hubTextResponse: 'some validated rendered text here',
            
            dialogVersion: 0.1,
            flagActive: true,
        
            channel: { _id: '5de848a461b8974a30caf4b3' }
    
        })

    
        console.log(Dialog.name)
    
        Dialog.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })
    
        DialogModel.find({ name: req.params.dialog }, function (err, dialogs) {
            if (err) throw err;
    
            // object of all the users
            console.log(dialogs);
    
            console.log('reflect>' + Reflect.ownKeys(Dialog));
        });

        res.end(``)



    }),

    app.get('/hub/:ani/:dialog', (req, res) => {

        let welcomeMessage = `REQUEST [${req.params.ani}] DIALOG : ${req.params.dialog}`
        console.log(`[${req.session.id}] ${welcomeMessage}`)

        DialogRunner.Render(req, res, req.session)
    })

    app.get('/hub/:ani/:dialog/:option', (req, res) => {

        let welcomeMessage = `REQUEST [${req.params.ani}] DIALOG : ${req.params.dialog} OPTION : ${req.params.option}`
        console.log(`[${req.session}] ${welcomeMessage}`)
    
        DialogRunner.ExecuteOption(req, res, req.session)
    })    



})


