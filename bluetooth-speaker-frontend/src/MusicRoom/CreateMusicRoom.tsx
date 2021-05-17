import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { LockOutlined, MailOutlined, SmileOutlined } from "@ant-design/icons";
import BackgroundAnimation from "../Common/BackgroundAnimation/BackgroundAnimation";
// @ts-ignore
import { Link, Screen } from "react-tiger-transition";
import "./CreateMusicRoom.less";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";

const CreateMusicRoom = () => {
  const handleCreateRoom = useCallback(async (values: any) => {
    try {
      const { data } = await http.post<MusicRoomType>("musicroom", { title: values.title });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Screen>
      <Row className="create-room-container" justify="center" align="middle">
        <Col className="form-container" flex="auto">
          <h1>Enter a title</h1>
          <h2>
            Be orignal! <SmileOutlined />
          </h2>
          <Form name="title" className="login-form" initialValues={{ remember: true }} onFinish={handleCreateRoom}>
            <Form.Item name="title" rules={[{ required: true, message: "The title must be at least 1 character long!" }]}>
              <Input placeholder="Please enter the name of the room..." />
            </Form.Item>

            <Form.Item>
              <Space direction="horizontal">
                <Button type="primary" htmlType="submit" className="music-room-form-button">
                  Create
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <BackgroundAnimation />
    </Screen>
  );
};

export default CreateMusicRoom;
