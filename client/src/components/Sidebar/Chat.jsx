import { useSocket } from "../../context/SocketContext";
import useChatContext from "../../hooks/useChatContext";
import getInitials from "../../utils/getInitials";
import listenSocket from "../../utils/listenSocket";
import { useEffect } from "react";

const Chat = ({chatUser}) => {

    const initials = getInitials(chatUser.fullName);
    const {selectedChat, setSelectedChat} = useChatContext();
    const isSelected = selectedChat?._id === chatUser._id;
    const {onlineUsers} = useSocket();
    const isOnline = onlineUsers.includes(chatUser._id);


    const handleClick = (chatUser) => {
        setSelectedChat(chatUser);
    };

    return (
        <div>
            <div className={`flex items-center gap-2 hover:bg-zinc-700 rounded px-2 py-1 cursor-pointer ${isSelected ? "bg-zinc-700" : ""}`}
            onClick={() => handleClick(chatUser)}
            >

                <div className={`avatar ${isOnline ? "online" : ""} placeholder`}>
                    <div className="bg-neutral text-neutral-content rounded-full w-16">
                        <span className="text-base">{initials.toUpperCase()}</span>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className=" font-bold text-white">{chatUser.fullName}</p>
                    </div>

                </div>

            </div>
        </div>
    )

};

export default Chat;