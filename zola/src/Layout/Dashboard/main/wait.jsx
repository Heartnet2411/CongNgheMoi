import React from 'react'
import zola from '../../../Assets/zola.png'
const Wait = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'lightgrey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '50%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={zola} alt="" />
      </div>
    </div>
  )
}
export default Wait
