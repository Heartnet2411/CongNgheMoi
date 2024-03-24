import Main from './main'
import SideBar from './sideBar'
import SubSideBar from './subSideBar'

const DashBoard = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '94vh',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <SideBar />
      <SubSideBar />
      <Main />
    </div>
  )
}

export default DashBoard
