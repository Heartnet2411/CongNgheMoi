import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Friend = new Schema({
    friend_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true },
})

const User = new Schema(
    {
        account_id: { type: String, required: true, unique: true },
        conversation_id: { type: String, required: true, unique: true },
        userName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        dateOfBirth: { type: String, required: true },
        gender: { type: String, required: true },
        avatar: { type: String, required: true },
        friend: [Friend],
    },
    { timestamps: true }
)

export default mongoose.model('User', User)
