import React, { FunctionComponent, useCallback } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./Register.less";
// @ts-ignore
import { Link, glide } from "react-tiger-transition";
import http from "../../Common/Utils/HttpService";
import AccessTokenState, { AccessToken } from "../../GlobalState/AccesToken";
import camelcaseKeys from "camelcase-keys";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useHistory, Redirect } from "react-router-dom";

glide({
  name: "glide-right",
  direction: "right",
  duration: 600,
});

glide({
  name: "glide-left",
  direction: "left",
  duration: 600,
});

const Register: FunctionComponent = () => {
  const [form] = Form.useForm();
  const [{ accessToken }, setAccessToken] = useRecoilState<AccessToken>(AccessTokenState);
  const history = useHistory();

  const onFinish = useCallback(async (values: any) => {
    try {
      const { data } = await http.post<AccessToken>("auth/register", values);
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

  return accessToken !== "" ? (
    <Redirect to="/musicroom" />
  ) : (
    <Row className="register-container" justify="center" align="middle">
      <Col className="form-container" flex="auto">
        <h1>Register</h1>
        <h2>We&apos;re glad you&apos;re here</h2>
        <Form form={form} name="register" className="register-form" onFinish={onFinish} layout="vertical" scrollToFirstError>
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
              or{" "}
              <Link to={"/login"} transition="glide-right">
                Sign in
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
