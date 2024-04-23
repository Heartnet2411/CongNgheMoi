import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema(
    {
        account_id: { type: String, required: true, unique: true },
        conversation_id: { type: Array, required: true },
        userName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        dateOfBirth: { type: String, required: true },
        gender: { type: String, required: true },
        avatar: { type: String, required: true },
        coverImage: { type: String, required: true },
        friendRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        friend: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        sentFriendRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },

    { timestamps: true }
)

export default mongoose.model('User', User)
