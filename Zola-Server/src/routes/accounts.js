const express = require('express')
const router = express.Router()

const accountController = require('../app/controllers/AccountController')

router.get('/login', accountController.login)
router.post('/register', accountController.register)
// router.get('/logout', accountController.logout)

module.exports = router
