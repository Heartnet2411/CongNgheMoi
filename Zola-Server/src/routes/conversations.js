import express from 'express'

const router = express.Router()
import ConversationController from '../app/controllers/ConversationController.js'

router.post('/', ConversationController.createConversation)
router.post(
    '/create-group',
    ConversationController.createConversationsGroupMobile
)
router.get('/:userId', ConversationController.userConversations)
router.get(
    '/findConversationById/:conversationId',
    ConversationController.findConversationById
)
router.get('/find/:firstId/:secondId', ConversationController.findConversations)
router.put(
    '/authorizeDeputyLeader',
    ConversationController.authorizeDeputyLeader
)
router.put(
    '/unauthorizeDeputyLeader',
    ConversationController.unauthorizeDeputyLeader
)
router.put(
    '/removeMemberFromConversationGroup',
    ConversationController.removeMemberFromConversationGroupWeb
)
router.put(
    '/updateConversationAvatar',
    ConversationController.updateConversationAvatar
)
router.put('/leaveGroup', ConversationController.leaveGroup)
router.post(
    '/add-member',
    ConversationController.addMemberToConversationGroupMobile
)
router.put('/change-groupname', ConversationController.changeGroupName)
router.put('/authorizeGroupLeader', ConversationController.authorizeGroupLeader)
router.put('/disbandGroup', ConversationController.disbandGroupWeb)
export default router
