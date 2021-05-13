import {atom} from "recoil";

export type User = {
    firstName: string;
    lastName: string
}

const UserState = atom<User>(
    {
        key: 'UserState',
        default: {firstName: "Jaimy", lastName: "Schatteman"} as User
    }
)

export default UserState;