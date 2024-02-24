import React from 'react'
import './Home.css'
import chat1 from '../Assets/chat.png'
import people from '../Assets/people.png'
import cloud from '../Assets/cloud.png'
import setting from '../Assets/setting.png'
import find from '../Assets/find.png'
import add from '../Assets/add.png'
import adds from '../Assets/adds.png'
export const Home = () => {
  return (
    <div className="container1">
      <div className="header1">
        <div className="subtext">Zalo - </div>
      </div>
      <div className="main">
        <div className="icon">
          <img
            src={chat1}
            alt="Chat Icon"
            style={{ width: '35px', height: '35px', marginTop: '25px' }}
          />

          <img
            src={chat1}
            alt=""
            style={{ width: '30px', height: '30px', marginTop: '30px' }}
          />
          <img
            src={people}
            alt=""
            style={{ width: '25px', height: '25px', marginTop: '30px' }}
          />
          <img
            src={cloud}
            alt=""
            style={{ width: '32px', height: '32px', marginTop: '30px' }}
          />
          <img
            src={setting}
            alt=""
            style={{ width: '35px', height: '35px', marginTop: '400px' }}
          />
        </div>
        <div className="people">
          <div className="search">
            <img
              src={find}
              alt=""
              style={{
                width: '20px',
                height: '20px',
                marginTop: '15px',
                marginLeft: '5px'
              }}
            />
            <input
              type="text"
              placeholder="Search"
              style={{
                width: '200px',
                height: '25px',
                marginTop: '10px',
                marginLeft: '10px'
              }}
            />
            <img
              src={add}
              alt=""
              style={{
                width: '20px',
                height: '20px',
                marginTop: '15px',
                marginLeft: '15px'
              }}
            />
            <img
              src={adds}
              alt=""
              style={{
                width: '20px',
                height: '20px',
                marginTop: '15px',
                marginLeft: '15px'
              }}
            />
          </div>

          <div className="nameP"></div>
        </div>
        <div className="chat">
          <div className="name"></div>
        </div>
        <div className="info"></div>
      </div>
    </div>
  )
}
