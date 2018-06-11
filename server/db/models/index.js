const User = require('./user')
const Message = require('./message')
const Channel = require('./channel')

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
})

User.hasMany(Message)

Message.belongsTo(Channel)
Message.belongsTo(User)

module.exports = {
  User,
  Message,
  Channel
}
