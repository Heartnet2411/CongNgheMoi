const express = require('express')
const mongoose = require('mongoose')
const conrs = require('cors')
const AccountModel = require('./models/Account')

const app = express()
app.use(express.json())
app.use(conrs())

mongoose
  .connect('mongodb://127.0.0.1:27017/Account')
  .then(() => {
    console.log('Connected to MongoDB...')
  })
  .catch((err) => console.error('Could not connect to MongoDB...', err))

app.post('/signup', (req, res) => {
  AccountModel.create(req.body)
    .then((accounts) => res.json(accounts))
    .catch((err) => res.json(err))
})
app.post('/signin', (req, res) => {
  const { phonenumber, password } = req.body
  AccountModel.findOne({ phonenumber, password }).then((accounts) => {
    if (accounts) {
      if (accounts.password === password) {
        res.json('success')
      } else {
        res.json('The password is incorrect')
      }
    } else {
      res.json('The phone number is incorrect')
    }
  })
})

app.listen(3001, () => {
  // message to confirm server is running
  console.log('Server is running on port 3001000')
})
