import { atom } from "recoil";
import { User } from "../Common/Objects/User";

const UserState = atom<User>({
  key: "UserState",
  default: {} as User,
});

export default UserState;
