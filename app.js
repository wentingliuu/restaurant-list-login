// require packages used in the project ///
const express = require('express')
const mongoose = require('mongoose') 
const app = express()
const port = 3000

const exphbs = require('express-handlebars') // require express-handlebars
const Restaurant = require('./models/restaurant') // require DB data

// connect to Database ///
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {console.log('MongoDB error!')})
db.once('open', () => {console.log('MongoDB connected!')})

// setting template engine ///
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files ///
app.use(express.static('public'))

// routes setting /// 
// Index.hbs
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})