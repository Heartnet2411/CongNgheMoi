import React, { useState, useEffect } from 'react'
import './Home.css'
import chat1 from '../Assets/chat.png'
import people from '../Assets/people.png'
import cloud from '../Assets/cloud.png'
import setting from '../Assets/setting.png'
import find from '../Assets/find.png'
import add from '../Assets/add.png'
import adds from '../Assets/adds.png'
import dinhkem from '../Assets/dinhkem.png'
import send from '../Assets/send.png'
export const Home = ({ userId, alt, size }) => {
  const [avatarUrl, setAvatarUrl] = useState('')
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(
          `https://cdn.mos.cms.futurecdn.net/JvAPvpMvwgdfm2QVWoLiYS.jpg`
        )
        if (response.ok) {
          const data = await response.json()
          setAvatarUrl(data.avatarUrl)
        } else {
          throw new Error('Failed to fetch avatar')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchAvatar()
  }, [userId])
  return (
    <div className="container1">
      <div className="header1">
        <div className="subtext">Zalo - </div>
      </div>
      <div className="main">
        <div className="icon">
          <div className={`avata ${size}`}>
            <img src={avatarUrl} alt={alt} className="avata-img" />
          </div>

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

          <div className="nameP">
            <div className="peopleChat">
              <div className={`avatar ${size}`}>
                <img src={avatarUrl} alt={alt} className="avatar-img" />
              </div>
              <div className="textDoi">
                <div className="text2">Nguyen Thuy Tinh</div>
                <div className="text3">Xin chao</div>
              </div>
            </div>
            <div className="peopleChat">
              <div className={`avatar ${size}`}>
                <img src={avatarUrl} alt={alt} className="avatar-img" />
              </div>
              <div className="textDoi">
                <div className="text2">Nguyen Thuy Tinh</div>
                <div className="text3">Xin chao</div>
              </div>
            </div>
          </div>
        </div>
        <div className="chat">
          <div className="name">
            <div className={`avatar ${size}`}>
              <img src={avatarUrl} alt={alt} className="avatar-img" />
            </div>
            <div className="text1">Nguyen Thuy Tinh</div>
          </div>
          <div className="chat1">
            <div className="input1">
              <input
                type="tin nhan"
                placeholder="Nhap tin nhan                                 "
              />
            </div>
            <img
              src={dinhkem}
              alt=""
              style={{
                width: '25px',
                height: '25px',
                marginTop: '10px',
                marginLeft: '20px'
              }}
            />
            <img
              src={send}
              alt=""
              style={{
                width: '25px',
                height: '25px',
                marginTop: '10px',
                marginLeft: '20px'
              }}
            />
          </div>
        </div>
        <div className="info">
          <div className="textinf1">
            <div className="textinf">Thông tin hội thoại</div>
          </div>

          <div className={`avatar1 ${size}`}>
            <img src={avatarUrl} alt={alt} className="avatar-img1" />
          </div>
          <div className="textinfo">Nguyen Thuy Tinh</div>
          <div className="textin">
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
            <div className="textin1">Tạo nhóm trò chuyện</div>
          </div>
        </div>
      </div>
    </div>
  )
}
