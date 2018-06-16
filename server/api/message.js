const router = require('express').Router()
const {Message} = require('../db/models')
const {WebClient} = require('@slack/client')
const web = new WebClient(process.env.SLACK_TOKEN)

router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const slackData = await web.channels.history({
      channel: 'CB79D89U5',
      count: 100
    })
    if (slackData.messages.length > 0) {
      console.log('data came back')
      //filtering for only user message (i.e. exclude people joining/bot reponse)
      const messages = slackData.messages.filter(message => !message.subtype)
      console.log(messages)
      const updated = await Promise.all(
        messages.map(async message => {
          const messageFormat = {
            type: message.type,
            ts: message.ts,
            user: message.user,
            text: message.text
          }
          const newmessage = await Message.findOrCreate({where: messageFormat})
          return newmessage
        })
      )
      res.json({
        status: 'ok',
        updated: updated.filter(message => message[1]).length
      })
    } else {
      console.log('No matches found')
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
