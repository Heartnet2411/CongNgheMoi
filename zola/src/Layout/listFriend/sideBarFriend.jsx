import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsPersonLinesFill } from 'react-icons/bs'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { IoPeopleOutline } from 'react-icons/io5'
import { CiMail } from 'react-icons/ci'
const SideBarFriend = () => {
  return (
    <div
      style={{ width: 300, height: '106.3%', backgroundColor: 'whitesmoke' }}
    >
      <div style={{ display: 'flex', gap: 10, marginTop: 20, height: 50 }}>
        <input
          style={{
            width: '60%',
            height: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 10
          }}
          type="text"
          placeholder="Search "
        />
        <AiOutlineUserAdd size="1.6rem" />
        <AiOutlineUsergroupAdd size="1.6rem" />
      </div>
      <div
        style={{
          width: '100%',
          height: 50,
          display: 'flex',
          gap: 10,
          marginLeft: 10
        }}
      >
        <label>
          <BsPersonLinesFill size="1.3rem" />
        </label>
        <label>Danh sách bạn bè</label>
      </div>
      <div
        style={{
          width: '100%',
          height: 50,
          display: 'flex',
          gap: 10,
          marginLeft: 10
        }}
      >
        <label>
          <IoPeopleOutline size="1.3rem" />
        </label>
        <label>Danh sách nhóm</label>
      </div>
      <div
        style={{
          width: '100%',
          height: 50,
          display: 'flex',
          gap: 10,
          marginLeft: 10
        }}
      >
        <label>
          <CiMail size="1.3rem" />
        </label>
        <label>Lời mời kết bạn</label>
      </div>
    </div>
  )
}

export default SideBarFriend
