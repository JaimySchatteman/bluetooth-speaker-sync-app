import React, { memo, useCallback, useEffect, useState } from "react";
import { Avatar, Button, Col, List, Row } from "antd";
import { DeleteOutlined, LoadingOutlined, WifiOutlined } from "@ant-design/icons";
import "./Test.less";
import ReactPlayer from "react-player";
import Queue from "./Queue";

export type Video = {
  id: string;
  title: string;
};

const MusicRoom = () => {
  const [queue, setQueue] = useState<Video[]>([
    {
      id: "yDlty38M_ZE",
      title: "Nothing Lasts",
    },
    {
      id: "ZFI7xoIHt-Q",
      title: "Neroche - Moontide Theory (Hugo Kant Edit)",
    },
    {
      id: "Pqv_TqdZSYg",
      title: "BICEP | SAKU (FEAT. CLARA LA SAN) (Official Audio)",
    },
  ]);

  const handleFromQueue = useCallback(
    (id: string) => {
      const currentQueue: Video[] = [...queue];
      const filteredQueue = currentQueue.filter(video => video.id !== id);
      setQueue(filteredQueue);
    },
    [queue],
  );

  const nextVideo = useCallback(() => {
    const currentQueue: Video[] = [...queue];
    currentQueue.shift();
    setQueue(currentQueue);
  }, [queue]);

  return (
    <div>
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
      <Queue queue={queue} onRemoveFromQueue={handleFromQueue} />
    </div>
  );
};

export default memo(MusicRoom);
