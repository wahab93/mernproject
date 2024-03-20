import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', phone: '', work: '', password: '', cpassword: '' });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }
  const postData = async (e) => {
    e.preventDefault();
    debugger;
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword })
    })
    const data = await res.json()
    if (res.status === 422 || !data) {
      alert('Please Fill')
      window.alert('invalid Registeration')
    } else {
      window.alert(' Registeration Successful')
      navigate('/login')
    }
  }
  return (
    <>
      <div className="container my-3 p-4 shadow">
        <div className="row">
          <div className="col-md-6 col-12">
            <form method='POST'>
              <div className="mb-2">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className='form-control' required onChange={handleInput} value={user.name} id='name' placeholder='Your Name' name='name' />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" required onChange={handleInput} value={user.email} name='email' id="email" placeholder='Your Email' />
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" required onChange={handleInput} value={user.phone} name='phone' id="phone" placeholder='Your Phone' />
              </div>
              <div className="mb-2">
                <label htmlFor="work" className="form-label">Work</label>
                <input type="text" className="form-control" required onChange={handleInput} value={user.work} name='work' id="work" placeholder='Your Profession' />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" required onChange={handleInput} value={user.password} id="password" name='password' placeholder='Your Password' />
              </div>
              <div className="mb-2">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" required onChange={handleInput} value={user.cpassword} placeholder='Confirm Password' id="cpassword" name='cpassword' />
              </div>
              <button type="submit" className="btn btn-primary" onClick={postData}>Register</button>
            </form>
          </div>
          <div className="col-md-6 col-12 text-center">
            <img src="./images/register.png" alt="register" className='img-fluid' />
          </div>
        </div>
      </div>
    </>
  )
}
