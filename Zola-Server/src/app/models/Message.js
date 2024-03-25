import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Message = new Schema({
    conversation_id: { type: String, required: true },
    sender_id: { type: String, required: true },
    content: { type: String, required: true },
    dateSend: { type: Date, required: true },
    type: { type: String, required: true },
    senderName: { type: String, required: true },
    senderAvatar: { type: String, required: true },
    status: { type: String, required: true },
})

export default mongoose.model('Message', Message)
