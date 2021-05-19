import React, { FunctionComponent } from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Login.less";
import { Redirect } from "react-router-dom";
import useAuthentication from "../useAuthentication";
import { useLocation } from "react-router-dom";
// @ts-ignore
import { Link, Screen } from "react-tiger-transition";
import BackgroundAnimation from "../../Common/BackgroundAnimation/BackgroundAnimation";

const Login: FunctionComponent = () => {
  const { isLoggedIn, handleLogin } = useAuthentication();
  const { pathname } = useLocation();

  return isLoggedIn ? (
    <Redirect to={{ pathname: "/", state: { previousPath: pathname } }} />
  ) : (
    <Screen>
      <Row className="login-container" justify="center" align="middle">
        <Col className="form-container" flex="auto">
          <h1>Sign in</h1>
          <h2>Good to see you again!</h2>
          <Form name="login" className="login-form" initialValues={{ remember: true }} onFinish={handleLogin}>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Space direction="horizontal">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Login
                </Button>
                Or
                <Link to={{ pathname: "/register", state: { previousPath: pathname } }}>Sign up</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <BackgroundAnimation />
    </Screen>
  );
};

export default Login;
