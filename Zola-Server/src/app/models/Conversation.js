import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Conversation = new Schema(
    {
        members: { type: Array },
    },
    { timestamps: true }
)

export default mongoose.model('Conversation', Conversation)
