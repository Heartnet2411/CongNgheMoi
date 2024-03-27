import Main from './main'
import SideBar from './sideBar'
import SubSideBar from './subSideBar'
import Wait from '../Dashboard/main/wait'
import React, { useState, useEffect, useRef } from 'react'

const DashBoardWait = () => {
  const [user, setUser] = useState('')
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    const userinfor = localStorage.getItem('user')
    setUser(JSON.parse(userinfor))
  }, [])
  console.log('user: ' + JSON.stringify(user))
  // Nếu user chưa có giá trị, không render gì cả
  if (!user) {
    return null
  }
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <SideBar user={user} />
      <SubSideBar />
      <Wait />
      {/* <Main /> */}
    </div>
  )
}

export default DashBoardWait
