import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./MusicRoom.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";
import SearchBarYoutube from "./SearchBarYoutube";
import Track from "../Common/Objects/Track";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useParams } from "react-router-dom";
import {
  PauseCircleFilled,
  PauseCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, notification, Row, Space } from "antd";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import queueIcon from "./queue.svg";
import { useRecoilValue } from "recoil";
import UserState from "../GlobalState/UserState";
import musicIcon from "./music.svg";
import Echo from "laravel-echo";
import { User } from "../Common/Objects/User";

const classNames = require("classnames");

type MusicRoomRouteParams = {
  id?: string | undefined;
};

const MusicRoom = () => {
  const [musicRoom, setMusicRoom] = useState<MusicRoomType>();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const { id } = useParams<MusicRoomRouteParams>();
  const user = useRecoilValue(UserState);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = useRef<ReactPlayer>(null);

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
  };

  const pusher = require("pusher-js");
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

  const addTrackToQueueFromSocket = useCallback(
    ({ track }: any) => {
      addTrackToQueue(track);
    },
    [addTrackToQueue],
  );

  const removeTrackFromQueue = useCallback(
    (trackId: number) => {
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

  const removeTrackToQueueFromSocket = useCallback(
    ({ track }: any) => {
      removeTrackFromQueue(track.id);
    },
    [removeTrackFromQueue],
  );

  const startPlaying = useCallback(() => {
    if (musicRoom) {
      console.log(musicRoom.queue.started_playing_at_time);
      if (player && musicRoom.queue.started_playing_at_time !== "00:00:00.000" && musicRoom.queue.pauzed_at_time !== "00:00:00") {
        const timePauseArray: string[] = musicRoom.queue.pauzed_at_time.split(":");
        const timeInSong: number = 24 * parseInt(timePauseArray[0]) + 60 * parseInt(timePauseArray[1]) + 60 * parseInt(timePauseArray[2]);

        if (player.current) {
          player.current.seekTo(timeInSong, "seconds");
        }
        setIsPlaying(true);
      } else {
        setIsPlaying(true);
      }
    }
  }, [musicRoom]);

  const setTimerForPlaying = useCallback(
    ({ started_playing_at }: any) => {
      if (musicRoom) {
        const newQueue = { ...musicRoom.queue };
        newQueue.started_playing_at_time = started_playing_at;

        const currentTime = new Date();
        const timeArray = started_playing_at.split(":");
        const timeToStartPlaying = new Date();
        timeToStartPlaying.setHours(parseInt(timeArray[0]));
        timeToStartPlaying.setMinutes(parseInt(timeArray[1]));
        const secondsAndMiliSecs = timeArray[2].split(".");
        timeToStartPlaying.setSeconds(parseInt(secondsAndMiliSecs[0]));
        timeToStartPlaying.setMilliseconds(parseInt(secondsAndMiliSecs[1]));
        console.log(timeToStartPlaying);
        if (currentTime.getTime() > timeToStartPlaying.getTime()) {
          setIsPlaying(true);
        } else {
          const difference: number = timeToStartPlaying.getTime() - currentTime.getTime();
          setTimeout(startPlaying, difference);
        }
      }
    },
    [musicRoom, startPlaying],
  );

  const pausePlayer = useCallback(
    ({ pauzed_at_time }: any) => {
      setIsPlaying(false);
      if (musicRoom) {
        const newQueue = { ...musicRoom.queue };
        newQueue.pauzed_at_time = pauzed_at_time;
      }
    },
    [musicRoom],
  );

  useEffect(() => {
    if (!isListeningToTracks && musicRoom) {
      setIsListeningToTracks(true);
      echo.listen(`track.${musicRoom.queue.id}`, "TrackSend", addTrackToQueueFromSocket);
      echo.listen(`track.${musicRoom.queue.id}`, "TrackDelete", removeTrackToQueueFromSocket);
      echo.listen(`queue.${musicRoom.queue.id}`, "StartPlayingAt", setTimerForPlaying);
      echo.listen(`queue.${musicRoom.queue.id}`, "PauzedAt", pausePlayer);
    }
  }, [addTrackToQueueFromSocket, echo, isListeningToTracks, musicRoom, pausePlayer, removeTrackToQueueFromSocket, setTimerForPlaying]);

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
      if (musicRoom) {
        if (musicRoom.users.some(userInRoom => data.user.id === userInRoom.id)) return;
        const newUsers = [...musicRoom.users, data.user];
        updateUsers(newUsers);
      }
    },
    [musicRoom, updateUsers],
  );

  const removeUserFromRoom = useCallback(
    (data: any) => {
      if (musicRoom) {
        const activeUsers = [...musicRoom.users];
        const newUsers = activeUsers.filter(iterUSer => data.user.id !== iterUSer.id);
        updateUsers(newUsers);
      }
    },
    [musicRoom, updateUsers],
  );

  useEffect(() => {
    if (!isListeningToUsers && user && musicRoom) {
      setIsListeningToUsers(true);
      echo.listen(`musicroom.${musicRoom.id}`, "UserJoinMusicroom", addUserToRoom);
      echo.listen(`musicroom.${musicRoom.id}`, "UserLeaveMusicroom", removeUserFromRoom);
    }
  }, [addUserToRoom, echo, isListeningToUsers, user, removeUserFromRoom, musicRoom]);

  useEffect(() => {
    console.log("test called");

    if (firstRender && musicRoom) {
      setFirstRender(false);
      console.log("test yes musicroom");

      if (musicRoom.queue.started_playing_at_time !== "00:00:00.000" && musicRoom.queue.pauzed_at_time === "00:00:00") {
        console.log("test yes time");
        console.log("resume");
        const timeArray = musicRoom.queue.started_playing_at_time.split(":");
        const timeToStartPlaying = new Date();
        timeToStartPlaying.setHours(parseInt(timeArray[0]));
        timeToStartPlaying.setMinutes(parseInt(timeArray[1]));
        const secondsAndMiliSecs = timeArray[2].split(".");
        timeToStartPlaying.setSeconds(parseInt(secondsAndMiliSecs[0]));
        timeToStartPlaying.setMilliseconds(parseInt(secondsAndMiliSecs[1]));

        const nowTime = new Date();

        const timeInSong = Math.abs((nowTime.getTime() - timeToStartPlaying.getTime()) / 1000);
        if (player.current) {
          player.current.seekTo(timeInSong, "seconds");
        }
        setIsPlaying(true);
      }
    }
  }, [firstRender, musicRoom]);

  useEffect(() => {
    if (user) {
      addUserToMusicRoom().then(() => {
        getMusicRoom();
      });
    }

    return function () {
      deleteUserFromMusicRoom();
      echo.disconnect();
    };
  }, [addUserToMusicRoom, deleteUserFromMusicRoom, echo, getMusicRoom, user]);

  const reactPlayerStyle = classNames({
    "react-player": true,
    "isnt-owner": user?.id !== musicRoom?.owner.id,
  });

  const handleAddToQueue = useCallback(
    async (track: Track) => {
      try {
        await http.post("track/", { queue_id: musicRoom?.queue.id, ...track });
      } catch (e) {
        console.log(e);
      }
    },
    [musicRoom?.queue.id],
  );

  const handleRemoveFromQueue = useCallback(
    async (trackId: number) => {
      try {
        await http.delete("musicroom/" + musicRoom?.id + "/track/" + trackId);
        removeTrackFromQueue(trackId);
      } catch (e) {
        console.log(e);
      }
    },
    [musicRoom?.id, removeTrackFromQueue],
  );

  const nextVideo = useCallback(async () => {
    if (musicRoom && user) {
      if (user.id === musicRoom.owner.id) {
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() + 3);
        const formattedTimestamp: string =
          timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds() + "." + timestamp.getMilliseconds();
        try {
          await http.delete("musicroom/" + musicRoom?.id + "/track/" + musicRoom.queue.tracks[0].id);
          await http.post(`musicroom/${musicRoom.id}/pauzedAt`, { pauze_at: "00:00:00" });
          await http.post(`musicroom/${musicRoom.id}/startAt`, { start_at: formattedTimestamp });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [musicRoom, user]);

  const openPauseNotification = useCallback(() => {
    notification.success({
      message: "The song is paused",
      description: "Other users have been notified of this action.",
    });
  }, []);

  const openStartNotification = useCallback(() => {
    notification.success({
      message: "Song will start in a moment",
      description: "Other users have been notified of this action.",
    });
  }, []);

  const handlePlayPause = useCallback(async () => {
    if (musicRoom && player) {
      if (isPlaying) {
        openPauseNotification();
        if (player.current) {
          const secondsInVideo = player.current.getCurrentTime();
          const formattedTimestamp = new Date(secondsInVideo * 1000).toISOString().substr(11, 8);
          try {
            await http.post(`musicroom/${musicRoom.id}/pauzedAt`, { pauze_at: formattedTimestamp });
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        openStartNotification();
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() + 3);
        const formattedTimestamp: string =
          timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds() + "." + timestamp.getMilliseconds();
        try {
          await http.post(`musicroom/${musicRoom.id}/startAt`, { start_at: formattedTimestamp });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }, [isPlaying, musicRoom, openPauseNotification, openStartNotification]);
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
                ref={player}
                className={reactPlayerStyle}
                playing={isPlaying}
                url={musicRoom && musicRoom.queue.tracks.length > 0 ? musicRoom.queue.tracks[0].url : undefined}
                width="100%"
                height="100%"
                onEnded={nextVideo}
                controls={true}
              />
            </div>
            <div className={"player-buttons-wrapper"}>
              {user?.id === musicRoom.owner.id &&
                (!isPlaying ? <PlayCircleFilled onClick={handlePlayPause} /> : <PauseCircleFilled onClick={handlePlayPause} />)}
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
