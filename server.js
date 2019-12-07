//require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
//const cookieParser = require('cookie-parser')
//const welcomeRouter = require('./routes/welcome')

const app = express()
app.use(express.json()) // talvez seja opcional no final
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cookieParser())
//app.use('/welcome', welcomeRouter)

app.use(session({
    'secret': '343ji43j4n3jn4jk3n',
    resave: false,
    saveUninitialized: true
}))

app.listen(3000, function () {
    console.log('')
    console.log('')
    console.log('server up!')

    app.get('/', (req, res) => {

        req.session.name = 'Ricardo'
        req.session.isprepago = true

        console.log('session1 >  ' + req.sessionID)
        console.log('session1 >  ' + req.session.name)
        console.log('session1 >  ' + req.session.isprepago)

        //req.session.save()

        res.redirect('http://localhost:3000/welcome/21971050252/MainMenu')

        //res.send('Hello tcp/ip!')

    },
        // Get caller info from voice platform :> Get ANI from parameters
        app.get('/welcome/:ani/:dialog', (req, res) => {

            console.log('session2 >  ' + req.sessionID)
            console.log('session2 >  ' + req.session.name)
            console.log('session2 >  ' + req.session.isprepago)

            var welcomeMessage = `Welcome ${req.params.ani}. Next step is ${req.params.dialog}`
            //console.log(welcomeMessage)

            const DialogModel = require('./models/Dialog')
            DialogModel.find({ name: `${req.params.dialog}` }, function (err, dialogInvoke) {

                console.log(`Buscando Dialog ${req.params.dialog}`)
                if (err || dialogInvoke.length === 0) {
                    console.log("No dialog found");
                } else {

                    //console.log(`Dialog ${req.params.dialog} Encontrado`)
                    //console.log('reflect>' + Reflect.ownKeys(dialogInvoke));
                    //console.log(dialogInvoke);
                }
            });

            res.send(welcomeMessage)
            

        })

    )
})


