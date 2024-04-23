import Conversation from '../models/Conversation.js'

class ConversationController {
    async createConversation(req, res) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        })
        try {
            const result = await newConversation.save()
            //res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async userConversations(req, res) {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] },
                delete: null,
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async findConversations(req, res) {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstId, req.params.secondId] },
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    //find conversation by conversation_id
    async findConversationById(req, res) {
        try {
            const conversation = await Conversation.findOne({
                _id: req.params.conversationId,
            })
            res.status(200).json(conversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    //api tạo nhóm trò chuyện
    async createConversationsGroupMobile(req, res) {
        // console.log('đã vào createConversationsGroupWeb')
        // return res.status(200).json({
        //     message: 'Đã vào createConversationsGroupWeb',
        // })
        const user_id = req.body.user_id
        const friend_ids = req.body.friend_ids
        const groupLeader = req.body.user_id
        const conversationName = req.body.conversationName

        // Kiểm tra rỗng các id thì trả về lỗi
        if (!user_id || !friend_ids) {
            console.log('Không tìm thấy user_id hoặc friend_ids!!!')
            return res.status(200).json({
                message: 'Không tìm thấy user_id hoặc friend_ids!!!',
            })
        }
        const members = [user_id, ...friend_ids]
        const conversation = new Conversation({
            members,
            groupLeader,
            conversationName,
        })

        await conversation
            .save()
            .then(() => {
                console.log('Tạo conversation thành công!!!')
                return res.status(200).json(conversation)
            })
            .catch((err) => {
                console.error(err) // log lỗi
                return res.status(200).json({
                    message: 'Lỗi khi tạo conversation!!!',
                    error: err.message, // thêm chi tiết lỗi
                })
            })
    }

    // xây dựng 1 api thêm thành viên nhóm addMemberToConversationGroupWeb
    async addMemberToConversationGroupWeb(req, res) {
        // console.log('đã vào addMemberToConversationGroupWeb')
        // return res.status(200).json({
        //     message: 'Đã vào addMemberToConversationGroupWeb',
        // })
        const conversation_id = req.body.conversation_id
        const friend_ids = req.body.friend_ids

        // thêm danh sách friend_ids vào conversation_id
        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $push: { members: { $each: friend_ids } } },
                { new: true }
            )
            if (!conversation) {
                return res
                    .status(404)
                    .json({ message: 'Conversation not found' })
            }
            return res.status(200).json({
                message: 'Thêm thành viên vào nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // api xpas thành viên nhóm trong member , nếu
    async removeMemberFromConversationGroupWeb(req, res) {
        const conversation_id = req.body.conversation_id
        const user_id = req.body.user_id
        // lấy ra friend_id cần xóa
        const friend_id = req.body.friend_id
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        console.log('conversation là', conversation)
        if (
            conversation.groupLeader.toString() !== user_id &&
            (conversation.deputyLeader
                ? conversation.deputyLeader.toString() !== user_id
                : true)
        ) {
            return res.status(200).json({
                message: 'Bạn không có quyền xóa thành viên khỏi nhóm!!!',
            })
        }

        // xóa friend_id khỏi members
        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $pull: { members: friend_id } },
                { new: true }
            )
            if (!conversation) {
                return res
                    .status(404)
                    .json({ message: 'Conversation not found' })
            }
            return res.status(200).json({
                message: 'Xóa thành viên khỏi nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    // api gán quyền phó nhóm cho các thành viên khác
    async authorizeDeputyLeader(req, res) {
        const conversation_id = req.body.conversation_id
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        if (conversation.groupLeader.toString() !== user_id) {
            return res.status(200).json({
                message: 'Bạn không có quyền gán phó nhóm!!!',
            })
        }

        // gán quyền phó nhóm cho friend_id
        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $push: { deputyLeader: friend_id } },
                { new: true }
            )
            if (!conversation) {
                return res
                    .status(404)
                    .json({ message: 'Conversation not found' })
            }
            return res.status(200).json({
                message: 'Gán quyền phó nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    // api hủy quyền phó nhóm cho các thành viên khác
    async unauthorizeDeputyLeader(req, res) {
        const conversation_id = req.body.conversation_id
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        if (conversation.groupLeader.toString() !== user_id) {
            return res.status(200).json({
                message: 'Bạn không có quyền hủy phó nhóm!!!',
            })
        }

        // hủy quyền phó nhóm cho friend_id
        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $pull: { deputyLeader: friend_id } },
                { new: true }
            )
            if (!conversation) {
                return res
                    .status(404)
                    .json({ message: 'Conversation not found' })
            }
            return res.status(200).json({
                message: 'Hủy quyền phó nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // api gán quyền trưởng nhóm cho 1 thành viên khác
    async authorizeGroupLeader(req, res) {
        const conversation_id = req.body.conversation_id
        const user_id = req.body.user_id
        const friend_id = req.body.friend_id
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        if (conversation.groupLeader.toString() !== user_id) {
            return res.status(200).json({
                message: 'Bạn không có quyền gán trưởng nhóm!!!',
            })
        }
        conversation.groupLeader = friend_id

        // nếu friend_id đã có trong deputyLeader thì xóa friend_id khỏi deputyLeader
        if (conversation.deputyLeader.includes(friend_id)) {
            conversation.deputyLeader = conversation.deputyLeader.filter(
                (deputyLeader) => deputyLeader !== friend_id
            )
        }
        try {
            await conversation.save()
            return res.status(200).json({
                message: 'Gán quyền trưởng nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    // xây dựng 1 api thêm thành viên nhóm addMemberToConversationGroupWeb
    async addMemberToConversationGroupMobile(req, res) {
        // console.log('đã vào addMemberToConversationGroupWeb')
        // return res.status(200).json({
        //     message: 'Đã vào addMemberToConversationGroupWeb',
        // })
        const conversation_id = req.body.conversation_id
        const friend_ids = req.body.friend_ids

        // thêm danh sách friend_ids vào conversation_id
        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $push: { members: { $each: friend_ids } } },
                { new: true }
            )
            if (!conversation) {
                return res
                    .status(404)
                    .json({ message: 'Conversation not found' })
            }
            return res.status(200).json(conversation)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    //xây dựng api đổi tên Nhóm
    async changeGroupName(req, res) {
        const conversation_id = req.body.conversation_id
        const conversationName = req.body.conversationName
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOneAndUpdate(
            { _id: conversation_id },
            { $set: { conversationName: conversationName } },
            { new: true }
        )
        try {
            await conversation.save()
            return res.status(200).json({
                message: 'Đổi tên nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    // api rời khỏi nhóm cho tât cả thành viên
    async leaveGroup(req, res) {
        const conversation_id = req.body.conversation_id
        const user_id = req.body.user_id
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        if (conversation.groupLeader.toString() === user_id) {
            return res.status(200).json({
                message: 'Trưởng nhóm không thể rời khỏi nhóm!!!',
            })
        }

        // xóa user_id khỏi members
        try {
            const conversation = await Conversation.findOneAndUpdate(
                { _id: conversation_id },
                { $pull: { members: user_id } },
                { new: true }
            )
            // nếu user_id là deputyLeader thì xóa user_id khỏi deputyLeader
            if (conversation.deputyLeader.includes(user_id)) {
                conversation.deputyLeader = conversation.deputyLeader.filter(
                    (deputyLeader) => deputyLeader !== user_id
                )
            }
            if (!conversation) {
                return res
                    .status(404)
                    .json({ message: 'Conversation not found' })
            }
            return res.status(200).json({
                message: 'Rời khỏi nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    // api giản tán nhóm chỉ dành cho groupLeader
    // api giản tán nhóm chỉ dành cho groupLeader
    async disbandGroupWeb(req, res) {
        const conversation_id = req.body.conversation_id
        const user_id = req.body.user_id
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        if (conversation.groupLeader.toString() !== user_id) {
            return res.status(200).json({
                message: 'Bạn không có quyền giải tán nhóm!!!',
            })
        }

        // sử dụng mongoose-delete để thêm thuộc tính deleted vào conversation
        try {
            await Conversation.delete({ _id: conversation_id })
            return res.status(200).json({
                message: 'Giải tán nhóm thành công!!!',
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // upadte conversation avatar
    async updateConversationAvatar(req, res) {
        const conversation_id = req.body.conversation_id
        const avatar = req.body.avatar
        // tìm Conversation theo conversation_id
        const conversation = await Conversation.findOne({
            _id: conversation_id,
        })
        conversation.avatar = avatar
        try {
            await conversation.save()
            return res.status(200).json({
                message: 'Cập nhật avatar nhóm thành công!!!',
                conversation: conversation,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
export default new ConversationController()
