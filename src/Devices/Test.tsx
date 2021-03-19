import React, { useCallback, useState } from "react";
import { Avatar, Button, Col, List, Row } from "antd";
import { DeleteOutlined, LoadingOutlined, WifiOutlined } from "@ant-design/icons";
import "./Test.less";
import ReactPlayer from "react-player";

export type Video = {
  id: string;
  title: string;
  url: string;
};

const Test = () => {
  const [currentVideo, setCurrentVideo] = useState<Video>();
  const [queue, setQueue] = useState<Video[]>([
    {
      id: "13213",
      title: "K3 - Oljalele",
      url: "http://sqdfqsdfqsf",
    },
    {
      id: "5646889",
      title: "Samson & gert - Had ik 1 miljoen",
      url: "http://sqdfqsdfqsf",
    },
    {
      id: "65656456",
      title: "K3 - Oljalele",
      url: "http://sqdfqsdfqsf",
    },
  ]);

  const removeFromQueue = useCallback((id: string) => {
    const currentQueue: Video[] = [...queue];
    const filteredQueue = currentQueue.filter(video => video.id !== id);
    setQueue(filteredQueue);
  }, []);

  const nextVideo = useCallback(() => {
    console.log("dfqsdf");
  }, []);

  return (
    <div>
      <div className="player-wrapper">
        {currentVideo && (
          <ReactPlayer
            className="react-player"
            onEnded={nextVideo}
            url={"https://www.youtube.com/watch?v=" + currentVideo.id}
            width="100%"
            height="100%"
          />
        )}
      </div>
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

export default Test;
