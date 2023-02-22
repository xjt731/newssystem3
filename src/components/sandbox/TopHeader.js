import React, { useState } from 'react'
import { Layout, Dropdown,Menu ,Avatar} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
const { Header } = Layout;

function TopHeader(props) {
  console.log(props)
  //自己不需要有这个状态，用collapsedReducer来的
    /* const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    } */

    const changeCollapsed = ()=>{
      //要求父组件dispatch mapDispatchToProps 里的action对象 {type: "changeCollapsed"} //CollApsedReducer里的action被执行
      props.changeCollapsed()
    }

    const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))

    const menu = (
        <Menu>
            <Menu.Item>
                {roleName}
            </Menu.Item>
            <Menu.Item danger onClick={()=>{
                localStorage.removeItem("token")
                // console.log(props.history)
                props.history.replace("/login")
            }}>退出</Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
                props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }

            <div style={{ float: "right" }}>
                <span>欢迎{username}回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>

    )
}
const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>{ //（state：解构state） //state 输出：{CollApsedReducer: {…}}: CollApsedReducer: {isCollapsed: true}
  //把prevState状态从CollApsedReducer映射成属性
  //console.log(state)  //{CollApsedReducer: {…}}: CollApsedReducer: {isCollapsed: true}
  return {
    a:1, // function TopHeader(props){console.log(props)} 会有一个a属性{a:1}
    isCollapsed //拿到父组件的值
  }
}

const mapDispatchToProps = {
  // 此时props多了一个 changeCollapsed: ƒ () 属性
  changeCollapsed(){ //dispatch一个action对象
      return {
          type: "changeCollapsed"
          // payload:
      }//action 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopHeader))
/*
  connect(
   // mapStateToProps  
   // mapDispatchToProps
  )(被包装的组件)
 */