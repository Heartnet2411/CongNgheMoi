import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Conversation = new Schema({
    member: { type: Array, required: true, unique: true },
    message_id: { type: String, required: true, unique: true },
    groupName: { type: String, required: true },
    groupAvatar: { type: String, required: true },
    memberCount: { type: Number, required: true },
})

export default mongoose.model('Conversation', Conversation)
