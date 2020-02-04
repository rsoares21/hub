
// Essa classe vai carregar os dialogs de forma a atender todos os tipos de responses, chamando a classe tratadora correspondente
// Ex: VXMLDialogParser / HTMLDialogParser 
// OBS : To create a unique json in Hub format to share the response items with other applications

class DialogRunner {

    constructor() {
        console.log(`Dialog Runner Initiated`)
   }

    Render(req, res) {

        // Loads Dialog info from db
        const DialogModel = require('./database/models/mongoose/Dialog')
        DialogModel.find({ name: `${req.params.dialog}` }, function (err, dialogInvoke) {

            if (err || dialogInvoke.length === 0) {
                console.log(`[${req.session.id}] ${req.params.dialog} not found`);
                res.setHeader('Content-Type', `Content-Type: text/html; charset=utf-8`);
                res.end(`Dear REST Client.\n\nCan you excuse me ?\n\nI will do my best to attend you next time.`);
        
            } else {
                console.log(`[${req.session.id}] ${req.params.dialog} loaded!`);

                // Loads plugins list
                for (var pli = 0; pli < dialogInvoke[0].initPlugins.length; pli++) {
                    console.log(`[${req.session.id}] Searching pluings for Dialog ${dialogInvoke[0].name}`)
                    const PluginModel = require('./database/models/mongoose/Plugin')
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

                                const BusinessRuleModel = require('./database/models/mongoose/BusinessRule')
                                BusinessRuleModel.findOne({ name: `${pluginInvoke[pli].businessRulesList}` })

                            }

                            // TODO

                            // 1 - Carregar as integrações dinamicamente caso os datapaths ainda nao tenham sido carregados no redis
                            // 2 - Desenvolver a escrita do metadataPath no redis para cada plugin executado (PluginRunner)
                            // 3 - Chamar o Parser de acordo com o tipo definido e gerar output


                        }
                    })
                }
            }

        });

        // Calls the parser

        let output = `Render Dialog`
        return output


    }

    ExecuteOption(req, res) {

        let user = { name:"foo", age:15}

        //res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
      
    }


}

module.exports = new DialogRunner() 