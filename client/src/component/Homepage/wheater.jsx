import React,{ useState, useEffect } from 'react'
import sun from '../../assets/sun.png';
const Wheater = ({location}) => {
    const [whedata, setWhedata] = useState({});
    useEffect(() => {
          getWheater();
      }, [location]);
    
      const getWheater = async ()=>{
        try {
          let url  = `http://api.weatherapi.com/v1/current.json?key=fafa8e02cf3d476e988194330230104&q=${location}&aqi=no`
          const res = await fetch(url);
          const data = await res.json();
          setWhedata(data)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className="middle__subsection">
        <div className="middle__left">
          <div className="rig">
            <img src={sun}  className="sun__image" />
          </div>
          <div className="lef">
          {whedata?.current?.temp_c}
          {console.log("after",whedata)}{" "}°
          <div className="whe">{whedata?.current?.temp_c > 30 ? "Sunny" : "Rainy"}</div> 
          </div>
        </div>
        <div className="middle__right">
          Right
        </div>
     </div>
  )
}

export default Wheater
