import React, { memo, useCallback, useEffect, useState } from "react";
import "./MusicRoom.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";
import SearchBarYoutube from "./SearchBarYoutube";
import Track from "../Common/Objects/Track";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useLocation, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  PlaySquareOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import queueIcon from "./queue.svg";
import { useRecoilValue } from "recoil";
import UserState from "../GlobalState/UserState";
import musicIcon from "./music.svg";

type MusicRoomRouteParams = {
  id?: string | undefined;
};

const MusicRoom = () => {
  const { pathname } = useLocation();
  const { id } = useParams<MusicRoomRouteParams>();
  const [musicRoom, setMusicRoom] = useState<MusicRoomType>();
  const user = useRecoilValue(UserState);

  const getMusicRoom = useCallback(async () => {
    try {
      const { data } = await http.get<MusicRoomType>("musicroom/" + id);
      console.log(data);
      setMusicRoom(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const addUserToMusicRoom = useCallback(async () => {
    try {
      const { data } = await http.post<MusicRoomType>("musicroom/" + id, { user_id: user?.id });
    } catch (e) {
      console.log(e);
    }
  }, [id, user?.id]);

  const deleteUserFromMusicRoom = useCallback(async () => {
    try {
      await http.delete<MusicRoomType>("musicroom/" + id + "/user/" + user?.id);
    } catch (e) {
      console.log(e);
    }
  }, [id, user?.id]);

  useEffect(() => {
    addUserToMusicRoom().then(() => {
      getMusicRoom();
    });

    return function () {
      deleteUserFromMusicRoom();
    };
  }, [addUserToMusicRoom, deleteUserFromMusicRoom, getMusicRoom]);

  const handleRemoveFromQueue = useCallback((id: string) => {
    console.log("delete");
  }, []);

  const handleAddToQueue = useCallback((video: Track) => {
    console.log("add");
  }, []);

  const updateQueue = useCallback(
    (newQueue: Track[]) => {
      if (musicRoom) {
        const newMusicRoom: MusicRoomType = { ...musicRoom };
        newMusicRoom.queue.tracks = newQueue;
        setMusicRoom(newMusicRoom);
      }
    },
    [musicRoom],
  );

  const nextVideo = useCallback(() => {
    if (musicRoom) {
      const newQueue: Track[] = [...musicRoom.queue.tracks];
      newQueue.shift();
      updateQueue(newQueue);
    }
  }, [musicRoom, updateQueue]);

  return (
    <Screen className="music-room">
      <Row>
        <Link to={{ pathname: "/", state: { previousPath: pathname } }}>
          <ArrowLeftOutlined /> Back
        </Link>
      </Row>

      <Row className="music-room-info">
        <Col className="title-container">
          <h1>
            <CustomerServiceOutlined /> {musicRoom?.title}
          </h1>
        </Col>
        <Col className="musicroom-user-info">
          <Space className="owner" size="small">
            <UserOutlined />
            <h3 className="owner-name">{musicRoom?.owner.name}</h3>
          </Space>

          <Space className="users" size="small">
            <TeamOutlined />
            <Avatar.Group maxCount={3}>
              {musicRoom &&
                musicRoom.users.length > 0 &&
                musicRoom.users.map(({ id, name }) => {
                  return (
                    <Avatar
                      key={id}
                      style={{
                        color: "#001529",
                        backgroundColor: "#67EBC1",
                      }}
                    >
                      {name.charAt(0).toUpperCase()}
                    </Avatar>
                  );
                })}
            </Avatar.Group>
          </Space>
        </Col>
      </Row>

      <Row>
        <Col xs={24} lg={12}>
          <SearchBarYoutube onAddToQueue={handleAddToQueue} />
        </Col>
      </Row>

      <Row className="music-room-content" justify="space-between" align="top" gutter={24}>
        {musicRoom && (
          <Col xs={24} lg={12} xl={16} className="player-search-container">
            <div className="player-wrapper">
              <div className="react-player-substitution">
                <img className="music-icon" src={musicIcon} alt="music-icon" />
              </div>

              <ReactPlayer
                className="react-player"
                playing={false}
                url={
                  musicRoom && musicRoom.queue.tracks.length > 0
                    ? "https://www.youtube.com/watch?v=" + musicRoom.queue.tracks[0].id
                    : undefined
                }
                width="100%"
                height="100%"
                onEnded={nextVideo}
                controls={true}
              />
            </div>
          </Col>
        )}
        <Col xs={24} lg={12} xl={8} className="queue-container">
          <h3 className="queue-title">
            <img src={queueIcon} alt="queue-icon" /> Next Up
          </h3>
          <Queue queue={musicRoom?.queue.tracks} onRemoveFromQueue={handleRemoveFromQueue} />
        </Col>
      </Row>
    </Screen>
  );
};

export default memo(MusicRoom);
