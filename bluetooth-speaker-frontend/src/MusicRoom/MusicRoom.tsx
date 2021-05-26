import React, { memo, useCallback, useEffect, useState } from "react";
import "./MusicRoom.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";
import SearchBarYoutube from "./SearchBarYoutube";
import Track from "../Common/Objects/Track";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useLocation, useParams } from "react-router-dom";
import { ArrowLeftOutlined, CustomerServiceOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import queueIcon from "./queue.svg";
import { useRecoilValue } from "recoil";
import UserState from "../GlobalState/UserState";
import musicIcon from "./music.svg";
import { useCookies } from "react-cookie";
import Echo from "laravel-echo";

type MusicRoomRouteParams = {
  id?: string | undefined;
};

const MusicRoom = () => {
  const [musicRoom, setMusicRoom] = useState<MusicRoomType>();
  const { id } = useParams<MusicRoomRouteParams>();
  const user = useRecoilValue(UserState);
  const [{ accessToken }] = useCookies();

  const pusher = require("pusher-js");

  const options = {
    broadcaster: "pusher",
    key: "d4b9af39550bd7832778",
    cluster: "mt1",
    forceTLS: true,
    encrypted: false,

    //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: "http://localhost:8000/broadcasting/auth/",
    // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  };

  const echo = new Echo(options);

  echo.private(`App.User.${user?.id}`).listen("track", (data: any) => {
    console.log("test");
    console.log(data);
  });

  const getMusicRoom = useCallback(async () => {
    try {
      const { data } = await http.get<MusicRoomType>("musicroom/" + id);
      setMusicRoom(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const addUserToMusicRoom = useCallback(async () => {
    try {
      await http.post<MusicRoomType>("musicroom/" + id, { user_id: user?.id });
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

  const handleRemoveFromQueue = useCallback(
    async (trackId: number) => {
      await http.delete("musicroom/" + musicRoom?.id + "/track/" + trackId);
      if (musicRoom) {
        let newQueue: Track[] = [...musicRoom.queue.tracks];
        newQueue = newQueue.filter(({ id }: Track) => {
          return id !== trackId;
        });
        updateQueue(newQueue);
      }
    },
    [musicRoom, updateQueue],
  );

  const handleAddToQueue = useCallback(
    async (track: Track) => {
      const { data } = await http.post("track/", { queue_id: musicRoom?.queue.id, ...track });
      if (musicRoom) {
        const newQueue = [...musicRoom.queue.tracks, data];
        updateQueue(newQueue);
      }
    },
    [musicRoom, updateQueue],
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
      <Row className="music-room-info">
        <Col className="title-container">
          <h1>{musicRoom?.title}</h1>
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
                      size="large"
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

      <Row className="music-room-content" justify="space-between" align="top" gutter={24}>
        {musicRoom && (
          <Col xs={24} lg={12} xl={16} className="player-search-container">
            <SearchBarYoutube onAddToQueue={handleAddToQueue} />
            <div className="player-wrapper">
              <div className="react-player-substitution">
                <img className="music-icon" src={musicIcon} alt="music-icon" />
              </div>

              <ReactPlayer
                className="react-player"
                playing={false}
                url={musicRoom && musicRoom.queue.tracks.length > 0 ? musicRoom.queue.tracks[0].url : undefined}
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
          <Queue queue={musicRoom?.queue.tracks.slice(1, musicRoom?.queue.tracks.length)} onRemoveFromQueue={handleRemoveFromQueue} />
        </Col>
      </Row>
    </Screen>
  );
};

export default memo(MusicRoom);
