const users = [{
  id: 1,
  username: 'Neetta Robot',
  bot: true
}]

function userJoin({ id, username, options = {} }) {
  const user = { id, username, bot: !!options.bot }

  users.push(user)

  return user
}

function getUser(id) {
  return users.find(user => user.id === id)
}

module.exports = {
  userJoin, getUser
}