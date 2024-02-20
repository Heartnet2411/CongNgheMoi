const Account = require('../models/Account')

class AccountController {
    // GET /login
    async login(req, res) {
        const phoneNumber = req.query.phoneNumber

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (account) {
            res.json(account)
        } else {
            res.json('Account not found')
        }
    }

    // post /register
    async register(req, res) {
        const { phoneNumber, password } = req.body

        const account = new Account({ phoneNumber, password })
        await account
            .save()
            .then(() => {
                res.json('Register successfully!!!')
            })
            .catch((err) => {
                res.json('Register failure!!!')
            })
    }
}

module.exports = new AccountController()
