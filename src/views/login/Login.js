import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import axios from 'axios'
export default function Login(props) {
  //提交表单且数据验证成功后回调事件  //console.log(values) 输出：{username: 'fgd', password: 'fdg'}
  const onFinish = (values) => {
    console.log(values)
    
    //用get方式朝后端发验证请求, 如果能查回来数据代表账户密码正确 //不能查回来返回[]空数组
    axios.get(`http://localhost:3000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        message.error("用户名或密码不匹配")
      } else {
        localStorage.setItem("token", JSON.stringify(res.data[0])) //res.data[0] 输出：[{…}]  => JSON.stringify(res.data[0]) 输出：{"username":"admin","password":"123","region":...} =>res.data[0] 输出：object object
        props.history.push("/")
      }
      
    })
  }
  return (
    <div style={{ background: 'rgb(35, 39, 65)', height: "100%", overflow: 'hidden' }}>
      <div className="formContainer">
        <div className="logintitle">全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}