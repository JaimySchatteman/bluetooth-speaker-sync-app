import { atom } from "recoil";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

export const userState = atom<User>({
  key: "User",
  default: { id: "qfdsqsdfqsd", firstName: "Jaimy", lastName: "Schatteman" } as User,
});

export default userState;
