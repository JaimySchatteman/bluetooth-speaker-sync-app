import React, { memo, useCallback, useState } from "react";
import "./MusicRoom.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";
import SearchBarYoutube from "../Common/Components/SearchBarYoutube";
import Video from "../Common/Objects/Video";
// @ts-ignore
import { Screen, Link } from "react-tiger-transition";
import { useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Row } from "antd";

const MusicRoom = () => {
  const [queue, setQueue] = useState<Video[]>([
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

  const handleRemoveFromQueue = useCallback(
    (id: string) => {
      const currentQueue: Video[] = [...queue];
      const filteredQueue = currentQueue.filter(video => video.id !== id);
      setQueue(filteredQueue);
    },
    [queue],
  );

  const handleAddToQueue = useCallback((video: Video) => {
    const currentQueue = [...queue];
    currentQueue.push(video);
    setQueue(currentQueue);
  }, []);

  const nextVideo = useCallback(() => {
    const currentQueue: Video[] = [...queue];
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

      <SearchBarYoutube onAddToQueue={handleAddToQueue} />
      {queue.length !== 0 && (
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            playing={true}
            url={"https://www.youtube.com/watch?v=" + queue[0].id}
            width="100%"
            height="100%"
            onEnded={nextVideo}
            controls={true}
          />
        </div>
      )}
      <Queue queue={queue} onRemoveFromQueue={handleRemoveFromQueue} />
    </Screen>
  );
};

export default memo(MusicRoom);
