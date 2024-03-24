import React from 'react'
import './Login.css'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
export const Login = () => {
  const [action, setAction] = React.useState('Log In')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [password, setPassword] = React.useState('')

  // viết 1 hàm để gửi thông tin đăng nhập lên server
  const login = (e) => {
    e.preventDefault()
    // kiểm tra rỗng
    if (phoneNumber === '' || password === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin!!!')
      return
    }

    axios
      .post('http://localhost:3001/account/login', {
        phoneNumber: phoneNumber,
        password: password,
      })
      .then((response) => {
        console.log(response)
        if (response.data.message === 'Account not found!!!') {
          toast.error('Tài khoản không tồn tại!!!')
        } else if (response.data.message === 'Login successfully!!!') {
          toast.success('Đăng nhập thành công!!!')
          window.location.href = 'http://localhost:3000/dashboard'
        } else if (response.data.message === 'Password not match!!!') {
          toast.error('Mật khẩu không đúng!!!')
        }
      })
  }

  return (
    <div className="container1">
      <div className="header">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div className="text">{action}</div>
        <div className="subtext">Log in to continue to Zola.</div>
      </div>
      <div className="form">
        <div className="labelI">PhoneNumber</div>
        <div className="input1">
          <input
            type="phone"
            placeholder="Enter PhoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value)
            }}
          />
        </div>
        <div className="label">Password</div>
        <div className="input1">
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="form-group forgot-password">
          <div className="col-xl-12 col-md-10 col-sm-12 col-12">
            <a href="/forgot"> Forgot Password?</a>
          </div>
        </div>

        <div className="summit">
          <div
            className={action === 'Log In' ? 'button blue' : 'button'}
            onClick={(e) => {
              login(e)
              setAction('Log In')
            }}
          >
            Log In
          </div>
        </div>
        <div className="form-group user-register">
          <div className="col-xl-12 col-md-10 col-sm-12 col-12 ">
            <br />
            Don't have an account? <a href="./"> Register</a>
          </div>
        </div>
      </div>
    </div>
  )
}
