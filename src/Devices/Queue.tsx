import React, { FunctionComponent } from "react";
import { Video } from "./MusicRoom";
import { List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type QueueProps = {
  queue: Video[];
  onRemove: (videoId: string) => void;
};

const Queue: FunctionComponent<QueueProps> = ({ queue, onRemove }: QueueProps) => {
  return (
    <div>
      <div className="test-container">
        <List
          className="device-list"
          itemLayout="horizontal"
          bordered={false}
          dataSource={queue}
          renderItem={({ id, title }) => (
            <List.Item key={id} className="device-list-item">
              <List.Item.Meta title={title} description={"This is a description"} />
              <div className="delete-icon-container" onClick={() => onRemove(id)}>
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
