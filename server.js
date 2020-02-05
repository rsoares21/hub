//require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
//const welcomeRouter = require('./api/routes/routes')

const DialogRunner = require('./core/DialogRunner')

const app = express()
app.use(express.json()) // talvez seja opcional no final
app.use(bodyParser.urlencoded({ extended: true }))
//app.use('/welcome', welcomeRouter)

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
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

        app.get('/hub/helper/dialog/:dialog', (req, res) => {

            let welcomeMessage = `DIALOG : ${req.params.dialog}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE DIALOG *DEVONLY*

            const DialogModel = require('./core/database/models/mongoose/Dialog')
            let Dialog = new DialogModel({
                application: '5e3a16973c95e10290087816',
                name: `${req.params.dialog}`,
                flagSubDialog: false,
                plugins: [{ _id: '5e3a16973c95e10290087816' }, { _id: '5e3a16973c95e10290087816' }],
                optionsList: [{
                    option: '1',
                    _id: '5e3a1e67bd09b618fc32ffaa',
                },
                {
                    option: 'sim',
                    _id: '5e3a1e67bd09b618fc32ffaa',
                }],
                hubTextResponse: 'some validated rendered text here',

                version: 0.1,
                flagActive: true,

                channel: { _id: '5e3a16973c95e10290087816' }

            })


            //console.log(Dialog.name)

            Dialog.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Dialog de teste ${Dialog.name} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/helper/plugin/:plugin', (req, res) => {

            let welcomeMessage = `PLUGIN : ${req.params.plugin}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const PluginModel = require('./core/database/models/mongoose/Plugin')
            let Plugin = new PluginModel({
                name: `${req.params.dialog}`,
                description: 'Plugin que saúda de acordo com a hora do dia',
                businessRulesList: [{ _id: mongoose.Schema.Types.ObjectId }],
                pluginWorker: {
                    name: { type: String, unique: true, required: true },   // Nome da classe tratadora desse plugin Ex: SiebelTranslator
                    pluginMethods: [{
                        name: { type: String, unique: true, required: true },   //  Nome da function no plugin Ex: isPrepago, isPosPago  fullpath={pluginWorker.pluginMethod}
                        description: String
                    }]
                }

            })

            //console.log(Dialog.name)

            Dialog.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Dialog de teste ${Dialog.name} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/helper/businessrule/:businessrule', (req, res) => {

            let welcomeMessage = `BUSINESS RULE : ${req.params.businessrule}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const BusinessRuleModel = require('./core/database/models/mongoose/BusinessRule')
            let BusinessRule = new BusinessRuleModel({

                channelId: "5e3a45f04f0fe914407c316a",
                name: `${req.params.businessrule}`,
                inputList: [{
                    modelType: "Parameter",
                    _id: "5e3a4e4fbb14462c44c87598"
                }],
                description: "Validar o horario da requisicao de acordo com a data passada no parametro",
                example: "Entre 00:00 e 11:59 'bom dia' / 12:00 e 17:59 'boa tarde' / 18:00 e 23:59 'boa noite'",
                output: {   //  retorna um obj dataPath, mas a partir do output será tratado como metadataPath
                    metadataPathList: [{ metadataPathId: mongoose.Schema.Types.ObjectId, value: String }]  // retorna o dataPath : SIEBEL.tipoPlano
                    // scale- outros retornos podem ser adicionados de acordo com a necessidade
                },
                modeltype: "BusinessRule",   // Identificador do tipo de objeto parent (diferenciando metadataPath e dataPath)
                expiration: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                


            })

            //console.log(Dialog.name)

            BusinessRule.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`BusinessRule ${BusinessRule.name} salva`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/helper/datapath/:datapath', (req, res) => {

            let welcomeMessage = `DATAPATH : ${req.params.datapath}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE DATAPATH *DEVONLY*

            const DataPathModel = require('./core/database/models/mongoose/DataPath')
            let DataPath = new DataPathModel({
                path: `${req.params.datapath}`   // SYSTEM.FIELD / METADATA.{USER}.<{BRuleName}.{PluginName}.{PluginMethod}>.FIELD / DATA.<{IntegrationName}.{IntegrationEndpoint}>.FIELD
            })

            DataPath.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Parameter ${DataPath.path} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/helper/parameter/:parameter', (req, res) => {

            let welcomeMessage = `PARAMETER : ${req.params.parameter}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const ParameterModel = require('./core/database/models/mongoose/Parameter')
            let Parameter = new ParameterModel({
                path: `${req.params.parameter}`   // SYSTEM.FIELD / METADATA.{USER}.<{BRuleName}.{PluginName}.{PluginMethod}>.FIELD / DATA.<{IntegrationName}.{IntegrationEndpoint}>.FIELD
            })

            Parameter.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Parameter ${Parameter.path} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/helper/channel/:channel', (req, res) => {

            let welcomeMessage = `CHANNEL : ${req.params.channel}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const ChannelModel = require('./core/database/models/mongoose/Channel')
            let Channel = new ChannelModel({
                name: `${req.params.channel}`,
                descricao: "Converte dados do Dialog para formato VXML.",
                application: "5e3a413997ff8c3dd8fc17a4"
            })

            Channel.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Channel ${Channel.name} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/helper/application/:application', (req, res) => {

            let welcomeMessage = `APPLICATION : ${req.params.application}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const ApplicationModel = require('./core/database/models/mongoose/Application')
            let Application = new ApplicationModel({
                name: `${req.params.application}`,
                descricao: "Atendimento para clientes Pos Pago Oi",
            })

            Application.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Application ${Application.name} salva`)
                })
                .catch(err => {
                    console.error(err)
                })

            res.end(``)

        }),

        app.get('/hub/dialogs/ani/:ani/:dialog', (req, res) => {

            let welcomeMessage = `REQUEST [${req.params.ani}] DIALOG : ${req.params.dialog}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            DialogRunner.Render(req, res, req.session)
        }),

        app.get('/hub/:ani/:dialog/:option', (req, res) => {

            let welcomeMessage = `REQUEST [${req.params.ani}] DIALOG : ${req.params.dialog} OPTION : ${req.params.option}`
            console.log(`[${req.session}] ${welcomeMessage}`)

            DialogRunner.ExecuteOption(req, res, req.session)
        })



})


