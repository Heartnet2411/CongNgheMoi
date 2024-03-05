import User from '../models/User.js'

class UserController {
    // post /register
    async register(req, res) {
        const account_id = req.body.account_id
        const conversation_id = req.body.conversation_id
        const userName = req.body.userName
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const phoneNumber = req.body.phoneNumber
        const dateOfBirth = req.body.dateOfBirth
        const gender = req.body.gender
        const avatar = req.body.avatar

        const user = new User({
            account_id,
            conversation_id,
            userName,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth,
            gender,
            avatar,
        })

        console.log(user)

        await user
            .save()
            .then(() => {
                res.json('Register successfully!!!')
            })
            .catch((err) => {
                res.json('Register failure!!!')
            })
    }

    // get /findAllUsers
    async findAllUsers(req, res) {
        const users = await User.find()
        res.json(users)
    }

    // get /findUser
    async findUserByAccountID(req, res) {
        const account_id = req.query.account_id

        const user = await User.findOne({ account_id: account_id })
        if (user) {
            res.json(user)
        } else {
            res.json('User not found!!!')
        }
    }

    // put /addFriend
    async addFriend(req, res) {
        const account_id = req.body.account_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ account_id: account_id })
        const friend = await User.findOne({ account_id: friend_id })

        if (user && friend) {
            user.friends.push(friend_id)
            friend.friends.push(account_id)

            await user
                .save()
                .then(() => {
                    res.json('Add friend successfully!!!')
                })
                .catch((err) => {
                    res.json('Add friend failure!!!')
                })
        } else {
            res.json('Add friend failure!!!')
        }
    }
}

export default new UserController()
