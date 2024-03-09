import useGetUsers from "../../hooks/useGetUsers";
import Chat from "./Chat";


const ChatsContainer = () => {
    const { loading, chatUsers } = useGetUsers();
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