import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const About = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState('')
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': "application/json"
        },
        credentials: 'include'
      });
      const data = await res.json();
      setUserData(data);
      if (!data) {
        throw new Error('Not Found Data');
      }
    } catch (error) {
      console.log(error);
      navigate('/login')
    }
  }
  useEffect(() => {
    callAboutPage();
  }, [])

  return (
    <>
      <section className='my-5'>
        <div className="container p-3 shadow">
          <div className="row">
            <h1 className='text-center'>About</h1>
            <div className="col-10 mx-auto">
              <form method="GET">
                <div className="row mt-4">
                  <div className="col-md-6 col-12 mb-3">
                    <h5>User ID : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData._id}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>User Name : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.name}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>Email : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.email}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>Work : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.work}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>Phone : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.phone}</h5>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
