import React, { forwardRef,useState } from 'react'
 import {Form,Input,Select} from 'antd'
 const {Option}  = Select
 //props接收父组件数据，forwardRef包裹的函数
const UserForm = forwardRef((props,ref) => {
    //禁用下拉列表状态
     const [isDisabled, setisDisabled] = useState(false)

     const {roleId,region}  = JSON.parse(localStorage.getItem("token"))
     const roleObj = {
         "1":"superadmin",
         "2":"admin",
         "3":"editor"
     }
     const checkRegionDisabled = (item)=>{
         if(props.isUpdate){
             if(roleObj[roleId]==="superadmin"){
                 return false
             }else{
                 return true
             }
         }else{
             if(roleObj[roleId]==="superadmin"){
                 return false
             }else{
                 return item.value!==region
             }
         }
     }

     const checkRoleDisabled = (item)=>{
         if(props.isUpdate){
             if(roleObj[roleId]==="superadmin"){
                 return false
             }else{
                 return true
             }
         }else{
             if(roleObj[roleId]==="superadmin"){
                 return false
             }else{
                 return roleObj[item.id]!=="editor"
             }
         }
     }

     return (
        <Form
        layout="vertical"
        //validateMessages={validateMessages}
        ref={ref}
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
            rules={isDisabled?[]:[{ required: true, message: 'Please input the title of collection!' }]}
        >
            <Select disabled={isDisabled}>
                {
                    props.regionList.map(item =>
                        <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.title}</Option>
                    )
                }
            </Select>
        </Form.Item>
        <Form.Item
            name="roleId"
            label="角色"
            //如果是超级管理员则不开启检查
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
            {/* 每次select被选择，拿到的value值是选项编号。1为超级管理员 */}
            <Select onChange={(value)=>{
                if(value===1){
                    setisDisabled(true)
                    //ref自己组建里面页可以用 //ref输出：{current: {…}}
                    ref.current.setFieldsValue({
                        region:''
                    })
                }else{
                    setisDisabled(false)
                }
            }}>
                {
                    props.roleList.map(item =>
                        <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>
                    )
                }
            </Select>
        </Form.Item>
    </Form>
     )
 })

 export default UserForm