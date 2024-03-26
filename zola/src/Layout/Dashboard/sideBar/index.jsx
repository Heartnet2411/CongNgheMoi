import { PiChatCircleText } from 'react-icons/pi'
import { BsPersonLinesFill } from 'react-icons/bs'
import { CiCloudOn } from 'react-icons/ci'
import { CiMail } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { IoSettingsOutline } from 'react-icons/io5'
import { useState } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import { FiDatabase } from 'react-icons/fi'
import { FiTool } from 'react-icons/fi'
import { MdOutlineLanguage } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { CiCamera } from 'react-icons/ci'
import Popup from '../sideBar/popup'
import demo from '../../../Assets/demo.jpg'
import { IoIosArrowForward } from 'react-icons/io'
const SideBar = () => {
  const navigate = useNavigate()
  const handleCloud = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/cloud')
  }
  const handleDashboard = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/dashboard')
  }
  const handleListFriend = () => {
    // Thực hiện chuyển hướng khi người dùng nhấp vào biểu tượng
    navigate('/listFriend')
  }

  const [open, setOpen] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const [openInfoMe, setOpenInfoMe] = useState(false)

  return (
    <div
      style={{
        width: '6%',
        height: '100%',
        backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            backgroundColor: 'blue',
            border: 'none',
            color: 'white',
            fontSize: 20,
          }}
          onClick={() => {
            setOpenInfo(!openInfo)
          }}
        >
          {' '}
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="demo"
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              backgroundColor: 'grey',
            }}
          />
        </div>
        {openInfo && (
          <div
            style={{
              position: 'absolute',
              left: '4.6%',
              top: '2%',
              background: 'whitesmoke',
              height: '10rem',
              width: '16rem',
            }}
          >
            <div>
              <div
                style={{
                  width: '90%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                  marginLeft: 10,
                  marginTop: 10,
                  borderBottom: '1px solid lightgrey',
                }}
              >
                <label
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginLeft: 10,
                  }}
                >
                  Nguyen Thuy Tinh
                </label>
              </div>
              <div
                style={{
                  width: '90%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                  marginLeft: 10,
                  marginTop: 10,
                }}
                onClick={() => {
                  setOpenInfoMe(!openInfoMe)
                }}
              >
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginLeft: 10,
                  }}
                >
                  Hồ sơ của bạn
                </label>
              </div>
              {openInfoMe && (
                <Popup
                  content={
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: 30,
                          display: 'flex',
                          gap: 10,
                          marginLeft: 15,
                          marginTop: 10,
                        }}
                      >
                        <label
                          style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}
                        >
                          Thông tin tài khoản
                        </label>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '30%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <img
                          src={demo}
                          alt="demo"
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'grey',
                            position: 'relative',
                          }}
                        />
                        <div
                          style={{
                            width: '100%',
                            height: 30,
                            display: 'flex',
                            gap: 10,
                            marginLeft: 10,
                          }}
                        >
                          <div
                            style={{
                              width: '5%',
                              height: '20%',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <img
                              src="https://www.w3schools.com/howto/img_avatar.png"
                              alt="demo"
                              style={{
                                width: 70,
                                height: 70,
                                backgroundColor: 'grey',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '33%',
                                left: '5%',
                              }}
                            />
                            <label
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                                backgroundColor: 'whitesmoke',
                                top: '43%',
                                left: '18%',
                                position: 'absolute',
                              }}
                            >
                              <CiCamera size="1.3rem" />
                            </label>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              width: '100%',
                              height: 30,
                              gap: 10,

                              marginTop: 10,
                            }}
                          >
                            <label
                              style={{
                                color: 'black',
                                fontSize: 17,
                                marginLeft: '20%',
                                fontWeight: 'bold',
                              }}
                            >
                              Nguyễn Thúy Tình
                            </label>
                            <label
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 100,

                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <AiOutlineEdit size="1.3rem" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '30%',
                          display: 'flex',
                          flexDirection: 'column',
                          marginTop: '15%',
                        }}
                      >
                        <div
                          style={{
                            flex: 'row',
                            width: '100%',
                            borderTopWidth: 5,
                            borderTopStyle: 'solid',
                            borderTopColor: 'whitesmoke',
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              paddingLeft: 10,
                              fontSize: 15,
                              color: 'black',
                              fontWeight: 'bold',
                              marginTop: 8,
                            }}
                          >
                            Thông tin cá nhân
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 13,
                              color: 'grey',
                              marginTop: 10,
                            }}
                          >
                            Giới tính
                          </label>
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 14,
                              color: 'black',
                              marginTop: 10,
                              marginLeft: 35,
                            }}
                          >
                            Nữ
                          </label>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 13,
                              color: 'grey',
                              marginTop: 10,
                            }}
                          >
                            Ngày sinh
                          </label>
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 14,
                              color: 'black',
                              marginTop: 10,
                              marginLeft: 25,
                            }}
                          >
                            14 tháng 09, 2002
                          </label>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 13,
                              color: 'grey',
                              marginTop: 10,
                            }}
                          >
                            Điện thoại
                          </label>
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 14,
                              color: 'black',
                              marginTop: 10,
                              marginLeft: 23,
                            }}
                          >
                            +84 988580844
                          </label>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <label
                            style={{
                              paddingLeft: 10,
                              fontSize: 13,
                              color: 'grey',
                              marginTop: 10,
                            }}
                          >
                            Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem
                            được số này
                          </label>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <button
                            style={{
                              backgroundColor: 'white',
                              color: 'black',
                              border: '1px solid lightgrey',
                              borderRadius: 5,
                              width: '100%',
                              height: 43,
                              marginTop: 10,
                              marginBottom: 10,
                              display: 'flex',
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              fontWeight: 'bold',
                              fontSize: 14,
                            }}
                          >
                            <label
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                              }}
                            >
                              <AiOutlineEdit size="1.3rem" />
                            </label>
                            Cập nhật
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                  handleClose={() => {
                    setOpenInfoMe(!openInfoMe)
                  }}
                />
              )}
              <div
                style={{
                  width: '90%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                  marginLeft: 10,
                  marginTop: 10,
                  borderBottom: '1px solid lightgrey',
                }}
              >
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,

                    marginLeft: 10,
                  }}
                >
                  Cài đặt
                </label>
              </div>
              <div
                style={{
                  width: '90%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,

                    marginLeft: 10,
                  }}
                >
                  Đăng xuất
                </label>
              </div>
            </div>
          </div>
        )}
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: 'white',
              fontSize: 20,
            }}
            onClick={handleDashboard}
          >
            <PiChatCircleText size="2rem" />
          </button>
        </div>
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: 'white',
              fontSize: 20,
            }}
            onClick={handleListFriend}
          >
            <BsPersonLinesFill size="2rem" />
          </button>
        </div>
        <div>
          <button
            style={{
              backgroundColor: 'blue',
              border: 'none',
              color: 'white',
              fontSize: 20,
            }}
            onClick={handleCloud}
          >
            <CiCloudOn size="2.2rem" />
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: 'blue',
          border: 'none',
          color: 'white',
          fontSize: 20,
        }}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {' '}
        <IoSettingsOutline size="2rem" />
      </div>
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: '7%',
            left: '0%',
            background: 'whitesmoke',
            height: '17rem',
            width: '13rem',
          }}
        >
          {/* code here */}
          <div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              <IoPersonOutline size="1.5rem" />
              <label
                style={{
                  color: 'black',
                  fontSize: 15,
                }}
              >
                Thông tin tài khoản
              </label>
            </div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 10,
                borderBottom: '1px solid lightgrey',
              }}
            >
              <IoSettingsOutline size="1.5rem" />
              <label
                style={{
                  color: 'black',
                  fontSize: 15,
                }}
              >
                Cài đặt
              </label>
            </div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                }}
              >
                <FiDatabase size="1.5rem" />
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Dữ liệu
                </label>
              </div>
              <IoIosArrowForward size="1rem" />
            </div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 10,
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                }}
              >
                <FiTool size="1.5rem" />
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Công cụ
                </label>
              </div>
              <IoIosArrowForward size="1rem" />
            </div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 10,
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                }}
              >
                <MdOutlineLanguage size="1.4rem" />
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Ngôn ngữ
                </label>
              </div>
              <IoIosArrowForward size="1rem" />
            </div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 10,
                borderBottom: '1px solid lightgrey',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: 30,
                  display: 'flex',
                  gap: 10,
                }}
              >
                <IoIosInformationCircleOutline size="1.5rem" />
                <label
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}
                >
                  Giới thiệu
                </label>
              </div>
              <IoIosArrowForward size="1rem" />
            </div>

            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 40,
                marginTop: 10,
                // borderTop: '1px solid lightgrey'
              }}
            >
              <label
                style={{
                  color: 'black',
                  fontSize: 15,
                  color: 'red',
                }}
              >
                Đăng xuất
              </label>
            </div>
            <div
              style={{
                width: '100%',
                height: 30,
                display: 'flex',
                gap: 10,
                marginLeft: 40,
              }}
            >
              <label
                style={{
                  color: 'black',
                  fontSize: 15,
                }}
              >
                Thoát
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBar
