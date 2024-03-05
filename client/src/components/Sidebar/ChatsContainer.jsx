import useGetUsers from "../../hooks/useGetUsers";
import Chat from "./Chat";


const ChatsContainer = () => {
    const { loading, chats } = useGetUsers();
    return (
        <div className="flex flex-col overflow-auto">
            {chats?.map(chat => {
                return (
                    <Chat 
                    key={chat._id}
                    id = {chat._id}
                    fullName = {chat.fullName} 
                    image = {chat.image}
                    />
                )
            })}
        </div>
    )

};

export default ChatsContainer;