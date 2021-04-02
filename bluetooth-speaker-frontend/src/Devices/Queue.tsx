import React, { FunctionComponent } from "react";

import { List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Video from "../Common/Objects/Video";

type QueueProps = {
  queue: Video[];
  onRemoveFromQueue: (videoId: string) => void;
};

const Queue: FunctionComponent<QueueProps> = ({ queue, onRemoveFromQueue }: QueueProps) => {
  return (
    <div>
      <div className="test-container">
        <List
          className="device-list"
          itemLayout="horizontal"
          bordered={false}
          dataSource={queue}
          renderItem={({ id, title, thumbnail }) => (
            <List.Item key={id} className="device-list-item">
              <div className="thumbnail-container">
                <img src={thumbnail} alt="thumb" />
              </div>
              <List.Item.Meta title={title} description={"This is a description"} />
              <div className="delete-icon-container" onClick={() => onRemoveFromQueue(id)}>
                <DeleteOutlined className="delete-icon" />
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Queue;
