import { PiChatCircleText } from 'react-icons/pi'
import { BsPersonLinesFill } from 'react-icons/bs'
import { CiCloudOn } from 'react-icons/ci'
import { Link, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IoSettingsOutline } from 'react-icons/io5'
const SideBar = () => {
  const navigate = useNavigate()
  const handleCloud = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/cloud')
  }
  const handleDashboard = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/dashboard')
  }
  const handleListFriend = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/listFriend')
  }

  return (
    <div
      style={{
        width: 90,
        height: '106.3%',
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="demo"
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: 'grey',
          }}
        />
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: 'white',
              fontSize: 20,
            }}
            onClick={handleDashboard}
          >
            <PiChatCircleText size="2rem" />
          </button>
        </div>
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: 'white',
              fontSize: 20,
            }}
            onClick={handleListFriend}
          >
            <BsPersonLinesFill size="2rem" />
          </button>
        </div>
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: 'white',
              fontSize: 20,
            }}
            onClick={handleCloud}
          >
            <CiCloudOn size="2.2rem" />
          </button>
        </div>
      </div>
      <div>
        {' '}
        <IoSettingsOutline size="2rem" />
      </div>
    </div>
  )
}

export default SideBar
