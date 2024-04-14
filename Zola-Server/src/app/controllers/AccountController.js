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
            return res
                .status(404)
                .json('Please provide phone number and password')
        }
        //check account in db
        const account = await Account.findOne({ phoneNumber: phoneNumber })
            .then((account) => {
                if (!account) {
                    return res.status(404).json('Account not found')
                }
                if (account.password !== password) {
                    return res.status(404).json('Password is incorrect')
                }
                const token = createToken(account._id)
                return res.status(200).json({ token })
            })
            .catch((err) => {
                console.error(err)
                return res.status(500).json('Internal server error!!!')
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

    // get /find
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
                res.json(account)
            })
            .catch((err) => {
                res.json('Create account failure!!!')
            })
    }

    async findByPhoneNumber(req, res) {
        const phoneNumber = req.query.phoneNumber

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (account) {
            res.json(account)
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }
    }

    // put /updatePassword
    async updatePassword(req, res) {
        const id = req.query.account_id
        const password = req.body.password
        const account = await Account.findOne({ _id: id })
        if (account) {
            account.password = password
            await account
                .save()
                .then(() => {
                    res.json('Update password successfully!!!')
                })
                .catch((err) => {
                    res.json('Update password failure!!!')
                })
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }
    }

    //update password by phone number
    async updatePasswordByPhoneNumber(req, res) {
        const phoneNumber = req.query.phoneNumber
        const password = req.body.password
        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (account) {
            account.password = password
            await account
                .save()
                .then(() => {
                    res.json('Update password successfully!!!')
                })
                .catch((err) => {
                    res.json('Update password failure!!!')
                })
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }
    }
}

export default new AccountController()
