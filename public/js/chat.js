const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat__messages')

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

const socket = io()

socket.on('message', outputMessage)

socket.emit('join', { username })

chatForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const messageInput = event.target.elements.message__input

  socket.emit('chatMessage', { content: messageInput.value, username })

  messageInput.value = ''

  messageInput.focus()

  chatMessages.scrollTop = chatMessages.scrollHeight
})


function createMessageElement(content, author, time) {
  const div = document.createElement('div')
  div.classList.add('message')

  div.setAttribute('author', author)

  const authorElement = document.createElement('p')
  const textElement = document.createElement('p')

  authorElement.classList.add('meta')
  authorElement.innerHTML = `${author} <span>${time}</span>`

  textElement.classList.add('text')
  textElement.innerHTML = content

  div.appendChild(authorElement)
  div.appendChild(textElement)

  return div
}

function createNestedMessageElement(content) {
  const textElement = document.createElement('p')

  textElement.classList.add('text')
  textElement.innerHTML = content

  return textElement
}

function outputMessage({ author, content, time }) {
  const chatMessages = document.querySelector('.chat__messages')

  const lastMessage = chatMessages.querySelector('div:last-child')

  if (lastMessage && lastMessage.getAttribute('author') === author) {
    return lastMessage.appendChild(
      createNestedMessageElement(content)
    )
  }

  chatMessages.appendChild(
    createMessageElement(content, author, time)
  )
}