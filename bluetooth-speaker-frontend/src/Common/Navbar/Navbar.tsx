import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Button, Dropdown, Layout, Space } from "antd";
import { Avatar, Col, Menu, Row } from "antd";
import { useRecoilValue } from "recoil";
import UserState from "../../GlobalState/UserState";
import { User } from "../Objects/User";
import "./Navbar.less";
import useAuthentication from "../../User/useAuthentication";
import logo from "./logo.svg";
import { CaretDownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar: FunctionComponent = () => {
  const user = useRecoilValue<User>(UserState);
  const { userName } = user;
  const { handleLogout } = useAuthentication();

  const initials = useMemo((): string => {
    return userName.charAt(0).toLocaleUpperCase();
  }, [userName]);

  const dropdownMenu = useMemo(
    () => (
      <Menu mode="vertical" className="dropdown_menu">
        <Menu.Item key="1">
          <UserOutlined /> Account
        </Menu.Item>
        <Button shape="round" type="primary" onClick={handleLogout}>
          Logout
          <LogoutOutlined />
        </Button>
      </Menu>
    ),
    [],
  );

  return (
    <Header className="navbar">
      <Row justify="space-between">
        <Col>
          <img className="logo" src={logo} alt="resonance" />
        </Col>
        <Col>
          <Dropdown className="dropdown" overlay={dropdownMenu} placement={"bottomRight"} arrow>
            <Space>
              <Avatar>{initials}</Avatar>
              <CaretDownOutlined />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
