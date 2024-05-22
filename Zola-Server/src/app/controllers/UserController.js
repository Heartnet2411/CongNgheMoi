import User from '../models/User.js'

import AWS from 'aws-sdk'
import path from 'path'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config()
import uploadDefaultAvatar from '../../util/uploadDefaultAvatar.js'
// require('dotenv').config()

AWS.config.update({
    accessKeyId: process.env.Acces_Key,
    secretAccessKey: process.env.Secret_Acces_Key,
    region: process.env.Region,
})

const S3 = new AWS.S3()
const bucketname = process.env.s3_bucket

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    },
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // giới hạn file 2MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})
function checkFileType(file, callback) {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimetype = filetypes.test(file.mimetype)
    if (mimetype && extname) {
        return callback(null, true)
    } else {
        callback('Error: Images Only!')
    }
}

class UserController {
    // post /registerWeb http://localhost:3001/user/registerWeb
    async registerWeb(req, res) {
        const account_id = req.body.account_id

        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const userName = `${firstName} ${lastName}`
        const phoneNumber = req.body.phoneNumber
        const dateOfBirth = req.body.dateOfBirth
        const gender = req.body.gender
        // console.log('hello user')

        // const avatar =
        //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2whjzwoBz71waeE07wh1L_sfjpdm6IIf7g'
        const avatar = uploadDefaultAvatar(lastName)
        // console.log('avatar: ', avatar)
        // return res
        //     .status(200)
        //     .json({ message: 'Đăng ký User thành công!!!', avatar: avatar })

        const user = new User({
            account_id,
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
                res.status(200).json({
                    message: 'Đăng ký User thành công!!!',
                    phoneNumber: phoneNumber,
                    user_id: user._id,
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    // post /findUser http://localhost:3001/user/findUser
    async findUserByAccountIDWeb(req, res) {
        const account_id = req.body.account_id

        // từ account đã đăng nhập thành công thì tìm ra user tương ứng với account đó
        const user = await User.findOne({ account_id: account_id })
        console.log('user: ' + user)
        const user_id = user._id

        if (user) {
            console.log('Lấy user từ account thành công 123123')
            res.status(200).json({
                message: 'Login successfully!!!',
                user_id: user_id,
            })
        } else {
            console.log('Không tìm thấy user từ account')
            res.status(200).json({ message: 'User not found!!!' })
        }
    }
    // post findUserByUserID
    async findUserByUserID(req, res) {
        const user_id = req.body.user_id
        console.log('user_id  được truyền qua server là: ', user_id)

        const user = await User.findOne({ _id: user_id })
        // console.log('user là: ', user)
        if (user) {
            return res.status(200).json({
                message: 'Tìm user thành công!!!',
                user: user,
            })
        } else {
            return res.status(200).json({
                message: 'Không tìm thấy user!!!',
            })
        }
    }

    // website
    // findalluser web
    async findAllUsersWeb(req, res) {
        const allUsers = await User.find()
        console.log('allUsers: ', allUsers)
        return res
            .status(200)
            .json({ message: 'Tìm tất cả user thành công!!!', users: allUsers })
        // return res
        //     .status(200)
        //     .json({ message: 'Tìm tất cả user thành công!!!' })
    }
    //findUserByPhone
    async findUserByPhoneWeb(req, res) {
        const phoneNumber = req.body.phoneNumber
        const user = await User.findOne({ phoneNumber: phoneNumber })

        console.log('user: ', user)
        if (user) {
            return res.status(200).json({
                message: 'Tìm user thành công!!!',
                user: user,
            })
        } else {
            return res.status(200).json({
                message: 'Không tìm thấy user!!!',
            })
        }
    }
    // post /addFriend Web
    // async addFriendWeb(req, res) {
    //     const user_id = req.body.user_id
    //     // friend_id chính là user_id của user mà mình muốn thêm vào friend list
    //     const friend_id = req.body.friend_id
    //     const friendName = req.body.friendName
    //     const avatar = req.body.avatar

    //     const user = await User.findOne({ _id: user_id })
    //     if (user) {
    //         user.friend.push({
    //             friend_id,
    //             friendName,
    //             avatar,
    //         })
    //         await user.save()
    //         console.log('user người A kết bạn là : ', user)

    //         // sau khi người dùng thêm bạn bè thì người đó cũng sẽ là bạn bè của người mà người đó thêm vào
    //         const friend = await User.findOne({ _id: friend_id })
    //         if (friend) {
    //             friend.friend.push({
    //                 friend_id: user_id,
    //                 friendName: user.userName,
    //                 avatar: user.avatar,
    //             })
    //             await friend.save()
    //             console.log('friend: ', friend)
    //             return res.status(200).json({
    //                 message: 'Thêm bạn bè thành công!!!',
    //                 user: user,
    //                 friend: friend,
    //             })
    //         }
    //         console.log('user người B được kết bạn là : ', friend)
    //         return res.status(200).json({
    //             message: 'Thêm bạn bè thành công!!!',
    //             user: user,
    //             friend: friend,
    //         })
    //     } else {
    //         // in ra lỗi
    //         res.json('Không thể thêm bạn bè !!!')
    //     }
    // }

    async addFriendWeb(req, res) {
        const user_id = req.body.user_id
        // friend_id chính là user_id của user mà mình muốn thêm vào friend list
        const friend_id = req.body.friend_id
        const user = await User.findOne({ _id: user_id })
        if (user) {
            user.friend.push({
                friend_id,
            })
            await user.save()
            console.log('user người A kết bạn là : ', user)

            // sau khi người dùng thêm bạn bè thì người đó cũng sẽ là bạn bè của người mà người đó thêm vào
            const friend = await User.findOne({ _id: friend_id })
            if (friend) {
                friend.friend.push({
                    friend_id: user_id,
                })
                await friend.save()
                console.log('friend: ', friend)
                return res.status(200).json({
                    message: 'Thêm bạn bè thành công!!!',
                    user: user,
                    friend: friend,
                })
            }
            console.log('user người B được kết bạn là : ', friend)
            return res.status(200).json({
                message: 'Thêm bạn bè thành công!!!',
                user: user,
                friend: friend,
            })
        } else {
            // in ra lỗi
            res.json('Không thể thêm bạn bè !!!')
        }
    }
    async deleteFriendWeb(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ _id: user_id })
        // khi user xóa bạn bè thì bạn bè cũng sẽ xóa user đó khỏi friend list của mình tuy nhiên khi xoá thì friend được xoá sẽ vô trường phụ là deleteFriend chứ không xoá hẳn
        const friend = await User.findOne({ _id: friend_id })
        console.log('user trước khi xóa là: ', user)
        console.log('friend trước khi xóa là: ', friend)
        if (user && friend) {
            // Find the friend to delete in user's friend list
            const deletedFriendInUser = user.friend.find(
                (friend) => friend.friend_id === friend_id
            )
            // Find the user in friend's friend list
            const deletedUserInFriend = friend.friend.find(
                (friend) => friend.friend_id === user_id
            )

            // Remove friend from user's friend list
            user.friend = user.friend.filter(
                (friend) => friend.friend_id !== friend_id
            )
            // Add the deleted friend to user's deleteFriend list
            user.deleteFriend.push(deletedFriendInUser)

            // Remove user from friend's friend list
            friend.friend = friend.friend.filter(
                (friend) => friend.friend_id !== user_id
            )
            // Add the deleted user to friend's deleteFriend list
            friend.deleteFriend.push(deletedUserInFriend)

            await user.save()
            await friend.save()
            console.log('user sau khi xóa là: ', user)
            console.log('friend sau khi xóa là: ', friend)
            return res.status(200).json({
                message: 'Xóa bạn bè thành công!!!',
                user: user,
                friend: friend,
            })
        } else {
            // in ra lỗi
            res.json('Không thể xóa bạn bè !!!')
        }
    }

    async getInfoFriendWeb(req, res) {
        const friend_id = req.body.friend_id
        console.log('friend_id là: ', friend_id)
        // từ friend_id tìm ra user lấy ảnh và tên , và số điện thoại của friend
        const friend = await User.findOne({ _id: friend_id })
        // console.log('friend: ', friend)
        const friendName = friend.userName
        const avatar = friend.avatar
        const phoneNumber = friend.phoneNumber

        // gộp thông tin của friend thành 1 object
        const friendInfo = { friend_id, friendName, avatar, phoneNumber }

        if (friend) {
            return res.status(200).json({
                message: 'Lấy thông tin friend thành công!!!',
                friendInfo: friendInfo,
            })
        } else {
            return res.status(200).json({
                message: 'Không tìm thấy friend!!!',
            })
        }
    }

    // // findUserByAccountIDWeb
    // async findUserByAccountIDWeb(req, res) {
    //     const account_id = req.body.account_id
    //     const user = await User.findOne({ account_id: account_id })
    //     console.log('user: ', user)
    //     if (user) {
    //         return res.status(200).json({
    //             message: 'Tìm user thành công!!!',
    //             user: user,
    //         })
    //     } else {
    //         return res.status(200).json({
    //             message: 'Không tìm thấy user!!!',
    //         })
    //     }
    // }

    async ChangeImageAvatarWeb(req, res) {
        const user_id = req.body.user_id
        const image = req.file?.originalname.split('.')
        // viết 1 hàm file Type
        const fileType = image[image.length - 1]
        const filePath = `${image[0]}.${fileType}`
        console.log(image, fileType, filePath)
        // return res.status(200).json({ message: 'xin chào' })

        // tìm user thông qua user_id
        const user = await User.findOne({ _id: user_id })
        const params = {
            Bucket: bucketname,
            Key: filePath,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        S3.upload(params, async (err, data) => {
            if (err) {
                console.log(
                    'Error occured while trying to upload to S3 bucket',
                    err
                )
            }
            const ImageURL = data.Location
            // update ảnh cho user
            user.avatar = ImageURL
            await user.save()

            if (data) {
                console.log('Upload to S3 bucket successfully', ImageURL)

                return res.status(200).json({
                    message: 'Upload ảnh thành công!!!',
                    avatarURL: ImageURL,
                })
            }
        })
    }

    // web thì chưa xài cái này
    async changeImageCoverAvatarWeb(req, res) {
        const user_id = req.body.user_id
        const image = req.file?.originalname.split('.')
        // viết 1 hàm file Type
        const fileType = image[image.length - 1]
        const filePath = `${image[0]}.${fileType}`
        console.log(image, fileType, filePath)
        // return res.status(200).json({ message: 'xin chào' })

        // tìm user thông qua user_id
        const user = await User.findOne({ _id: user_id })
        const params = {
            Bucket: bucketname,
            Key: filePath,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        }
        S3.upload(params, async (err, data) => {
            if (err) {
                console.log(
                    'Error occured while trying to upload to S3 bucket',
                    err
                )
            }
            const ImageURL = data.Location
            // update ảnh cho user
            user.coverImage = ImageURL
            await user.save()

            if (data) {
                console.log('Upload to S3 bucket successfully', ImageURL)

                return res.status(200).json({
                    message: 'Upload ảnh thành công!!!',
                    avatarURL: ImageURL,
                })
            }
        })
    }
    // // viết  1 post updateUserWeb sửa đổi họ tên , giới tính , dateOfBirth

    async updateUserWeb(req, res) {
        const user_id = req.body.user_id
        const userName = req.body.userName
        const gender = req.body.gender
        const dateOfBirth = req.body.dateOfBirth

        // tự sinh ra firstName và lastName từ userName cái lastName là phần sau cùng của userName còn firstName là phần còn lại
        const firstName = userName.split(' ').slice(0, -1).join(' ')
        const lastName = userName.split(' ').slice(-1).join(' ')

        console.log(
            'Tất cả thông tin truyền qua server là: ',
            user_id,
            userName,
            gender,
            dateOfBirth
        )
        const user = await User.findOne({ _id: user_id })
        console.log('user trước khi thay đổi là: ', user)

        // kiểm tra first name

        if (user) {
            user.userName = userName

            user.firstName = firstName
            user.lastName = lastName
            user.gender = gender

            user.dateOfBirth = dateOfBirth
            await user.save()
            console.log('user sau khi thay đổi là: ', user)
            // return res.status(200).json({
            //     message: 'Cập nhật thông tin thành công!!!',
            //     user: user,
            // })

            // thêm 1 dấu / ở đây
            // }

            // bây giờ account_id của user này là 1 friend_id của 1 user khác tìm ra user đó và cập nhật thông tin của user đó trong friend list của user kia
            const userban = await User.findOne({
                'friend.friend_id': user_id,
            })
            console.log('User mà có friend bị thay đổi là : ', userban)
            if (userban) {
                let check = false // Biến check để kiểm tra xem có tìm thấy friend_id trùng khớp hay không
                // Duyệt qua tất cả các bạn bè
                for (let i = 0; i < userban.friend.length; i++) {
                    // Kiểm tra cái userban.friend[i].friend_id có trùng với account_id không
                    if (userban.friend[i].friend_id === user_id) {
                        userban.friend[i].friendName = user.userName
                        userban.friend[i].avatar = user.avatar
                        await userban.save()
                        console.log(
                            'user có friend sau khi thay đổi là: ',
                            userban
                        )
                        check = true
                        break
                    }
                }
                if (!check) {
                    console.log(
                        'không thấy friend_id nào trùng với account_id của user vừa thay đổi!!!'
                    )
                }
            }
            return res.status(200).json({
                message: 'Cập nhật thông tin thành công!!!',
                user: user,
                userban: userban,
            })
        }
    }
    // post /sendFriendRequest // gửi yêu cầu kết bạn
    async sendFriendRequestWeb(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const friend = await User.findOne({ _id: friend_id })
        const user = await User.findOne({ _id: user_id })

        console.log('user: ', user)
        console.log('friend: ', friend)

        if (friend) {
            friend.friendRequests.push({
                friend_id: user_id,
                friendName: user.userName,
                avatar: user.avatar,
                phoneNumber: user.phoneNumber,
            })
            console.log('friend sau khi thêm là: ', friend)
            console.log('Gửi yêu cầu kết bạn thành công!!!')
            await friend.save()
            return res.status(200).json({
                message: 'Gửi yêu cầu kết bạn thành công!!!',
                friend: friend,
            })
        } else {
            // in ra lỗi
            res.json('Không thể gửi yêu cầu kết bạn !!!')
        }
    }
    // thu hồi lời mời kết bạn
    async cancelFriendRequestWeb(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ _id: user_id })
        const friend = await User.findOne({ _id: friend_id })
        console.log('Friend trước khi thu hồi là: ', friend)
        if (user && friend) {
            friend.friendRequests = friend.friendRequests.filter(
                (request) => request.friend_id !== user_id
            )
            // Save user after removing friend request
            console.log('Friend sau khi thu hồi là: ', friend)
            await friend.save()
            await user.save()

            return res.status(200).json({
                message: 'Huỷ lời mời kết bạn thành công!!!',
                friend: friend,
            })
        } else {
            // in ra lỗi
            res.json('Không thể Huỷ lời mời kết bạn !!!')
        }
    }

    async deleteFriendRequestWeb(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ _id: user_id })
        const friend = await User.findOne({ _id: friend_id })

        if (user && friend) {
            // Remove friend request
            user.friendRequests = user.friendRequests.filter(
                (request) => request.friend_id !== friend_id
            )
            await user.save()
            return res.status(200).json({
                message: 'Xóa lời mời kết bạn thành công!!!',
                user: user,
            })
        } else {
            // in ra lỗi
            res.json('Không thể xóa lời mời kết bạn !!!')
        }
    }
    // post /acceptFriendRequest // người b đồng ý kết bạn với người a
    async acceptFriendRequestWeb(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ _id: user_id })
        const friend = await User.findOne({ _id: friend_id })
        if (user && friend) {
            // Remove friend request
            user.friendRequests = user.friendRequests.filter(
                (request) => request.friend_id !== friend_id
            )

            // Add to friends list
            user.friend.push({
                friend_id,
                friendName: friend.userName,
                avatar: friend.avatar,
                phoneNumber: friend.phoneNumber,
            })
            friend.friend.push({
                friend_id: user_id,
                friendName: user.userName,
                avatar: user.avatar,
                phoneNumber: user.phoneNumber,
            })

            await user.save()
            await friend.save()

            return res.status(200).json({
                message: 'Đã chấp nhận yêu cầu kết bạn!!!',
                user: user,
                friend: friend,
            })
        } else {
            // in ra lỗi
            res.json('Không thể chấp nhận yêu cầu kết bạn !!!')
        }
    }
    // api lấy avatar của user từ user_id
    async getInfoByUserIDWeb(req, res) {
        const sender_id = req.body.sender_id
        const user = await User.findOne({ _id: sender_id })
        if (user) {
            return res.status(200).json({
                message: 'Lấy thông tin thành công!!!',
                avatar: user.avatar,
                name: user.userName,
            })
        } else {
            return res.status(200).json({
                message: 'Không tìm thấy user!!!',
            })
        }
    }

    // mobile ----------
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
            user.friend.push({ friend_id: account_id, name, avatar, lastName })
            await user.save()
            res.json('Add friend successfully!!!')
        } else {
            res.json('User doesn`t exits !!!')
        }
    }
    async getInfoFriend(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findOne({ _id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const friendIds = user.friend.map((friend) => friend.friend_id)
            const friends = await User.find(
                { _id: { $in: friendIds } },
                'userName phoneNumber avatar lastName'
            )

            res.status(200).json(friends)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
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
    async findUserByUserIDMobile(req, res) {
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
    async findUserByPhoneNumber(req, res) {
        const phoneNumber = req.params.phoneNumber
        try {
            const user = await User.findOne({ phoneNumber: phoneNumber })
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json('User not found')
            }
        } catch (err) {
            console.log(err)
            res.status(500).json('Error retrieving user')
        }
    }
    // sent a request to a friend to a user
    async friendRequest(req, res) {
        const { currentUserId, selectedUserId } = req.body
        try {
            //update receiver's friendRequestArray
            await User.findByIdAndUpdate(selectedUserId, {
                $push: { friendRequests: currentUserId },
            })
            //update sender's sentRequestArray
            await User.findByIdAndUpdate(currentUserId, {
                $push: { sentFriendRequests: selectedUserId },
            })
            res.sendStatus(200)
        } catch (err) {
            res.sendStatus(500)
        }
    }
    //show all friend requests sent by a user
    async showFriendRequests(req, res) {
        try {
            const { userId } = req.params
            //const user = await User.findById({_id:userId})
            const user = await User.findById({ _id: userId })
                .populate('friendRequests', 'userName phoneNumber avatar')
                .lean()
            // const friendRequests = user.friendRequests;
            res.status(200).json(user.friendRequests)
            //res.status(200).json(user);
        } catch (error) {
            console.log(error)
            //res.sendStatus(500).json('Interval server error');
        }
    }
    //accept a friend request
    async acceptFriendRequest(req, res) {
        try {
            const user_id = req.body.user_id
            const friend_id = req.body.friend_id
            const user = await User.findOne({ _id: user_id })
            const friend = await User.findOne({ _id: friend_id })
            if (user && friend) {
                // Remove friend request
                user.friendRequests = user.friendRequests.filter(
                    (request) => request.toString() !== friend_id
                )
                friend.sentFriendRequests = friend.sentFriendRequests.filter(
                    (request) => request.toString() !== user_id
                )
                // Add to friends list
                user.friend.push({
                    friend_id,
                })
                friend.friend.push({
                    friend_id: user_id,
                })
                await user.save()
                await friend.save()
                //create conversation
                // await ConversationController.createConversation({
                // body: {
                // senderId: user_id,
                // receiverId: friend_id,
                // },
                // })
                // return res.status(200).json({
                // message: 'Đã chấp nhận yêu cầu kết bạn!!!',
                // user: user,
                // friend: friend,
                // })
                // } else {
                //in ra lỗi
                // res.json('Không thể chấp nhận yêu cầu kết bạn !!!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // thu hồi lời mời kết bạn
    async cancelFriendRequest(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ _id: user_id })
        const friend = await User.findOne({ _id: friend_id })
        console.log('Friend trước khi thu hồi là: ', friend)
        if (user && friend) {
            friend.friendRequests = friend.friendRequests.filter(
                (request) => request.toString() !== user_id
            )
            user.sentFriendRequests = user.sentFriendRequests.filter(
                (request) => request.toString() !== friend_id
            )

            // Save user after removing friend request
            console.log('Friend sau khi thu hồi là: ', friend)
            await friend.save()
            await user.save()

            return res.status(200).json({
                message: 'Huỷ lời mời kết bạn thành công!!!',
                friend: friend,
            })
        } else {
            // in ra lỗi
            res.json('Không thể Huỷ lời mời kết bạn !!!')
        }
    }

    async deleteFriendRequest(req, res) {
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id

        const user = await User.findOne({ _id: user_id })
        const friend = await User.findOne({ _id: friend_id })

        if (user && friend) {
            // Remove friend request
            user.friendRequests = user.friendRequests.filter(
                (request) => request.toString() !== friend_id
            )
            await user.save()
            return res.status(200).json({
                message: 'Xóa lời mời kết bạn thành công!!!',
                user: user,
            })
        } else {
            // in ra lỗi
            res.json('Không thể xóa lời mời kết bạn !!!')
        }
    }
    async getInfoFriend(req, res) {
        try {
            const { userId } = req.params
            const user = await User.findOne({ _id: userId })
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const friendIds = user.friend.map((friend) => friend.friend_id)
            const friends = await User.find(
                { _id: { $in: friendIds } },
                'userName phoneNumber avatar'
            )

            res.status(200).json(friends)
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    async showSentFriendRequests(req, res) {
        try {
            const { userId } = req.params
            //const user = await User.findById({_id:userId})
            const user = await User.findById({ _id: userId })
                .populate('sentFriendRequests', 'userName phoneNumber avatar')
                .lean()
            res.status(200).json(user.sentFriendRequests)
        } catch (error) {
            console.log(error)
            res.sendStatus(500).json('Interval server error')
        }
    }

    //-----
}

export default new UserController()
