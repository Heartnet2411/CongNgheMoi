import express from 'express'
const router = express.Router()

import accountController from '../app/controllers/AccountController.js'

router.post('/login', accountController.login)
router.post('/add-account', accountController.register)
router.get('/find', accountController.findByID)
router.post('/create-account', accountController.createAccount)
router.get('/find-account-by-phone-number', accountController.findByPhoneNumber)
router.put('/updatePassword', accountController.updatePassword)
router.put(
    '/updatePasswordByPhone',
    accountController.updatePasswordByPhoneNumber
)

export default router
