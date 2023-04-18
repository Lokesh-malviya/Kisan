import React,{ useState, useEffect } from 'react'
import { Progress,  Avatar,Tooltip,Button, Empty,Modal,Table,Space  } from 'antd';
import {
  Form,
  Select,
  DatePicker
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react';
import { useSelector } from "react-redux";
import Season from './seasom';
import { setGraph } from "../../state/index";
import { useDispatch } from "react-redux";

const initialCrops={
  croper: "",
  date: ""
}


const Wheater = ({userId}) => {

    const token = useSelector((state) => state.token);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState("s");
    const [user, setUser] = useState(null);
    const [datasl,setDatasl] = useState([]);
    const [data, setData] = useState([]);
    const [cr,setCr] = useState(null);
    const dispatch = useDispatch();
  
    const API_KEY = 'o3z097hh6t9h000h5ge4h0th459n3fykdqmz9x2lw2d26cyi52g1b17ni404';
    const columns = [
      {
        title: 'Cropname',
        dataIndex: 'cropname',
        key: 'cropname',
        render: (text) => <div className='head'>{text}</div>,
      },
      {
        title: 'Month',
        dataIndex: 'Month',
        key: 'Month',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <div className='tes'>{text}</div>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <span className="adds" onClick={()=>{
              dispatch(
                setGraph(
                  {
                    graph:record.cropname, 
                  })
              );
            }}>
              <Icon icon="material-symbols:add" color="#2d9d75" />
            </span>
          
            <span onClick={()=>{
              hasdel(record.cropname);
              console.log(confirmLoading);
              if(confirmLoading == 'b'){
                setConfirmLoading("s")
              }
              else{
                setConfirmLoading("b")
              }
            }}
            className='delete'
            ><Icon icon="material-symbols:delete-outline" color="red" /></span>
          </Space>
        ),
      },
    ];
    
    const getMonthName = (monthNumber)=> {
      const date = new Date(monthNumber);
      const moonLanding = date.getMonth();
      
      date.setMonth(moonLanding);
      
    
      return date.toLocaleString('en-US', { month: 'long' }).concat(" ".concat(date.getFullYear()));
    }

    const onChange = (date, dateString) => {
      console.log(date, dateString);
    };

    const showModal = () => {
      setOpen(true);
    };

   
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };


    

  
   
    
    useEffect(() => {
      console.log(confirmLoading)
    const getUser = async ()=>{
      const response = await fetch(`https://kisan.onrender.com/users/${userId}`,{
        method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
        );
        const data = await response.json();
        const mydata = [];
          for (let values in data['crops']) {
            const l = {
              'cropname': data['crops'][values],
              'Month': getMonthName(data['Start'][values]),
              'price': '+450'
            };
            mydata.push(l);
          }
          console.log(mydata)
        setCr(mydata);
        setUser(data);

      };
      getUser();
    }, [confirmLoading]);

      const addCrops = async (values,onSubmitProps) =>{
        console.log(values);
        values["id"] = userId; 
        const cropsResponse = await fetch(`https://kisan.onrender.com/users/${userId}/crops`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
          body: JSON.stringify(values),
        });


        const cropsIn = await cropsResponse.json();
        if(confirmLoading == 's'){
          setConfirmLoading("b")
        }
        else{
          setConfirmLoading("s")
        }
        setData(cropsIn);
          
      }


      const handleFormSubmit = async (values) => {
        await addCrops(values);
      };

  
      
      const hasdel = async (items)=>{ 
        let s = {
          id:userId,
          cropper:items
        }
        const cropsResponse =  fetch(`https://kisan.onrender.com/users/${userId}/crops-delete`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}`,"Content-Type": "application/json" },
          body: JSON.stringify(s),
        });
      }

     

      

    
    
    /* Groceries data */
    let Api = `https://commodities-api.com/api/latest?access_key=${API_KEY}&base=INR&symbols=${data}`;
    const fetchApi = async (url)=>{
      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data)
        setDatasl(data.data)

      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchApi(Api);
    },[Api])

    if (!user) {
      return null;
    }

      /* if (user) {
        const mydata = [];
        for (let values in user['crops']) {
          const l = {
            'cropname': user['crops'][values],
            'Month': getMonthName(user['Start'][values]),
            'price': '+450'
          };
          mydata.push(l);
        }
        setCr(mydata);
      } */
    

  return (
    <div className="middle__subsection">
        <Season location={user.location}/>
        <div className="middle__middle">
        {
          user.crops.length == 0 ? 
                (<Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{ height: 31 }}
                  
                >
                  <Button type="primary" className='addon' onClick={showModal}><Icon icon="material-symbols:add" color="#fff"/>{" "} Add</Button>
                </Empty>) 
                : 
                <div className="crops__grown">
                  <div className="crops__down">
                  <Button type="primary" className='addon' id="dash" onClick={showModal}><Icon icon="material-symbols:add" color="#fff"/>{" "} Add</Button>
                  </div>
                 
                  <Table columns={columns} dataSource={cr} pagination={{pageSize: 2 }}/>;
                  
                  <div className="hr__line"></div>
                </div>
        }
        <Modal
          title="Crop to be grown"
          open={open}
          /* onOk={handleOk} */
          initialValues={initialCrops}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form
            
            
            layout="horizontal"
            initialValues={initialCrops}
            onFinish={handleFormSubmit}
            onSubmit={handleFormSubmit}
            style={{ maxWidth: 600 }}
          >
          
          <Form.Item name="croper" label="Crop" style={{marginTop:10}}>
            <Select>
              <Select.Option value="Wheat" placeholder="input placeholder">Wheat</Select.Option>
              <Select.Option value="Corn" placeholder="input placeholder">Corn</Select.Option>
              <Select.Option value="Rice" placeholder="input placeholder">Rice</Select.Option>
              <Select.Option value="potato" placeholder="input placeholder">Potato</Select.Option>
              <Select.Option value="cotton" placeholder="input placeholder">Cotton</Select.Option>
              <Select.Option value="Sugarcane" placeholder="input placeholder">Sugarcane</Select.Option>
              <Select.Option value="Mango" placeholder="input placeholder">Mango</Select.Option>
              <Select.Option value="onion" placeholder="input placeholder">Onion</Select.Option>
            </Select>
          </Form.Item>
          <div className="side">
          <Form.Item label="Start Month"   name="date">
            <DatePicker onChange={onChange} format={'MM-YYYY'} picker="month" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
          </Form.Item>
          </div>
          </Form>
        </Modal>
        </div>
        <div className="middle__right">
          <div className="__rig">
          <Tooltip title="3 done / 3 in progress / 4 to do">
          <Progress type="circle" percent={75}  strokeColor={"#2D9D75"}/>
          </Tooltip>
          </div>
          <div className="__lef">
          <div className="small_div"></div>Wheat
          </div>
        </div>
     </div>
  )
}

export default Wheater
