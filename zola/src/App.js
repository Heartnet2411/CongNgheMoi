import { Login } from './Layout/Login/Login'
import { Register } from './Layout/Login/Register'
import DashBoard from './Layout/Dashboard/index'
import ListFriend from './Layout/ListFriend/index'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes
} from 'react-router-dom'
import Cloud from './Layout/Cloud/index'
import Navigation from './Layout/Navigation/navigation'

function App() {
  // return <Login />
  return (
    <div>
      <Navigation />
    </div>
  )
}

export default App
