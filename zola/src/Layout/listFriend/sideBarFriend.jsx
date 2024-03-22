import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsPersonLinesFill } from 'react-icons/bs'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { IoPeopleOutline } from 'react-icons/io5'
import { CiMail } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
const SideBarFriend = () => {
  const navigate = useNavigate()
  const handleteam = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/teamlist')
  }
  const handlerequest = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/requestlist')
  }
  const handleListFriend = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/listFriend')
  }
  return (
    <div style={{ width: 350, height: '106.3%', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', gap: 10, marginTop: 20, height: 50 }}>
        <input
          style={{
            width: '60%',
            height: 20,
            alignItems: 'center',
            backgroundColor: 'whitesmoke',
            borderRadius: 10,
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
        <button
          style={{
            border: 'none',
            backgroundColor: 'white',
            display: 'flex',
            gap: 10
          }}
          onClick={handleListFriend}
        >
          <label>
            <BsPersonLinesFill size="1.3rem" />
          </label>
          <label
            style={{
              color: 'black',
              fontSize: 15
            }}
          >
            Danh sách bạn bè
          </label>
        </button>
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
        <button
          style={{
            border: 'none',
            backgroundColor: 'white',
            display: 'flex',
            gap: 10
          }}
          onClick={handleteam}
        >
          <label>
            <IoPeopleOutline size="1.5rem" />
          </label>
          <label
            style={{
              color: 'black',
              fontSize: 15
            }}
          >
            Danh sách nhóm
          </label>
        </button>
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
        <button
          style={{
            border: 'none',
            backgroundColor: 'white',
            display: 'flex',
            gap: 10
          }}
          onClick={handlerequest}
        >
          <label>
            <CiMail size="1.5rem" />
          </label>
          <label
            style={{
              color: 'black',
              fontSize: 15
            }}
          >
            Lời mời kết bạn
          </label>
        </button>
      </div>
    </div>
  )
}

export default SideBarFriend
