import React, { forwardRef,useState } from 'react'
 import {Form,Input,Select} from 'antd'
 const {Option}  = Select
 //props接收父组件数据，forwardRef包裹的函数
const UserForm = (props) => {
     const [isDisabled, setisDisabled] = useState(false)
     return (
        <Form
        layout="vertical"
        //validateMessages={validateMessages}
    >
        <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="region"
            label="区域"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
            <Select>
                {
                    props.regionList.map(item =>
                        <Option value={item.value} key={item.id}>{item.title}</Option>
                    )
                }
            </Select>
        </Form.Item>
        <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
            <Select>
                {
                    props.roleList.map(item =>
                        <Option value={item.id} key={item.id}>{item.roleName}</Option>
                    )
                }
            </Select>
        </Form.Item>
    </Form>
     )
 }

 export default UserForm