
class VXML {
    constructor() {
        console.log(`VXML Parser Init`)
    }

    Render(req, session) {

        let output

        var welcomeMessage = `REQUEST [${req.params.ani}] DIALOG : ${req.params.dialog}`
        console.log(`[${req.session.id}] ${welcomeMessage}`)

        output = ` <vxml></vxml>`
        return output


    }
}

module.exports = new DialogRunner() 