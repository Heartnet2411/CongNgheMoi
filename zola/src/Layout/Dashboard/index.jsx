import Main from './main'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import SideBar from './sideBar'
import SubSideBar from './subSideBar'
import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import Skeleton from 'react-loading-skeleton' // Import component Skeleton
import Wait from '../Dashboard/main/wait'

import { Suspense, lazy } from 'react'
const DashBoard = () => {
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
      <Toaster toastOptions={{ duration: 3500 }} />
      {/* <SideBar user={user} /> */}
      {/* Hiển thị SideBar với dữ liệu người dùng nếu nó đã được tải, nếu không hiển thị một skeleton */}
      {/* {user ? <SideBar user={user} /> : <Skeleton count={5} />} */}
      <SideBar user={user} />
      <SubSideBar />
      {/* <Wait /> */}
      <Main />
    </div>
  )
}

export default DashBoard
