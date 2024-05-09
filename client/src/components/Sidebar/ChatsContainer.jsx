import { useEffect } from "react";
import useChatContext from "../../hooks/useChatContext";
import useGetUsers from "../../hooks/useGetUsers";
import Chat from "./Chat";
import { useSocket } from "../../context/SocketContext";


const ChatsContainer = () => {

    const {socket} = useSocket();
    const { loading } = useGetUsers();
    const {chatUsers} = useChatContext();

    useEffect(()=> {            
        socket?.on("new_user",  (boolean) => {
        useGetUsers();
    })
    }, [])

    return (
        <div className=" mb-2 flex flex-col overflow-auto">
            {chatUsers?.map((chatUser) => {
                return (
                    <Chat 
                    key={chatUser._id}
                    chatUser = {chatUser}
                    />
                )
            })}
        </div>
    )

};

export default ChatsContainer;