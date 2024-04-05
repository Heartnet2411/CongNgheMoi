import express from 'express'
const router = express.Router()

import messageController from '../app/controllers/MessageController.js'
//add
router.post('/', messageController.addMessage)
router.get('/:conversation_id', messageController.getMessagesByConversationID)

export default router
