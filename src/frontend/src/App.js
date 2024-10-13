import React, { useEffect, useState } from "react";
import './App.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {getAllStudents}  from "./client";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];



function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [students, setStudents] = useState([]);

    const fetchStudents = () =>
        getAllStudents()
            .then(res=> res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            })

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    if(students.length <= 0){
        return "no data";
    }

  return <Layout
      style={{
          minHeight: '100vh',
      }}
  >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
          <Header
              style={{
                  padding: 0,
                  background: colorBgContainer,
              }}
          />
          <Content
              style={{
                  margin: '0 16px',
              }}
          >
              <Breadcrumb
                  style={{
                      margin: '16px 0',
                  }}
              >
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div
                  style={{
                      padding: 24,
                      minHeight: 360,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                  }}
              >
                  Bill is a cat.
              </div>
          </Content>
          <Footer
              style={{
                  textAlign: 'center',
              }}
          >
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
      </Layout>
  </Layout>
}

export default App;