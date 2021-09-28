const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantSchema')

// index.hbs
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({
    $or: [{ name: { $regex: keyword, $options: 'i' } },
      { name_en: { $regex: keyword, $options: 'i' } },
      { location: { $regex: keyword, $options: 'i' } }]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})
// sort
router.get('/sort/:result', (req, res) => {
  const filter = req.params.result.split('_')[0]
  const sub = req.params.result.split('_')[1]
  if (filter === 'name') {
    Restaurant.find()
      .lean()
      .sort({ [filter]: sub })
      .then(restaurants => res.render('index', { restaurants, sort: sub }))
      .catch(error => console.error(error))
  } else if (filter === 'category') {
    Restaurant.find({ [filter]: { $regex: sub, $options: 'i' } })
      .lean()
      .then(restaurants => res.render('index', { restaurants, [filter]: sub }))
      .catch(error => console.log(error))
  } else if (filter === 'rating') {
    Restaurant.find({ [filter]: { $gte: sub } })
      .lean()
      .then(restaurants => res.render('index', { restaurants, [filter]: sub }))
      .catch(error => console.log(error))
  }
})

module.exports = router
