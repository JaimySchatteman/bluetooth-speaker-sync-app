import React, { FunctionComponent } from "react";
import { List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Track from "../Common/Objects/Track";

type QueueProps = {
  queue?: Track[];
  onRemoveFromQueue: (trackID: number) => void;
};

const Queue: FunctionComponent<QueueProps> = ({ queue, onRemoveFromQueue }: QueueProps) => {
  return (
    <List
      className="track-list"
      itemLayout="horizontal"
      bordered={false}
      dataSource={queue}
      renderItem={({ id, url, title, thumbnail }) => (
        <List.Item key={id} className="device-list-item">
          <div className="thumbnail-container">
            <img src={thumbnail} alt="thumb" />
          </div>
          <List.Item.Meta title={title} description={"This is a description"} />
          <div className="delete-icon-container" onClick={id ? () => onRemoveFromQueue(id) : undefined}>
            <DeleteOutlined className="delete-icon" />
          </div>
        </List.Item>
      )}
    />
  );
};

export default Queue;
