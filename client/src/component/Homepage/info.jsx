import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import './homepage.css';
import { useSelector } from "react-redux";
import Wheater from './wheater';
const Info = ({userId}) => {
  const [data, setData] = useState([]);
 
 
    // eslint-disable-line react-hooks/exhaustive-deps
  
   
    
  /* Fetching graph */

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = async () => {
    await fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };


  /* Get wheater */
 
 
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
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
        content: '中位数',
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
     <Line {...config} />
    </div>
  )
}

export default Info
