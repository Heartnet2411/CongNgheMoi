import Message from '../models/Message.js'

class MessageController {
    // post /create
    async addMessage(req, res) {
        const { conversation_id, senderId, content, contentType } = req.body
        const newMessage = new Message({
            conversation_id,
            senderId,
            content,
            contentType,
        })
        try {
            const result = await newMessage.save()
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    // get /:conversation_id
    async getMessagesByConversationID(req, res) {
        try {
            const messages = await Message.find({
                conversation_id: req.params.conversation_id,
            })
            res.status(200).json(messages)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
export default new MessageController()
