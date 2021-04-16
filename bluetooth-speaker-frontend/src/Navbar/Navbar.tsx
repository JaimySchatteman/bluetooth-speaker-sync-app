import React, {FunctionComponent, useMemo} from "react";
import {Layout} from "antd";
import {Avatar, Col, Menu, Row} from "antd";
import {useRecoilState, useRecoilValue} from "recoil";
import userState, {User} from "../GlobalState/userState";

const { Header } = Layout;

const Navbar: FunctionComponent = () => {
    const user = useRecoilValue<User>(userState);
    const {firstName, lastName} = user;

    const initials = useMemo((): string => {
        return (
            firstName.slice(0, 1) +
            lastName
                .split(" ")
                .reduce(
                    (accumulator, current) => (accumulator += current.slice(0, 1)),
                    ""
                )
        );
    }, [firstName, lastName]);

    return (
        <Header className="header">
            <Row justify="space-between">
                <Col>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Col>
                <Col>
                    <Avatar  >
                        {initials}
                    </Avatar>
                </Col>
            </Row>
        </Header>
    );
};

export default Navbar;