import React from 'react'
import Forms from './formss';
import kisan_logo from "../../assets/kisan.avif";
import './index.css';
const LoginPage = () => {
  return (
    <div className="login__section">
      <div className="login__subsection">
        <img src={kisan_logo}  className="login__farmer" />
      </div>
      <div className="login__formSection">
        
        <Forms/>
    
      </div>
    </div>
  )
}

export default LoginPage
