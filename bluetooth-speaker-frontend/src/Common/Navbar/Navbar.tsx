import React, { FunctionComponent, useCallback, useMemo } from "react";
import { Button, Dropdown, Layout } from "antd";
import { Avatar, Col, Menu, Row } from "antd";
import { useRecoilValue } from "recoil";
import UserState, { User } from "../../GlobalState/UserState";
import "./Navbar.less";
import http from "../Utils/HttpService";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const Navbar: FunctionComponent = () => {
  const user = useRecoilValue<User>(UserState);
  const { firstName, lastName } = user;
  const history = useHistory();

  const initials = useMemo((): string => {
    return firstName.slice(0, 1) + lastName.split(" ").reduce((accumulator, current) => (accumulator += current.slice(0, 1)), "");
  }, [firstName, lastName]);

  const onLogout = useCallback(async () => {
    try {
      await http.post("auth/logout");
    } catch (e) {
      console.log(e);
    }
  }, []);

  const dropdownMenu = useMemo(
    () => (
      <Menu mode="vertical" className="dropdown_menu">
        <Menu.Item key="1">Account</Menu.Item>
        <Menu.Item key="2">
          <Button shape="round" type="primary" onClick={onLogout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    ),
    [],
  );

  return (
    <Header className="navbar">
      <Row justify="space-between">
        <Col>
          <div className="logo" />
        </Col>
        <Col>
          <Dropdown className="dropdown" overlay={dropdownMenu} placement={"bottomRight"} arrow>
            <Avatar>{initials}</Avatar>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
