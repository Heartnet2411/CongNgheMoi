import SideBar from '../Dashboard/sideBar/index.jsx'
import MainFriend from './mainFriend.jsx'
import SideBarFriend from './sideBarFriend.jsx'

const ListFriend = () => {
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
      <MainFriend />
    </div>
  )
}

export default ListFriend
