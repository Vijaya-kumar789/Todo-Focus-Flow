import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreateTodo from './Component/Wrapper/CreateTodo'
import ListTodo from './Component/Wrapper/ListTodo'
import Login from './Component/Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Component/Login/Register'
import Home from './Component/Wrapper/Home'
import PrivateRoute from './Routes/PrivateRoute'

function App() {

  return (
    <>
    <div className='div'>
    <BrowserRouter>
      <Routes  >
      <Route path="/login" element={<Login/>}  />
        
        <Route path="/register" element={<Register/>}  />
      <Route path="/" element={<Home/>}  />
       
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
