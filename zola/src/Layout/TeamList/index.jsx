import SideBar from '../Dashboard/sideBar/index.jsx'
import Team from '../TeamList/teamlist.jsx'
import SideBarFriend from '../ListFriend/sideBarFriend.jsx'

const TeamList = () => {
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
      <Team />
    </div>
  )
}

export default TeamList
