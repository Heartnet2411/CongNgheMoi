import React from 'react'
import './Register.css'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { toast, Toaster } from 'react-hot-toast'
export const Register = () => {
  const [action, setAction] = React.useState('Register')
  // lấy thông tin từ form firstname, lastname, numberphone, date of birth , Gender, password, confirm password
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [dateOfBirth, setDateOfBirth] = React.useState('')
  // nếu mà người dùng không chọn giới tính thì mặc định giới tính là male
  const [gender, setGender] = React.useState('male')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  // viết 1 hàm để gửi thông tin đăng ký lên server
  const register = (e) => {
    // kiểm tra password và confirm password có giống nhau không
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Mật khẩu không trùng khớp!!! Vui lòng nhập lại mật khẩu!!!')
      return
    }
    // kiểm tra thông tin nhập vào có đầy đủ không
    if (
      firstName === '' ||
      lastName === '' ||
      phoneNumber === '' ||
      dateOfBirth === '' ||
      gender === ''
    )
      toast.error('Vui lòng nhập đầy đủ thông tin!!!')
    // kiểm tra năm sinh có lớn hơn năm hiện tại không
    else if (dateOfBirth > new Date()) {
      toast.error('Năm sinh không hợp lệ!!!')
    } else {
      // format lại kiểu dữ liệu dateOfBirth , chỉ lấy ngày tháng năm sinh
      let date = dateOfBirth.getDate()
      let month = dateOfBirth.getMonth() + 1
      let year = dateOfBirth.getFullYear()
      const dateOfBirthFormatted = `${date}/${month}/${year}`
      axios
        .post('http://localhost:3001/account/add-account', {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          dateOfBirth: dateOfBirthFormatted,
          gender: gender,
          password: password,
        })
        .then((response) => {
          if (response.data.message === 'Số điện thoại đã được đăng ký!!!') {
            toast.error('Số điện thoại đã được đăng ký!!!')
          }
          if (response.data.message === 'Đăng ký thành công!!!') {
            axios
              .post('http://localhost:3001/user/register', {
                account_id: response.data.account_id,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                dateOfBirth: dateOfBirthFormatted,
                gender: gender,
                password: password,
              })
              .then((response) => {
                toast.success('Đăng ký tài khoản và user thành công!')
                sessionStorage.setItem('phoneNumber', response.data.phoneNumber)
                // window.location.href = 'http://localhost:3000/dashboard'
                window.location.href = 'http://localhost:3000/receiveotp'
              })
              .catch((err) => {
                console.error('Error creating user:', err)
                toast.error('Đã có lỗi xảy ra khi tạo user!')
              })
          }
        })
    }
  }

  return (
    <div className="register-container">
      <div className="container">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div className="header-re">
          <div className="text">{action}</div>
          <div className="subtext">Get your Zola account now.</div>
        </div>
        <div className="form">
          <div className="labelA">
            <div className="inputA">
              <div className="labelA">First Name</div>
              <div className="labelAB">Last Name</div>
            </div>
            <div className="inputA">
              <div className="inputIA">
                <input
                  type="firstname"
                  placeholder="Enter First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                />
              </div>
              <div className="inputIAB">
                <input
                  type="lastname"
                  placeholder="Enter Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="label">NumberPhone</div>
          <div className="inputI">
            <input
              type="numberphone"
              placeholder="Enter NumberPhone"
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </div>
          <div className="label">Date of Birth</div>
          <div className="inputA">
            <div className="inputB">
              <DatePicker
                //showIcon
                placeholderText="Click to select a date"
                selected={dateOfBirth}
                onChange={(e) => setDateOfBirth(e)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
              />
            </div>
            <div className="inputC">
              <div>
                <label for="select"> Gender </label>
                <select
                  className="form-select"
                  id="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="label">Password</div>
          <div className="inputIB">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="label">Confirm Password</div>
          <div className="inputIB">
            <input
              type="password"
              placeholder="Enter Confirm Password"
              // set lấy giá trị confirm password
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="user-re">
            <div className="col-xl-12 col-md-10 col-sm-12 col-12">
              <div
                className={action === 'Register' ? 'button blue' : 'button'}
                onClick={(e) => {
                  register(e)
                  setAction('Register')
                }}
              >
                Register
              </div>
            </div>
          </div>
          <div className="form-group user-register">
            <div className="col-xl-12 col-md-10 col-sm-12 col-12 ">
              <br />
              Do you have an account? <a href="/login"> Log In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
