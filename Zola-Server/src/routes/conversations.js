import express from 'express'
const router = express.Router()

import conversationController from '../app/controllers/ConversationController.js'

router.post('/create', conversationController.create)

export default router
