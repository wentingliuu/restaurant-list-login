const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurantSchema')

// new.hbs (create)
router.get('/new', (req, res) => { return res.render('new') })
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// detail.hbs (read)
router.get('/:id', (req, res) => {
  return Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
// edit.hbs (update)
router.get('/:id/edit', (req, res) => {
  return Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  return Restaurant.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { $set: req.body })
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(error => console.log(error))
})
// delete
router.delete('/:id', (req, res) => {
  return Restaurant.findOneAndRemove({ _id: req.params.id, userId: req.user._id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
