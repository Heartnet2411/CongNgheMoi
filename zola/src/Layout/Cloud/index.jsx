import MainCloud from './main.jsx'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SideBar from '../Dashboard/sideBar/index.jsx'
import SubSideBar from '../Dashboard/subSideBar/index.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'
import Skeleton from 'react-loading-skeleton'
const Cloud = () => {
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
      {/* {user ? <SideBar user={user} /> : <Skeleton count={5} />} */}
      <SideBar user={user} />
      <SubSideBar />
      <MainCloud />
    </div>
  )
}

export default Cloud
