import React, { createContext, useReducer } from 'react'
import { Navbar } from './components/Navbar'
import { Home } from './components/MainPage/Home'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Logout } from './components/Logout'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ErrorPage } from './components/ErrorPage'
import { initialState , reducer } from './reducer/UserReducer'
import { AddProduct } from './components/addProduct'
import { Products } from './components/products'


export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='*' element={<ErrorPage />} />
      <Route path='/addproduct' element={<AddProduct />} />
      <Route path='/products' element={<Products />} />
    </Routes>
  )
}
const App = () => { 
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          <Routing />
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App