import User from '../models/User.js'

// // hàm bỏ dấu
// function removeVietnameseTones(str) {
//     str = str.toLowerCase()
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
//     str = str.replace(/đ/g, 'd')
//     return str
// }

class UserController {
    // post /register http://localhost:3001/user/register
    async register(req, res) {
        const account_id = req.body.account_id
        const conversation_id = Math.floor(Math.random() * 1000000000)
        // const userName = req.body.userName

        // // Tạo ra biến username từ firstName và lastName người dùng ví dụ Nguyễn Đức Tài là taind
        // // Usage
        // const lastNameLower = removeVietnameseTones(
        //     req.body.lastName.toLowerCase().replace(/\s/g, '')
        // )
        // // Usage
        // const firstNameInitials = req.body.firstName
        //     .split(' ')
        //     .map((word) => removeVietnameseTones(word.charAt(0).toLowerCase()))
        //     .join('') // Lấy ký tự đầu tiên của mỗi từ trong firstName, loại bỏ dấu, và chuyển thành chữ thường

        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const userName = `${firstName} ${lastName}`
        const phoneNumber = req.body.phoneNumber
        const dateOfBirth = req.body.dateOfBirth
        const gender = req.body.gender
        console.log('hello user')

        const avatar =
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2whjzwoBz71waeE07wh1L_sfjpdm6IIf7g'

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

        // return res.status(200).json({
        //     message: 'Đăng ký User thành công!!!',
        //     user: user,
        // })

        await user
            .save()
            .then(() => {
                res.status(200).json({
                    message: 'Đăng ký User thành công!!!',
                    phoneNumber: phoneNumber,
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
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
    async userInfo(req, res) {
        // const phoneNumber = 0367909181;
        // // từ phonenumber tìm ra user
    }
}

export default new UserController()
