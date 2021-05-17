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
      <Content>{children}</Content>
    </Layout>
  ) : (
    <>{children}</>
  );
};

export default WithLayout;
