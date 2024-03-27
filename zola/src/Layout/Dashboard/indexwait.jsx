import Main from './main'
import SideBar from './sideBar'
import SubSideBar from './subSideBar'
import Wait from '../Dashboard/main/wait'

const DashBoardWait = () => {
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
      <SubSideBar />
      <Wait />
      {/* <Main /> */}
    </div>
  )
}

export default DashBoardWait
