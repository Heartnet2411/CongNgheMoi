import MainCloud from './main.jsx'
import SideBar from '../Dashboard/sideBar/index.jsx'
import SubSideBar from '../Dashboard/subSideBar/index.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const Cloud = () => {
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
      <MainCloud />
    </div>
  )
}

export default Cloud
