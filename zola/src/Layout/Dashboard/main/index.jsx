import React from 'react'
import ConversationDetail from './ConversationDetail'
import { BsCodeSquare } from 'react-icons/bs'
import { CiVideoOn } from 'react-icons/ci'
import { IoCallOutline } from 'react-icons/io5'
import { IoMdSend } from 'react-icons/io'
import { MdOutlineAddReaction } from 'react-icons/md'
import { TbMessage2Bolt } from 'react-icons/tb'
import { ImAttachment } from 'react-icons/im'
import { FiAtSign } from 'react-icons/fi'
import { CiImageOn } from 'react-icons/ci'
import { LuSticker } from 'react-icons/lu'
import { TbCapture } from 'react-icons/tb'
import { TiBusinessCard } from 'react-icons/ti'
import { LuAlarmClock } from 'react-icons/lu'
import { SlLike } from 'react-icons/sl'
import { SlPicture } from 'react-icons/sl'
import { MdFormatColorText } from 'react-icons/md'
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md'
import { MdOutlinePriorityHigh } from 'react-icons/md'
const Main = () => {
  const [openDrawer, setOpenDrawer] = React.useState(true)
  const [isSend, setSend] = React.useState(true)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
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
            height: '13%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',

              marginTop: 5,
              alignContent: 'space-between',
              width: '100%',
              height: '40%',
              borderBottom: '1px solid lightgrey'
            }}
          >
            <div
              style={{
                marginLeft: 10,
                gap: 20,
                marginBottom: 5,
                display: 'flex',
                color: 'black'
              }}
            >
              <LuSticker size="1.4rem" />

              <SlPicture size="1.4rem" />

              <ImAttachment size="1.3rem" />
              <TbCapture size="1.4rem" />
              <TiBusinessCard size="1.4rem" />
              <LuAlarmClock size="1.4rem" />
              <MdOutlineAssignmentTurnedIn size="1.4rem" />
              <MdFormatColorText size="1.4rem" />
              <MdOutlinePriorityHigh size="1.4rem" />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 3,
              width: '95%',
              height: '95%',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <input
              style={{
                width: '85%',
                height: '85%',
                alignItems: 'center',
                backgroundColor: 'white',
                borderStyle: 'none',
                border: 'none',
                outline: 'none'
              }}
              type="tin nhan"
              placeholder="Nhập @, tin nhắn tới  "
            />
            <TbMessage2Bolt size="1.3rem" />
            <MdOutlineAddReaction size="1.3rem" />
            <FiAtSign size="1.3rem" />

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
                <SlLike size="1.2rem" />
              </label>
            )}
          </div>
        </div>
      </div>

      {openDrawer === true && <ConversationDetail />}
    </div>
  )
}

export default Main
