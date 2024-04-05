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
        const coverImage = req.body.coverImage

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
            coverImage,
        })

        console.log(user)

        await user
            .save()
            .then(() => {
                res.json('Register successfully!!!')
            })
            .catch((err) => {
                console.log(err)
                res.status(200).json(err)
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
        const user_id = req.query.user_id

        const account_id = req.body.account_id
        const name = req.body.name
        const avatar = req.body.avatar

        const user = await User.findOne({ _id: user_id })

        if (user) {
            user.friend.push({ friend_id: account_id, name, avatar })
            await user.save()
            res.json('Add friend successfully!!!')
        } else {
            res.json('User doesn`t exits !!!')
        }
    }

    async GetAllUsers(req, res) {
        const loggedInAccountId = req.query.account_id
        User.find({ account_id: { $ne: loggedInAccountId } })
            .then((users) => {
                res.status(200).json(users)
            })
            .catch((err) => {
                console.log('error in getting users', err)
                res.status(500).json('  Error retrieving users')
            })
    }

    // put /updateInfo
    async updateInfo(req, res) {
        const account_id = req.query.account_id

        const gender = req.body.gender
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const dateOfBirth = req.body.dateOfBirth

        const user = await User.findOne({ account_id: account_id })
        if (user) {
            user.gender = gender
            user.firstName = firstName
            user.lastName = lastName
            user.dateOfBirth = dateOfBirth
            user.userName = firstName + ' ' + lastName
            await user.save()
            res.json('Update info successfully!!!')
        } else {
            res.json('User doesn`t exits !!!')
        }
    }

    // put /updateAvatar
    async updateAvatar(req, res) {
        const account_id = req.query.account_id

        const avatar = req.body.avatar

        const user = await User.findOne({ account_id: account_id })
        if (user) {
            user.avatar = avatar
            await user.save()
            res.json('Update avatar successfully!!!')
        } else {
            res.json('User doesn`t exits !!!')
        }
    }

    // put /updateCoverImage
    async updateCoverImage(req, res) {
        const account_id = req.query.account_id

        const coverImage = req.body.coverImage

        const user = await User.findOne({ account_id: account_id })
        if (user) {
            user.coverImage = coverImage
            await user.save()
            res.json('Update cover image successfully!!!')
        } else {
            res.json('User doesn`t exits !!!')
        }
    }

    async findUserByUserID(req, res) {
        const userId = req.params.userId
        try {
            const user = await User.findById({ _id: userId })
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json('User not found!!!')
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Error retrieving user')
        }
    }
}

export default new UserController()
