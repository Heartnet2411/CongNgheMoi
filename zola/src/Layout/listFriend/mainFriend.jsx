import { BsPersonLinesFill } from 'react-icons/bs'
const MainFriend = () => {
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
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 20
            }}
          >
            <label>
              <BsPersonLinesFill size="1.3rem" />
            </label>
            <label
              style={{
                fontSize: 18
              }}
            >
              Danh sách bạn bè
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainFriend
