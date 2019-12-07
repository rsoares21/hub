const express = require('express')
const router = express.Router()

// Get caller info from voice platform
router.get('/', (req, res) => {
    res.send('missing caller info.')
})

// Get caller info from voice platform :> Get ANI from parameters
router.get('/:ani/:dialog', (req, res) => {
    var welcomeMessage = `Welcome ${req.params.ani}. Next step is ${req.params.dialog}`
    console.log(welcomeMessage)


    const userModel = require('../models/User')
    let User = new userModel({ nome: "Ricardo", ani: "21999999998" })
    console.log(User.nome)

    User.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })




    const BusinessRuleModel = require('../models/BusinessRule')
    let BusinessRule = new BusinessRuleModel({
        name: 'Redirect_Tipoplano',
        input: [{ fieldName: 'user.tipoPlano'}, {fieldName: 'user.ani'}, {fieldName: 'PROMO100'}],
        description: 'Verifica o tipo de plano e redireciona para os dialogs MenuPre ou MenuPos',
        example: 'tipoPlano = PRE ou POS',
        output: {
            promptListIds: [{ _id: '5de875f9644fbd29805d911c' }],
            dialogListIds: [{ _id: '5de875f9644fbd29805d911c' }]
        },
        documents: [{ }]
    })


    BusinessRule.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })


    const PluginModel = require('../models/Plugin')
    let Plugin = new PluginModel({
        businessRulesListIds: [{  _id: '5de875f9644fbd29805d911c' , _id: '5de875f9644fbd29805d911c' }],
        pluginFileName: 'Greetings',
        name: 'Greetings Plugin',
        description: 'Plugin que saúda de acordo com a hora do dia',
        onError: 'goto:GoodBye',
        version: 0.02
    })


    Plugin.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })




    const DialogModel = require('../models/Dialog')
    let Dialog = new DialogModel({
        ivrProfile: '5de875f9644fbd29805d911c',
        name: 'MainMenu',
        voiceEvents: [{ _id: '5de848a461b8974a30caf4b3' }],
        initPlugins: [{ _id: '5de848a461b8974a30caf4b3' }],
        exitPlugins: [{ _id: '5de848a461b8974a30caf4b3' }],
        initPrompt: 'init.wav',
        menuOptions: [{ input: '1', dialog: 'AnotherMenu' }],
        dialogVersion: 0.1
    })


    console.log(Dialog.name)

    Dialog.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })

    DialogModel.find({ name: `MainMenu` }, function (err, dialogs) {
        if (err) throw err;

        // object of all the users
        console.log(dialogs);

        console.log('reflect>' + Reflect.ownKeys(Dialog));
    });
    

    const voiceEventModel = require('../core/models/VoiceEvent')
    let VoiceEvent = new voiceEventModel({ type: 'nospeech', counter: 3, prompt: 'bye.wav', action: 'dialog', value: 'GoodBye', dialogId: '5de848a461b8974a30caf4b2'})

    VoiceEvent.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

    voiceEventModel.find({ type: `nomatch` }, function (err, events) {
        if (err) throw err;

        // object of all the users
        console.log(events);
    });


    const PromptModel = require('../models/Prompt')
    let Prompt = new PromptModel({ name: 'hello.wav', content:'Olá, seja bem vindo!'})

    Prompt.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })



    res.send(welcomeMessage)

})

// Create caller info ?
router.post('/', (req, res) => {
    res.send('code is 99% done.')
})

// Update caller info ?
router.patch('/:id', (req, res) => {
    res.send('code is 99% done.')
})

// Delete caller info ?
router.delete('/:id', (req, res) => {
    res.send('code is 99% done.')
})

module.exports = router