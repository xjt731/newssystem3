import React, { useState, useEffect } from 'react'
import { Table, Button, Modal,Tree } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    //设置对话框打开属性
    const [isModalOpen, setIsModalOpen] = useState(false);
    //树形控件属性值
    const [rightList, setRightList] = useState([])
    //被选中的树形控件属性值
    const [currentRights, setcurrentRights] = useState([])

    //设置对话框打开方法
    const showModal = () => {
        setIsModalOpen(true);
    };
    //设置对话框ok方法
    const handleOk = () => {
        setIsModalOpen(false);
    };
    //设置对话框取消方法
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        axios.get("http://localhost:3000/roles").then(res => {
            // console.log(res.data)
            setdataSource(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:3000/rights?_embed=children").then(res => {
            // console.log(res.data)
            setRightList(res.data)
        })
    }, [])

    //表格列设置
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
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMethod(item) }} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
                        showModal()
                        setcurrentRights(item.rights)
                    }} />
                </div>
            }
        }
    ]


    //设置删除对话框确认方法
    const confirmMethod = (item) => {
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

    //点击复选框触发
    const onCheck = (checkKeys)=>{
        console.log(checkKeys)
        setcurrentRights(checkKeys)
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                rowKey={(item) => item.id}></Table>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable                   //节点前添加 Checkbox 复选框
                    checkedKeys={currentRights} //选中复选框的树节点
                    onCheck={onCheck}           //点击复选框触发
                    //checkStrictly={true}      //checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
                    treeData={rightList}        //最基本的数据
                />
            </Modal>


        </div>
    )
}
