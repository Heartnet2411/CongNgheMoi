import Message from '../models/Message.js'
import User from '../models/User.js'
import Conversation from '../models/Conversation.js'

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
            var message = await Message.create(newMessage)
            var message = await Message.create(newMessage)
            message = await Message.populate(message, [
                { path: 'senderId', select: 'userName avatar phoneNumber' },
                { path: 'conversation_id' },
            ])
            message = await User.populate(message, {
                path: 'conversation_id.members',
                select: 'userName avatar phoneNumber',
            })
            await Conversation.findByIdAndUpdate(conversation_id, {
                lastMessage: message._id,
            })
            res.status(200).json(message)
        } catch (err) {
            throw new Error(err.message)
        }
    }
    // get /:conversation_id
    async getMessagesByConversationID(req, res) {
        try {
            const messages = await Message.find({
                conversation_id: req.params.conversation_id,
            })
                .populate('senderId', 'userName avatar phoneNumber lastName')
                .populate('conversation_id')
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

    async findNewestMessage(req, res) {
        try {
            let index = 0
            let message = await Message.findOne(
                {
                    conversation_id: req.params.conversation_id,
                },
                null,
                { sort: { createdAt: -1 }, limit: 1, skip: index }
            )
            while (message.deletedBy.includes(req.body.userId)) {
                index++
                message = await Message.findOne(
                    {
                        conversation_id: req.params.conversation_id,
                    },
                    null,
                    { sort: { createdAt: -1 }, limit: 1, skip: index }
                )
            }
            console.log('message', message)
            res.status(200).json(message)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
export default new MessageController()
