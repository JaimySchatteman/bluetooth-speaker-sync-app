import React, { FunctionComponent } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import "./Login.less";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
// @ts-ignore
import { Link, glide } from "react-tiger-transition";

glide({
  name: "glide-left",
  direction: "left",
  duration: 600,
});

const Login: FunctionComponent = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row className="login-container" justify="center" align="middle">
      <Col className="form-container" span={10}>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Space direction="horizontal">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or{" "}
              <Link to="/register" transition="glide-left">
                register now!
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
