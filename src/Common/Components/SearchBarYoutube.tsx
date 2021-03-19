import React, { FunctionComponent, useCallback, useState } from "react";
import { Input, AutoComplete } from "antd";
import Video from "../Objects/Video";

// Youtube api connection
const { YoutubeDataAPI } = require("youtube-v3-api");
const API_KEY = "AIzaSyB2jdwa0q3zseYVginMFlHUEqc5rPLUXQg";
const api = new YoutubeDataAPI(API_KEY);

type SearchBarYoutubeProps = {
  onAddToQueue: (video: Video) => void;
};

const SearchBarYoutube: FunctionComponent<SearchBarYoutubeProps> = ({ onAddToQueue }: SearchBarYoutubeProps) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  const searchYoutubeByName = async () => {
    try {
      console.log("searchin dg");
      const results = await api.searchAll(value, 5, { type: "video" });
      console.log(results.items);
      const tempVideos: Video[] = [];
      results.items.forEach((item: any) => {
        tempVideos.push({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
        });
      });
      console.log(tempVideos);
      setVideos(tempVideos);

      setOptions([
        { value: results.items[0].snippet.title },
        { value: results.items[1].snippet.title },
        { value: results.items[2].snippet.title },
        { value: results.items[3].snippet.title },
        { value: results.items[4].snippet.title },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const onSearch = () => {
    //setOptions(!searchText ? [] : [{ value: "testdd" }, { value: "test2" }, { value: "test3" }]);
    searchYoutubeByName();
    focus();
  };

  const onSelect = useCallback((title: string) => {
    console.log(title);
    console.log(videos);
    const videoToAdd: Video | undefined = videos.find(video => video.title === title);
    console.log(videoToAdd);
    videoToAdd && onAddToQueue(videoToAdd);
  }, []);

  const onChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  return (
    <AutoComplete options={options} style={{ width: 200 }} onSelect={onSelect} onChange={onChange}>
      <Input.Search onSearch={onSearch} size="large" placeholder="input here" />
    </AutoComplete>
  );
};

export default SearchBarYoutube;
