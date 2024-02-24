import React from 'react'
import './Login_Demo.css'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Login_Demo = () => {
  const [action, setAction] = React.useState('Sign In')
  const [phonenumber, setPhoneNumber] = React.useState('Phone Number')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleApiSignUp = (e) => {
    console.log({ username, phonenumber, password })

    // Kiểm tra xem username, phonenumber và password có được nhập hay không
    if (!username || !phonenumber || !password) {
      alert('Vui lòng nhập đầy đủ thông tin.')
      return
    }
    e.preventDefault()
    axios
      .post('http://localhost:3001/signup', {
        username,
        phonenumber,
        password,
      })
      .then((result) => {
        console.log(result)
        alert('Đăng ký thành công , chuyển sang trang đăng nhập !')
        setAction('Sign In')
      })
      .catch((err) => console.log(err))
  }

  const handleApiSignIn = (e) => {
    // Kiểm tra xem phonenumber và password có được nhập hay không
    if (!phonenumber || !password) {
      alert('Vui lòng nhập đầy đủ thông tin.')
      return
    }
    console.log({ phonenumber, password })
    e.preventDefault()
    axios
      .post('http://localhost:3001/signin', {
        phonenumber,
        password,
      })
      .then((result) => {
        console.log(result)
        if (result.data === 'success') {
          window.location.href = '/home'
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>

        {action === 'Sign Up' ? (
          <div></div>
        ) : (
          <div className="subtext">Sign in to continue to Zola. Test </div>
        )}
        {action === 'Sign In' ? (
          <div></div>
        ) : (
          <div className="subtext">Get your Zola account now. Test </div>
        )}
      </div>
      <div className="form">
        {action === 'Sign In' ? (
          <div></div>
        ) : (
          <div className="labe">
            UserName
            <div className="inpu">
              <input
                type="phone"
                placeholder="Enter UserName"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
          </div>
        )}
        <div className="label">PhoneNumber</div>
        <div className="input">
          <input
            type="phone"
            placeholder="Enter PhoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value)
            }}
          />
        </div>
        <div className="label">Password</div>
        <div className="input">
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {action === 'Sign Up' ? (
          <div></div>
        ) : (
          <div className="forgot">Forgot Password?</div>
        )}
        <div className="summit">
          <div
            className={action === 'Sign In' ? 'button gray' : 'button'}
            onClick={(e) => {
              if (action === 'Sign Up') {
                setAction('Sign In')
                return
              }
              handleApiSignIn(e)
              setAction('Sign In')
            }}
          >
            Sign In
          </div>

          <div
            className={action === 'Sign Up' ? 'button gray' : 'button'}
            onClick={(e) => {
              // nếu đang là action sign in mà click vào sign up thì không chạy hàm handleApiSignUp()
              if (action === 'Sign In') {
                setAction('Sign Up')
                return
              }

              handleApiSignUp(e)
              setAction('Sign Up')
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  )
}
