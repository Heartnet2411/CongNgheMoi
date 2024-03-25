import express from 'express'
const router = express.Router()

import accountController from '../app/controllers/AccountController.js'

router.post('/login', accountController.login)
router.post('/login-phone', accountController.loginphone)
router.post('/add-account', accountController.register)
router.get('/find', accountController.findByID)
router.get('/forgot-account', accountController.forgot)
export default router
