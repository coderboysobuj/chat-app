import { useRecoilState } from "recoil";
import messageAtom from "../atoms/message";

const useMessage = () => {
  const [messageState, setMessageState] = useRecoilState(messageAtom);
  return {
    messageState,
    setMessageState,
  };
};

export default useMessage;
