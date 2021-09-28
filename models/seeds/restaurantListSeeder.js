const mongoose = require('mongoose')
const Restaurant = require('../restaurantSchema')
const restaurantList = require('./restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => { console.log('MongoDB error!') })
db.once('open', () => {
  console.log('MongoDB connected!')
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({
      name: restaurantList[i].name,
      name_en: restaurantList[i].name_en,
      category: restaurantList[i].category,
      image: restaurantList[i].image,
      location: restaurantList[i].location,
      phone: restaurantList[i].phone,
      google_map: restaurantList[i].google_map,
      rating: restaurantList[i].rating,
      description: restaurantList[i].description
    })
  }
  console.log('Date created!')
})
