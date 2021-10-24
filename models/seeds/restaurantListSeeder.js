if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const User = require('../userSchema')
const Restaurant = require('../restaurantSchema')
const restaurantList = require('./restaurant.json').results

const seeders = [
  {
    email: 'user1@example.com',
    password: '12345678',
    index: [1, 2, 3]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    index: [4, 5, 6]
  },
  {
    name: '老饕',
    email: 'root@example.com',
    password: '12345678',
    index: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
]

db.once('open', () => {
  Promise.all(
    Array.from(seeders, seeder => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seeder.password, salt))
        .then(hash => User.create({
          name: seeder.name || '吃貨',
          email: seeder.email,
          password: hash,
          loginMethod: 'email'
        }))
        .then(user => {
          const userRestaurantList = []
          Promise.all(Array.from(seeder.index, i => {
            const restaurantData = restaurantList.find(restaurant => restaurant.id === i)
            restaurantData.userId = user._id
            userRestaurantList.push(restaurantData)
          }))
          return Restaurant.create(userRestaurantList)
        })
    }))
    .then(() => {
      console.log('Data created.')
      process.exit()
    })
    .catch(err => console.log(err))
})
