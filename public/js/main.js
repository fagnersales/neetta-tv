const socket = io()

/*==================== ENTRAR ====================*/
const joinButton = document.querySelector('.join__button')
joinButton.addEventListener('click', (event) => {
  event.preventDefault()

  const form = document.querySelector('#join form')
  const [joinLabel] = form.querySelectorAll('input')

  if (joinLabel.value.length) {
    window.location = `http://localhost:8000/chat.html?username=${joinLabel.value}`
  }

  joinLabel.value = ''
})