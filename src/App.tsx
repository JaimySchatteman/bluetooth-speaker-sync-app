import React, { FunctionComponent } from "react";
import "./App.less";
import { Layout, Menu } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import Test from "./Devices/Test";
import SearchBarYoutube from "./Common/Components/SearchBarYoutube";

const { Sider, Header, Content } = Layout;
const { SubMenu } = Menu;

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider theme={"dark"} width={200} collapsible={true} className="site-layout-background">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<NotificationOutlined />}>
                option9
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: "100vh",
              }}
            >
              <Test />
              <SearchBarYoutube></SearchBarYoutube>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
