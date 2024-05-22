import express from 'express'
const router = express.Router()

import messageController from '../app/controllers/MessageController.js'
import AWS from 'aws-sdk'
import path from 'path'
import multer from 'multer'

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    },
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // giới hạn file 10MB
    fileFilter: function (req, file, cb) {
        checkFileTypeMedia(file, cb)
    },
})
function checkFileTypeMedia(file, callback) {
    const extTypes = /jpeg|jpg|png|gif|doc|docx|pdf|txt|ppt|pptx|xlsx|mp4/
    const mimeTypes =
        /image\/jpeg|image\/jpg|image\/png|image\/gif|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/pdf|text\/plain|application\/vnd.ms-powerpoint|application\/vnd.openxmlformats-officedocument.presentationml.presentation|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|video\/mp4/

    const extname = extTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = mimeTypes.test(file.mimetype)

    if (mimetype && extname) {
        return callback(null, true)
    } else {
        callback('Error: Invalid File Type 0!')
    }
}

router.post(
    '/createMessagesWeb',
    upload.array('image', 10),
    messageController.createMessagesWeb
)
router.post('/findAllMessagesWeb', messageController.findAllMessagesWeb)
// thu hồi tin nhắn
router.post('/recallMessageWeb', messageController.recallMessageWeb)
// viết 1 hàm lấy các message có recalled = true
router.post(
    '/findAllRecallMessagesWeb',
    messageController.findAllRecallMessagesWeb
)
// 1 hàm xoá tin nhắn chỉ Ở phias tooi
router.post('/deleteMyMessageWeb', messageController.deleteMyMessageWeb)
// viết 1 hàm lấy các message có trường deleteBy có giá trị
router.post(
    '/findAllDeleteMyMessageWeb',
    messageController.findAllDeleteMyMessageWeb
)
// viết 1 hàm tạo 1 bản sao tin nhắn tới conversation_id
router.post('/forwardMessageWeb', messageController.forwardMessageWeb)
// viết 1 hàm test up file media
router.post(
    '/uploadMediaWeb',
    upload.array('media', 10),
    messageController.uploadMediaWeb
)
// tạo notification
router.post('/createNotificationWeb', messageController.createNotificationWeb)
// get all media
router.post('/getAllMediaWeb', messageController.getAllMediaWeb)
// get all File
router.post('/getAllFileWeb', messageController.getAllFileWeb)
// get getMessageReplyContentWeb
router.post(
    '/getMessageReplyContentWeb',
    messageController.getMessageReplyContentWeb
)
// //add mobile
router.post('/', messageController.addMessage)
router.get('/:conversation_id', messageController.getMessagesByConversationID)
router.put('/recallMessage/:id', messageController.recallMessage)
router.put('/deleteMessage', messageController.deleteMyMessage)
router.post(
    '/findNewestMessage/:conversation_id',
    messageController.findNewestMessage
)

export default router
