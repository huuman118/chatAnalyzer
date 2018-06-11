'use strict'

const db = require('../server/db')
const {User, Message, Channel} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const channels = [
  {name: 'React_Intro'},
  {name: 'Intro_to_JS'},
  {name: 'Redux_Topics'},
  {name: 'Express'}
]

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

const id = () => Math.round(Math.random() * (users.length - 1)) + 1

const messages = [
  {authorId: id(), content: 'I like React!', channelId: 1},
  {authorId: id(), content: 'how do i import the module?', channelId: 1},
  {
    authorId: id(),
    content: 'do an import React from React module',
    channelId: 1
  },
  {authorId: id(), content: 'whats is a for loop?', channelId: 2},
  {authorId: id(), content: 'You should learn JavaScript!', channelId: 2},
  {authorId: id(), content: 'JavaScript is pretty great!', channelId: 2},
  {authorId: id(), content: 'Redux is great!', channelId: 3},
  {authorId: id(), content: 'I like having a store!', channelId: 3},
  {authorId: id(), content: 'What is a thunk?', channelId: 3},
  {authorId: id(), content: 'What does REST mean?', channelId: 4},
  {authorId: id(), content: 'I like creating servers!', channelId: 4},
  {authorId: id(), content: 'My server broke!', channelId: 4}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  await Promise.all(users.map(user => User.create(user)))
    .then(() => Promise.all(channels.map(channel => Channel.create(channel))))
    .then(() => Promise.all(messages.map(message => Message.create(message))))
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
