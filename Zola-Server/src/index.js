// Init server
import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import cors from 'cors'
import path from 'path'

const app = express()
const port = 3001
app.use(cors())

import route from './routes/index.js'
import db from './config/db/index.js'

// ...rest of your code
//connect to db
db.connect()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.json({ extended: false }))
app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'))

// Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
