import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useLocation } from "react-router-dom";
import { User } from "../Common/Objects/User";
import http from "../Common/Utilities/HttpModule";
import "./MusicRooms.less";
import { Card, Avatar, Col, Row, Space, Button } from "antd";
import MusicRoom from "../MusicRoom/MusicRoom";
import { ArrowRightOutlined, CustomerServiceOutlined, PlusCircleOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

type MusicRoom = {
  id: number;
  title: string;
  participants: User[];
};

const MusicRooms = () => {
  const { pathname } = useLocation();
  const [musicRooms, setMusicRooms] = useState<MusicRoom[] | undefined>();

  const getMusicRooms = useCallback(async (): Promise<void> => {
    const { data } = await http.get("/musicrooms");
    setMusicRooms(data);
  }, []);

  useEffect(() => {
    getMusicRooms();
  }, []);

  return (
    <Screen className="music-rooms">
      <Row align="middle" justify="space-between">
        <h1 className="musicrooms-title">All Music Rooms</h1>
        <Link to={{ pathname: "/create-musicroom", state: { previousPath: pathname } }}>
          <Button size={"large"} type="primary" shape="round" icon={<PlusCircleOutlined />}>
            Create Room
          </Button>
        </Link>
      </Row>
      <Link to={{ pathname: "/musicroom", state: { previousPath: pathname } }}>To Music Room</Link>
      <Row>
        <Col xs={24} sm={12} md={8} lg={8} xl={6}>
          <Link to={{ pathname: "/musicroom/1", state: { previousPath: pathname } }}>
            <Card
              hoverable
              title={"Musicroom 1"}
              extra={
                <Space>
                  Join <ArrowRightOutlined />
                </Space>
              }
            >
              <Row align="middle" justify="space-between">
                <Row align="middle">
                  <TeamOutlined style={{ fontSize: 20, color: "#6E798C" }} />
                  <h3 className="amount-participants">6</h3>
                </Row>

                <Avatar.Group maxCount={3}>
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>S</Avatar>;
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                </Avatar.Group>
              </Row>
            </Card>
          </Link>
        </Col>
        {musicRooms &&
          musicRooms.map(({ id, title, participants }: MusicRoom) => (
            <Col key={id} xs={1} sm={2} md={3} lg={4}>
              <Card hoverable title={title}>
                <UserOutlined size={19} />
                <Avatar.Group>
                  {participants.map(({ id: userId, userName }: User) => {
                    return (
                      <Avatar
                        key={userId}
                        style={{
                          color: "#001529",
                          backgroundColor: "#67EBC1",
                        }}
                      >
                        {userName.charAt(0)}
                      </Avatar>
                    );
                  })}
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                  <Avatar style={{ color: "#001529", backgroundColor: "#67EBC1" }}>A</Avatar>
                </Avatar.Group>
              </Card>
            </Col>
          ))}
      </Row>
    </Screen>
  );
};

export default MusicRooms;
