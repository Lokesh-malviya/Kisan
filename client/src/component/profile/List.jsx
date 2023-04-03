import {React, useEffect, useState } from 'react'
import './profile.css';
import defauliImage from '../../assets/default.png';
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Commodity',
    dataIndex: 'commodity',
    key: 'commodity',
    width: 150,
    /* render: (text) => <a>{text}</a>, */
  },
  {
    title: 'Min',
    dataIndex: 'min_price',
    key: 'min_price',

  },
  {
    title: 'Max',
    dataIndex: 'max_price',
    key: 'max_price',
  },
  {
    title: 'Modal',
    key: 'modal_price',
    dataIndex: 'modal_price',
    /* render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ), */
  },
];

const Profile = () => {
  const [datas,setDatas] = useState([]);
  let Api = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate%5D=Punjab';
    /* Groceries data */
    const fetchApi = async (url)=>{
      try {
        const res = await fetch(url);
        const data = await res.json();
        const mydata = [];
        for (let values in data['records']){
          
          const l = {
            'commodity': data['records'][values]['commodity'],
            'min_price':data['records'][values]['min_price'],
            'max_price':data['records'][values]['max_price'],
            'modal_price':data['records'][values]['modal_price'],
          }
          mydata.push(l)
        };
        
        setDatas(mydata);
        console.log(datas)

      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchApi(Api);
    },[])
  
  


  return (
    <div className="list__section">
      <Table columns={columns}  pagination={{
      pageSize: 4,
    }} dataSource={datas}  />
    </div>
  )
}

export default Profile
