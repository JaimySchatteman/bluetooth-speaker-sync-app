import { atom } from "recoil";
import { User } from "../Common/Objects/User";

const UserState = atom<User>({
  key: "UserState",
  default: { id: 1, userName: "Jaimy", email: "email@provider.com" } as User,
});

export default UserState;
