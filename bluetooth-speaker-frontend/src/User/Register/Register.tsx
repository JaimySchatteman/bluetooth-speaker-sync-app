import React, { FunctionComponent } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./Register.less";
// @ts-ignore
import { Link, Screen } from "react-tiger-transition";
import { Redirect, useLocation } from "react-router-dom";
import useAuthentication from "../useAuthentication";
import BackgroundAnimation from "../../Common/BackgroundAnimation/BackgroundAnimation";

const Register: FunctionComponent = () => {
  const { isLoggedIn, handleRegister } = useAuthentication();
  const { pathname } = useLocation();

  return isLoggedIn ? (
    <Redirect to={{ pathname: "/musicrooms", state: { previousPath: pathname } }} />
  ) : (
    <Screen>
      <Row className="register-container" justify="center" align="middle">
        <Col className="form-container" flex="auto">
          <h1>Register</h1>
          <h2>We&apos;re glad you&apos;re here</h2>
          <Form name="register" className="register-form" onFinish={handleRegister} layout="vertical" scrollToFirstError>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail",
                },
                {
                  required: true,
                  message: "Please enter your E-mail",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-mail address" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="password_confirmation"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement"))),
                },
              ]}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
                or <Link to={{ pathname: "/login", state: { previousPath: pathname } }}>Sign in</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <BackgroundAnimation />
    </Screen>
  );
};

export default Register;
