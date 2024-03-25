import React, { useState } from 'react'
import { IoPeopleOutline } from 'react-icons/io5'
import { SlArrowDown } from 'react-icons/sl'
import { BsArrowDownUp } from 'react-icons/bs'
import { CiFilter } from 'react-icons/ci'
const Team = () => {
  const [names, setNames] = useState([])
  const sortNames = () => {
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b))
    setNames(sortedNames)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'whitesmoke'
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
            <IoPeopleOutline size="1.5rem" />
          </label>
          <label
            style={{
              fontSize: 18
            }}
          >
            Danh sách nhóm
          </label>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: 60,
          backgroundColor: 'whitesmoke',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <label style={{ fontSize: 15, marginLeft: 15 }}>Nhóm ( )</label>
      </div>
      <div
        style={{
          width: '98%',
          height: 610,
          backgroundColor: 'white',
          display: 'flex',
          margin: 'auto',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 50,
            display: 'flex',
            gap: 10,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <input
            style={{
              width: '27%',
              height: 20,
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: 10
            }}
            type="text"
            placeholder="Search "
          />

          <div
            style={{
              width: '20%',
              height: 26,
              alignItems: 'center',
              display: 'flex',
              borderRadius: 5,
              backgroundColor: 'whitesmoke'
            }}
          >
            <BsArrowDownUp size="1rem" />
            <button
              onClick={sortNames}
              style={{
                width: '80%',
                height: 26,
                borderRadius: 5,
                backgroundColor: 'whitesmoke',
                border: 'none'
              }}
            >
              Tên (A-Z)
            </button>
            <SlArrowDown size="1rem" />
          </div>
          <div
            style={{
              width: '20%',
              height: 26,
              alignItems: 'center',
              display: 'flex',
              borderRadius: 5,
              backgroundColor: 'whitesmoke'
            }}
          >
            <CiFilter size="1rem" />
            <button
              onClick={sortNames}
              style={{
                width: '80%',
                height: 26,
                borderRadius: 5,
                backgroundColor: 'whitesmoke',
                border: 'none'
              }}
            >
              Tất cả
            </button>
            <SlArrowDown size="1rem" />
          </div>

          <div
            style={{
              width: '30%',
              height: 20,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
export default Team
