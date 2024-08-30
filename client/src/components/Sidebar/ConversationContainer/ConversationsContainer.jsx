import useChatContext from "../../../hooks/useChatContext";
import Conversation from "./Conversation";
import { FiArrowUpLeft } from "react-icons/fi";


const ConversationsContainer = ({ handleClick }) => {

    const { conversations, selectedChat } = useChatContext();


    return (
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto">

{
                        conversations.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-500'>
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>    
                            </div>
                        )
                    }
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