import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginPage from './component/Login/index.jsx'
import HomePage from './component/Homepage/homepage'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom'

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={isAuth ? <HomePage/>: <Navigate to="/"/>}/>
      </Routes>
      </BrowserRouter>

      
    </div>
  )
}

export default App
