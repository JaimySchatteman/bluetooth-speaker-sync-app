import React, { FunctionComponent, useCallback } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
// @ts-ignore
import { Link, glide } from "react-tiger-transition";
import "./Login.less";
import http from "../Common/Utils/HttpService";
import AccessTokenState, { AccessToken } from "../GlobalState/AccesToken";
import axios from "axios";
import { useRecoilState } from "recoil";
import camelcaseKeys from "camelcase-keys";
import { Redirect, useHistory } from "react-router-dom";

glide({
  name: "glide-left",
  direction: "left",
  duration: 600,
});

glide({
  name: "glide-right",
  direction: "right",
  duration: 600,
});

const Login: FunctionComponent = () => {
  const [{ accessToken }, setAccessToken] = useRecoilState<AccessToken>(AccessTokenState);
  const history = useHistory();

  const onFinish = useCallback(async (values: any) => {
    try {
      const { data } = await http.post<AccessToken>("auth/login", values);
      const token: AccessToken = camelcaseKeys(data);
      setAccessToken(camelcaseKeys(token));
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token.accessToken}`,
      };
      history.push("/musicroom");
    } catch (e) {
      console.log(e);
    }
  }, []);

  return accessToken ? (
    <Redirect to="/musicroom" />
  ) : (
    <Row className="login-container" justify="center" align="middle">
      <Col className="form-container" flex="auto">
        <h1>Sign in</h1>
        <h2>Good to see you again!</h2>
        <Form name="login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
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
                Login
              </Button>
              Or
              <Link to="/register" transition="glide-left">
                Sign up
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
