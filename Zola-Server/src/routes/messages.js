import express from 'express'
const router = express.Router()

import messageController from '../app/controllers/MessageController.js'

router.post('/create', messageController.create)

export default router
