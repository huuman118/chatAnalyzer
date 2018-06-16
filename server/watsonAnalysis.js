'use strict'
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
const {Message} = require('./db/models')
// if (process.env.NODE_ENV !== 'production') require('./secrets')

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: process.env.IBM_USERNAME,
  password: process.env.IBM_PASSWORD,
  url: process.env.IBM_URL
})

let messagesToSend = []
let analysisOutput = []
let watsonReturn = {}

const getUtterances = async () => {
  try {
    const messages = await Message.findAll()
    messagesToSend = messages.filter(message => {
      return message.text.split(' ').length > 3 && !message.analyzed
    })
    console.log('message', messagesToSend.length)
    return messagesToSend.map(message => ({
      text: message.text,
      user: message.user
    }))
  } catch (err) {
    console.error(err)
  }
}

const runAnalysis = async () => {
  try {
    const utters = await getUtterances()
    // console.log(utters)
    const toneChatParams = {
      utterances: utters
    }
    if (utters.length) {
      await toneAnalyzer.toneChat(toneChatParams, function(error, analysis) {
        if (error) {
          console.log(error)
        } else {
          console.log(JSON.stringify(analysis, null, 2))
          console.log(analysisOutput)
          watsonReturn = {
            messageSent: messagesToSend,
            analysis: analysis.utterances_tone
          }
        }
      })
      return watsonReturn
    } else {
      return {
        messageSent: [],
        analysis: []
      }
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = runAnalysis
