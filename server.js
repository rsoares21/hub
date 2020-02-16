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

        app.get('/hub/helper/lead/:lead', (req, res) => {
            const LeadModel = require('./core/database/models/mongoose/Lead')
            let Lead = new LeadModel({
                path: `lead.voip.{ani}.hangup.{timestamp}`,
                description: `Data do término do atendimento para esse usuário, nesse canal.`,

            });
            Lead.save()
        }),

        app.get('/hub/helper/dialog/:dialog', (req, res) => {

            let welcomeMessage = `DIALOG : ${req.params.dialog}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const DialogModel = require('./core/database/models/mongoose/Dialog')
            let Dialog = new DialogModel({
                name: 'ObterDadosChamador',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "integration", index: 1 }],   //  Consulta dados da rede Voip
                version: 0.1,
                active: true,
                process: true,
            })

            let Dialog1 = new DialogModel({
                name: 'Saudacao',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e476acecce4cd2860b9869d',
                itemsList: [
                    { modelId: "5e3dfcf90d3c1e0290cb79e1", modelType: "businessRule", index: 1 },    //  VoiceCallInfoManager
                    { modelId: "5e3debc97cedaf26245a368f", modelType: "prompt", index: 2 },     //  prompt dinamico
                    { modelId: "5e3dfcf90d3c1e0290cb79e1", modelType: "businessRule", index: 3 }],    //  Goto Menu Triagem
                version: 0.1,
                active: true,
                process: false,
            })

            let Dialog2 = new DialogModel({
                name: 'MenuTriagem',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3e02560d3c1e0290cb79e2", modelType: "prompt", index: 1 },     //  Bemvindo.wav
                    { modelId: "5e3e02560d3c1e0290cb79e2", modelType: "prompt", index: 2 }],    //  MenuTriagem.wav
                version: 0.1,
                active: true,
                process: false,
            })

            let Dialog3 = new DialogModel({
                name: 'ConsultaInicialSiebel',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "integration", index: 1 }],   //  Consulta dos dados do plano de celular do usuário     integrationFaultDialog, integrationSuccessDialog
                version: 0.1,
                active: true,
                process: true,
            })

            let Dialog4 = new DialogModel({
                name: 'MenuOfertas',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "prompt", index: 1 }],    //  Prompt dinamico
                version: 0.1,
                active: true,
                process: false,
            })

            let Dialog5 = new DialogModel({
                name: 'AlteraPlanoCelular',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "integration", index: 1 }],   //  Altera Plano do usuário de acordo com a opção selecionada no MenuTriagem     integrationFaultDialog, integrationSuccessDialog
                version: 0.1,
                active: true,
                process: true,
            })

            let Dialog6 = new DialogModel({
                name: 'Transfer',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "prompt", index: 1 },    //  Aguarde
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "businessRule", index: 2 }],   //  Transfere de acordo com regras de dados do metadata
                version: 0.1,
                active: true,
                process: false,
            })

            let Dialog7 = new DialogModel({
                name: 'Despedida',
                application: '5e476a593f836b0e8cc7c999',
                channel: '5e3a45f04f0fe914407c316a',
                itemsList: [
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "prompt", index: 1 },    //  Despedida.wav
                    { modelId: "5e3debc97cedaf26245a3699", modelType: "businessRule", index: 2 }],   //  Goodbye Core plugin
                version: 0.1,
                active: true,
                process: false,
            })

            Dialog.save()
                .then(doc => {
                    console.log(doc)
                    //console.log(`Dialog de teste ${Dialog.name} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })
            Dialog1.save()
            Dialog2.save()
            Dialog3.save()
            Dialog4.save()
            Dialog5.save()
            Dialog6.save()
            Dialog7.save()

            res.end(``)

        }),

        app.get('/hub/helper/prompt/:prompt', (req, res) => {

            let welcomeMessage = `PROMPT : ${req.params.prompt}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const PromptModel = require('./core/database/models/mongoose/Prompt')
            let Prompt = new PromptModel({
                name: `Oi`,
                content: [{ value: 'Oi!' }],
                files: [{ filename: 'Oi.wav' }]
            })

            let Prompt1 = new PromptModel({
                name: `Saudacao`,
                logic: [
                    { datapath: '5e48ebb3c2d1d217e0ddbc6a', value: 'dia', index: 1 },   //  md.turno
                    { datapath: '5e48ebb3c2d1d217e0ddbc6a', value: 'tarde', index: 2 },   //  md.turno
                    { datapath: '5e48ebb3c2d1d217e0ddbc6a', value: 'noite', index: 3 },  //  md.turno
                ],
                content: [{ value: 'Bom dia!' }, { value: 'Boa tarde!' }, { value: 'Boa noite!' }],
                files: [{ filename: 'Bomdia.wav' }, { filename: 'Boatarde.wav' }, { filename: 'Boanoite.wav' }]
            })

            let Prompt2 = new PromptModel({
                name: `BemVindoTriagem`,
                content: [{ value: 'Bem vindo ao nosso Hub!' }],
                files: [{ filename: 'Bemvindo.wav' }]
            })

            let Prompt3 = new PromptModel({
                name: `MenuTriagem`,
                content: [{ value: 'Digite 1 para troca de plano, ou digite 2 se você não possui um plano e deseja contratar.' }],
                files: [{ filename: 'MenuTriagem.wav' }],
                options: [
                    [{ value: '1', dialog: null, queryParam: null, leadIds: null },     //  ConsultaInicialSiebel
                    { value: '2', dialog: null, queryParam: null, leadIds: '5e3b24574b1f6736dc08dadd' }],    //  dialog Transfer , lead #01
                ]
            })

            let Prompt4 = new PromptModel({
                name: `MenuOfertas`,
                logic: [
                    { datapath: '5e48e0e2fc55ac3fe0532220', value: 'POS', index: 1 },   //  ani.tipoPlano
                    { datapath: '5e48e0e2fc55ac3fe0532220', value: 'PRE', index: 2 },   //  ani.tipoPlano
                    { datapath: '5e48e0e2fc55ac3fe0532220', value: 'CONTROLE', index: 3 },  //  ani.tipoPlano
                ],
                content: [
                    { value: 'Para contratar Pré Pago, digite 1. Para contratar Controle, digite 2. Para finalizar o atendimento, digite 3.' },
                    { value: 'Para contratar Pós Pago, digite 1. Para contratar Controle, digite 2. Para finalizar o atendimento, digite 3.' },
                    { value: 'Para contratar Pré Pago, digite 1. Para contratar Pós Pago, digite 2. Para finalizar o atendimento, digite 3.' }
                ],
                files: [{ filename: 'MenuOfertaPrePagoEControle.wav' }, { filename: 'MenuOfertaPosPagoEControle.wav' }, { filename: 'MenuOfertaPrePagoEPosPago.wav' }],
                options: [
                    [{ value: '1', dialog: null, queryParam: 'PRE' }, { value: '2', dialog: null, queryParam: 'CONTROLE' }, { value: '3', dialog: null, queryParam: null }],
                    [{ value: '1', dialog: null, queryParam: 'POS' }, { value: '2', dialog: null, queryParam: 'CONTROLE' }, { value: '3', dialog: null, queryParam: null }],
                    [{ value: '1', dialog: null, queryParam: 'PRE' }, { value: '2', dialog: null, queryParam: 'POS' }, { value: '3', dialog: null, queryParam: null }]
                ]
            })

            let Prompt5 = new PromptModel({
                name: `AguardeTransferencia`,
                content: [{ value: 'Você está sendo direcionado para um de nossos consultores. Por favor, aguarde.' }],
                files: [{ filename: 'Aguarde.wav' }]
            })

            let Prompt6 = new PromptModel({
                name: `Despedida`,
                content: [{ value: 'Seu plano foi alterado com sucesso. Obrigado por entrar em contato conosco. Até logo!' }],
                files: [{ filename: 'Despedida.wav' }]
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

            /*
            let Plugin = new PluginModel({
                name: `Saudacao`,
                description: 'Saudacoes',
                pluginWorker: {
                    name: 'Saudacao',
                    pluginMethods: [
                        { name: 'SaudacaoInicial', description: 'Retorna os prompts de bom dia, boa tarde ou boa noite e de acordo com o horario do dia passado via parametro' }]
                }
            })*/

            let Plugin = new PluginModel({
                name: `Caller Info Manager`,
                description: 'Recupera informações da chamada de voz como VDN de entrada, ANI, HEADERS, etc...',
                pluginWorker: {
                    name: 'CallerInfoManager',
                    pluginMethods: [{
                        name: 'obterDadosChamador',
                        description: 'Retorna os dados da chamada'
                    }]
                }
            })

            let Plugin1 = new PluginModel({
                name: `Voice Tags`,
                description: 'Gera um apontamento vxml para um outro Dialog <goto next="%HUB%/dialogs/BlackHole"/>',
                pluginWorker: {
                    name: 'VXMLTagCreator',
                    pluginMethods: [{
                        name: 'Goto',
                        description: 'Retorna uma tag vxml goto apontando para outro Dialog. <goto next="%HUB%/dialogs/BlackHole"/>'
                    }, {
                        name: 'Play TTS Audio',
                        description: 'Gera tag vxml com texto a ser verbalizado.'
                    }]
                }
            })

            let Plugin2 = new PluginModel({
                name: `Voice Call Transfer`,
                description: 'Transferência de chamadas',
                pluginWorker: {
                    name: 'CallManager',
                    pluginMethods: [{
                        name: 'Transfer',
                        description: 'Transfere de acordo com dados do metadata'
                    }]
                }
            })

            let Plugin3 = new PluginModel({
                name: `Goodbye`,
                description: 'Salva informações da experiência recente do usuário',
                pluginWorker: {
                    name: 'Googbye',
                    pluginMethods: [{
                        name: 'SaveInfo',
                        description: 'Salva alguma informação do atendimento recente.'
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

            Plugin1.save()
            Plugin2.save()
            Plugin3.save()

            res.end(``)

        }),

        app.get('/hub/helper/businessrule/:businessrule', (req, res) => {

            let welcomeMessage = `BUSINESS RULE : ${req.params.businessrule}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const BusinessRuleModel = require('./core/database/models/mongoose/BusinessRule')

            let BusinessRule = new BusinessRuleModel({
                channelId: "5e476acecce4cd2860b9869d",  	//  Voice
                name: `Obter Dados Chamador VOIP`,
                type: 'integration',
                class: '5e48c9fcca9e054250f264b8',  //  id da Voip Integration
                method: '5e48c9fcca9e054250f264b9', //  endpoint da Integration
                inputList: [{
                    modelId: null,    //  sipChannel
                    modeltype: 'query', //  recebe informação do sip channel via queryParameter
                }],
                description: "Identificar os dados do chamador através do sip channel. Em caso de erro, direciona para Transfer. Sucesso prossegue para Saudação. Requer queryParameter.",
                example: "Consultar dados do usuário no SIP CHANEL#21614 para identificar o ANI.",
                output: {
                    dataPathList: [{ _id: '5e48d24b1c7b05319431b83b' }] //  voip.ani 
                },
                integrationFaultDialog: '5e3b138185e02b46b82cec6f',  //  TODO: Set Dialog Transfer
                integrationSuccessDialog: '5e3b138185e02b46b82cec6f',    //  TODO: Set Dialog Saudacao
                expires: 1000
            })

            let BusinessRule1 = new BusinessRuleModel({
                channelId: "5e476acecce4cd2860b9869d",  //  Voice
                name: `Saudacao`,
                type: 'prompt',
                class: null,
                method: null,
                inputList: [{
                    modelId: '5e48e0e2fc55ac3fe053221c',    //  param.dataHoje
                    modeltype: 'datapath'
                }, {
                    modelId: '5e3b0234e389162f5835e761',    //  TODO: Set Prompt Saudacao
                    modeltype: 'prompt'
                }],
                description: "Validar o horario da requisicao de acordo com a data passada no parametro",
                example: "Entre 00:00 e 11:59 'bomdia.wav' / 12:00 e 17:59 'boatarde.wav' / 18:00 e 23:59 'boanoite.wav'",
                expires: 1000
            })

            let BusinessRule2 = new BusinessRuleModel({
                channelId: "5e476acecce4cd2860b9869d",  //  Voice
                name: `Redirect To Dialog`,
                type: 'plugin',
                class: '5e3b25b55aa36d112c208b25',  //  TODO: Set plugin Voice Tags
                method: '5e3b1d36922477484406cc69', //  TODO: Set plugin method Goto
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',    //  TODO: Set Dialog MenuTriagem
                    modeltype: 'dialog'
                }],
                description: "Criar um redirecionamento para outro Dialog aguardando 5 segundos antes de redirecionar.",
                example: "Aguardar 5 segundos antes de direcionar para o próximo Dialog MenuTriagem.",
                expires: 1000
            })

            let BusinessRule3 = new BusinessRuleModel({
                channelId: "5e488ca6c2d1d217e0ddbc69",  //  OMNI
                name: `Integração Inicial Siebel`,
                type: 'integration',
                class: '5e48c9fcca9e054250f264bc',  //  Integracao Siebel
                method: '5e48c9fcca9e054250f264be', //  Meteodo IntegracaoInicialSiebel
                inputList: [{
                    modelId: '5e48e0e2fc55ac3fe053221b',    // user.ani
                    modeltype: 'datapath'
                }],
                description: "Consulta dados do usuário através do ANI.",
                example: "ANI = 5521999797799",
                output: {
                    dataPathList: [{ _id: '5e3b138185e02b46b82cec6f' }, //  md.integracaoInicial.failed = true/false
                    { _id: '5e3b138185e02b46b82cec6f' },                //  md.integracaoInicial.userNotFound = true/false
                    { _id: '5e3b138185e02b46b82cec6f' }]                //  user.ani.tipoPlanoCelular = retorno Integração campo tipoPlano
                },
                integrationFaultDialog: '5e3b138185e02b46b82cec6f',  //  TODO: Set Dialog Transfer
                integrationSuccessDialog: '5e3b138185e02b46b82cec6f',    //  TODO: Set Dialog MenuOfertas
                expires: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                
            })

            let BusinessRule4 = new BusinessRuleModel({
                channelId: "5e476acecce4cd2860b9869d",  //  Voice
                name: `MenuOfertas`,
                type: 'prompt',
                class: null,
                method: null,
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',    //  user.ani.tipoPlanoCelular
                    modeltype: 'datapath'
                }, {
                    modelId: '5e3b0234e389162f5835e761',    //  MenuOfertas
                    modeltype: 'prompt'
                }],
                description: "Ofertar mudanca de planos diferentes do que o usuário já possui.",
                example: "Se usuário = PRE ofertar POS e COTROLE (ofertaPosPagoEControle.wav); Se usuário = POS ofertar PRE e CONTROLE (ofertaPrePagoEControle.wav); Se usuário = CONTROLE ofertar PRE e POS (ofertaPrePagoEPosPago.wav).",
                expires: 1000
            })

            let BusinessRule5 = new BusinessRuleModel({
                channelId: "5e3a45f04f0fe914407c316a",  //  OMNI
                name: `AlteraPlanoCelular`,
                type: 'integration',
                class: '5e48c9fcca9e054250f264bc',  //  Integração Siebel
                method: '5e48c9fcca9e054250f264bd', //  AlteraPlanoCelular
                inputList: [{
                    modelId: '5e48e0e2fc55ac3fe053221b',    // user.ani para solicitar a mudança no plano
                    modeltype: 'datapath'
                },{
                    modelId: null,    // user.ani para solicitar a mudança no plano
                    modeltype: 'query'  //  novo plano de celular escolhido pelo usuario
                }],
                description: "Altera o plano do usuário de acordo com a opção selecionada no MenuOfertas 'PRE', 'POS' ou 'CONTROLE'. Requer uma queryParameter preenchida com 'PRE', 'POS', ou 'CONTROLE'. Selecionada no MenuOfertas.",
                example: "Usuário Pre Pago envia solicitacao de alteracao do plano para Pos Pago através da Integracao do Siebel conforme documentação. ",
                output: {
                    dataPathList: [{ _id: '5e48e0e2fc55ac3fe0532222' }, { _id: '5e48e0e2fc55ac3fe0532223' }] //  md.alteraPlano.failed = true/false, md.alteraPlano.responseMsg = retorno da integração
                },
                integrationFaultDialog: '5e3b138185e02b46b82cec6f',  //  TODO: Set Dialog Transfer
                integrationSuccessDialog: '5e3b138185e02b46b82cec6f',    //  TODO: Set Dialog OfertaPromoMaes
                expires: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                
            })

            let BusinessRule6 = new BusinessRuleModel({
                channelId: "5e3a45f04f0fe914407c316a",
                name: `Oferta de Promoção Dia das Mães`,
                type: 'plugin',
                class: '5e48c9fcca9e054250f264ba',  //  Fazer o plugin de leitura do Parametros Oi 
                method: '5e48c9fcca9e054250f264bb',
                inputList: [{
                    modelId: '5e48e0e2fc55ac3fe0532224',    //  param.periodoPromoMaes
                    modeltype: 'parameter'
                }, {
                    modelId: '5e48e0e2fc55ac3fe0532221',    //  nav.alteraPlano.novoPlano
                    modeltype: 'datapath'
                }],
                description: `Verifica se a data atual está dentro do período informado pelo parametro da promoção do dia das Maes e se o usuário pediu alteração para 'CONTROLE' no MenuOfertas. ` +
                    `Se sim, encaminha para MenuOfertaProomMaes. O valor do parametro deve ser '10/05/2020_00:00:00 10/06/2020_23:59:59'.`,
                example: "Se data atual estiver dentro do periodo informado no parametro retorna metadata com valor 'true'",
                output: {
                    dataPathList: [{ _id: '5e48e0e2fc55ac3fe0532225' }] //  md.promoMaes.ativa
                },
                expires: 1000
            })

            let BusinessRule7 = new BusinessRuleModel({
                channelId: "5e3a45f04f0fe914407c316a",
                name: `M4U - AdesaoPromoMaes`,
                type: 'integration',
                class: '5e3b25b55aa36d112c208b25',
                method: '5e3b1d36922477484406cc69',
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',    // user.ani
                    modeltype: 'datapath'
                }],
                description: "Solicita adesão para promoção do Dia das Mães 2020 através do ANI, conforme documentação. O usuário deve ser do tipo CONTROLE.",
                example: "Usuário solicita adesão para a promoção do Dia Das Mães 2020, que será definida dentro do período informado em parâmetro. Ex: 01/01/2020 00:00:00 15/01/2020 23:59:59",
                output: {
                    //dataPathList: [{ _id: '5e3b138185e02b46b82cec6f' }] //  metadata.AlteraPlano.fail = true
                },
                integrationFaultDialog: '5e3b138185e02b46b82cec6f',  //  Transfer
                integrationSuccessDialog: '5e3b138185e02b46b82cec6f',    //  DespedidaPromoMaes2020
                expires: 1000    //  controla quando a regra deve ser revalidada e atualizada no redis                
            })

            let BusinessRule8 = new BusinessRuleModel({
                channelId: "5e3a45f04f0fe914407c316a",
                name: `Goodbye`,
                type: 'plugin',
                class: '5e3b25b55aa36d112c208b25',  //  Goodbye
                method: '5e3b1d36922477484406cc69', //  SaveInfo
                inputList: [{
                    modelId: '5e3b0234e389162f5835e761',    //  lead.voip.{number}.hangup.date
                    modeltype: 'lead'
                }],
                description: "Salvar o horário da finalização do atendimento desse usuário em LEAD.",
                example: "Salvar a data atual no LEAD.",
                expires: 1000
            })

            BusinessRule.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`BusinessRule ${BusinessRule.name} salva`)
                })
                .catch(err => {
                    console.error(err)
                })

            BusinessRule1.save()
            BusinessRule2.save()
            BusinessRule3.save()
            BusinessRule4.save()
            BusinessRule5.save()
            BusinessRule6.save()
            BusinessRule7.save()
            BusinessRule8.save()

            res.end(``)

        }),

        app.get('/hub/helper/datapath/:datapath', (req, res) => {

            let welcomeMessage = `DATAPATH : ${req.params.datapath}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const DataPathModel = require('./core/database/models/mongoose/DataPath')

            let DataPath = new DataPathModel({
                path: `md.obterDadosChamador.failed`,
                description: "Controle de falha na Integração Voip para obter os dados do chamador",
            })

            let DataPath1 = new DataPathModel({
                path: `voip.ani`,
                description: "Numero do celular identificado automaticamente (ANI)",
            })

            let DataPath2 = new DataPathModel({
                path: `user.ani`,
                description: "Numero que está sendo atendido, independente do canal.",
            })

            let DataPath3 = new DataPathModel({
                path: `param.dataHoje`,
                description: "Data a ser utilizada nos testes. Formato 01/05/2020 00:00:00",
                paramValue: '01/05/2020 00:00:00'
            })

            let DataPath4 = new DataPathModel({
                path: `nav.menuTriagemOp2`,
                description: "Controle da opção digitada no MenuTriagem",
            })

            let DataPath5 = new DataPathModel({
                path: `md.integracaoInicial.failed`,
                description: "Controle de falha na chamada da Integração Inicial (SIEBEL)",
            })

            let DataPath6 = new DataPathModel({
                path: `md.integracaoInicial.userNotFound`,
                description: "Validação do cliente não encontrado na base Siebel",
            })

            let DataPath7 = new DataPathModel({
                path: `user.ani.tipoPlanoCelular`,
                description: "Tipo de plano do ANI (PRE, POS ou CONTROLE)",
            })

            let DataPath8 = new DataPathModel({
                path: `nav.alteraPlano.novoPlano`,
                description: "Plano selecionado pelo usuário no MenuOfertas. 'POS', 'PRE' ou 'CONTROLE'",
            })

            let DataPath9 = new DataPathModel({
                path: `md.alteraPlano.failed`,
                description: "Controle de falha na solicitacao de mudança de plano do MenuOfertas.",
            })

            let DataPath10 = new DataPathModel({
                path: `md.alteraPlano.responseMsg`,
                description: "Mensagem de retorno da solicitacao de mudança de plano do MenuOfertas.",
            })

            let DataPath11 = new DataPathModel({
                path: `param.periodoPromoMaes`,
                description: "Período de atividade da Promoção de Dia das Mães. Ex: ",
                paramValue: '01/05/2020_00:00:00 15/05/2020_23:59:59'
            })

            let DataPath12 = new DataPathModel({
                path: `md.promoMaes.ativa`,
                description: "Resultado da validação de Promoção do Dia das Mães via parametro param.periodoPromoMaes.",
            })

            let DataPath13 = new DataPathModel({
                path: `md.adesaoPromoMaes.failed`,
                description: "Resultado da chamada para adesão da promoção do Dia das Mães (M4U)",
            })

            let DataPath14 = new DataPathModel({
                path: `md.turno`,
                description: "Preenchido com 'dia', 'tarde' ou 'noite'. De acordo com a hora do dia informada.",
            })


            DataPath.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`DataPath ${DataPath.path} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            DataPath1.save()
            DataPath2.save()
            DataPath3.save()
            DataPath4.save()
            DataPath5.save()
            DataPath6.save()
            DataPath7.save()
            DataPath8.save()
            DataPath9.save()
            DataPath10.save()
            DataPath11.save()
            DataPath12.save()
            DataPath13.save()
            DataPath14.save()

            res.end(``)

        }),

        app.get('/hub/helper/integration/:integration', (req, res) => {

            let welcomeMessage = `INTEGRATION : ${req.params.integration}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const IntegrationModel = require('./core/database/models/mongoose/Integration')
            let Integration = new IntegrationModel({
                name: `Voip Integration`,
                shortname: 'voip',  //  10 chars no maximo
                description: "Integração para interagir com a rede voip.",
                integrationManager: {
                    name: "VoipManager",
                    endpoints: [{
                        name: "ObterDadosChamador",
                        description: "Requer o SIP CHANNEL e retorna o ANI coorespondente na rede voip."
                    }]
                }
            })
            let Integration1 = new IntegrationModel({
                name: `Parametros Oi`,
                shortname: 'param',  //  10 chars no maximo
                description: "Integração que gerencia os parametros de navegação da aplicação. Ex: dataInicioPromocao, horaInicioAtendimento, etc...",
                integrationManager: {
                    name: "ParametersManager",
                    endpoints: [{
                        name: "paramValueByName",
                        description: `Retorna o valor de um parâmetro.`
                    }]
                }
            })

            let Integration2 = new IntegrationModel({
                name: `Siebel`,
                shortname: 'siebel',  //  10 chars no maximo
                description: "Integração que gerencia os planos de celular e retorna dados do usuario",
                integrationManager: {
                    name: "SiebelManager",
                    endpoints: [{
                        name: "IntegracaoInicialSiebel",
                        description: "Retorna dados como o tipo de plano de celular do usuario. Ex: POS, PRE CONTROLE. Entre outras informações como CPF, ID, etc..."
                    }, {
                        name: "AlteraPlanoCelular",
                        description: "Solicita alteração de plano para Pré Pago, Pós Pago ou Controle. Requer uma option PLANO=PRE/POS/CONTROLE, selecionada no MenuOfertas."
                    }]
                }
            })

            let Integration3 = new IntegrationModel({
                name: `M4U`,
                shortname: 'm4u',  //  10 chars no maximo
                description: "Automações M4U",
                integrationManager: {
                    name: "M4UManager",
                    endpoints: [{
                        name: "AdesaoPromoMaes",
                        description: "Requer o numero do celular do usuário e cadastra na promoção do Dia das Mães."
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

            Integration1.save()
            Integration2.save()
            Integration3.save()
            res.end(``)

        }),

        app.get('/hub/helper/channel/:channel', (req, res) => {

            let welcomeMessage = `CHANNEL : ${req.params.channel}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const ChannelModel = require('./core/database/models/mongoose/Channel')
            let Channel = new ChannelModel({
                name: `VXML`,
                descricao: "Respostas do hub em formato VXML.",
                application: "5e476a593f836b0e8cc7c999"
            })

            let Channel1 = new ChannelModel({
                name: `OMNI`,
                descricao: "Todos os canais podem usar essa funcionalidade do HUB.",
                application: "5e476a593f836b0e8cc7c999"
            })

            Channel.save()
                .then(doc => {
                    //console.log(doc)
                    console.log(`Channel ${Channel.name} salvo`)
                })
                .catch(err => {
                    console.error(err)
                })

            Channel1.save()

            res.end(``)

        }),

        app.get('/hub/helper/application/:application', (req, res) => {

            let welcomeMessage = `APPLICATION : ${req.params.application}`
            console.log(`[${req.session.id}] ${welcomeMessage}`)

            const ApplicationModel = require('./core/database/models/mongoose/Application')
            let Application = new ApplicationModel({
                name: `Oi-144`,
                descricao: "Atendimento para usuários da Oi",
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


