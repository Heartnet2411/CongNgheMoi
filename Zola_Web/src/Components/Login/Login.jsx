import React from 'react'
import './Login.css'
export const Login = () => {
  const [action, setAction] = React.useState('Sign In')
  const [phone, setPhone] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        {action === 'Sign Up' ? (
          <div></div>
        ) : (
          <div className="subtext">Sign in to continue to Zola.</div>
        )}
        {action === 'Sign In' ? (
          <div></div>
        ) : (
          <div className="subtext">Get your Zola account now.</div>
        )}
      </div>
      <div className="form">
        {action === 'Sign In' ? (
          <div></div>
        ) : (
          <div className="labe">
            UserName
            <div className="inpu">
              <input
                type="phone"
                placeholder="Enter UserName"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
          </div>
        )}
        <div className="label">PhoneNumber</div>
        <div className="input">
          <input
            type="phone"
            placeholder="Enter PhoneNumber"
            onChange={(e) => {
              setPhone(e.target.value)
            }}
          />
        </div>
        <div className="label">Password</div>
        <div className="input">
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {action === 'Sign Up' ? (
          <div></div>
        ) : (
          <div className="forgot">Forgot Password?</div>
        )}
        <div className="summit">
          <div
            className={action === 'Sign In' ? 'button gray' : 'button'}
            onClick={() => {
              setAction('Sign In')
            }}
          >
            Sign In
          </div>
          <div
            className={action === 'Sign Up' ? 'button gray' : 'button'}
            onClick={() => {
              setAction('Sign Up')
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  )
}
