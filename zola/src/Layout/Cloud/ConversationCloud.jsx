import React from 'react'
import { ImCircleUp } from 'react-icons/im'
import { ImCircleDown } from 'react-icons/im'
import { BsStopwatch } from 'react-icons/bs'
import { BsPeople } from 'react-icons/bs'
import { CiBellOn } from 'react-icons/ci'
import { TfiPinAlt } from 'react-icons/tfi'
import { AiOutlineEdit } from 'react-icons/ai'
import cloud from '../../Assets/cloud.png'
const ConversationCloud = () => {
  const [isPhotoVidOpen, setPhotoVidOpen] = React.useState(true)
  const [isFileOpen, setFileOpen] = React.useState(true)
  const [isLinkOpen, setLinkOpen] = React.useState(true)
  return (
    <div
      style={{
        width: 280,
        height: '94.5%',
        backgroundColor: 'whitesmoke',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: '',
        alignItems: 'center',
        gap: 10,
        padding: 20
      }}
    >
      Thông tin hội thoại
      <div>
        <img
          src={cloud}
          alt="cloud"
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            backgroundColor: 'white'
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
          Cloud của tôi
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 20,
          padding: 5
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
              fontSize: 14,
              color: 'grey',
              alignContent: 'center',
              textAlign: 'center'
            }}
          >
            Lưu trữ và truy cập nhanh những nội dung quan trọng cuả bạn ngay
            trên Zola
          </label>
        </div>
      </div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'lightgrey'
        }}
      ></div>
      <div
        style={{
          width: 320,
          borderBottomWidth: 3,
          borderBottomStyle: 'solid',
          borderBottomColor: 'lightgrey',
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
          borderBottomColor: 'lightgrey',
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
          borderBottomColor: 'lightgrey',
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
          borderBottomColor: 'lightgrey',
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

export default ConversationCloud
