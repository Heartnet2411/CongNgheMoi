import Message from '../models/Message.js'

class MessageController {
    // post /create
    async create(req, res) {
        const conversation_id = req.body.conversation_id
        const sender_id = req.body.sender_id
        const content = req.body.content
        const dateSend = req.body.dateSend
        const type = req.body.type
        const senderName = req.body.senderName
        const senderAvatar = req.body.senderAvatar
        const status = req.body.status

        const message = new Message({
            conversation_id,
            sender_id,
            content,
            dateSend,
            type,
            senderName,
            senderAvatar,
            status,
        })

        await message
            .save()
            .then(() => {
                res.json('Create message successfully!!!')
            })
            .catch((err) => {
                res.json('Create message failure!!!')
            })
    }

    async findAllMessages(req, res) {
        const messages = await Message.find()
        res.json(messages)
    }
}

export default new MessageController()
