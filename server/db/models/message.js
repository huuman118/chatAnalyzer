const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')

module.exports = db.define(
  'message',
  {
    message: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    defaultScope: {
      include: [{model: User}]
    }
  }
)
