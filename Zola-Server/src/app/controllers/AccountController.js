const Account = require('../models/Account')

class AccountController {
    // GET /login
    async postLogin(req, res) {
        const phoneNumber = req.query.phoneNumber

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (account) {
            res.json(account)
        } else {
            res.json('Account not found')
        }
    }
}

module.exports = new AccountController()
