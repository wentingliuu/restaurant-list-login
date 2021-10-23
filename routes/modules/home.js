const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantSchema')

// index.hbs
router.get('/', (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  return Restaurant.find({
    $and: [{ userId: req.user._id },
      {
        $or: [{ name: { $regex: keyword, $options: 'i' } },
          { nameEn: { $regex: keyword, $options: 'i' } },
          { location: { $regex: keyword, $options: 'i' } }]
      }]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})
// sort
router.post('/filter', (req, res) => {
  const { sort, category, rating } = req.body
  const sortRule = {
    default: { _id: 'asc' },
    name_asc: { name: 'asc' },
    name_desc: { name: 'desc' },
    rating_asc: { rating: 'asc' },
    rating_desc: { rating: 'desc' }
  }
  return Restaurant.find({
    $and: [{ userId: req.user._id },
      { category: { $regex: category, $options: 'i' } },
      { rating: { $gte: rating } }]
  })
    .sort(sortRule[sort])
    .lean()
    .then(restaurants => res.render('index', { restaurants, sort, category, rating }))
    .catch(error => console.log(error))
})

module.exports = router
