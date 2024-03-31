import express from 'express'
const router = express.Router()

import userController from '../app/controllers/UserController.js'

router.post('/register', userController.register)
router.get('/findAllExceptCurrentUser', userController.GetAllUsers)

router.get('/findAllUsers', userController.findAllUsers)

router.get('/findUser', userController.findUserByAccountID)

router.put('/addFriend', userController.addFriend)

router.put('/updateAvatar', userController.updateAvatar)

router.put('/updateCoverImage', userController.updateCoverImage)

export default router
