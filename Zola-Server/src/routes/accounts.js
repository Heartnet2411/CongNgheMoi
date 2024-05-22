import express from 'express'
const router = express.Router()

import accountController from '../app/controllers/AccountController.js'

// router.post('/login', accountController.login) Web
router.post('/loginWeb', accountController.loginWeb)
// router.post('/login-phone', accountController.loginphone)
router.post('/loginPhoneWeb', accountController.loginPhoneWeb)
router.post('/addAccountWeb', accountController.registerWeb)

router.post('/forgot-account', accountController.forgot)

// viết 1 router đổi mật khẩu
router.post('/changePasswordWeb', accountController.changePasswordWeb)

// mpobile
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
//----

export default router
