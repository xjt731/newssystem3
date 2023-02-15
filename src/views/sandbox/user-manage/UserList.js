import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch, Form, Input, Select } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'
const { confirm } = Modal
const { Option } = Select;
export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    const [isUpdateVisible, setisUpdateVisible] = useState(false)
    //显示Modal对话框
    const [isAddVisible, setisAddVisible] = useState(false)
    //显示Role列表对话框
    const [roleList, setroleList] = useState([])
    //显示Region列表对话框
     const [regionList, setregionList] = useState([])
     //useRef拿到子组件属性
     const addForm = useRef()

     useEffect(() => {
         axios.get("http://localhost:3000/users?_expand=role").then(res => {
            const list = res.data
            setdataSource(list)
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:3000/regions").then(res => {
            const list = res.data
            setregionList(list)
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:3000/roles").then(res => {
            const list = res.data
            setroleList(list)
        })
    }, [])
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (region) => {
                return region === "" ? '全球' : region
            }
        },
         {
             title: '角色名称',
             dataIndex: 'role',
             //UserList.js:55 Uncaught TypeError: Cannot read properties of undefined (reading 'roleName')
             render: (role) => {
                 return role.roleName
                 //return role?.roleName//如果没有就不读？
             }
         },
         {
            title: "用户名",
            dataIndex: 'username'
        },
        {
            title: "用户状态",
            dataIndex: 'roleState',
            //为什么default要加item？
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default}></Switch>
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} disabled={item.default} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} />
                </div>
            }
        }
    ];
    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions', 
            onOk() {
                //   console.log('OK');
                deleteMethod(item)
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });
    }
    //删除
     const deleteMethod = (item) => {
         // console.log(item)
         // 当前页面同步状态 + 后端同步
         setdataSource(dataSource.filter(data => data.id !== item.id))

         axios.delete(`http://localhost:3000/users/${item.id}`)

     }

     const addFormOK = () => {
         addForm.current.validateFields().then(value => {
             // console.log(value)

             setisAddVisible(false)

             //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
             axios.post(`http://localhost:3000/users`, {
                 ...value,
                 "roleState": true,
                 "default": false,
             }).then(res => {
                 console.log(res.data)
                 setdataSource([...dataSource,{
                    ...res.data,
                    role:roleList.filter(item=>item.id===value.roleId)[0]
                }])
                 //setdataSource([...dataSource, res.data])
             })
         }).catch(err => {
             console.log(err)
         })
     }

     return (
         <div>
             <Button type="primary" onClick={() => {
                setisAddVisible(true)
            }}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id}
            />
            <Modal
                open={isAddVisible}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                 onCancel={() => {
                     setisAddVisible(false)
                 }}
                 onOk={() => addFormOK()}
             >

                 
                <UserForm ref={addForm} regionList={regionList} roleList={roleList} />
            </Modal>
        </div>
    )
}