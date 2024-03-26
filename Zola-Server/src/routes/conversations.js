import express from 'express'
const router = express.Router()
import Conversation from '../app/models/Conversation.js'

router.post('/', async (req, res) => {
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
});
//get conversations of a user
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
        
    } catch (error) {
        res.status(500).json(error)
    }
    });
    // console.log("filter in get

export default router
