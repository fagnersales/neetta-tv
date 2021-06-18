const moment = require('moment')
moment.locale('pt-br')

module.exports = ({ user, content }) => {
  return {
    author: user.username,
    content,
    time: moment().format('h:mm')
  }
}