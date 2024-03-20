import { PiChatCircleText } from 'react-icons/pi'
import { BsPersonLinesFill } from 'react-icons/bs'
import { CiCloudOn } from 'react-icons/ci'
import { Link, Route } from 'react-router-dom'
import Cloud from '../../Cloud/index'
import { IoSettingsOutline } from 'react-icons/io5'
const SideBar = () => {
  return (
    <div
      style={{
        width: 70,
        height: '106.3%',
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20
        }}
      >
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="demo"
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: 'grey'
          }}
        />
        <div>
          <PiChatCircleText size="2rem" />
        </div>
        <div>
          <BsPersonLinesFill size="2rem" />
        </div>
        <div>
          <CiCloudOn size="2rem" />
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
