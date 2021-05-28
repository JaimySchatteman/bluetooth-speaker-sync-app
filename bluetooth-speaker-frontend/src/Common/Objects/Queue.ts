import Track from "./Track";

export type Queue = {
  id: number;
  tracks: Track[];
  started_playing_at_time: string;
  pauzed_at_time: string;
};
