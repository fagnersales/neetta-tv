const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: { origin: "*" }
})

const formatMessage = require('./utils/formatMessage')
const { userJoin, getUser } = require('./utils/users')

const bot = getUser(1)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  socket.on('join', ({ username }) => {

    const user = userJoin({ id: socket.id, username: username })

    socket.emit('message', formatMessage({ user: bot, content: `Bem-vindo ${user.username}!` }))

    socket.broadcast.emit('message',
      formatMessage({ user: bot, content: `${user.username} entrou no chat!` })
    )

    socket.on('disconnect', () => {
      io.emit('message', formatMessage({ user: bot, content: `${user.username} saiu do chat.` }))
    })

    socket.on('chatMessage', (message) => {
      io.emit('message', formatMessage({ user: user, content: message.content }))
    })
  })
})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server running at port ${PORT}`))
