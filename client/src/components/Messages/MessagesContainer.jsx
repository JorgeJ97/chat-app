import useChatContext from "../../hooks/useChatContext";
import Messages from "./Messages";

const MessagesContainer = () => {

    const {selectedChat, setSelectedChat} = useChatContext();

    return (
        <div className="flex flex-col md:min-w-[450px]">
            <div className="px-4 py-4 mb-2 bg-zinc-600">
                <span className=" label-text font-semibold">To:{" "}</span>
                <span className=" text-white font-bold">{selectedChat?.fullName}</span>
            </div>

            <Messages/>
        </div>
    )

};

export default MessagesContainer;