
// Essa classe vai carregar os dialogs de forma a atender todos os tipos de responses, chamando a classe tratadora correspondente
// Ex: VXMLDialogParser / HTMLDialogParser 
// OBS : To create a unique json in Hub format to share the response items with other applications

class DialogRunner {

    constructor() {
        console.log(`Dialog Runner Initiated`)
    }

    Render(req, res) {

        if (this.checkMandatory(req)) {

            console.log(`Loading Dialog ${req.params.dialog}`)
            // Loads Dialog info from db
            const DialogModel = require('./database/models/mongoose/Dialog')
            DialogModel.findOne({ name: `${req.params.dialog}` }, function (err, dialogInvoke) {

                if (err) {
                    console.log(`[${req.session.id}] ${req.params.dialog} not found`);
                    res.setHeader('Content-Type', `Content-Type: text/html; charset=utf-8`);
                    res.end(`Dear REST Client.\n\nCan you excuse me ?\n\n. I need the correct information from you.`);

                } else {
                    console.log(`[${req.session.id}] ${req.params.dialog} loaded!`);

                    console.log(dialogInvoke)

                    // Loads plugins list
                    for (var i = 0; i < dialogInvoke.plugins.length; i++) {
                        console.log(`[${req.session.id}] Searching plugins for Dialog ${dialogInvoke.name}`)
                        const PluginModel = require('./database/models/mongoose/Plugin')

                        //let pluginId = dialogInvoke.plugins[i]._id
                        //console.log('RCKKK : ' + dialogInvoke.plugins[i]._id)


                        // CORRIGIR : Buscar cada item do itemsList, desobrindo o tipo prompt/businessrule

                        PluginModel.findOne({ _id: dialogInvoke.plugins[i]._id}, function (err, pluginInvoke) {

                            if (err) {
                                console.log(`[${req.session.id}] Plugin : ${dialogInvoke.plugins[i]._id} not found`)
                            } else {
                                //console.log(`Plugin ${pluginInvoke._id}`)
                                console.log(`[${req.session.id}] Plugin : ${pluginInvoke._id} Loaded`)

                                // Load businessrules for current plugin execution
                                if (pluginInvoke[i].businessRulesList == null) {
                                    console.log(`[${req.session.id}] Plugin : ${pluginInvoke[pli].name} falied.`)
                                } else {

                                    const BusinessRuleModel = require('./database/models/mongoose/BusinessRule')
                                    BusinessRuleModel.findOne({ name: `${pluginInvoke[pli].businessRulesList}` })

                                }

                                // TODO

                                //  1   Carregar as integrações dinamicamente caso os datapaths ainda nao tenham sido carregados no redis
                                //  2   Desenvolver a escrita do metadataPath no redis para cada plugin executado (PluginRunner)
                                //  3   Chamar o Parser de acordo com o tipo definido e gerar output
                                //  4   Quando rodar o plugin da vez, retornar um indicador de interceptação para outro Dialog, sem rodar os demais plugins.
                                //  4   Esse evento transfere o fluxo de navegacão do usuário para outro Dialog sem executar os demais plugins da lista do Dialog atual.
                                //  4   Encapsular a informacão em algum objeto para saber se será necessário interceptar.
                                //  4   Preparar para executar os LEADs em caso de retornar um dialog.





                            }
                        })
                    }
                }

                res.end(`Done.`);

            });

        } else {
            res.end(`Dear REST Client.\n\nCan you excuse me ?\n\nI will do my best to attend you next time.\n\n Missing information.`);

        }



        // Calls the parser

        let output = `Render Dialog`
        return output


    }

    ExecuteOption(req, res) {

        let user = { name: "foo", age: 15 }

        //res.setHeader('Content-Type', 'text/xml');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));

    }

    checkMandatory(req) {

        let ret = true

        console.log('[mandatory] checking dialog request payload')
        if (req.params.dialog === null) ret = false

        return ret

    }

}

module.exports = new DialogRunner() 