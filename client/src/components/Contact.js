import React, { useState, useEffect } from 'react'

export const Contact = () => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' })
  const userContact = async () => {
    try {
      const res = await fetch('/getData', {
        method: 'GET',
        headers: { 'Content-Type': "application/json" },
      });
      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      if (!data) {
        throw new Error('Not Found Data');
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userContact();
  }, []);

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value })
  }


  // data send to backend
  const contactForm = async (e) => {
    e.preventDefault();
    debugger;
    const { name, email, phone, message } = userData;
    const res = await fetch('/contact', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone, message
      })
    })
    const data = await res.json();
    if (!data) {
      alert('Message Not Sent')
    } else {
      alert('Message Sent');
      setUserData({ ...userData, message: '' })
    }
  }


  return (
    <>
      <section className="contact my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="info-box">
                    <h3>Our Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <h3>Email Us</h3>
                    <p>info@example.com<br />contact@example.com</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-box">
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-lg-6">
              <form method="POST" className="php-email-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text"
                      className="form-control"
                      name='name'
                      onChange={handleInputs}
                      value={userData.name}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="email"
                      className="form-control"
                      name='email'
                      onChange={handleInputs}
                      value={userData.email}
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="number"
                    className="form-control"
                    name='phone'
                    onChange={handleInputs}
                    value={userData.phone}
                    placeholder="Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <textarea className="form-control"
                    onChange={handleInputs}
                    value={userData.message}
                    name="message"
                    rows="5"
                    placeholder="Message">
                  </textarea>
                </div>
                <div className="text-center">
                  <button type="submit" onClick={contactForm} >Send Message</button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
