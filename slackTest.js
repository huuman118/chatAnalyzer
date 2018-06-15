const {IncomingWebhook, WebClient} = require('@slack/client')
if (process.env.NODE_ENV !== 'production') require('./secrets')

console.log('Getting started with Slack Developer Kit for Node.js')

//How to Post to a Slack Channel
// const timeNotification = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)
// const currentTime = new Date().toTimeString()
// timeNotification.send(`The current time is ${currentTime}`, (error, resp) => {
//   if (error) {
//     return console.error(error)
//   }
//   console.log('Notification sent')
//   console.log(resp)
// })

const web = new WebClient(process.env.SLACK_TOKEN)
// console.log('Calling search.messages')
// web.search
//   .messages({query: 'awesome!'})
//   .then(resp => {
//     if (resp.messages.total > 0) {
//       console.log('First match:', resp.messages.matches[0])
//     } else {
//       console.log('No matches found')
//     }
//   })
//   .catch(console.error)

console.log('Calling search.messages')
web.channels
  .history({channel: 'CB79D89U5', count: 1000})
  .then(resp => {
    if (resp.messages.length > 0) {
      console.log('First match:', resp.messages)
    } else {
      console.log('No matches found')
    }
  })
  .catch(console.error)
///exclude all messages with subType
