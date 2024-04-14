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

router.put('/updateInfo', userController.updateInfo)

router.get('/findUserByUserId/:userId', userController.findUserByUserID)

router.get('/getFriends/:userId', userController.getInfoFriend)

export default router
