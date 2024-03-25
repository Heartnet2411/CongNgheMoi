import React, { useEffect } from 'react' // Import thư viện React
import { useState } from 'react' // Import hook useState từ thư viện React
import './Receiveotp.css'
import { Button, TextField } from '@mui/material'
import { CgSpinner } from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from './setup'
import 'react-toastify/dist/ReactToastify.css'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
const Resetpassword = () => {
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const [passwordnew, setPasswordnew] = useState('') // Khai báo state passwordnew để lưu giá trị mật khẩu mới

  const handleOtpChange = (e) => {
    let newValue = e.target.value.replace(/\D/g, '') // Lọc chỉ giữ lại số
    newValue = newValue.slice(0, 6) // Giới hạn chỉ cho phép nhập 6 số
    setOtp(newValue)
  }
  const phoneNumber = sessionStorage.getItem('phoneNumber')
  useEffect(() => {
    if (!phoneNumber) {
      alert('Không tìm thấy số điện thoại!!!')
      window.location.href = 'http://localhost:3000/forgotpassword'
      return
    }
    onSignUp()
  }, [phoneNumber]) //
  if (user) {
    window.location.href = 'http://localhost:3000/dashboard'
  }

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignUp()
          },
          'expired-callback': () => {},
        }
      )
    }
  }

  function onSignUp() {
    setLoading(true)
    onCaptchVerify()
    const phoneNumber2 = '+84' + phoneNumber.slice(1)
    const appVerifier = window.recaptchaVerifier

    // signInWithPhoneNumber(auth, phoneNumber2, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult
    //     console.log('OTP đã được gửi đến số điện thoại của bạn.')
    //     setLoading(false)
    //     toast.success('OTP đã được gửi đến số điện thoại của bạn.')
    //   })
    //   .catch((error) => {
    //     console.log('Lỗi xảy ra khi gửi OTP: ', error)
    //     setLoading(false)
    //   })
  }
  function OnSetupPassword() {
    setLoading(true)
    // kiểm tra nếu mà passwordnew bé hơn 8 ký tự thì báo lỗi

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordRegex.test(passwordnew)) {
      toast.error(
        'Mật khẩu mới phải có ít nhất 8 ký tự có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số'
      )
      return
    }

    // gọi hàm axios và post đến code http://localhost:3001/account/forgot-account
    axios
      .post('http://localhost:3001/account/forgot-account', {
        phoneNumber: phoneNumber,
        passwordnew: passwordnew,
      })
      .then((response) => {
        if (
          response.data.message === 'Mật khẩu mới không được trùng mật khẩu cũ'
        ) {
          toast.success('Mật khẩu mới không được trùng mật khẩu cũ')
        }

        if (
          response.data.message === 'Mật khẩu đã được thay đổi thành công!!!'
        ) {
          window.location.href = 'http://localhost:3000/dashboard'
          toast.success('Mật khẩu đã được thay đổi thành công')
        }
      })

    // window.confirmationResult
    //   .confirm(otp)
    //   .then(async (res) => {
    //     console.log(res)
    //     setUser(res.user)
    //     setLoading(false)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setLoading(false)
    //     // Xử lý trường hợp OTP không đúng
    //     toast.error('Mã OTP không đúng. Vui lòng nhập lại.')
    //     // Đặt lại giá trị của OTP để người dùng nhập lại
    //     setOtp('')
    //   })
  }

  return (
    <div className="bg-emerald-500 flex-container items-center justify-center h-screen">
      <div id="recaptcha-container"></div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <h1 className="h1-name">
        Chào mừng bạn quay trở lại
        <br />
        Zola
        <br />
        {/* <SiZalo size={40} /> */}
      </h1>
      <label htmlFor="ph" className="custom-class">
        Nhập mật khẩu mới
      </label>
      <br />
      <TextField
        sx={{
          marginTop: '10px',
          width: '300px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // Thiết lập màu viền của TextField
            },
            '&:hover fieldset': {
              borderColor: 'white', // Thiết lập màu viền khi di chuột qua TextField
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // Thiết lập màu viền khi TextField được focus
            },
            '& input': {
              color: 'white', // Thiết lập màu chữ trong TextField
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Thiết lập màu chữ cho label
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white', // Thiết lập màu viền cho input
            },
            '& .MuiInputBase-input': {
              color: 'white', // Thiết lập màu chữ cho input
            },
          },
        }}
        variant="outlined"
        size="small"
        inputProps={{
          type: 'text',
          // giới hạn ít nhất là 8 ký tự
          minLength: 8,
        }}
        InputProps={{
          endAdornment: null,
        }}
        onChange={(e) => setPasswordnew(e.target.value)}
      ></TextField>{' '}
      <br />
      <Button
        onClick={OnSetupPassword}
        // Gán giá trị của ô input vào state passwordnew
        sx={{ marginTop: '10px' }}
        variant="contained"
        color="success"
        // onClick={onVerifyOTP()}
      >
        {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
        Xác Nhận
      </Button>
    </div>
  )
}
export default Resetpassword // Export component để có thể sử dụng ở các file khác
