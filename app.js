// require packages used in the project ///
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
const app = express()
const port = 3000

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
// setting router
app.use(routes)

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
