import { AiOutlineUserAdd } from 'react-icons/ai'
import { GrSearch } from 'react-icons/gr'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import React, { useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const SubSideBar = () => {
  const navigate = useNavigate()
  const handleDashboard = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/dashboard')
  }
  const handleInputChange = (event) => {
    const searchValue = event.target.value

    if (searchValue.length >= 10) {
      console.log('searchValue: ', searchValue)
      axios
        .post('http://localhost:3001/user/findUserByPhoneWeb', {
          phoneNumber: searchValue,
        })
        .then((res) => {
          if (res.data.message === 'Không tìm thấy user!!!') {
            toast.error('Số điện thoại chưa được đăng ký!!!')
            return
          }
          if (res.data.message === 'Tìm user thành công!!!') {
            toast.success('Tìm user thành công!!!')
            // lưu thông tin user vào localStorage
            localStorage.setItem(
              'userFindBySearch',
              JSON.stringify(res.data.user)
            )
          }
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    }
  }

  return (
    <div style={{ width: '25%', height: '100%', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', gap: 10, marginTop: 25, height: '3%' }}>
        <Toaster toastOptions={{ duration: 3500 }} />
        <div
          style={{
            display: 'flex',
            height: '100%',
            backgroundColor: 'whitesmoke',
            width: '100%',
            marginLeft: 20,
            borderRadius: 10,
            gap: 5,
            border: '1px solid black',
          }}
        >
          <div style={{ marginLeft: 10, marginTop: 2 }}>
            <GrSearch size="1rem" />
          </div>

          <input
            style={{
              width: '100%',
              height: '90%',
              alignItems: 'center',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: 'none',
              backgroundColor: 'whitesmoke',
              outline: 'none',
            }}
            type="text"
            placeholder="Tìm kiếm "
            // value={searchValue}
            onChange={handleInputChange}
          />
        </div>

        <AiOutlineUserAdd size="1.6rem" />
        <AiOutlineUsergroupAdd size="1.6rem" />
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: 10,

          marginTop: 20,
        }}
      >
        <button
          style={{
            border: 'none',
            backgroundColor: 'whitesmoke',
            display: 'flex',
            gap: 10,
            width: '100%',
            height: 55,
            alignItems: 'center',
          }}
          onClick={handleDashboard}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="demo"
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: 'grey',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <label
              style={{
                color: 'black',
                fontSize: 15,
              }}
            >
              Nguyen Thuy Tinh
            </label>
            <label
              style={{
                color: 'grey',
                fontSize: 13,
              }}
            >
              Xin chao ban
            </label>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SubSideBar
