import express from 'express'
const router = express.Router()

import messageController from '../app/controllers/MessageController.js'
//add
router.post('/', messageController.addMessage)
router.get('/:conversation_id', messageController.getMessagesByConversationID)
router.put('/recallMessage/:id', messageController.recallMessage)
router.put('/deleteMessage', messageController.deleteMyMessage)
router.post(
    '/findNewestMessage/:conversation_id',
    messageController.findNewestMessage
)

export default router
