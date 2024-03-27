import express from 'express'
const router = express.Router()

import userController from '../app/controllers/UserController.js'

router.post('/register', userController.register)

router.get('/findAllUsers', userController.findAllUsers)

router.post('/findUser', userController.findUserByAccountID)

router.put('/addFriend', userController.addFriend)

// website findallW
router.post('/findAllUsersWeb', userController.findAllUsersWeb)
// web findUser by số điện thoại
router.post('/findUserByPhoneWeb', userController.findUserByPhoneWeb)

export default router
