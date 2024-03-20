import { useEffect } from "react";
import useChatContext from "../../hooks/useChatContext";
import Messages from "./Messages";
import useAuth from "../../hooks/useAuth";
import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";

const MessagesContainer = () => {


    const { selectedChat, setSelectedChat } = useChatContext();
    const {user} = useAuth();

    useEffect(() => {
        return () => {
            setSelectedChat(null);
        }
    }, [setSelectedChat])

    return (
        <div className="flex flex-col md:min-w-[450px] max-w-[480px]">
            {!selectedChat ? (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="flex items-center flex-col gap-2 font-semibold text-white md:text-lg sm:text-base text-center">
                        <p>Hello {user.fullName}!</p>
                        <p>Select a chat to start conversation.</p>
                        <TiMessages className=" text-3xl md:text-6xl text-center"/>
                    </div>


                </div>

            ) : (
                <>
                    <div className="px-4 py-4 mb-2 bg-zinc-600">
                        <span className=" label-text font-semibold">To:{" "}</span>
                        <span className=" text-white font-bold">{selectedChat?.fullName}</span>
                    </div>

                    <Messages />
                    <MessageInput/>
                </>

            )}
        </div>
    )

};

export default MessagesContainer;