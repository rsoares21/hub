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

                name: 'Welcome',
                application: '5e3a413997ff8c3dd8fc17a4',
                channel: '5e3a45f04f0fe914407c316a',

                itemsList: [
                    { modelId: "5e3debc97cedaf26245a368f", modelType: "prompt", index: 1 },
                    { modelId: "5e3dfcf90d3c1e0290cb79e1", modelType: "plugin", index: 2 }],

                version: 0.1,
                active: true,
                process: false,

            })

            let Dialog2 = new DialogModel({

                name: 'MenuTriagem',
                application: '5e3a413997ff8c3dd8fc17a4', 
                channel: '5e3a45f04f0fe914407c316a',

                itemsList: [
                    { modelId: "5e3e02560d3c1e0290cb79e2", modelType: "prompt", index: 1 }],

                version: 0.1,
                active: true,
                process: false,

            })


            let Dialog3 = new DialogModel({

                name: 'MenuOfertas',
                application: '5e3a413997ff8c3dd8fc17a4',
                channel: '5e3a45f04f0fe914407c316a',

                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "prompt", index: 1 }],

                version: 0.1,
                active: true,
                process: false,

            })

            let Dialog4 = new DialogModel({

                name: 'AlteraPlanoCelular',
                application: '5e3a413997ff8c3dd8fc17a4',
                channel: '5e3a45f04f0fe914407c316a',

                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "integration", index: 1 }],

                version: 0.1,
                active: true,
                process: false,

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
            Dialog2.save()
            Dialog3.save()

            res.end(``)

        }),

        app.get('/hub/helper/prompt/:prompt', (req, res) => {

            let welcomeMessage = `PROMPT : ${req.params.prompt}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const PromptModel = require('./core/database/models/mongoose/Prompt')
            let Prompt = new PromptModel({
                name: `Oi`,
                content: [{ value: 'Oi!' }],
                files: [{ filename: 'oi.wav' }]
            })

            let Prompt1 = new PromptModel({
                name: `Saudacao`,
                content: [{ value: 'Bom dia!' }, { value: 'Boa tarde!' }, { value: 'Boa noite!' }],
                files: [{ filename: 'bomdia.wav' }, { filename: 'boatarde.wav' }, { filename: 'boanoite.wav' }],
                businessrule: '5e3b24574b1f6736dc08dadd',
            })

            let Prompt2 = new PromptModel({
                name: `MenuOfertasDinamico`,
                content: [
                    { value: 'Para contratar Pré Pago, digite 1. Para contratar Controle, digite 2. Para finalizar o atendimento, digite 3.' },
                    { value: 'Para contratar Pós Pago, digite 1. Para contratar Controle, digite 2. Para finalizar o atendimento, digite 3.' },
                    { value: 'Para contratar Pré Pago, digite 1. Para contratar Pós Pago, digite 2. Para finalizar o atendimento, digite 3.' }
                ],
                files: [{ filename: 'ofertaPrePagoEControle.wav' }, { filename: 'ofertaPosPagoEControle.wav' }, { filename: 'ofertaPrePagoEPosPago.wav' }],
                businessrule: '5e3cb7960d3c1e0290cb79df',
                options: [
                    [{ value: '1', dialog: null }, { value: '2', dialog: null }, { value: '3', dialog: null }],
                    [{ value: '1', dialog: null }, { value: '2', dialog: null }, { value: '3', dialog: null }],
                    [{ value: '1', dialog: null }, { value: '2', dialog: null }, { value: '3', dialog: null }]
                ]
            })

            let Prompt3 = new PromptModel({
                name: `BemVindoTriagem`,
                content: [{ value: 'Bem vindo ao nosso Hub!' }],
                files: [{ filename: 'welcome.wav' }]
            })

            let Prompt4 = new PromptModel({
                name: `ObrigadoPorLigar`,
                content: [{ value: 'Obrigado por entrar em contato conosco. Até logo.' }],
                files: [{ filename: 'obrigadoporligar.wav' }]
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


            res.end(``)

        }),

        app.get('/hub/helper/plugin/:plugin', (req, res) => {

            let welcomeMessage = `PLUGIN : ${req.params.plugin}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const PluginModel = require('./core/database/models/mongoose/Plugin')
            let Plugin = new PluginModel({
                name: `Saudacao_VXML`,
                description: 'Saudacoes',
                pluginWorker: {
                    name: 'Saudacao',
                    pluginMethods: [
                        { name: 'saudacaoInicial', description: 'Retorna os prompts de bom dia, boa tarde ou boa noite e de acordo com o horario do dia passado via parametro' }]
                }
            })

            let Plugin2 = new PluginModel({
                name: `Goto_VXML`,
                description: 'Gera um apontamento vxml para um outro Dialog <goto next="%HUB%/dialogs/BlackHole"/>',
                pluginWorker: {
                    name: 'GotoVXML',
                    pluginMethods: [{
                        name: 'gotoDialog',
                        description: 'Retorna uma tag vxml goto apontando para outro Dialog.'
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

            Plugin2.save()

            res.end(``)

        }),

        app.get('/hub/helper/businessrule/:businessrule', (req, res) => {

            let welcomeMessage = `BUSINESS RULE : ${req.params.businessrule}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            // CREATE TEMPLATE PLUGIN *DEVONLY*

            const BusinessRuleModel = require('./core/database/models/mongoose/BusinessRule')
            let BusinessRule = new BusinessRuleModel({

                channelId: "5e3a45f04f0fe914407c316a",
                name: `Saudacao`,
                type: 'plugin',
                class: '5e3b25b55aa36d112c208b25',
                method: '5e3b1d36922477484406cc69',
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',
                    modeltype: 'parameter'
                }],

                description: "Validar o horario da requisicao de acordo com a data passada no parametro",
                example: "Entre 00:00 e 11:59 'bomdia.wav' / 12:00 e 17:59 'boatarde.wav' / 18:00 e 23:59 'boanoite.wav'",
                /*output: {
                    metadataPathList: [{ _id: '5e3b138185e02b46b82cec6f' }]
                },*/
                expiration: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                

            })

            let BusinessRule2 = new BusinessRuleModel({

                channelId: "5e3a45f04f0fe914407c316a",
                name: `MenuOfertas`,
                type: 'plugin',
                class: '5e3b25b55aa36d112c208b25',
                method: '5e3b1d36922477484406cc69',
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',
                    modeltype: 'datapath'
                }],

                description: "Ofertar mudanca de planos diferentes do que o cliente ja possui.",
                example: "Se cliente = PRE ofertar POS e COTROLE (ofertaPosPagoEControle.wav); Se cliente = POS ofertar PRE e CONTROLE (ofertaPrePagoEControle.wav); Se cliete = CONTROLE ofertar PRE e POS (ofertaPrePagoEPosPago.wav).",
                /*output: {
                    metadataPathList: [{ _id: '5e3b138185e02b46b82cec6f' }]
                },*/
                expiration: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                

            })

            let BusinessRule3 = new BusinessRuleModel({

                channelId: "5e3a45f04f0fe914407c316a",
                name: `Goto`,
                type: 'plugin',
                class: '5e3b25b55aa36d112c208b25',
                method: '5e3b1d36922477484406cc69',
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',
                    modeltype: 'dialog'
                }],

                description: "Criar um redirecionamento para outro Dialog.",
                example: "Redirecionando para dialog Triagem",
                /*output: {
                    metadataPathList: [{ _id: '5e3b138185e02b46b82cec6f' }]
                },*/
                expiration: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                

            })

            let BusinessRule4 = new BusinessRuleModel({

                channelId: "5e3a45f04f0fe914407c316a",
                name: `AlteraPlanoCelular`,
                type: 'integration',
                class: '5e3b25b55aa36d112c208b25',
                method: '5e3b1d36922477484406cc69',
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',
                    modeltype: 'datapath'
                }],

                description: "Usar o datapath referido e chamar a integracao de alteracao de planos",
                example: "Cliente Pre Pago envia solicitacao de alteracao do plano para Pos Pago através da Integracao do Siebel conforme documentação.",
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

            BusinessRule2.save()
            BusinessRule3.save()
            BusinessRule4.save()


            res.end(``)

        }),

        app.get('/hub/helper/datapath/:datapath', (req, res) => {

            let welcomeMessage = `DATAPATH : ${req.params.datapath}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const DataPathModel = require('./core/database/models/mongoose/DataPath')
            let DataPath = new DataPathModel({
                integration: '5e3b138185e02b46b82cec6f',
                endPoint: '5e3b138185e02b46b82cec6f',
                path: `5e3b138185e02b46b82cec6f`,
                description: "Tipo de plano do cliente PRE, POS ou CONTROLE",
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

            const IntegrationModel = require('./core/database/models/mongoose/Integration')
            let Integration = new IntegrationModel({
                name: `Siebel`,
                shortname: 'ALTPLAN',  //  10 chars no maximo
                description: "Integração que solicita a alteração do plano de celular",
                integrationManager: {
                    name: "Siebel",   // Nome da classe client manager da integração
                    endpoints: [{
                        name: "ObterTip+oPlanoCelular",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Retorna o tipo de plano de celular do usuario. Ex: POS, PRE CONTROLE",
                        paths: [{ value: 'TipoPlanoCelular' }]
                    },
                    {
                        name: "AlteraPlanoPre",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Mudança de plano para Pré Pago. Retorna Result e Msg.",
                        paths: [{ value: 'AlteraPlanoPreResult' }, { value: 'AlteraPlanoPreMsg' }]
                    }, {
                        name: "AlteraPlanoPos",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Mudança de plano para Pós Pago. Retorna Result e Msg.",
                        paths: [{ value: 'AlteraPlanoPosResult' }, { value: 'AlteraPlanoPosMsg' }]
                    }, {
                        name: "AlteraPlanoControle",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Mudança de plano para Controle. Retorna Result e Msg.",
                        paths: [{ value: 'AlteraPlanoControleResult' }, { value: 'AlteraPlanoControleMsg' }]
                    }]
                }
            })

            let Integration2 = new IntegrationModel({
                name: `Parametros`,
                shortname: 'PARAMS',  //  10 chars no maximo
                description: "Integração de Parametros gerais da aplicação",
                integrationManager: {
                    name: "Parametros",   // Nome da classe client manager da integração
                    endpoints: [{
                        name: "ObterParametro",   //  Nome da function na classe manager da integracao Ex: ControleAdesaoBoleto, ControleAdesaoCartao, ControleCadastroCartao  fullpath={pluginWorker.pluginMethod}
                        description: "Retorna valor do parametro requisitado",
                        paths: [{ value: 'dataHoje' }, { value: 'dataPromocao' }]
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

            Integration2.save()
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


