// Init server
import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'

const app = express()
const port = 3000

import route from './routes/index.js'
import db from './config/db/index.js'

//connect to db
db.connect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
