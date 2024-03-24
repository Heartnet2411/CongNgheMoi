import SideBar from '../Dashboard/sideBar/index.jsx'
import FriendRQ from './friendrequest.jsx'
import SideBarFriend from '../ListFriend/sideBarFriend.jsx'

const FriendRequest = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <SideBar />
      <SideBarFriend />
      <FriendRQ />
    </div>
  )
}

export default FriendRequest
