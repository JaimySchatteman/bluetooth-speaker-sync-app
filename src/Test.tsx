import React from "react";
import { Button } from "antd";
import { WifiOutlined } from "@ant-design/icons";

const Test = () => {
  const handleConnectDevices = async () => {
    navigator.bluetooth
      .requestDevice({
        acceptAllDevices: true,
        optionalServices: ["heart_rate"],
      })
      .then(device => {
        console.log(device.name);
        return device.gatt!.connect();
      })
      .then(server => server.getPrimaryService("heart_rate"))

      .catch(() => {
        console.log("Couldn't connect");
      });
  };

  return (
    <div>
      <Button type={"primary"} shape={"round"} icon={<WifiOutlined />} size={"large"} onClick={handleConnectDevices}>
        Connect Devices
      </Button>
    </div>
  );
};

export default Test;
