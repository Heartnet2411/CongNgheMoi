import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './Receiveotp.css'
import { Button, TextField } from '@mui/material'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from './setup'
import 'react-toastify/dist/ReactToastify.css'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
function Forgotpassword() {
  const [otp, setOtp] = useState('')
  const [phone, setPhone] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === 'Enter') {
  //       event.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
  //       onSignUp() // Gọi hàm onSignUp khi nhấn phím "Enter"
  //     }
  //   }

  //   // Gắn lắng nghe sự kiện keydown cho cả trang web khi component được load
  //   document.addEventListener('keydown', handleKeyPress)

  //   // Xóa lắng nghe sự kiện khi component unmount để tránh memory leak
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress)
  //   }
  // }, []) // Chạy useEffect chỉ một lần sau khi component được mount

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            onSignUp()
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
          auth,
        }
      )
    }
  }
  function onSignUp() {
    setLoading(true)
    onCaptchVerify()

    // kiểm tra rỗng và có đúng định dạng số điện thoại không
    if (phone === '') {
      toast.error('Vui lòng nhập số điện thoại!!!')
      setLoading(false)
      return
    } else if (phone.length < 10) {
      toast.error('Số điện thoại không hợp lệ!!!')
      setLoading(false)
      return
    } else {
      axios
        .post('http://localhost:3001/account/login-phone', {
          phoneNumber: phone,
        })
        .then((response) => {
          //window.location.href = 'http://localhost:3000/receiveotp'
          if (response.data.message === 'Đăng nhập thành công!!!') {
            // Nếu thành công thì chuyển hướng đến trang nhận OTP
            window.location.href =
              'http://localhost:3000/receiveOtp?type=forgotpassword'
            // làm đở gửi tới luôn trang reset password
            // window.location.href = 'http://localhost:3000/resetpassword'
            // // Hoặc lưu vào session storage
            sessionStorage.setItem('phoneNumber', response.data.phoneNumber)
          } else {
            // Nếu server trả về message khác 'Đăng nhập thành công!!!'
            alert('Đăng nhập không thành công! Vui lòng thử lại.')
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error('Đã xảy ra lỗi:', error)
          alert('Đã xảy ra lỗi khi đăng nhập! Vui lòng thử lại.')
        })
    }
  }

  return (
    <div className="phone_body">
      <div className="phone-content">
        <div id="recaptcha-container"></div>
        <Toaster toastOptions={{ duration: 2000 }} />
        <h1 className="h1-name">
          Quên Mật Khẩu
          <br />
          Zola
          <br />
          {/* <SiZalo size={40} /> */}
        </h1>
        <label htmlFor="ph" className="custom-class">
          Nhập số điện thoại bạn đã đăng ký
        </label>
        <br />
        <br />
        <PhoneInput
          country={'vn'}
          onChange={(phone) => setPhone('+' + phone)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
              onSignUp() // Gọi hàm onSignUp khi nhấn phím "Enter"
            }
          }}
        />
        <Button
          onClick={onSignUp}
          sx={{ marginTop: '10px' }}
          variant="contained"
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}
export default Forgotpassword
