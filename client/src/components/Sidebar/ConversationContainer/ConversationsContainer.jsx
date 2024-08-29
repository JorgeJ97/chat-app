import useChatContext from "../../../hooks/useChatContext";
import Conversation from "./Conversation";


const ConversationsContainer = ({ handleClick }) => {

    const { conversations, selectedChat } = useChatContext();


    return (
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto">
            {
                conversations.length !== 0 && conversations.map((conv) => {
                    return (
                        <Conversation
                            key={conv?._id}
                            handleClick={handleClick}
                            conv={conv}
                            selectedChat={selectedChat}
                        />
                    )
                })
            }
        </div>
    )

};

export default ConversationsContainer;