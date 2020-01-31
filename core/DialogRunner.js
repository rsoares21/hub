
// Essa classe vai carregar os dialogs de forma a atender todos os tipos de responses, chamando a classe tratadora correspondente
// Ex: VXMLDialogParser / HTMLDialogParser 
// OBS : To create a unique json in "hub format" to share the response items with other applications

class DialogRunner {
    constructor() {
        console.log(`Dialog Renderer Init`)
    }

    Render(req, session) {



        let output

        var welcomeMessage = `REQUEST [${req.params.ani}] DIALOG : ${req.params.dialog}`
        console.log(`[${req.session.id}] ${welcomeMessage}`)

        // Loads Dialog info from db
        const DialogModel = require('../models/mongoose/Dialog')
        DialogModel.find({ name: `${req.params.dialog}` }, function (err, dialogInvoke) {

            if (err || dialogInvoke.length === 0) {
                console.log(`[${req.session.id}] ${req.params.dialog} not found`);
            } else {
                console.log(`[${req.session.id}] ${req.params.dialog} loaded!`);

                // Loads plugins list
                for (var pli = 0; pli < dialogInvoke[0].initPlugins.length; pli++) {
                    console.log(`[${req.session.id}] Searching pluings for Dialog ${dialogInvoke[0].name}`)
                    const PluginModel = require('../models/mongoose/Plugin')
                    PluginModel.find({ _id: `${dialogInvoke[0].initPlugins[pli]._id}` }, function (err, pluginInvoke) {


                        // Loads business rules for this plugin
                        for (var pli = 0; pli < dialogInvoke[0].initPlugins.length; pli++) {
                            
                        }
                        


                        if (err || pluginInvoke.length === 0) {
                            console.log(`[${req.session.id}] Plugin : ${pluginInvoke._id} not found`)
                        } else {
                            //console.log(`Plugin ${pluginInvoke._id}`)
                            console.log(`[${req.session.id}] Plugin : ${pluginInvoke.name} Loaded`)

                            // Load businessrules for current plugin execution
                            if (pluginInvoke[pli].businessRulesList == null) {
                                console.log(`[${req.session.id}] Plugin : ${pluginInvoke[pli].name} falied.`)
                            } else {

                            const BusinessRuleModel = require('../models/mongoose/BusinessRule')
                            BusinessRuleModel.findOne({ name: `${pluginInvoke[pli].businessRulesList}`})


                            }



                            



                        }
                    })
                }
            }

        });

        output = ` <vxml></vxml>`
        return output


    }
}

module.exports = new DialogRunner() 