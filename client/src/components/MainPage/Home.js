import React, { useState, useEffect } from 'react'
import { Aboutmain } from './AboutMain'
import { Banner } from './Banner'
import { Footer } from './Footer'
import { Services } from './Services'

export const Home = () => {
  const [userName, setUserName] = useState('')
  const [show, setShow] = useState(false)
  const userHomePage = async () => {
    try {
      const res = await fetch('/getData', {
        method: 'GET',
        headers: { 'Content-Type': "application/json" },
      });
      const data = await res.json();
      setUserName(data.name);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userHomePage();
  }, []);
  return (
    <>
      <Banner userName={userName} show = {show} />
      <Aboutmain />
      <Services />
      <Footer />
    </>
  )
}
