const router = require('express').Router()
const {Message} = require('../db/models')
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')

router.put('/', async (req, res, next) => {
  try {
    let toneAnalyzer = new ToneAnalyzerV3({
      version: '2017-09-21',
      username: process.env.IBM_USERNAME,
      password: process.env.IBM_PASSWORD,
      url: process.env.IBM_URL
    })
    const messages = await Message.findAll({
      where: {analyzed: false},
      limit: 50
    })
    let messagesToSend = messages.filter(message => {
      return message.text.split(' ').length > 3 && !message.analyzed
    })
    const toneChatParams = {
      utterances: messagesToSend.map(message => ({
        text: message.text,
        user: message.user
      }))
    }
    if (!messagesToSend.length) {
      res.json({
        status: 'no records updated',
        newData: []
      })
    } else {
      await toneAnalyzer.toneChat(toneChatParams, async (error, analysis) => {
        if (error) {
          console.log(error)
        } else {
          const resData = []
          await Promise.all(
            messagesToSend.map(async (message, index) => {
              try {
                if (analysis.utterances_tone[index].tones.length) {
                  const [
                    numberOfAffectedRows,
                    affectedRows
                  ] = await Message.update(
                    {
                      analyzed: true,
                      score: analysis.utterances_tone[index].tones[0].score,
                      tone_id: analysis.utterances_tone[index].tones[0].tone_id,
                      tone_name:
                        analysis.utterances_tone[index].tones[0].tone_name
                    },
                    {
                      where: {id: message.id},
                      returning: true, // needed for affectedRows to be populated
                      plain: true // makes sure that the returned instances are just plain objects
                    }
                  )
                  return resData.push(affectedRows)
                }
              } catch (err) {
                console.log(err)
              }
            })
          )
          //changing all analyzed flags to true
          res.json({
            status: 'ok',
            newData: resData
          })
        }
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
