import Account from '../models/Account.js'
import { HTTP_STATUS_BAD_REQUEST } from '../../util/erorCode.js'

class AccountController {
    // GET /login
    async login(req, res) {
        const phoneNumber = req.query.phoneNumber

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (account) {
            res.json(account)
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
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

    async findByID(req, res) {
        const id = req.query.id

        const account = await Account.findOne({ _id: id })
        if (account) {
            res.json(account)
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }
    }
}

export default new AccountController()
