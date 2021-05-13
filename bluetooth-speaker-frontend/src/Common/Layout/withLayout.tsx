import React, { FunctionComponent } from "react";
import { Layout, Menu } from "antd";
import Navbar from "../Navbar/Navbar";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";

const { Sider } = Layout;
const { SubMenu } = Menu;

type WithLayoutProps = {
  children: JSX.Element;
  isWrapping: boolean;
};

const WithLayout: FunctionComponent<WithLayoutProps> = ({ children, isWrapping }: WithLayoutProps) => {
  return isWrapping ? (
    <Layout className="layout">
      <Navbar />
      <Layout>
        <Sider theme={"dark"} width={200} collapsible={true} className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Listeners">
              <Menu.Item key="1">Kenny</Menu.Item>
              <Menu.Item key="2">Bart</Menu.Item>
              <Menu.Item key="3">Peter</Menu.Item>
              <Menu.Item key="4">Wim</Menu.Item>
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
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  ) : (
    <>{children}</>
  );
};

export default WithLayout;
