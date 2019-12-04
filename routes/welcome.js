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

    const userModel = require('../models/user')
    let User = new userModel({ nome:"Francisco", ani: "21999999998" })
    console.log(User.nome)

    const Dialog = require('../models/dialog')
    //let Dialog = new dialogModel()
    //console.log(Dialog.nome)

    /*
    user.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

    dialog.save()
    .then(doc => {
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })
    */

    // get all the users
    Dialog.find({ nome: `${req.params.dialog}`}, function(err, dialogs) {
        if (err) throw err;
    
        // object of all the users
        console.log(dialogs);
    });
    
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