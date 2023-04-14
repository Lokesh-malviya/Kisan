import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import './homepage.css';
import { useSelector } from "react-redux";
import Wheater from './wheater';
const Info = ({userId}) => {
  const [data, setData] = useState([]);
  const [thre,setThreshold] = useState("");
  const showGraph = useSelector((state) => state.graph);
 
    // eslint-disable-line react-hooks/exhaustive-deps
  
   
    
  /* Fetching graph */

  useEffect(() => {
    asyncFetch();
  }, [showGraph]);
  const asyncFetch = async () => {
    const loggedInResponse = await fetch("http://localhost:3001/crop/cropgraph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({cropname:showGraph}),
    });
    console.log(loggedInResponse);
    const loggedIn = await loggedInResponse.json();
    const mydata = []
    for (let values in loggedIn['month']) {
      console.log()
      const l = {
        Date:loggedIn['month'][values],
        scales:loggedIn['rate'][values]
      };
      mydata.push(l);
    }
    console.log(mydata)
    setData(mydata)
    setThreshold(loggedIn['threshold'])
  };


  /* Get wheater */
 
 
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    yAxis: {
      // type: 'timeCat',
      tickCount: 4,
    },
    
    annotations: [
      // 低于中位数颜色变化
      {
        type: 'regionFilter',
        start: ['min', 'median'],
        end: ['max', '0'],
        color: '#F4664A',
      },
      {
        type: 'text',
        position: ['min', 'median'],
        content: thre,
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
        
      },
      
    ],
    
  };
  return (
    <div className="graph">
      {console.log(showGraph)}
     <Line {...config} width={500} height={400} />
    </div>
  )
}

export default Info
