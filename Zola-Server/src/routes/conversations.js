import express from 'express'

const router = express.Router()
import ConversationController from '../app/controllers/ConversationController.js'

router.post('/', ConversationController.createConversation)
router.post(
    '/create-group',
    ConversationController.createConversationsGroupMobile
)
router.get('/:userId', ConversationController.userConversations)
router.get('/find/:firstId/:secondId', ConversationController.findConversations)
export default router
