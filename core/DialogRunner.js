
// LOGGER TRACE
const path = require('path');
function tracelog(s) {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    Error.captureStackTrace(err, arguments.callee);
    const callee = err.stack[0];
    Error.prepareStackTrace = orig;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    process.stdout.write(`${dateTime} ${path.relative(process.cwd(), callee.getFileName())}:${callee.getLineNumber()}: ${s}\n`);
}
module.exports = tracelog;

// Essa classe vai carregar os dialogs de forma a atender todos os tipos de responses, chamando a classe tratadora correspondente
// Ex: VXMLDialogParser / HTMLDialogParser 
// OBS : To create a unique json in Hub format to share the response items with other applications

class DialogRunner {

    constructor() {
        tracelog(`Dialog Runner Initiated`)
    }

    Render(req, res) {

        tracelog(`[${req.session.id}] new request`)

        if (this.checkMandatory(req)) {

            tracelog(`Looking for dialog ${req.params.dialog}`)
            // Loads Dialog info from db
            const DialogModel = require('./database/models/mongoose/Dialog')

            DialogModel.findOne({ name: req.params.dialog }, function (err, dialogtorun) {

                if (err) {
                    tracelog(`${req.params.dialog} not found`);
                    res.setHeader('Content-Type', `Content-Type: text/html; charset=utf-8`);
                    res.end(`Dear REST Client.\n\nCan you excuse me ?\n\n. I need the correct information from you.`);

                } else {
                    tracelog(`[${dialogtorun.name}] loaded!`);
                    tracelog(dialogtorun);

                    // Loads items list
                    for (var i = 0; i < dialogtorun.itemsList.length; i++) {
                        tracelog(`Opening Dialog ${dialogtorun.name} items list`)

                        switch (dialogtorun.itemsList[i].modelType) {
                            case 'businessrule':

                                break;
                            case `integration`:

                                break;
                            case `prompt`:

                                break;
                        }

                        const PluginModel = require('./database/models/mongoose/Plugin')

                        //let pluginId = dialog.plugins[i]._id
                        //console.log('RCKKK : ' + dialog.plugins[i]._id)

                        // CORRIGIR : Buscar cada item do itemsList, desobrindo o tipo prompt/businessrule

                        // TODO

                        //  1   Carregar as integrações dinamicamente caso os datapaths ainda nao tenham sido carregados no redis
                        //  2   Desenvolver a escrita do metadataPath no redis para cada plugin executado (PluginRunner)
                        //  3   Chamar o Parser de acordo com o tipo definido e gerar output
                        //  4   Quando rodar o plugin da vez, retornar um indicador de interceptação para outro Dialog, sem rodar os demais plugins.
                        //  4   Esse evento transfere o fluxo de navegacão do usuário para outro Dialog sem executar os demais plugins da lista do Dialog atual.
                        //  4   Encapsular a informacão em algum objeto para saber se será necessário interceptar.
                        //  4   Preparar para executar os LEADs em caso de retornar um dialog.



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

        tracelog('[mandatory] checking dialog request payload')
        if (req.params.dialog === null) ret = false

        return ret

    }

}

module.exports = new DialogRunner() 