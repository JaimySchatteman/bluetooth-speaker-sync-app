import React from "react";
import { AutoComplete, Button, Checkbox, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Register.less";

// @ts-ignore
import { Link, glide } from "react-tiger-transition";

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

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row className="register-container" justify="center" align="middle">
      <Col className="form-container" span={10}>
        <Form
          form={form}
          name="register-form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
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
            <Input.Password />
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
