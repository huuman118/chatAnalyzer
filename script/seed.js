'use strict'
const db = require('../server/db')
const {User, Message} = require('../server/db/models')
const {IncomingWebhook, WebClient} = require('@slack/client')
if (process.env.NODE_ENV !== 'production') require('../secrets')

const users = [
  {
    name: 'Cody',
    email: 'cody@fullstack.com',
    password: '12345'
  },
  {
    name: 'Ben',
    email: 'ben@fullstack.com',
    password: '12345'
  },
  {
    name: 'Star',
    email: 'star@fullstack.com',
    password: '12345'
  },
  {
    name: 'Batman',
    email: 'batman@fullstack.com',
    password: '12345'
  }
]

console.log('Getting started with Slack Developer Kit for Node.js')
const web = new WebClient(process.env.SLACK_TOKEN)
let messages = []
const getSlackData = async () => {
  await web.channels
    .history({channel: 'CB79D89U5', count: 1000})
    .then(resp => {
      if (resp.messages.length > 0) {
        console.log('data came back:', resp.messages)
        messages = resp.messages.filter(message => !message.subtype)
      } else {
        console.log('No matches found')
      }
    })
    .catch(console.error)
}
getSlackData()

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  await Promise.all(users.map(user => User.create(user))).then(async () =>
    Promise.all(messages.map(message => Message.create(message)))
  )
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!

  console.log(`seeded successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .then(async () => {
      const messagestest = await Message.findAll()
      console.log(messagestest)
    })
    .then(() => {
      // `finally` is like then + catch. It runs no matter what.
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...')
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
