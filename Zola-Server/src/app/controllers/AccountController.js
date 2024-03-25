import Account from '../models/Account.js'
import { HTTP_STATUS_BAD_REQUEST } from '../../util/erorCode.js'

class AccountController {
    async login(req, res) {
        console.log('Đang đăng nhập')

        const { phoneNumber, password } = req.body
        const data = [phoneNumber, password]
        console.log('data: ' + JSON.stringify(data))

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (!account) {
            // dừng chuong trình và trả về thông báo số điện thoại đã được đăng ký
            return res.status(200).json({
                message: 'Account not found!!!',
            })
        }
        if (account.password !== password) {
            return res.status(200).json({ message: 'Password not match!!!' })
        }

        if (account && account.password === password) {
            console.log('Đăng nhập thành công')
            res.status(200).json({
                message: 'Login successfully!!!',
                data: account,
            })
        }
    }

    // post /register
    async register(req, res) {
        const { phoneNumber, password } = req.body

        const data = [phoneNumber, password]
        // kiểm tra xem số điện thoại đã tồn tại trong db chưa , nếu rồi trả về số điện thoại đã tồn tại
        const accountCheck = await Account.findOne({ phoneNumber: phoneNumber })
        if (accountCheck) {
            // dừng chuong trình và trả về thông báo số điện thoại đã được đăng ký
            return res.status(200).json({
                message: 'Số điện thoại đã được đăng ký!!!',
            })
        }
        console.log('Đã được gọi đến register')
        const account = new Account({ phoneNumber, password })
        await account
            .save()
            .then(() => {
                // Gửi phản hồi trả về client
                res.status(200).json({
                    message: 'Đăng ký thành công!!!',
                    account_id: account._id,
                })
            })
            .catch((err) => {
                console.error('lỗi này', err)
                res.status(500).json({ message: 'Register failure!!!' })
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
    async loginphone(req, res) {
        const { phoneNumber } = req.body
        // chuyển đổi lại số điện thoại từ +84367909181 -> 0367909181

        if (phoneNumber.startsWith('+84')) {
            // Chuyển đổi lại số điện thoại từ +84367909181 -> 0367909181
            const phoneNumberFormat = phoneNumber.replace('+84', '0')
            const data = phoneNumberFormat
            console.log(data)
            // kiểm tra số điện thoại đã tồn tại trong db chưa , nếu rồi trả về số điện thoại lại trang đã nhận otp để load
            const account = await Account.findOne({
                phoneNumber: phoneNumberFormat,
            })
            if (!account) {
                res.status(400).json({
                    message: 'Số điện thoại chưa được đăng ký!!!',
                })
            }
            console.log('Đăng nhập thành công')
            res.status(200).json({
                message: 'Đăng nhập thành công!!!',
                phoneNumber: phoneNumberFormat,
            })
        } else if (phoneNumber.startsWith('0')) {
            const data = phoneNumber
            console.log(data)
            // kiểm tra số điện thoại đã tồn tại trong db chưa , nếu rồi trả về số điện thoại lại trang đã nhận otp để load
            const account = await Account.findOne({ phoneNumber: phoneNumber })
            if (!account) {
                res.status(400).json({
                    message: 'Số điện thoại chưa được đăng ký!!!',
                })
            }
            console.log('Đăng nhập thành công')
            res.status(200).json({
                message: 'Đăng nhập thành công!!!',
                phoneNumber: phoneNumberFormat,
            })
        } else {
            console.log('Số điện thoại không đúng định dạng')
            res.status(400).json({
                message: 'Số điện thoại không đúng định dạng',
            })
        }
    }
    // viết 1 hàm post quên mật khẩu từ số điện thoại
    async forgot(req, res) {
        // gọi lại hàm loginphone
    }
}

export default new AccountController()
