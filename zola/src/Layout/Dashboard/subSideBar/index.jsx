import { AiOutlineUserAdd } from 'react-icons/ai'
import { GrSearch } from 'react-icons/gr'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
const SubSideBar = () => {
  return (
    <div
      style={{ width: 300, height: '106.3%', backgroundColor: 'whitesmoke' }}
    >
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
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
    </div>
  )
}

export default SubSideBar
