import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Message = new Schema(
    {
        conversation_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        /* receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },*/
        contentType: {
            type: String,
            enum: ['text', 'image', 'video', 'audio', 'file'],
        },
        content: {
            type: String,
        },
        /*imageURL: {
        type: String,
    }*/
    },
    { timestamps: true }
)
export default mongoose.model('Message', Message)
