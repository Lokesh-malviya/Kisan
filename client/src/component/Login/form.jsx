import {React,useState} from 'react'
import { Button, Checkbox, Form, Input,Typography,  Select } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { LockOutlined, UserOutlined,SmileOutlined,BranchesOutlined } from '@ant-design/icons';
import './index.css';
import * as yup from "yup";


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    mobileNo: yup.string().required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    aadharnumber: yup.string().required("required"),
  });

const loginSchema = yup.object().shape({
    mobileNo: yup.string().required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  mobileNo: "",
  password: "",
  location: "",
  aadharnumber:"",
};

const initialValuesLogin = {
  mobileNo: "",
  password: "",
};

const Forms = () => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [form] = Form.useForm();

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    console.log(values)

    const savedUserResponse = await fetch(
      "https://kisan.onrender.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(savedUserResponse);
    const savedUser = await savedUserResponse.json();
    
    

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values,onSubmitProps) =>{
    const loggedInResponse = await fetch("https://kisan.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(loggedInResponse);
    const loggedIn = await loggedInResponse.json();
    /* navigate("/home"); */
      
  }

  

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="login__container">

        <div className="typo">
        <Typography.Title  level={3} style={{marginBottom:0}}>
        {isLogin ? "Sign in" : "Sign up"}
      </Typography.Title>
      <Text style={{marginBottom:40, fontSize:12}}>{isLogin ? "Type your mobile number and password to sign in." : "Enter your personal details."}</Text>
      </div>
        
        <Form
    
            name="normal_login"
            className="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            form={form}
            onFinish={handleFormSubmit}
            onSubmit={handleFormSubmit}
            /*
            onFinishFailed={onFinishFailed} */
            autoComplete="off"
        >
                <div className="box_1">
                      {
                        isRegister && (
                          <>
                           
                           
                           <Form.Item name="firstName" rules={[{ required: true }]} layout="inline">
                            <Input placeholder="First Name" prefix={<SmileOutlined />} />
                          </Form.Item>
                          
                          <Form.Item name="lastName" rules={[{ required: true }]} layout="inline">
                            <Input placeholder="Last Name" prefix={<SmileOutlined />} />
                          </Form.Item>
                         
                          <Form.Item
                            name="aadharnumber"
                            
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input  placeholder="Aadhar Number" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="location" rules={[{ required: true }]} layout="inline">
                            <Input placeholder="Location" prefix={<BranchesOutlined />} />
                          </Form.Item>

                           
                          </>
                        )
                      }


                        <Form.Item
                            name="mobileNo"
                            
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input  type="text" placeholder="Phone Number" style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                       

                    
                </div>
                <div className="box_2">

                <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                            {isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            Or 
                    
                    <Button type="link" onClick={() => {setPageType(isLogin ? "register" : "login");form.resetFields()
                    }} block>
                            
                            {isLogin ? "register now!":"login now!"}
                            </Button>
                 </Form.Item>

                </div>
        </Form>
    </div>
  )
}

export default Forms

