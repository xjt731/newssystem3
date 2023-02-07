import React, { useEffect,useState } from 'react';
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
import { withRouter  } from 'react-router-dom';
import axios from 'axios'
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;




function SideMenu(props) {
  const [menu, setMenu] = useState([])
  //第一次渲染画面
  useEffect(() => {
    axios.get("http://localhost:3000/rights?_embed=children").then(res => {
      setMenu(res.data)
      console.log(props)
    })
  }, [])

  //convertObj为一个方法
  const convertObj = (label, key, icon, children) =>{
    return {label, key, icon, children}
  }

  const iconList = {
      "/home":<UserOutlined />,
      "/user-manage": <UserOutlined />,
      "/user-manage/list": <UserOutlined />,
      "/right-manage": <UserOutlined />,
      "/right-manage/role/list": <UserOutlined />,
      "/right-manage/right/list": <UserOutlined />
      //.......
  }
  function transform(list) {
    let arr =[]
    list.forEach((item) => {
      if (item.children && item.children.length !== 0) {
        arr.push(convertObj(item.title,item.key, iconList[item.key],  transform(item.children)))
      } else {
        if (item.pagepermisson) {
          arr.push(convertObj(item.title,item.key, iconList[item.key]))
        }
      }
    })
    console.log(arr)

    return arr
  }
 
  const onClick = (e) => {
    console.log(props)
    props.history.push(e.key)
    
  }

  return (
    
        <Sider trigger={null} collapsible >
           首页信息-<span>{props.name}</span>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          //defaultSelectedKeys 类型：string[]
          defaultSelectedKeys={['1']}
          //items	菜单内容	类型：ItemType[]  
          items={transform(menu)}
          onClick={onClick}
        />
      </Sider>
    )
}

export default withRouter(SideMenu)