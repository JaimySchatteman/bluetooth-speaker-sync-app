import React, { memo, useCallback, useEffect, useState } from "react";
import "./MusicRoom.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";
import SearchBarYoutube from "./SearchBarYoutube";
import Track from "../Common/Objects/Track";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useLocation, useParams } from "react-router-dom";
import { ArrowLeftOutlined, CustomerServiceOutlined, HomeOutlined, PlaySquareOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import http from "../Common/Utilities/HttpModule";
import { MusicRoomType } from "../Common/Objects/MusicRoomType";
import queueIcon from "./queue.svg";

type MusicRoomRouteParams = {
  id?: string | undefined;
};

const MusicRoom = () => {
  const [queue, setQueue] = useState<Track[]>([
    {
      id: "yDlty38M_ZE",
      title: "Nothing Lasts",
      thumbnail:
        "https://i.ytimg.com/vi/YVSYJjk3bvo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCwrjbBOcx97vtn9uZTvkeCrliJ6Q",
    },
    {
      id: "ZFI7xoIHt-Q",
      title: "Neroche - Moontide Theory (Hugo Kant Edit)",
      thumbnail:
        "https://i.ytimg.com/vi/YVSYJjk3bvo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCwrjbBOcx97vtn9uZTvkeCrliJ6Q",
    },
    {
      id: "Pqv_TqdZSYg",
      title: "BICEP | SAKU (FEAT. CLARA LA SAN) (Official Audio)",
      thumbnail:
        "https://i.ytimg.com/vi/YVSYJjk3bvo/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCwrjbBOcx97vtn9uZTvkeCrliJ6Q",
    },
  ]);

  const { pathname } = useLocation();
  const { id } = useParams<MusicRoomRouteParams>();
  const [musicRoom, setMusicRoom] = useState<MusicRoomType>();

  const getMusicRoom = useCallback(async () => {
    try {
      const { data } = await http.get<MusicRoomType>("musicroom/" + id);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMusicRoom();
  });

  const handleRemoveFromQueue = useCallback(
    (id: string) => {
      const currentQueue: Track[] = [...queue];
      const filteredQueue = currentQueue.filter(video => video.id !== id);
      setQueue(filteredQueue);
    },
    [queue],
  );

  const handleAddToQueue = useCallback((video: Track) => {
    const currentQueue = [...queue];
    currentQueue.push(video);
    setQueue(currentQueue);
  }, []);

  const nextVideo = useCallback(() => {
    const currentQueue: Track[] = [...queue];
    currentQueue.shift();
    setQueue(currentQueue);
  }, [queue]);

  return (
    <Screen className="music-room">
      <Row>
        <Link to={{ pathname: "/", state: { previousPath: pathname } }}>
          <ArrowLeftOutlined /> Back
        </Link>
      </Row>

      <Row className="music-room-content" justify="space-between" align="top" gutter={24}>
        {queue.length !== 0 && (
          <Col xs={24} md={12} lg={16}>
            <h1>
              <CustomerServiceOutlined /> PlaceHolderTitle
            </h1>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                playing={false}
                url={"https://www.youtube.com/watch?v=" + queue[0].id}
                width="100%"
                height="100%"
                onEnded={nextVideo}
                controls={true}
              />
            </div>
          </Col>
        )}
        <Col xs={24} md={12} lg={8} className="queue-container">
          <SearchBarYoutube onAddToQueue={handleAddToQueue} />

          <h3 className="queue-title">
            <img src={queueIcon} alt="queue-icon" /> Next Up
          </h3>
          <Queue queue={queue} onRemoveFromQueue={handleRemoveFromQueue} />
        </Col>
      </Row>
    </Screen>
  );
};

export default memo(MusicRoom);
