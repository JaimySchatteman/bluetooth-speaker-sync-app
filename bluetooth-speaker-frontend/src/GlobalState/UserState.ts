import { atom } from "recoil";
import { User } from "../Common/Objects/User";

const UserState = atom<User | undefined>({
  key: "UserState",
  default: undefined,
});

export default UserState;
