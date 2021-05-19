import React, { useCallback, useEffect, useState } from "react";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useLocation } from "react-router-dom";
import { User } from "../Common/Objects/User";
import http from "../Common/Utilities/HttpModule";
import "./MusicRooms.less";
import { Card, Avatar, Col, Row, Space, Button, Skeleton } from "antd";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import { ArrowRightOutlined, PlusCircleOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { PreviousLocationState } from "../Routes";

const MusicRooms = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [musicRooms, setMusicRooms] = useState<MusicRoomType[] | undefined>();

  const getMusicRooms = useCallback(async (): Promise<void> => {
    try {
      const { data } = await http.get("musicrooms");
      console.log(data);
      setMusicRooms(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMusicRooms().then(() => setIsLoading(false));
  }, [getMusicRooms]);

  return (
    <Screen className="music-rooms">
      <Row align="middle" justify="space-between">
        <h1 className="musicrooms-title">All Music Rooms</h1>
        <Link to={{ pathname: "/create", state: { previousPath: pathname } }}>
          <Button size={"large"} type="primary" shape="round" icon={<PlusCircleOutlined />}>
            Create Room
          </Button>
        </Link>
      </Row>
      <Row gutter={[24, 28]}>
        {!isLoading && musicRooms
          ? musicRooms.map(({ id, title, owner: { name }, users }) => {
              return (
                <Col key={id} xs={24} sm={12} md={8} lg={8} xl={6}>
                  <Link to={{ pathname: "/musicroom/" + id, state: { previousPath: pathname } }}>
                    <Card
                      hoverable
                      loading={isLoading}
                      title={title}
                      extra={
                        <Space>
                          Join <ArrowRightOutlined />
                        </Space>
                      }
                    >
                      <Row align="middle" justify="space-between">
                        <Col className="owner-container" span={24}>
                          <UserOutlined
                            style={{
                              fontSize: 18,
                              color: "#6E798C",
                              marginRight: 8,
                              marginTop: -3,
                            }}
                          />
                          <h3 className="owner-name">{name}</h3>
                        </Col>
                        <Col span={24} className="users-container">
                          <Row align="middle" justify="space-between">
                            <Col className="user-count">
                              <TeamOutlined style={{ fontSize: 20, color: "#6E798C", marginRight: 8 }} />
                              <h3 className="user-count-text">{users.length}</h3>
                            </Col>

                            <Col className="active-users-avatars">
                              <Avatar.Group maxCount={3}>
                                {users.length > 0 &&
                                  users.map(({ id, name }) => {
                                    return (
                                      <Avatar
                                        key={id}
                                        style={{
                                          color: "#001529",
                                          backgroundColor: "#67EBC1",
                                        }}
                                      >
                                        {name.charAt(0)}
                                      </Avatar>
                                    );
                                  })}
                              </Avatar.Group>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Link>
                </Col>
              );
            })
          : Array.from(Array(7)).map((item, index) => {
              return (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={6}>
                  <Card>
                    <Skeleton loading={isLoading} active>
                      <Meta title="Card title" description="This is the description" />
                    </Skeleton>
                  </Card>
                </Col>
              );
            })}
      </Row>
    </Screen>
  );
};
export default MusicRooms;
