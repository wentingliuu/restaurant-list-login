// require packages used in the project ///
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
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
// setting router ///
app.use(routes)

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
