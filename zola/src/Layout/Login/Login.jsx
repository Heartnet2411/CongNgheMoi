import React from 'react'
import './Login.css'
export const Login = () => {
  const [action, setAction] = React.useState('Sign In')
  return (
    <div className="container1">
      <div className="header">
        <div className="text">{action}</div>
        <div className="subtext">Sign in to continue to Zola.</div>
      </div>
      <div className="form">
        <div className="labelI">PhoneNumber</div>
        <div className="input1">
          <input type="phone" placeholder="Enter PhoneNumber" />
        </div>
        <div className="label">Password</div>
        <div className="input1">
          <input type="password" placeholder="Enter Password" />
        </div>
        <div className="form-group forgot-password">
          <div className="col-xl-12 col-md-10 col-sm-12 col-12">
            <a href="/forgot"> Forgot Password?</a>
          </div>
        </div>

        <div className="summit">
          <div
            className={action === 'Sign In' ? 'button blue' : 'button'}
            onClick={() => {
              setAction('Sign In')
            }}
          >
            Sign In
          </div>
        </div>
        <div className="form-group user-register">
          <div className="col-xl-12 col-md-10 col-sm-12 col-12 ">
            <br />
            Don't have an account? <a href="./"> Register</a>
          </div>
        </div>
      </div>
    </div>
  )
}
