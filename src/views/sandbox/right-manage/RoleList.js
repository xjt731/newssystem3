import React, { useState, useEffect } from 'react'
 import { Table, Button, Modal } from 'antd'
 import axios from 'axios'
 import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
 const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/roles").then(res => {
            // console.log(res.data)
            setdataSource(res.data)
        })
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName'
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>{confirmMethod(item)}} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} />
                </div>
            }
        }
    ]

    const confirmMethod = (item)=>{
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    //删除
    const deleteMethod = (item) => {
        // console.log(item)
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:3000/roles/${item.id}`)
    }
    
    return (
        <div>
             <Table dataSource={dataSource} columns={columns}
                 rowKey={(item) => item.id}></Table>
        </div>
    )
}
