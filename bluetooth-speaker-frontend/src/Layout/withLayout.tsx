import React, { FunctionComponent } from "react";
import { Layout, Menu } from "antd";
import Navbar from "../Navbar/Navbar";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import Routes from "../Routes";
import { RecoilRoot } from "recoil";

const { Sider } = Layout;
const { SubMenu } = Menu;

type WithLayoutProps = {
  children: JSX.Element;
  isWrapping: boolean;
};

const WithLayout = ({ children, isWrapping }: WithLayoutProps) => {
  return isWrapping ? (
    <Layout>
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
        <Layout style={{ padding: "0 24px 24px" }}>{children}</Layout>
      </Layout>
    </Layout>
  ) : (
    <>{children}</>
  );
};

export default WithLayout;
