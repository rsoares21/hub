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

    const UserModel = require('../models/User')
    let User = new UserModel({ nome:"Teste nome", ani: "21999999998" })
    console.log(User.nome)

    User.save()
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