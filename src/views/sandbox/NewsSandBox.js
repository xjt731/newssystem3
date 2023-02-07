import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import Nopermission from './nopermission/Nopermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'

//css
import './NewsSandBox.css'
//antd
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout;
export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu name="首页"></SideMenu>
      {/* JSX属性书写：class属性改为className */}
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,

        }}
      >
        <Switch>
          {/* 使用JSX在视图中去插入数据 */}
          <Route path="/home" component={Home} />
          <Route path="/user-manage/list" component={UserList} />
          <Route path="/right-manage/role/list" component={RoleList} />
          <Route path="/right-manage/right/list" component={RightList} />
          {/* 重定向 */}
          <Redirect from="/" to="/home" exact />
          <Route path="*" component={Nopermission} />
        </Switch>
        Content
      </Content>
      </Layout>

      


      
    </Layout>

  )
}
