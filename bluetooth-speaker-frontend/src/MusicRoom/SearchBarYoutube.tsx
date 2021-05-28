import React, { FunctionComponent, useCallback, useState } from "react";
import { Input, AutoComplete } from "antd";
import Track from "../Common/Objects/Track";

// Youtube api connection
const { YoutubeDataAPI } = require("youtube-v3-api");
const API_KEY = "AIzaSyCnFA9MC9ocChiYMa-Ed9EUkpLmqNngsdk";
const api = new YoutubeDataAPI(API_KEY);

type SearchBarYoutubeProps = {
  onAddToQueue: (video: Track) => void;
};

const SearchBarYoutube: FunctionComponent<SearchBarYoutubeProps> = ({ onAddToQueue }: SearchBarYoutubeProps) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [videos, setVideos] = useState<Track[]>([]);

  const searchYoutubeByName = async () => {
    try {
      console.log("searchin dg");
      const results = await api.searchAll(value, 5, { type: "video" });
      console.log(results.items);
      const tempVideos: Track[] = [];
      results.items.forEach((item: any) => {
        tempVideos.push({
          url: "https://www.youtube.com/watch?v=" + item.id.videoId,
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
    searchYoutubeByName();
    focus();
  };

  const onSelect = useCallback(
    (title: string) => {
      const videoToAdd: Track | undefined = videos.find(video => video.title === title);
      console.log("video added!");
      videoToAdd && onAddToQueue(videoToAdd);
    },
    [onAddToQueue, videos],
  );

  const onChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  return (
    <AutoComplete options={options} className="auto-complete-search" onSelect={onSelect} onChange={onChange}>
      <Input.Search onSearch={onSearch} size="large" placeholder="Search for a track..." />
    </AutoComplete>
  );
};

export default SearchBarYoutube;
