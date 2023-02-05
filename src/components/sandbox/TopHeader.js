import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

export default function TopHeader() {
    const [collapsed] = useState(true)
    return (
        <Header 
          //style在书写的时候要注意它接收的值是个对象
          style={{
            padding: 0,
            
          }}
        >
          {collapsed?<MenuUnfoldOutlined/>:<MenuFoldOutlined/>}
        </Header>
    )
}
