import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Conversation = new Schema({
    members: { type: Array},

    /*message_id: { type: String, required: true, unique: true },
    groupName: { type: String, required: true },
    groupAvatar: { type: String, required: true },
    memberCount: { type: Number, required: true },*/
},
{ timestamps: true })

export default mongoose.model('Conversation', Conversation)
