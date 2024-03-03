import React, { useState, useEffect } from 'react'
import './Home.css'
import { BsChatDots } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import { PiChatCircleText } from 'react-icons/pi'
import { CiCloudOn } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'
import { CiSearch } from 'react-icons/ci'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import { BsFillFilePersonFill } from 'react-icons/bs'
import { MdPeopleOutline } from 'react-icons/md'
import demo from '../Assets/demo.png'
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
    <div className="container11">
      <div className="header11">
        <div className="subtext">Zalo - </div>
      </div>
      <div className="main">
        <div className="row">
          <div className="col-sm-auto min-vh-100 bg-light d-flex">
            {/* <div className={`avata ${size}`}>
              <img src={avatarUrl} alt={alt} className="avata-img" />
            </div> */}
            <div className={`avata ${size}`}>
              <img src={demo} alt={demo} className="avata-img" />
            </div>
            <p>
              <PiChatCircleText size="2rem" />{' '}
            </p>
            <p>
              <BsFillFilePersonFill size="2rem" />
            </p>
            <p>
              <CiCloudOn size="2rem" />
            </p>
          </div>
          <p>
            <IoSettingsOutline size="2rem" />
          </p>
        </div>

        <div className="people">
          <div className="search">
            <m>
              <CiSearch size="1.5rem" />
            </m>
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
            <m>
              <MdOutlinePersonAddAlt1 size="1.5rem" />
            </m>
            <m>
              <MdPeopleOutline size="1.8rem" />
            </m>
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
            <div className="inputchat">
              <input
                type="tin nhan"
                placeholder="Nhap tin nhan                                 "
              />
            </div>
            <t>
              <ImAttachment size="1.3rem" />
            </t>
            <t>
              <IoMdSend size="1.3rem" />
            </t>
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
            <v>
              <MdPeopleOutline size="1.8rem" />
            </v>
            <div className="textin1">Tạo nhóm trò chuyện</div>
          </div>
        </div>
      </div>
    </div>
  )
}
