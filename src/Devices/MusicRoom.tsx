import React, { memo, useCallback, useEffect, useState } from "react";
import { Avatar, Button, Col, List, Row } from "antd";
import { DeleteOutlined, LoadingOutlined, WifiOutlined } from "@ant-design/icons";
import "./Test.less";
import ReactPlayer from "react-player";

type Video = {
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

  const removeFromQueue = useCallback((id: string) => {
    const currentQueue: Video[] = [...queue];
    const filteredQueue = currentQueue.filter(video => video.id !== id);
    setQueue(filteredQueue);
  }, []);

  const nextVideo = useCallback(() => {
    console.log(queue);
    const currentQueue: Video[] = [...queue];
    currentQueue.shift();
    console.log(currentQueue);
    setQueue(currentQueue);
  }, []);

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
      <div className="test-container">
        <List
          className="device-list"
          itemLayout="horizontal"
          bordered={false}
          dataSource={queue}
          renderItem={({ id, title }) => (
            <List.Item key={id} className="device-list-item">
              <List.Item.Meta title={title} description={"This is a description"} />
              <div className="delete-icon-container" onClick={() => removeFromQueue(id)}>
                <DeleteOutlined className="delete-icon" />
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default memo(MusicRoom);
