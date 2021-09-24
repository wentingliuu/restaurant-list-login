// require packages used in the project ///
const express = require('express')
const mongoose = require('mongoose') 
const app = express()
const port = 3000

const exphbs = require('express-handlebars') // require express-handlebars
const Restaurant = require('./models/restaurant') // require DB data
const bodyParser = require('body-parser') // require body parser

// connect to Database ///
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {console.log('MongoDB error!')})
db.once('open', () => {console.log('MongoDB connected!')})

// setting template engine ///
app.engine('hbs', exphbs({ 
    defaultLayout: 'main', 
    extname: '.hbs',   
    runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
    }}
))
app.set('view engine', 'hbs')

// setting static files ///
app.use(express.static('public'))

// setting body parser ///
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting /// 
// index.hbs
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
// new.hbs (create)
app.get('/restaurants/new', (req, res) => {return res.render('new')})
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
           .then(() => res.redirect('/'))
           .catch(error => console.log(error))
})
// detail.hbs (read)
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
           .lean()
           .then(restaurant => res.render('detail', {restaurant}))
           .catch(error => console.log(error))
})
// edit.hbs (update)
app.get('/restaurants/:id/edit', (req,res) => {
  const id = req.params.id
  return Restaurant.findById(id)
           .lean()
           .then(restaurant => res.render('edit', {restaurant}))
           .catch(error => console.log(error))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
           .then(restaurant => {
             restaurant.name = name
             restaurant.name_en = name_en
             restaurant.category = category
             restaurant.image = image
             restaurant.location = location
             restaurant.phone = phone
             restaurant.google_map = google_map
             restaurant.rating = rating
             restaurant.description = description
             return restaurant.save()
           })
           .then(() => res.redirect(`/restaurants/${id}`))
           .catch(error => console.log(error))
})
// delete
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndRemove(id)
           .then(() => res.redirect('/'))
           .catch(error => console.log(error))
})
// search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim().toLowerCase()
    Restaurant.find()
      .then(restaurants => {
        const filteredRestaurants = restaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
        )
        res.render('index', {restaurants: filteredRestaurants, keyword})
      })
      .catch(error => console.log(error))
})

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})