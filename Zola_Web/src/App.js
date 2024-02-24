import './App.css'
import { Home } from './Components/Home/Home'
import { Login } from './Components/Login/Login'
import { Login_Demo } from './Components/Login/Login_Demo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Login_Demo />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
