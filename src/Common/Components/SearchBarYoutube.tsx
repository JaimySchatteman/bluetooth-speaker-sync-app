import React, { useCallback, useState } from "react";
import { Input, AutoComplete } from "antd";
import { Video } from "../../Devices/Test";

// Youtube api connection
const { YoutubeDataAPI } = require("youtube-v3-api");
const API_KEY = "AIzaSyB2jdwa0q3zseYVginMFlHUEqc5rPLUXQg";
const api = new YoutubeDataAPI(API_KEY);

const SearchBarYoutube = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const searchYoutubeByName = async (searchString: string) => {
    console.log("searchin dg");
    const results = await api.searchAll(searchString, 5, { type: "video" });
    console.log(results.items[0].snippet.title);
    setOptions(
      !searchString
        ? []
        : [
            { value: results.items[0].snippet.title },
            { value: results.items[1].snippet.title },
            { value: results.items[2].snippet.title },
            { value: results.items[3].snippet.title },
            { value: results.items[4].snippet.title },
          ],
    );
  };

  const onSearch = () => {
    //setOptions(!searchText ? [] : [{ value: "testdd" }, { value: "test2" }, { value: "test3" }]);
    searchYoutubeByName(value);
    focus();
  };

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };

  return (
    <AutoComplete options={options} style={{ width: 200 }} onSelect={onSelect} onChange={onChange}>
      <Input.Search onSearch={onSearch} size="large" placeholder="input here" />
    </AutoComplete>
  );
};

export default SearchBarYoutube;
