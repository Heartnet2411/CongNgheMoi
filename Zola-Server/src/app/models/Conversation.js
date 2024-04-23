import mongoose from 'mongoose'

const Schema = mongoose.Schema
const Conversation = new Schema(
    {
        members: { type: Array, required: true },
        conversationName: { type: String, required: true },
        avatar: {
            type: String,
            default:
                'https://ava-grp-talk.zadn.vn/5/c/6/6/2/360/437175156823fa97cdd9f38a46f1bb7e.jpg',
        },
        groupLeader: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        deputyLeader: {
            type: Array,
        },
    },
    { timestamps: true }
)

import mongoosedelete from 'mongoose-delete'
Conversation.plugin(mongoosedelete, {
    deletedAt: true,
    overrideMethods: 'all',
})

export default mongoose.model('Conversation', Conversation)
