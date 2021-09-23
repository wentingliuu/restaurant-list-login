// require packages used in the project ///
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// connect to Database ///
mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {console.log('MongoDB error!')})
db.once('open', () => {console.log('MongoDB connected!')})

// setting template engine ///
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// routes setting /// 
// Index.hbs
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})