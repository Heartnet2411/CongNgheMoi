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

    async recallMessage(req, res) {
        try {
            const message = await Message.findById(req.params.id)
            message.recalled = true
            const result = await message.save()
            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async deleteMessage(req, res) {
        try {
            const message = await Message.findByIdAndDelete(req.params.id)
            res.status(200).json('Message has been deleted...')
        } catch (err) {
            res.status(500).json(err)
        }
    }

    async deleteMyMessage(req, res) {
        const { message_id, user_id } = req.body

        try {
            const message = await Message.findById(message_id)
            if (!message) {
                return res.status(200).json({ error: 'Tin nhắn không tồn tại' })
            }

            // kiểm tra xem user đã xoá tin nhắn này chưa nếu chưa thì thêm vào mảng deletedBy
            if (!message.deletedBy.includes(user_id)) {
                message.deletedBy.push(user_id)
                await message.save()
            }

            return res.status(200).json({
                thongbao: 'Xoá chỉ ở phía tôi thành công!!!',
                message: message,
            })
        } catch (error) {
            res.status(500).json({ error: 'Lỗi' })
        }
    }
}

export default new MessageController()
