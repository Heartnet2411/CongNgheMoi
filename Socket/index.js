const io = require('socket.io')(8800, {
    cors: {
        origin: 'http://localhost:19006',
    },
})
//let activeUsers=[]
io.on('connection', (socket) => {
    // add new User
    // socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    // if (!activeUsers.some((user) => user.userId === newUserId)) {
    // activeUsers.push({ userId: newUserId, socketId: socket.id });
    // console.log("New User Connected", activeUsers);
    // }
    //send all active users to new user
    // io.emit("get-users", activeUsers);
    // });

    // socket.on("disconnect", () => {
    // remove user from active users
    // activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // console.log("User Disconnected", activeUsers);
    //send all active users to all users
    // io.emit("get-users", activeUsers);
    // });

    //send message to a specific user
    // socket.on("send-message", (data) => {
    // if(data){
    // const { receiverId } = data;
    //
    // const user = activeUsers.find((user) => user.userId === receiverId);
    // console.log("Sending from socket to :", receiverId)
    // console.log("Data: ", data)
    // if (user) {
    // io.to(user.socketId).emit("receive-message", data);
    // }
    // }
    //});
    // socket.on("recall-message", (data) => {
    // const { receiverId, msgId } = data;
    // const user = activeUsers.find((user) => user.userId === receiverId);
    // if (user) {
    // io.to(user.socketId).emit("recall-message", msgId);
    // }
    // });
    // new socket
    console.log('Connected to socket.io')
    socket.on('setup', (userDataId) => {
        socket.join(userDataId)
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log('User Joined Room: ' + room)
    })
    socket.on('typing', (room) => socket.in(room).emit('typing'))
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

    socket.on('new message', (newMessageRecieved) => {
        var conversation = newMessageRecieved.conversation_id
        if (!conversation.members) return console.log(`member is not define `)
        console.log(conversation.members)
        conversation.members.forEach((member) => {
            if (member == newMessageRecieved.senderId._id)
                return console.log(`received sucessful`)

            socket.in(member).emit('message received', newMessageRecieved)
        })
    }),
        socket.on('messageRecalled', (msgId) => {
            socket.broadcast.emit('messageRecalled', msgId)
        })

    socket.off('setup', () => {
        console.log('USER DISCONNECTED')
        socket.leave(userDataId)
    })
})
