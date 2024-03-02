import React from 'react'
import './Register.css'
export const Register = () => {
  const [action, setAction] = React.useState('Register')
  return (
    <div className="register-container">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="subtext">Get your Zola account now.</div>
        </div>
        <div className="form">
          <div className="label">First Name</div>
          <div className="input">
            <input type="firstname" placeholder="Enter First Name" />
          </div>
          <div className="label">Last Name</div>
          <div className="input">
            <input type="lastname" placeholder="Enter Last Name" />
          </div>
          <div className="label">NumberPhone</div>
          <div className="input">
            <input type="numberphone" placeholder="Enter NumberPhone" />
          </div>
          <div className="label">Date of Birth</div>
          <div className="inputA">
            <div className="inputB">
              <input type="numberphone" placeholder="Enter Date of Birth" />
            </div>
            <div className="inputC">
              <div>
                <label for="select"> Gender </label>
                <select className='="form-select" id="select">'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="label">Password</div>
          <div className="input">
            <input type="numberphone" placeholder="Enter Password" />
          </div>
          <div className="label">Confirm Password</div>
          <div className="input">
            <input type="numberphone" placeholder="Enter Confirm Password" />
          </div>
          <div className="summit">
            <div
              className={action === 'Register' ? 'button blue' : 'button'}
              onClick={() => {
                setAction('Register')
              }}
            >
              Register
            </div>
          </div>
          <div className="form-group user-register">
            <div className="col-xl-12 col-md-10 col-sm-12 col-12 ">
              <br />
              Do you have an account? <a href="/signin"> Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
