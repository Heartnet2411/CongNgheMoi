import express from 'express'
const router = express.Router()

import userController from '../app/controllers/UserController.js'

router.post('/register', userController.register)

router.get('/findAllUsers', userController.findAllUsers)

export default router
