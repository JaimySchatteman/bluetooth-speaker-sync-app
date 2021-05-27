import React, { memo, useCallback, useEffect, useState } from "react";
import "./MusicRoom.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";
import SearchBarYoutube from "./SearchBarYoutube";
import Track from "../Common/Objects/Track";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useParams } from "react-router-dom";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import queueIcon from "./queue.svg";
import { useRecoilValue } from "recoil";
import UserState from "../GlobalState/UserState";
import musicIcon from "./music.svg";
import Echo from "laravel-echo";
import { useCookies } from "react-cookie";
import { User } from "../Common/Objects/User";

type MusicRoomRouteParams = {
  id?: string | undefined;
};

const pusher = require("pusher-js");

const MusicRoom = () => {
  const [musicRoom, setMusicRoom] = useState<MusicRoomType>();
  const { id } = useParams<MusicRoomRouteParams>();
  const user = useRecoilValue(UserState);
  const [{ accessToken }] = useCookies();
  const options = {
    broadcaster: "pusher",
    key: "5678912",
    secret: "56789123",
    cluster: "mt1",
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    wssHost: window.location.hostname,
    wssPort: 6001,
    enabledTransports: ["ws", "wss"],
    disableStats: true,
    //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  };

  const [echo] = useState(new Echo(options));
  const [isListeningToTracks, setIsListeningToTracks] = useState<boolean>(false);
  const [isListeningToUsers, setIsListeningToUsers] = useState<boolean>(false);

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

  const addTrackToQueue = useCallback(
    (newTrack: Track) => {
      console.log(musicRoom);
      if (musicRoom) {
        console.log("websocket add");
        const newQueue = [...musicRoom.queue.tracks, newTrack];
        updateQueue(newQueue);
      }
    },
    [musicRoom, updateQueue],
  );

  const updateSocketQueue = useCallback(
    ({ track }: any) => {
      addTrackToQueue(track);
    },
    [addTrackToQueue],
  );

  const updateUsers = useCallback(
    (newUsers: User[]) => {
      if (musicRoom) {
        const newMusicRoom: MusicRoomType = { ...musicRoom };
        newMusicRoom.users = newUsers;
        setMusicRoom(newMusicRoom);
      }
    },
    [musicRoom],
  );

  const addUserToRoom = useCallback(
    (data: any) => {
      console.log(data);
      if (musicRoom) {
        const newUsers = [...musicRoom.users, data.user];
        updateUsers(newUsers);
      }
    },
    [musicRoom, updateUsers],
  );

  const removeUserFromRoom = useCallback(
    (data: any) => {
      console.log(data);
      /*if (musicRoom) {
        const newUsers = musicRoom.users.filter(iterUSer => data.user.id !== iterUSer.id);
        updateUsers(newUsers);
      }*/
    },
    [musicRoom, updateUsers],
  );

  useEffect(() => {
    if (!isListeningToTracks && musicRoom) {
      setIsListeningToTracks(true);
      echo.listen(`track.${musicRoom.id}`, "TrackSend", updateSocketQueue);
    }
  }, [echo, isListeningToTracks, musicRoom, updateSocketQueue]);

  useEffect(() => {
    if (!isListeningToUsers && user && musicRoom) {
      setIsListeningToUsers(true);
      echo.listen(`musicroom.${musicRoom.id}`, "UserJoinMusicroom", addUserToRoom);
      echo.listen(`musicroom.${musicRoom.id}`, "UserLeaveMusicroom", removeUserFromRoom);
    }
  }, [addUserToRoom, echo, isListeningToUsers, user, removeUserFromRoom, musicRoom]);

  useEffect(() => {
    if (user) {
      addUserToMusicRoom().then(() => {
        getMusicRoom();
      });

      return function () {
        deleteUserFromMusicRoom();
      };
    }
  }, [addUserToMusicRoom, deleteUserFromMusicRoom, getMusicRoom, user]);

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
      await http.post("track/", { queue_id: musicRoom?.queue.id, ...track });
    },
    [musicRoom?.queue.id],
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
