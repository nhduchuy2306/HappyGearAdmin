import React, { useState } from "react";
import {
  TableOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Input, Space } from "antd";
// import SearchBar from "./components/SearchBar/SearchBar";
const { Header, Content, Footer, Sider } = Layout;

const { Search } = Input;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("User Table", "/users", <TableOutlined />),
  getItem("Product Table", "/products", <TableOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onSearch = (value) => console.log(value);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 16,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,
          }}
        >
          Happy Gear Admin
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({key}) =>{
            navigate(key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: "center"
          }}
        >
          <Space>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Space>
          <Button>Logout</Button>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
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
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          HappyGear ©2022 Created by HappyGear
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
