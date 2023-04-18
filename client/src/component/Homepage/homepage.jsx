import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/index.jsx';
import Profile from '../profile/index.jsx';
import Info from './info.jsx';
import List from '../profile/List'
import { useSelector } from "react-redux";
import './homepage.css';
import Wheater from './wheater';
import Schemes from './schemes.jsx';
const HomePage = () => {
  const{_id,/* picturePath */} = useSelector((state)=>state.user)
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  
    /* Get user */
  /*   useEffect(() => {
      getUser();
    }, []);

    const getUser = async ()=>{
      const response = await fetch(`http://localhost:3001/users/${_id}`,{
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      const data = await response.json();
      setUser(data);
    };
     
  if (!user) {
    return null;
  }
  const {
    location, 
    crops,
    Start,
  } = user;
  console.log("Start",Start) */


  return (
    <div className="dashboard__section">
      <div className="dashboard__nav">
        <Navbar/>
      </div>
      <div className="dashboard__subsection">
      <div className="dashboard__left">
          <Schemes/>
        </div>
        <div className="dashboard__middle">
          <Info userId={_id}/>
          <Wheater userId={_id}/>
        </div>
        <div className="dashboard__right">
          <div className="dash__up">
          <Profile userId={_id}/*  picturePath={picturePath} *//>
          </div>
          <div className="dash__down">
          <List/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
