import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert('invalid Login')
    } else {
      dispatch({ type: 'USER', payload: true })
      window.alert(' Login Successful')
      navigate('/')
    }
  }


  return (
    <>
      <div className="container my-5 p-5 shadow">
        <div className="row">
          <div className="col-6 text-center">
            <img src="./images/login.png" alt="" />
          </div>
          <div className="col-6">
            <form method='POST'>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name='email' placeholder='Enter Email' />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" name='password' placeholder='Enter Password' />
              </div>
              <button type="submit" className="btn btn-primary" onClick={loginUser}>login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
