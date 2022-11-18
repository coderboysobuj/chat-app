import { Session } from "../context/Auth/Auth";
import { Chat } from "../context/Chat/Chat";

export const getName = (chat: Chat, session: Session): string => {
  const result = chat.users.filter((u) => u.id !== session?.user.id)[0]
    .username;

  return result;
};
