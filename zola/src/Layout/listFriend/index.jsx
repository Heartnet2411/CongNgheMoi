import SideBar from '../Dashboard/sideBar/index.jsx'
import MainFriend from './mainFriend.jsx'
import SideBarFriend from './sideBarFriend.jsx'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import Skeleton from 'react-loading-skeleton'
const ListFriend = () => {
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
      {user ? <SideBar user={user} /> : <Skeleton count={5} />}
      <SideBarFriend />
      <MainFriend />
    </div>
  )
}

export default ListFriend
