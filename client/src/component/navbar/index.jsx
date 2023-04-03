import React from 'react'
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import {  setLogout } from "../../state/index";
import { Button, Space } from 'antd';
const Navbar = () => {
    const dispatch = useDispatch();
    
  return (
    <header className="header">
        <nav className="nav container">
            <div className="nav__logo">Kisan</div>
            <div className="nav__menu">
                <ul className="nav__list grid">
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Home
                        </div>
                    </li>
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Scheme
                        </div>
                    </li>
                    <li className="nav__item">
                        <div to="#" className="nav__link">
                            Detect
                        </div>
                    </li>
                    <li className="nav__item">
                    <Button type="primary"  className='logout' onClick={() => dispatch(setLogout())}>
                        Logout
                    </Button>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
