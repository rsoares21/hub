class DialogRenderer {
    constructor() {
        console.log(`Dialog Renderer Initied!`)
    }

    Render(req, res) {

        console.log(`Renderinggg ${req}`)
        var welcomeMessage = `Welcome ${req.params.ani}. Next step is ${req.params.dialog}`
        console.log(welcomeMessage)

        // searches for Dialog info in database
        const DialogModel = require('../../models/Dialog')
        DialogModel.find({ name: `${req.params.dialog}` }, function (err, dialogInvoke) {

            if (err || dialogInvoke.length === 0) {
                console.log(`Dialog ${req.params.dialog} not found`);
            } else {
                console.log(`Dialog ${req.params.dialog} OK`);

                // Load plugins list
                for (var pli = 0; pli < dialogInvoke[0].initPlugins.length; pli++) {

                    const PluginModel = require('../../models/Plugin')
                    PluginModel.find({ _id: `${dialogInvoke[0].initPlugins[pli]._id}` }, function (err, pluginInvoke) {

                        if (err || pluginInvoke.length === 0) {
                            console.log(`Plugin ${dialogInvoke[0].initPlugins[0]._id} not found`)
                        } else {
                            //console.log(`Plugin ${pluginInvoke._id}`)
                            console.log(`plugin found : ${pluginInvoke}`)
                        }
                    })
                }
            }
        });


    }
}

module.exports = new DialogRenderer() 