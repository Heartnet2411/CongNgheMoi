import React from 'react'
import './Register.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export const Register = () => {
  const [action, setAction] = React.useState('Register')
  const [startDate, setStartDate] = React.useState(null)
  return (
    <div className="register-container">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="subtext">Get your Zola account now.</div>
        </div>
        <div className="form">
          <div className="label">First Name</div>
          <div className="inputI">
            <input type="firstname" placeholder="Enter First Name" />
          </div>
          <div className="label">Last Name</div>
          <div className="inputI">
            <input type="lastname" placeholder="Enter Last Name" />
          </div>
          <div className="label">NumberPhone</div>
          <div className="inputI">
            <input type="numberphone" placeholder="Enter NumberPhone" />
          </div>
          <div className="label">Date of Birth</div>
          <div className="inputA">
            <div className="inputB">
              <DatePicker
                //showIcon
                placeholderText="Click to select a date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
              />
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
          <div className="inputI">
            <input type="password" placeholder="Enter Password" />
          </div>
          <div className="label">Confirm Password</div>
          <div className="inputI">
            <input type="password" placeholder="Enter Confirm Password" />
          </div>
          <div className="user-re">
            <div className="col-xl-12 col-md-10 col-sm-12 col-12">
              <div
                className={action === 'Register' ? 'button blue' : 'button'}
                onClick={() => {
                  setAction('Register')
                }}
              >
                Register
              </div>
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
