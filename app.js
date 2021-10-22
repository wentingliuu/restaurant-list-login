// require packages used in the project ///
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine ///
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  helpers: {
    equal: function (a, b) {
      if (a === b) return 'selected'
    }
  }
}
))
app.set('view engine', 'hbs')
// setting express-session ///
app.use(session({
  secret: 'RestaurantSecret',
  resave: false,
  saveUninitialized: true
}))
// setting static files ///
app.use(express.static('public'))
// setting body parser ///
app.use(bodyParser.urlencoded({ extended: true }))
// setting method override ///
app.use(methodOverride('_method'))
// use passport ///
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
// setting router ///
app.use(routes)

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
