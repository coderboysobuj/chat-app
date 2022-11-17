import { atom } from "recoil";

export interface User {
  id: string;
  username: string;
  image?: string;
}

export interface Session {
  user: User;
  accessToken: string;
}

interface IAuth {
  session: Session | null;
}
const authState = atom<IAuth>({
  key: "auth",
  default: {
    session: null as Session | null,
  },
});

export default authState;
