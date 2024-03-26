import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Message = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'file'],
    },
    message: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
})
export default mongoose.model('Message', Message)
