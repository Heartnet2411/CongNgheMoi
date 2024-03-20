import './App.css'
import { Login } from './Layout/Login/Login'
import { Register } from './Layout/Login/Register'
import DashBoard from './Layout/Dashboard/index'
import ListFriend from './Layout/listFriend'
import Cloud from './Layout/Cloud/index'
import { Route } from 'react-router-dom'

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Register /> */}
      <DashBoard />

      {/* <ListFriend /> */}
      {/* <Cloud /> */}
    </div>
  )
}

export default App
