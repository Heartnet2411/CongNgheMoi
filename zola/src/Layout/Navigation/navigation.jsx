import React from 'react'
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom'
import DashBoard from '../Dashboard'
import ListFriend from '../listFriend'
import { PiChatCircleText } from 'react-icons/pi'
import { BsPersonLinesFill } from 'react-icons/bs'

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <PiChatCircleText />
          </Link>
        </li>
        <li>
          <Link to="/list">
            <BsPersonLinesFill />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Navigation
