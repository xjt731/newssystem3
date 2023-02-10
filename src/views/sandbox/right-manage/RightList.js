import React, { useState, useEffect } from 'react'
import { Button, Table, Tag, Modal, Space, Popover, Switch } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal;
export default function RightList() {
    
    const [dataSource, setdataSource] = useState(
        []
    )

    useEffect(() => {
        axios.get("http://localhost:3000/rights?_embed=children").then(res => {
            setdataSource(res.data)
        })

    }, [])

    //表格列设置
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>
        },
        {
            title: '权限名称',
            dataIndex: 'title'
        },
        {
            title: "权限路径",
            dataIndex: 'key',
            render: (key) => <div><Tag color="magenta">{key}</Tag></div>

        },
        {
            title: "操作",
            //item拿到的是当前的这一项对象 
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                    <Popover content={<Switch checked={item.pagepermisson} onChange={() => switchMethod(item)} />} title="页面配置项">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
                    </Popover>
                </div>
            }
        }
    ];

    //设置switch开关方法
    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        //checked重新渲染 //为什么一定要展开dataSource //用setState该方法会更新state，然后引起视图更新
        setdataSource([...dataSource])
        if (item.grade === 1) {
            axios.patch(`http://localhost:3000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:3000/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
    }

    //设置switch开关方法 //item拿到的是当前的这一项对象 
    const confirmMethod = (item) => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                delectMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    //删除
    const delectMethod = (item) => {
        if (item.grade === 1) {
            setdataSource(dataSource.filter(data => data.id !== item.id))
        } else {
            //浅拷贝，指向的是地址，找到那个地址，改的也就是其本身了 //这里list保存的都是对dataSource中符合要求的对象的浅拷贝（list[0]是个对象）//正解 这里就是浅拷贝 //list[0]的引用值指向原来的dataSource
            //let list = dataSource.filter(data=>data.id!==item.rightId) //filter只能filter一层数据，所以分grade处理 filter只能返回一层数据。当选filter!==id3时候，这个id2对象被剔除，所以以上方法不行
            let list = dataSource.filter(data => data.id == item.rightId) //如何找得到rightId API item拿得到rightId,正常的多层数据结构就拿不到。
            //console.log(dataSource.filter(data=>data.id==item.id))//输出：[]
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setdataSource([...dataSource])
        }
    }

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} />
        </div>
    )
}
