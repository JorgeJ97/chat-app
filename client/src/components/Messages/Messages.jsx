import useGetMessages from "../../hooks/useGetMessage";
import Message from "./Message";

const Messages = () => {
    const { messages } = useGetMessages();
    return (
        <div className="px-4 overflow-auto flex-1">
            {messages.length > 0 &&
                messages?.map(message => {
                    return (
                        <Message
                            key={message._id}
                            message={message}
                        />
                    )
                })}
        </div>
    )

};

export default Messages;