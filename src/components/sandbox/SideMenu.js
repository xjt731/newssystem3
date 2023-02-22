import React, { useEffect, useState } from 'react';
import {

  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined, MailOutlined, SettingOutlined,

  ContainerOutlined,
  DesktopOutlined,

  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { Layout, Menu, theme } from 'antd';
import {connect} from 'react-redux'
const { Header, Sider, Content } = Layout;




function SideMenu(props) {
  console.log(props)
  const [menu, setMenu] = useState([])
  //第一次渲染画面
  useEffect(() => {
    axios.get("http://localhost:3000/rights?_embed=children").then(res => {
      setMenu(res.data)
    })
  }, [])

  //convertObj为一个方法
  const convertObj = (label, key, icon, children) => {
    return { label, key, icon, children }
  }

  //映射对象
  const iconList = {
    "/home": <UserOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />
    //.......
  }

  //选择符合条件的数组返回
  function transform(list) {
    let arr = []
    list.forEach((item) => {
      if (item.children && item.children.length !== 0) {
        arr.push(convertObj(item.title, item.key, iconList[item.key], transform(item.children)))
      } else {
        if (item.pagepermisson) {
          arr.push(convertObj(item.title, item.key, iconList[item.key]))
        }
      }
    })
    return arr
  }

  //页面跳转方法
  const onClick = (e) => {
    console.log(props)
    props.history.push(e.key)
    const openKeys = ['/' + props.location.pathname.split('/')[1]]
    console.log(openKeys)
  }

  const selectKeys = [props.location.pathname]

  return (                                     
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        //defaultSelectedKeys 类型：string[]
        defaultSelectedKeys={selectKeys}
        //items	菜单内容	类型：ItemType[]  
        items={transform(menu)}
        onClick={onClick}
      />
    </Sider>
  )
}

const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>{ 
  return {
    a:1, 
    isCollapsed //拿到父组件的值
  }
}

export default connect(mapStateToProps)(withRouter(SideMenu))