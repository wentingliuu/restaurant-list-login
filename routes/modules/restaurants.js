const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantSchema')

// new.hbs (create)
router.get('/new', (req, res) => { return res.render('new') })
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, nameEn, category, image, location, phone, googleMap, rating, description } = req.body
  return Restaurant.create({ name, nameEn, category, image, location, phone, googleMap, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// detail.hbs (read)
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({ userId, id })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
// edit.hbs (update)
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOne({ userId, id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOneAndUpdate({ userId, id }, { $set: req.body })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  return Restaurant.findOneAndRemove({ userId, id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
