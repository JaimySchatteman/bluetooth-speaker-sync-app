import React, { useCallback, useState } from "react";
import { Avatar, Button, List } from "antd";
import { DeleteOutlined, LoadingOutlined, WifiOutlined } from "@ant-design/icons";
import "./Test.less";

interface IBluetoothDevice extends BluetoothDevice {
  batteryLevel?: number;
}

const Test = () => {
  const [connectedDevices, setConnectedDevices] = useState<IBluetoothDevice[]>([]);
  const [connectingDevice, setConnectingDevice] = useState<boolean>(false);

  const handleConnectDevices = async () => {
    console.log("Requesting Bluetooth Device...");
    navigator.bluetooth
      .requestDevice({ filters: [{ services: ["battery_service"] }] })
      .then(async device => {
        await addDevice(device);
        await addNotificationListener(device);
        setConnectingDevice(false);
        console.log(connectingDevice);
      })
      .catch(error => {
        console.log(error);
        setConnectingDevice(false);
      });
  };

  const addDevice = async (newDevice: IBluetoothDevice) => {
    setConnectingDevice(true);
    await newDevice.gatt
      ?.connect()
      .then(server => {
        console.log("Getting Server...");
        return server.getPrimaryService("battery_service");
      })
      .then(service => {
        console.log("Getting Service...");
        return service.getCharacteristic("battery_level");
      })
      .then(characteristic => {
        console.log("Getting Service...");
        return characteristic.readValue();
      })
      .then((batteryLevel: DataView) => {
        console.log("Getting battery level");
        addDeviceToDeviceList(newDevice, batteryLevel.getUint8(0));
        console.log(newDevice);
      });

    setConnectingDevice(false);
  };

  const addNotificationListener = (newDevice: IBluetoothDevice) => {
    newDevice.gatt
      ?.connect()
      .then(server => {
        console.log("Getting Service...");
        return server.getPrimaryService("battery_service");
      })
      .then(service => {
        console.log("Getting Characteristic...");
        return service.getCharacteristic("battery_level");
      })
      .then(async characteristic => {
        const myCharacteristic = characteristic;
        return myCharacteristic.startNotifications().then(_ => {
          console.log("> Notifications started");
          myCharacteristic.addEventListener("characteristicvaluechanged", handleBatteryLevelChanged);
        });
      })
      .catch(error => {
        console.log("Argh! " + error);
      });
  };

  const addDeviceToDeviceList = (device: IBluetoothDevice, batteryLevel: number): void => {
    device.batteryLevel = batteryLevel;
    const currentConnectedDevices = [...connectedDevices, device];
    setConnectedDevices(currentConnectedDevices);
  };

  const handleBatteryLevelChanged = useCallback((event: any) => {
    console.log(typeof event);
    const value = event.target.value;
    console.log(value.getUint8(0) + "%");
  }, []);

  const disconnectDevice = (deviceId: string) => {
    console.log("disconnect");
    const device = connectedDevices.find(connectedDevice => connectedDevice.id === deviceId);
    console.log("disconnect device " + device);
    device?.gatt?.disconnect();
    const filteredConnectedDevices = connectedDevices.filter(connectedDevice => connectedDevice.id !== deviceId);
    setConnectedDevices(filteredConnectedDevices);
  };

  return (
    <div className="test-container">
      <Button
        className="connect-device"
        type={"primary"}
        shape={"round"}
        icon={connectingDevice ? <LoadingOutlined /> : <WifiOutlined />}
        size={"large"}
        onClick={handleConnectDevices}
      >
        Connect a Device
      </Button>
      <List
        className="device-list"
        itemLayout="horizontal"
        bordered={false}
        dataSource={connectedDevices}
        renderItem={({ id, name, gatt, uuids, batteryLevel }) => (
          <List.Item key={id} className="device-list-item">
            <List.Item.Meta
              avatar={
                <Avatar size={"large"} style={{ backgroundColor: "#1DA57A" }} shape="square">
                  {name?.slice(0, 1)}
                </Avatar>
              }
              title={name}
              description={batteryLevel + "%"}
            />
            <div className="delete-icon-container" onClick={() => disconnectDevice(id)}>
              <DeleteOutlined className="delete-icon" />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Test;
