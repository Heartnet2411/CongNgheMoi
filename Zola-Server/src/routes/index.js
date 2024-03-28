import accountRouter from './accounts.js'
import userRouter from './users.js'
import conversationRouter from './conversations.js'
import messageRouter from './messages.js'

function route(app) {
    app.use('/account', accountRouter)

    app.use('/user', userRouter)
    // Conversation routes are nested)
    app.use('/conversations', conversationRouter)
    // Message routes are nested
    app.use('/messages', messageRouter)

}

export default route
