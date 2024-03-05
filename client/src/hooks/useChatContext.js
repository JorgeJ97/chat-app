import { useContext } from "react"
import { ChatContext } from "../context/Context";

const useChatContext = () => {
    return useContext(ChatContext)
};

export default useChatContext;