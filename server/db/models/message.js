const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('message', {
  type: {
    type: Sequelize.STRING
  },
  ts: {
    type: Sequelize.STRING
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  analyzed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  score: {
    type: Sequelize.STRING
  },
  tone_id: {
    type: Sequelize.STRING
  },
  tone_name: {
    type: Sequelize.STRING
  }
})
