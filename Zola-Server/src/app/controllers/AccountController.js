import Account from '../models/Account.js'
import { HTTP_STATUS_BAD_REQUEST } from '../../util/erorCode.js'
import { response } from 'express'

class AccountController {
    // POST http://localhost:3001/account/login WEb
    async login(req, res) {
        console.log('Đang đăng nhập')

        const { phoneNumber, password } = req.body
        const data = [phoneNumber, password]
        console.log('data: ' + JSON.stringify(data))

        const account = await Account.findOne({ phoneNumber: phoneNumber })
        if (!account) {
            return res.status(200).json({
                message: 'Account not found!!!',
            })
        }
        if (account.password !== password) {
            return res.status(200).json({ message: 'Password not match!!!' })
        }
        // lấy biến account_id từ account
        const account_id = account._id
        if (account && account.password === password) {
            console.log('Đăng nhập thành công')
            res.status(200).json({
                message: 'Login successfully!!!',
                account_id: account_id,
            })
        }
    }

    // post /register WEb
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
    // WEb

    async findByID(req, res) {
        const id = req.query.account_id

        const account = await Account.findOne({ _id: id })
        if (account) {
            res.json(account)
        } else {
            res.status(HTTP_STATUS_BAD_REQUEST).json('Account not found!!!')
        }
    }
    // POST WEb
    async loginphone(req, res) {
        const { phoneNumber } = req.body

        let phoneNumberFormat // Khai báo biến ở mức độ phạm vi toàn cục

        if (phoneNumber.startsWith('+84')) {
            // kiểm tra xem phoNumber đang là dạng này dạng +84367909181 hay là +840367909181 chuyển cả 2 dạng về 0367909181

            // Kiểm tra xem số điện thoại có đúng định dạng +84XXXXXXXXX không
            const regex = /^\+84\d{9}$/ // Biểu thức chính quy để kiểm tra
            if (regex.test(phoneNumber)) {
                phoneNumberFormat = phoneNumber.replace('+84', '0') // Thay thế +84 bằng 0
            } else {
                phoneNumberFormat = phoneNumber.replace('+840', '0') // Thay thế +840 bằng 0
            }

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
    // viết 1 hàm post quên mật khẩu từ số điện thoại WEb
    async forgot(req, res) {
        // gọi lại hàm loginphone
        const { phoneNumber } = req.body
        const passwordnew = req.body.passwordnew
        // tìm từ số điện thoại ra account trong db có số điện thoại đó không
        const account = await Account.findOne({ phoneNumber: phoneNumber })
        // từ account đổi password thành passwordnew

        // kiểm tra mật khẩu mới có giống mật khẩu cũ không , nếu giống thì báo lỗi
        if (account.password === passwordnew) {
            console.log('Mật khẩu mới không được trùng mật khẩu cũ')
            res.status(400).json({
                message: 'Mật khẩu mới không được trùng mật khẩu cũ',
            })
        } else {
            // nếu giống thì thay đổi mật khẩu thành mật khẩu mới
            account.password = passwordnew
            await account.save()
            console.log('Mật khẩu đã được thay đổi thành công')
            res.status(200).json({
                message: 'Mật khẩu đã được thay đổi thành công!!!',
                account: account,
            })
        }
    }
}

export default new AccountController()
