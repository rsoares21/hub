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
                application: '5e3a413997ff8c3dd8fc17a4',    // nome da aplicação
                name: 'Inicio',   // Nome do dialogo/interação.
                flagSubDialog: false, //  Caso o dialogo nao tenha menuOptionsList, será considerado um subprocesso de um Dialog

                itemsList: [{
                    _id: '5e3bb5e7cf394850880da489',
                    modelType: 'Prompt',  //  Prompt/BusinessRule
                    index: 1   //  Ordem do item na contrucao do Dialog
                }, {
                    _id: '5e3bb5e7cf394850880da48c',
                    modelType: 'Prompt',  //  Prompt/BusinessRule
                    index: 2   //  Ordem do item na contrucao do Dialog
                }],


                //TODO Plugin GOTO Dialog

                optionsList: [{ //  Lista de Dialogs e options correspondentes
                    option: null, //  Prenchimento que será tratada Ex: "1" ou "sim"
                    targetDialog: null,  //  Dialog destino da opção selecionada
                }], //  Opcões do Menu que formam o Dialog.

                hubResponse: String,  //  '<vxml><audio src='bomdia.wav'/></vxml>'

                version: Number,   // usado pra controle de versionamento do dialogo
                flagActive: Boolean,

                channel: mongoose.Schema.Types.ObjectId // Recebido no body do request. Vai definir qual o output sera gerado. Tratamento omni

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

        app.get('/hub/helper/prompt/:prompt', (req, res) => {

            let welcomeMessage = `PROMPT : ${req.params.prompt}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const PromptModel = require('./core/database/models/mongoose/Prompt')
            let Prompt = new PromptModel({
                name: `Oi`,
                contents: [{ value: 'Oi!' }],
                files: [{ filename: 'oi.wav' }],
                businessrule: null
            })

            let Prompt1 = new PromptModel({
                name: `Saudacao`,
                contents: [{ value: 'Bom dia!' }, { value: 'Boa tarde!' }, { value: 'Boa noite!' }],
                files: [{ filename: 'bomdia.wav' }, { filename: 'boatarde.wav' }, { filename: 'boanoite.wav' }],
                businessrule: '5e3b24574b1f6736dc08dadd'
            })

            let Prompt2 = new PromptModel({
                name: `BemVindoTriagem`,
                contents: [{ value: 'Bem vindo ao nosso Hub!' }],
                files: [{ filename: 'welcome.wav' }],
                businessrule: null
            })

            let Prompt3 = new PromptModel({
                name: `OfertaPosPago`,
                contents: [{ value: 'Para contratar Pré Pago, digite 1. Para contratar Controle, digite 2. Para finalizar o atendimento, digite 3.' }],
                files: [{ filename: 'ofertaPrePagoEControle.wav' }],
                businessrule: null
            })

            let Prompt4 = new PromptModel({
                name: `OfertaPrePago`,
                contents: [{ value: 'Para contratar Pós Pago, digite 1. Para contratar Controle, digite 2. Para finalizar o atendimento, digite 3.' }],
                files: [{ filename: 'ofertaPosPagoEControle.wav' }],
                businessrule: null
            })

            let Prompt5 = new PromptModel({
                name: `OfertaControle`,
                contents: [{ value: 'Para contratar Pré Pago, digite 1. Para contratar Pós Pago, digite 2. Para finalizar o atendimento, digite 3.' }],
                files: [{ filename: 'ofertaPrePagoEPosPago.wav' }],
                businessrule: null
            })

            let Prompt6 = new PromptModel({
                name: `ObrigadoPorLigar`,
                contents: [{ value: 'Obrigado por entrar em contato conosco. Até logo.' }],
                files: [{ filename: 'obrigadoporligar.wav' }],
                businessrule: null
            })

            Prompt.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Prompt de teste ${Prompt.name} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })
            Prompt1.save()
            Prompt2.save()
            Prompt3.save()
            Prompt4.save()
            Prompt5.save()
            Prompt6.save()


            res.end(``)

        }),

        app.get('/hub/helper/plugin/:plugin', (req, res) => {

            let welcomeMessage = `PLUGIN : ${req.params.plugin}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const PluginModel = require('./core/database/models/mongoose/Plugin')
            let Plugin = new PluginModel({
                name: `${req.params.plugin}`,
                description: 'Retrieves system Information like ip address, current_date, diskspace, etc...',
                pluginWorker: {
                    name: 'SystemInformation',   // Nome da classe tratadora desse plugin Ex: SiebelTranslator
                    pluginMethods: [{
                        name: 'getHourOfDay',   //  Nome da function no plugin Ex: isPrepago, isPosPago  fullpath={pluginWorker.pluginMethod}
                        description: 'retorna a hora do dia em formato 24h'
                    }]
                }
            })

            Plugin.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Plugin de teste ${Plugin.name} salvo`)
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
                plugin: '5e3b1d36922477484406cc68',
                pluginMethod: '5e3b1d36922477484406cc69',
                inputList: [{   //  
                    _id: "5e3b0234e389162f5835e761" //  datapath
                }],
                description: "Validar o horario da requisicao de acordo com a data passada no parametro",
                example: "Entre 00:00 e 11:59 'bom dia' / 12:00 e 17:59 'boa tarde' / 18:00 e 23:59 'boa noite'",
                output: {
                    metadataPathList: [{ _id: '5e3b138185e02b46b82cec6f' }]
                },
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
                integration: null,
                endPoint: null,
                path: `${req.params.datapath}`,   // SYSTEM.FIELD / METADATA.{USER}.<{BRuleName}.{PluginName}.{PluginMethod}>.FIELD / DATA.<{IntegrationName}.{IntegrationEndpoint}>.FIELD
                description: "",
            })

            DataPath.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`DataPath ${DataPath.path} salvo`)
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

            const DataPathModel = require('./core/database/models/mongoose/DataPath')
            let DataPath = new DataPathModel({
                path: `${req.params.parameter}`,   // SYSTEM.FIELD / METADATA.{USER}.<{BRuleName}.{PluginName}.{PluginMethod}>.FIELD / DATA.<{IntegrationName}.{IntegrationEndpoint}>.FIELD
                integration: '5e3afe03f4bcee04480d10fb',  //  Se possuir uma integracao, é um datapath ou parameter.
                endpooint: '5e3afe03f4bcee04480d10fc',
                description: ""
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

        app.get('/hub/helper/integration/:integration', (req, res) => {

            let welcomeMessage = `INTEGRATION : ${req.params.integration}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const IntegrationModel = require('./core/database/models/mongoose/Integration')
            let Integration = new IntegrationModel({
                name: `${req.params.integration}`,
                shortname: 'm4u',  //  10 chars no maximo
                description: "Integração que orquestra chamadas para M4U",
                integrationManager: {
                    name: "M4UManager",   // Nome da classe client manager da integração
                    endpoints: [{
                        name: "AdesaoControle",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Adesao"
                    }, {
                        name: "MigracaoControle",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Migracao"
                    }, {
                        name: "CadastroCartaoEldorado",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Cadastro Cartão de Crédito"
                    }]
                }

            })

            Integration.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Integration ${Integration.name} salva`)
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


