import React from "react";
import Chat from "../components/Chat/Chat";
import Feed from "../components/Feed/Feed";
import InitialScreen from "../components/InitialScreen";
import useChatUpdated from "../hooks/useChatUpdated";

const Home: React.FunctionComponent = () => {
  const { chatState } = useChatUpdated();
  return (
    <>
      <Chat />
      {chatState.selectedChat ? <Feed /> : <InitialScreen />}
    </>
  );
};

export default Home;
