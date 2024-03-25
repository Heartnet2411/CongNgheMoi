import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
export const Login = () => {
  const [action, setAction] = React.useState('Đăng Nhập')
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
        <div className="subtext">
          {' '}
          <b className="zola-style">Zola</b> giúp mọi người kết nối với nhau{' '}
        </div>
      </div>
      <div className="form">
        <div className="labelI">Số di động</div>
        <div className="input1">
          <input
            type="phone"
            placeholder="Nhập số điện thoại"
            onChange={(e) => {
              setPhoneNumber(e.target.value)
            }}
          />
        </div>
        <div className="label">Mật Khẩu</div>
        <div className="input1">
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="form-group forgot-password">
          <div className="col-xl-12 col-md-10 col-sm-12 col-12">
            <a href="/forgotpassword"> Quên Mật Khẩu?</a>
          </div>
        </div>

        <div className="summit">
          {/* <div
            className={action === 'Đăng Nhập' ? 'button blue' : 'button'}
            onClick={(e) => {
              login(e)
            }}
          >
            Log In
          </div> */}

          <Button
            onClick={(e) => {
              login(e)
            }}
            sx={{ marginTop: '10px' }}
            variant="contained"
            color="success"
          >
            Đăng nhập
          </Button>
        </div>
        <br />
        <div className="form-group user-register">
          <div className="col-xl-12 col-md-10 col-sm-12 col-12 ">
            Bạn chưa có tài khoản ?{' '}
            <b className="login-style">
              <a href="/register"> Đăng Ký Ngay</a>
            </b>
          </div>
        </div>
      </div>
    </div>
  )
}
