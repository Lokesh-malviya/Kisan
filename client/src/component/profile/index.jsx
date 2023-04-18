import {React, useEffect, useState } from 'react'
import './profile.css';
import defauliImage from '../../assets/default.png';
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
/*https://commodities-api.com/api/latest? access_key = o3z097hh6t9h000h5ge4h0th459n3fykdqmz9x2lw2d26cyi52g1b17ni404*/
/*
// set endpoint and your access key
endpoint = 'latest'
access_key = 'o3z097hh6t9h000h5ge4h0th459n3fykdqmz9x2lw2d26cyi52g1b17ni404';

// get the most recent exchange rates via the "latest" endpoint:
$.ajax({
url: 'https://commodities-api.com/api/' + endpoint + '?access_key=' + access_key,   
dataType: 'jsonp',
success: function(json) {

// exchange rata data is stored in json.rates
alert(json.rates.GBP);

// base currency is stored in json.base
alert(json.base);

// timestamp can be accessed in json.timestamp
alert(json.timestamp);

}
});
*/
const Profile = ({ userId, /* picturePath */}) => {
  
  
  
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);


  const getUser = async ()=>{
    const response = await fetch(`https://kisan.onrender.com/users/${userId}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    mobileNo,
    aadharnumber,
    landsize
  } = user;

  return (
    <div className="profile">
      <div className="profile__img">
        <img src={defauliImage}  className="defaul_image" />
        <p className="name">{firstName} {lastName}</p>
      </div>
      <div className="profile__section">
       <div className="profile__up">
            <div className="loc"> <Icon icon="material-symbols:location-city-rounded" style={{fontSize:20}} />{" "}{location}, Maharashtra</div>
            <div className="mob"><Icon icon="material-symbols:phone-in-talk" style={{fontSize:20}}/>{" "}{mobileNo}</div>
       </div>
       <div className="profile__up">
       <div className="loc"> <Icon icon="ic:outline-confirmation-number" style={{fontSize:20}} />{" "}XXXXXXXX{aadharnumber.slice(8,13)}</div>
            <div className="mob"><Icon icon="mdi:land-plots"  style={{fontSize:20}}/>{" "}{25}Acers</div>
       </div>
      </div>

    </div>
  )
}

export default Profile
