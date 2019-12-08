

class DialogRunner {
    constructor() {
        console.log(`Dialog Renderer Init`)
    }

    Render(req, session) {

        var welcomeMessage = `Welcome ${req.params.ani}. Next step is ${req.params.dialog}`
        console.log(`[${req.session.id}] ${welcomeMessage}`)

        // searches for Dialog info in database
        const DialogModel = require('../../models/Dialog')
        DialogModel.find({ name: `${req.params.dialog}` }, function (err, dialogInvoke) {

            if (err || dialogInvoke.length === 0) {
                console.log(`[${req.session.id}] Dialog ${req.params.dialog} not found`);
            } else {
                console.log(`[${req.session.id}] Dialog ${req.params.dialog} Loaded`);

                // Load plugins list
                for (var pli = 0; pli < dialogInvoke[0].initPlugins.length; pli++) {

                    const PluginModel = require('../../models/Plugin')
                    PluginModel.find({ _id: `${dialogInvoke[0].initPlugins[pli]._id}` }, function (err, pluginInvoke) {

                        if (err || pluginInvoke.length === 0) {
                            console.log(`[${req.session.id}] Plugin ${dialogInvoke[0].initPlugins[0]._id} not found`)
                        } else {
                            //console.log(`Plugin ${pluginInvoke._id}`)
                            console.log(`[${req.session.id}] Plugin ${dialogInvoke[0].initPlugins[0]._id} Loaded`)
                        }
                    })
                }
            }

        });

        return ` <vxml></vxml>`
        

    }
}

module.exports = new DialogRunner() 