import React from 'react'
import { ImCircleUp } from 'react-icons/im'
import { ImCircleDown } from 'react-icons/im'
import { BsStopwatch } from 'react-icons/bs'
import { BsPeople } from 'react-icons/bs'
import { CiBellOn } from 'react-icons/ci'
import { TfiPinAlt } from 'react-icons/tfi'
import { AiOutlineEdit } from 'react-icons/ai'
const ConversationDetail = () => {
  const [isPhotoVidOpen, setPhotoVidOpen] = React.useState(true)
  const [isFileOpen, setFileOpen] = React.useState(true)
  const [isLinkOpen, setLinkOpen] = React.useState(true)
  return (
    <div
      style={{
        width: 280,
        height: '94.5%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: '',
        alignItems: 'center',
        gap: 10,
        padding: 20
      }}
    >
      <label
        style={{
          fontSize: 18,
          fontWeight: 'bold'
        }}
      >
        Thông tin hội thoại
      </label>

      <div>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="demo"
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            backgroundColor: 'grey',
            marginTop: 15
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <label
          style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}
        >
          Nguyen Thuy Tinh
        </label>
        <label
          style={{
            width: 25,
            height: 25,
            borderRadius: 100,
            backgroundColor: 'whitesmoke',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <AiOutlineEdit size="1.4rem" />
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 20,
          padding: 15
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <label
            style={{
              width: 33,
              height: 33,
              borderRadius: 100,
              backgroundColor: 'whitesmoke',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <BsPeople size="1.7rem" />
          </label>
          <label style={{ fontSize: 14 }}>Tạo nhóm</label>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <label
            style={{
              width: 33,
              height: 33,
              borderRadius: 100,
              backgroundColor: 'whitesmoke',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CiBellOn size="1.7rem" />
          </label>
          <label style={{ fontSize: 14 }}>Tắt thông báo</label>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <label
            style={{
              width: 33,
              height: 33,
              borderRadius: 100,
              backgroundColor: 'whitesmoke',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TfiPinAlt size="1.5rem" />
          </label>
          <label style={{ fontSize: 14 }}>Ghim</label>
        </div>
      </div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'whitesmoke'
        }}
      ></div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'whitesmoke',
          display: 'flex',
          gap: 10
        }}
      >
        <label>
          <BsStopwatch size="1.3rem" />
        </label>
        <label>Danh sách nhắc hẹn</label>
      </div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'whitesmoke',
          display: 'flex',
          gap: 10,
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>Ảnh/Video</label>
          {isPhotoVidOpen ? (
            <label
              onClick={() => {
                setPhotoVidOpen(!isPhotoVidOpen)
              }}
            >
              <ImCircleUp size="1rem" />
            </label>
          ) : (
            <label
              onClick={() => {
                setPhotoVidOpen(!isPhotoVidOpen)
              }}
            >
              <ImCircleDown size="1rem" />
            </label>
          )}
        </div>
        {isPhotoVidOpen && <div> Danh sách ảnh và video</div>}
      </div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'whitesmoke',
          display: 'flex',
          gap: 10,
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>File</label>
          {isFileOpen ? (
            <label
              onClick={() => {
                setFileOpen(!isFileOpen)
              }}
            >
              <ImCircleUp size="1rem" />
            </label>
          ) : (
            <label
              onClick={() => {
                setFileOpen(!isFileOpen)
              }}
            >
              <ImCircleDown size="1rem" />
            </label>
          )}
        </div>
        {isFileOpen && <div>Danh sách file</div>}
      </div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'whitesmoke',
          display: 'flex',
          gap: 10,
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>Links</label>
          {isLinkOpen ? (
            <label
              onClick={() => {
                setLinkOpen(!isLinkOpen)
              }}
            >
              <ImCircleUp size="1rem" />
            </label>
          ) : (
            <label
              onClick={() => {
                setLinkOpen(!isLinkOpen)
              }}
            >
              <ImCircleDown size="1rem" />
            </label>
          )}
        </div>
        {isLinkOpen && <div>Danh sách link</div>}
      </div>
      <div></div>
    </div>
  )
}

export default ConversationDetail
