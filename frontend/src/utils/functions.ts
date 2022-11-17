import { Session } from "../atoms/auth";
import { Chat } from "../atoms/chat";

export const getName = (chat: Chat, session: Session): string => {
  const result = chat.users.filter((u) => u.id !== session?.user.id)[0]
    .username;

  return result;
};
