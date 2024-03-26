import MainCloud from './main.jsx'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import SideBar from '../Dashboard/sideBar/index.jsx'
import SubSideBar from '../Dashboard/subSideBar/index.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'
const Cloud = () => {
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(true) // Thêm state để theo dõi trạng thái loading
  const didMountRef = useRef(false)
  const account_id = localStorage.getItem('account_id')
  // alert('account_id: ' + account_id)
  useEffect(() => {
    // hàm này để cho nó chạy 1 lần duy nhất khi component được render
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    setIsLoading(true) // Bắt đầu loading khi gửi yêu cầu lấy dữ liệu user
    // Gọi API để lấy dữ liệu người dùng khi trang được load
    axios
      .post('http://localhost:3001/user/findUser', { account_id: account_id })
      .then((response) => {
        // Lưu dữ liệu người dùng vào state
        setIsLoading(false) // Kết thúc loading khi nhận được dữ liệu user
        setIsLoading(false) // Kết thúc loading nếu có lỗi
        setUser(response.data.user)
        toast.success('Lấy dữ liệu người dùng thành công!!!')
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }, [])
  //alert('user: ' + JSON.stringify(user))
  console.log('user: ' + JSON.stringify(user))
  // Kiểm tra nếu đang loading, có thể hiển thị một loading spinner hoặc placeholder
  if (isLoading) {
    return <div>Loading...</div>
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
      <MainCloud />
    </div>
  )
}

export default Cloud
