import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Friend = new Schema({
    friend_id: { type: String },
    name: { type: String },
    avatar: { type: String },
})

const User = new Schema(
    {
        account_id: { type: String, required: true, unique: true },
        conversation_id: { type: String },
        userName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        dateOfBirth: { type: String, required: true },
        gender: { type: String, required: true },
        avatar: { type: String, required: true },
        coverImage: { type: String },
        friend: [Friend],
    },

    { timestamps: true }
)

export default mongoose.model('User', User)
