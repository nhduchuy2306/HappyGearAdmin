
import React, {  useContext, useState } from "react";
import {
  TableOutlined
} from "@ant-design/icons";
import {  Layout, Menu, theme, Button } from "antd";
import { useNavigate, Route, Routes  } from "react-router-dom";
import { LoginContext } from './components/Context/LoginProvider'
 
import ProductPage from './components/Page/ProductPage';
import UserPage from "./components/Page/UserPage";
import OtherPage from "./components/Page/OtherPage";
import LoginPage from "./components/Page/LoginPage";
import storageService from "./api/storage";
// import SearchBar from "./components/SearchBar/SearchBar";
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
  getItem("User Table", "/users", <TableOutlined />),
  getItem("Product Table", "/products", <TableOutlined />),
  getItem("Other Table", "/others", <TableOutlined />),
];
const App = () => {

  const {isLogin, setIsLogin} = useContext(LoginContext);

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    setIsLogin(false);
    storageService.removeAccessToken();
  }

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
          onClick={({ key }) => {
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
          {!isLogin || <Button onClick={handleLogout}>Logout</Button>}
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >

          {isLogin || <LoginPage />}
          {!isLogin || <Routes>
            <Route path="/products" element={<ProductPage />}/>
            <Route path="/users" element={<UserPage />}/>
            <Route path="/others" element={<OtherPage/>} />
          </Routes>}
          
          {/* <Routes>
            <Route path="/products" element={<ProductPage />}/>
            <Route path="/users" element={<UserPage />}/>
            <Route path="/others" element={<OtherPage/>} />
          </Routes> */}
        

        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          HappyGear ??2022 Created by HappyGear
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
