export interface User {
  id: string;
  username: string;
  image?: string;
}

export interface Session {
  user: User;
  accessToken: string;
}
