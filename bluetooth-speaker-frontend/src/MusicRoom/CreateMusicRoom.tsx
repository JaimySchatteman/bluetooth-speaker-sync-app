import React, { useCallback } from "react";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { SmileOutlined } from "@ant-design/icons";
// @ts-ignore
import { Screen } from "react-tiger-transition";
import "./CreateMusicRoom.less";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import { useRecoilValue } from "recoil";
import UserState from "../GlobalState/UserState";
import { useHistory, useLocation } from "react-router-dom";

const CreateMusicRoom = () => {
  const user = useRecoilValue(UserState);
  const history = useHistory();
  const { pathname } = useLocation();

  const handleCreateRoom = useCallback(
    async (values: any) => {
      try {
        if (user) {
          const {
            data: { id },
          } = await http.post<MusicRoomType>("musicroom", { title: values.title, owner_id: user.id });
          history.push("musicroom/" + id, { previousPath: pathname });
        }
      } catch (e) {
        console.log(e);
      }
    },
    [user],
  );

  return (
    <Screen>
      <Row className="create-room-container" justify="center" align="middle">
        <Col className="form-container" flex="auto">
          <h1>
            Enter a name for <br /> your music room
          </h1>
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
    </Screen>
  );
};

export default CreateMusicRoom;
