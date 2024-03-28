import Account from '../models/Account.js'
import { HTTP_STATUS_BAD_REQUEST } from '../../util/erorCode.js'

import jwt from 'jsonwebtoken'
const createToken = (accountId) => {
    const payload = { accountId: accountId }
    const token = jwt.sign(payload, 'Q$r2K6W8n!jCW%Zk', { expiresIn: '1h' })
    return token
}

class AccountController {
    // POST /login
    async login(req, res) {
        const { phoneNumber, password } = req.body
        //check if phoneNumber and password are provided
        if (!phoneNumber || !password) {
            res.status(404).json('Please provide phone number and password')
        }
        //check account in db
        const account = await Account.findOne({ phoneNumber: phoneNumber })
            .then((account) => {
                if (!account) {
                    res.status(404).json('Account not found')
                }
                if (account.password !== password) {
                    res.status(404).json('Password is incorrect')
                }
                const token = createToken(account._id)
                res.status(200).json({ token })
            })
            .catch((err) => {
                console.log('Error at login', err)
                res.status(500).json('Internal server error!!!')
            })
        /*const phoneNumber = req.query.phoneNumber

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (account) {
            res.json(account)
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }*/
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
        const id = req.query.account_id

        const account = await Account.findOne({ _id: id })
        if (account) {
            res.json(account)
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }
    }

    async createAccount(req, res) {
        const { phoneNumber, password } = req.body

        const account = new Account({ phoneNumber, password })
        await account
            .save()
            .then(() => {
                res.json('Create account successfully!!!')
            })
            .catch((err) => {
                res.json('Create account failure!!!')
            })
    }
}

export default new AccountController()
