import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './Register.css'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import { Button } from '@mui/material'
import 'react-datepicker/dist/react-datepicker.css'
import { toast, Toaster } from 'react-hot-toast'
export const Register = () => {
    const [action, setAction] = React.useState('Đăng Ký')
    // lấy thông tin từ form firstname, lastname, numberphone, date of birth , Gender, password, confirm password
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [dateOfBirth, setDateOfBirth] = React.useState('')
    // nếu mà người dùng không chọn giới tính thì mặc định giới tính là male
    const [gender, setGender] = React.useState('Nam')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const didMountRef1 = useRef(false)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const register = (e) => {
        // kiểm tra password và confirm password có giống nhau không
        // // regex cho mật khẩu có ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số

        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error(
                'Mật khẩu xác nhận không trùng khớp!!! Vui lòng nhập lại mật khẩu!!!',
            )
            return
        }
        // kiểm tra thông tin nhập vào có đầy đủ không
        if (
            firstName === '' ||
            lastName === '' ||
            phoneNumber === '' ||
            dateOfBirth === '' ||
            gender === ''
        ) {
            toast.error('Vui lòng nhập đầy đủ thông tin!!!')
            return
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (!password.match(passwordRegex)) {
            toast.error(
                'Mật khẩu phải chứa ít nhất 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường và 1 số!!!',
            )
            return
        }
        // kiểm tra năm sinh có lớn hơn năm hiện tại không
        else if (dateOfBirth > new Date()) {
            toast.error('Năm sinh không hợp lệ!!!')
            return
        } else {
            // format lại kiểu dữ liệu dateOfBirth , chỉ lấy ngày tháng năm sinh
            let date = dateOfBirth.getDate()
            let month = dateOfBirth.getMonth() + 1
            let year = dateOfBirth.getFullYear()
            const dateOfBirthFormatted = `${date}/${month}/${year}`
            axios
                .post('http://localhost:3001/account/addAccountWeb', {
                    // firstName: firstName,
                    // lastName: lastName,
                    phoneNumber: phoneNumber,
                    // dateOfBirth: dateOfBirthFormatted,
                    // gender: gender,
                    password: password,
                })
                .then((response) => {
                    if (
                        response.data.message ===
                        'Số điện thoại đã được đăng ký!!!'
                    ) {
                        toast.error('Số điện thoại đã được đăng ký!!!')
                    }
                    if (response.data.message === 'Đăng ký thành công!!!') {
                        axios
                            .post('http://localhost:3001/user/registerWeb', {
                                account_id: response.data.account_id,
                                firstName: firstName,
                                lastName: lastName,
                                phoneNumber: phoneNumber,
                                dateOfBirth: dateOfBirthFormatted,
                                gender: gender,
                                password: password,
                            })
                            .then((response) => {
                                toast.success(
                                    'Đăng ký tài khoản và user thành công!',
                                )
                                localStorage.setItem(
                                    'phoneNumber',
                                    response.data.phoneNumber,
                                )
                                // localStorage.setItem('user_id', response.data.user_id)
                                localStorage.setItem(
                                    'user_id',
                                    JSON.stringify(response.data.user_id),
                                )

                                //window.location.href = 'http://localhost:3000/receiveotp'
                                window.location.href =
                                    'http://localhost:3000/receiveOtp?type=register'
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
        <div className="contain">
            <div className="register-container">
                <div className="container">
                    <Toaster toastOptions={{ duration: 3500 }} />
                    <div className="header-re">
                        <div className="text">{action}</div>
                        <div className="subtext">
                            Tạo tài khoản chóng và dễ dàng.{' '}
                        </div>
                    </div>
                    <div className="form">
                        <div className="labelA">
                            <div className="inputA">
                                <div className="labelA">Nhập Họ</div>
                                <div className="labelAB">Nhập Tên</div>
                            </div>
                            <div className="inputA">
                                <div className="inputIA">
                                    <input
                                        type="firstname"
                                        placeholder="Nhập họ của bạn"
                                        onChange={(e) => {
                                            setFirstName(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                                register(e) // Gọi hàm register khi nhấn phím "Enter"
                                            }
                                        }}
                                    />
                                </div>
                                <div className="inputIAB">
                                    <input
                                        type="lastname"
                                        placeholder="Nhập tên của bạn"
                                        onChange={(e) => {
                                            setLastName(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                                register(e) // Gọi hàm register khi nhấn phím "Enter"
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="label">Nhập số di động </div>
                        <div className="inputI">
                            <input
                                type="numberphone"
                                placeholder="Nhập số di động"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                        register(e) // Gọi hàm register khi nhấn phím "Enter"
                                    }
                                }}
                            />
                        </div>
                        <div className="label">Nhập ngày sinh </div>
                        <div className="inputA">
                            <div className="inputB">
                                <DatePicker
                                    //showIcon
                                    placeholderText="Chọn ngày sinh "
                                    selected={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e)}
                                    dateFormat="dd/MM/yyyy"
                                    showYearDropdown
                                    // scrollYearDropdown
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                            register(e) // Gọi hàm register khi nhấn phím "Enter"
                                        }
                                    }}
                                />
                            </div>
                            <div className="inputC">
                                <div className="div-gender">
                                    <label for="select"> Giới tính </label>
                                    <select
                                        className="form-select"
                                        id="select"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                                register(e) // Gọi hàm register khi nhấn phím "Enter"
                                            }
                                        }}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="label">Nhập mật khẩu</div>
                        <div className="inputIB">
                            <input
                                // type="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                        register(e) // Gọi hàm register khi nhấn phím "Enter"
                                    }
                                }}
                            />
                            <span
                                className="span-eye"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}{' '}
                                {/* Sử dụng icon con mắt */}
                            </span>
                        </div>
                        <div className="label">Nhập lại mật khẩu </div>
                        <div className="inputIB">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nhập lại mật khẩu"
                                // set lấy giá trị confirm password
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault() // Ngăn chặn hành động mặc định của phím "Enter"
                                        register(e) // Gọi hàm register khi nhấn phím "Enter"
                                    }
                                }}
                            />
                        </div>
                        <div className="user-re">
                            <Button
                                onClick={(e) => {
                                    register(e)
                                }}
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                                color="success"
                            >
                                Đăng ký
                            </Button>
                            {/* <div className="col-xl-12 col-md-10 col-sm-12 col-12"> */}

                            {/* <div
                className={action === 'Register' ? 'button blue' : 'button'}
                onClick={(e) => {
                  register(e)
                  setAction('Register')
                }}
              >
                Register
              </div> */}
                            {/* </div> */}
                        </div>
                        <div className="form-group user-register">
                            <div className="col-xl-12 col-md-10 col-sm-12 col-12 ">
                                <br />
                                Bạn đã có tài khoản ?{' '}
                                <b className="login-style">
                                    <a href="/login"> Đăng Nhập</a>
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
