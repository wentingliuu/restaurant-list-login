// require packages used in the project ///
const express = require('express')
const app = express()
const port = 3000

// routes setting /// 
// Index.hbs
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen on the Express server ///
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})