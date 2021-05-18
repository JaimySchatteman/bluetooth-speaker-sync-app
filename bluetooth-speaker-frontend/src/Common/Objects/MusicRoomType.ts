import { User } from "./User";
import Track from "./Track";

export type MusicRoomType = {
  id: number;
  title: string;
  queue: Track[];
  owner: User;
  users: User[];
};
