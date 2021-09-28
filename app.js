// require packages used in the project ///
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// connect to Database ///
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => { console.log('MongoDB error!') })
db.once('open', () => { console.log('MongoDB connected!') })

// setting template engine ///
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}
))
app.set('view engine', 'hbs')

// setting static files ///
app.use(express.static('public'))

// setting body parser ///
app.use(bodyParser.urlencoded({ extended: true }))
// setting method override ///
app.use(methodOverride('_method'))

// routes setting ///
// index.hbs
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// new.hbs (create)
app.get('/restaurants/new', (req, res) => { return res.render('new') })
app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// detail.hbs (read)
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
// edit.hbs (update)
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, { $set: req.body })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// delete
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// search
app.get('/search', (req, res) => {
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
app.get('/sort/:result', (req, res) => {
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

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
