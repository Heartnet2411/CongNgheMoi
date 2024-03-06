// Init server
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')

//connect to db
db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//unlock cors
app.use((req, res, next) => {
  const origin = req.headers['origin'] || '*'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
}
)
app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
