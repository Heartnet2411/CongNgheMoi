import React from 'react'
import ConversationDetail from './ConversationDetail'
import { BsCodeSquare } from 'react-icons/bs'
import { CiVideoOn } from 'react-icons/ci'
import { IoCallOutline } from 'react-icons/io5'
import { IoMdSend } from 'react-icons/io'
import { MdOutlineAddReaction } from 'react-icons/md'
import { ImAttachment } from 'react-icons/im'
import { SlLike } from 'react-icons/sl'
const Main = () => {
  const [openDrawer, setOpenDrawer] = React.useState(true)
  const [isSend, setSend] = React.useState(true)
  return (
    <div
      style={{
        width: '100%',
        height: '106.3%',
        backgroundColor: 'lightgrey',
        display: 'flex'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 15,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="image"
              style={{
                margin: 10,
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: 'grey'
              }}
            />
            <label
              style={{
                fontSize: 18,
                fontWeight: 'bold'
              }}
            >
              Nguyen Thuy Tinh
            </label>
          </div>

          <div style={{ display: 'flex', gap: 15 }}>
            <div>
              <IoCallOutline size="1.6rem" />
            </div>
            <div>
              <CiVideoOn size="1.6rem" />
            </div>
            <div
              onClick={() => {
                setOpenDrawer(!openDrawer)
              }}
              style={{
                backgroundColor: openDrawer === true ? 'white' : 'white'
              }}
            >
              <BsCodeSquare size="1.6rem" />
            </div>
          </div>
        </div>
        <div></div>
        <div
          style={{
            width: '100%',
            height: 70,
            backgroundColor: 'white',
            display: 'flex',
            gap: 20,
            alignItems: 'center'
          }}
        >
          <input
            style={{
              width: '80%',
              height: 60,
              alignItems: 'center',
              backgroundColor: 'white',
              borderStyle: 'none',
              border: 'none',
              outline: 'none',
              marginLeft: 10
            }}
            type="tin nhan"
            placeholder="Nhap tin nhan "
          />
          <ImAttachment size="1.4rem" />
          <MdOutlineAddReaction size="1.5rem" />

          {isSend ? (
            <label
              onClick={() => {
                setSend(!isSend)
              }}
            >
              GỬI
            </label>
          ) : (
            <label
              onClick={() => {
                setSend(!isSend)
              }}
            >
              <SlLike size="1.5rem" />
            </label>
          )}
        </div>
      </div>

      {openDrawer === true && (
        <div>
          <ConversationDetail />
        </div>
      )}
    </div>
  )
}

export default Main
