import React, { useState } from 'react'
import SideBar from '../Dashboard/sideBar/index.jsx'
import SideBarFriend from '../ListFriend/sideBarFriend.jsx'
import { CiMail } from 'react-icons/ci'
const FriendRQ = () => {
  const [names, setNames] = useState([])
  const sortNames = () => {
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b))
    setNames(sortedNames)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '106.3%',
        backgroundColor: 'lightgrey'
      }}
    >
      <div
        style={{
          width: '100%',
          height: 70,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 20
          }}
        >
          <label>
            <CiMail size="1.5rem" />
          </label>
          <label
            style={{
              fontSize: 18
            }}
          >
            Lời mời kết bạn
          </label>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: 60,
          backgroundColor: 'lightgrey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <label style={{ fontSize: 15, marginLeft: 15 }}>
          Lời mời đã nhận ( )
        </label>
      </div>
      <div
        style={{
          width: '98%',
          height: 610,
          backgroundColor: 'white',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 50,
            display: 'flex',
            gap: 10,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        ></div>
      </div>
    </div>
  )
}
export default FriendRQ
