import { User } from "./User";
import { Queue } from "./Queue";

export type MusicRoomType = {
  id: number;
  title: string;
  queue: Queue;
  owner: User;
  users: User[];
};
