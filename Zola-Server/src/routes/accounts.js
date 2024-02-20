const express = require('express')
const router = express.Router()

const accountController = require('../app/controllers/AccountController')

router.get('/login', accountController.postLogin)
// router.get('/register', accountController.register)
// router.post('/register', accountController.postRegister)
// router.get('/logout', accountController.logout)

module.exports = router
