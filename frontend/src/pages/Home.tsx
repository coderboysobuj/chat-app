import React from "react";
import Chat from "../components/Chat/Chat";
import Feed from "../components/Feed/Feed";
import InitialScreen from "../components/InitialScreen";
import useChat from "../hooks/useChat";

const Home: React.FunctionComponent = () => {
  const { chatStateValue } = useChat();
  return (
    <>
      <Chat />
      {chatStateValue.selectedChat ? <Feed /> : <InitialScreen />}
    </>
  );
};

export default Home;
