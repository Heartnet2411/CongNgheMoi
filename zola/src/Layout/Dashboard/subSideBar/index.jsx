import { AiOutlineUserAdd } from 'react-icons/ai'
import { GrSearch } from 'react-icons/gr'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
const SubSideBar = () => {
  return (
    <div style={{ width: 350, height: '106.3%', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', gap: 10, marginTop: 25 }}>
        <input
          style={{
            width: '60%',
            height: 20,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'whitesmoke',
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
          height: 55,
          display: 'flex',
          gap: 10,

          marginTop: 20
        }}
      >
        <button
          style={{
            border: 'none',
            backgroundColor: 'whitesmoke',
            display: 'flex',
            gap: 10,
            width: '100%',
            height: 55,
            alignItems: 'center'
          }}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="demo"
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: 'grey'
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5
            }}
          >
            <label
              style={{
                color: 'black',
                fontSize: 15
              }}
            >
              Nguyen Thuy Tinh
            </label>
            <label
              style={{
                color: 'grey',
                fontSize: 13
              }}
            >
              Xin chao ban
            </label>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SubSideBar
