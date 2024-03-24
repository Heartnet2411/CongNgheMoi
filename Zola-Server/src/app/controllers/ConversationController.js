import Conversation from '../models/Conversation.js'

class ConversationController {
    // post /create
    async create(req, res) {
        const member = req.body.member
        const message_id = req.body.message_id
        const groupName = req.body.groupName
        const groupAvatar = req.body.groupAvatar
        const memberCount = req.body.memberCount
        const conversation = new Conversation({
            member,
            message_id,
            groupName,
            groupAvatar,
            memberCount,
        })
        await conversation
            .save()
            .then(() => {
                res.json('Create conversation successfully!!!')
            })
            .catch((err) => {
                res.json('Create conversation failure!!!')
            })
    }

    async findAllConversations(req, res) {
        const conversations = await Conversation.find()
        res.json(conversations)
    }
}

export default new ConversationController()
