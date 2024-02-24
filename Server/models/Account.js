const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phonenumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const AccountModel = mongoose.model('accounts', AccountSchema)
module.exports = AccountModel
