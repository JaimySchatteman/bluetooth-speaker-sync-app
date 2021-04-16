import { atom } from "recoil";

export type AccessToken = {
  accessToken: string;
};

const AccessTokenState = atom<AccessToken>({
  key: "accessToken",
  default: { accessToken: "" },
});

export default AccessTokenState;
