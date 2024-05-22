import express from 'express'
import cors from 'cors'
import path from 'path'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const port = 3005

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: '*',
    },
})
io.on('connection', (socket) => {
    console.log('a user connected 300511111')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('conversation_id', (data) => {
        socket.join(data)
        console.log('conversation_id chung là : ' + data)
    })

    // server nhận message từ client có conversation_id và gửi lại message đó cho các client khác trong conversation_id đó
    // socket.on('send-message', (data) => {
        // console.log('message được nhận là : ' + JSON.stringify(data))
        // io.emit('chat message', msg)

        //Kiểm tra nếu data là mảng và lấy conversation_id từ phần tử đầu tiên
       // const conversation_id = Array.isArray(data)
           // ? data[0].conversation_id._id
          // : data.conversation_id._id
       // const conversation_id = data.conversation_id._id
        //console.log(conversation_id
        // console.log(data)
        // socket.to(conversation_id).emit('receive-message', JSON.stringify(data))
        // console.log('Sending message to room: ' + conversation_id)
    // })
    socket.on('send-message', (data) => {
      console.log('message được nhận là : ' + JSON.stringify(data))
  
      let conversation_id;
  
      if (Array.isArray(data)) {
          console.log('data là mảng')
          conversation_id = data[0].conversation_id;
      } else {
          console.log('data không phải mảng')
          conversation_id = data.conversation_id;
      }
  
      // Nếu conversation_id là một đối tượng, lấy giá trị _id từ đối tượng đó
      if (typeof conversation_id === 'object' && conversation_id !== null) {
          conversation_id = conversation_id._id;
      }
  
      socket.to(conversation_id).emit('receive-message', JSON.stringify(data))
      console.log('Sending message to room: ' + conversation_id)
  })

    socket.on('message-recalled', (data) => {
        console.log('message-recalled được nhận là : ' + JSON.stringify(data))
        // // io.emit('chat message', msg)

        // Kiểm tra nếu data là mảng và lấy conversation_id từ phần tử đầu tiên
        const conversation_id = data.conversation_id

        io.to(conversation_id).emit('message-recalled', JSON.stringify(data))
    })
    socket.on('delete-my-message', (data) => {
        console.log('message to delete: ' + data.message_id)
        io.to(data.user_id).emit('message-deleted', data.message_id)
    })
    // socket.on('addMemberToGroup', (data) => {
    //     // Add the member to the group in your database here
    //     console.log('data đã nhận là: ', data)
    //     // Then emit an event to all clients with the new member and group info
    //     io.emit('memberAddedToGroup', data)

    //     // Emit a notification event
    //     io.emit('notification', {
    //         content: `${data} `,
    //         type: 'notify',
    //     })
    // })
})

// chayj server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
