import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessage";
import Message from "./Message";

const Messages = () => {
    const { messages } = useGetMessages();
    const lastMessageRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100);

        return () => clearTimeout(timer);

    }, [messages]);
    

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
                <div ref={lastMessageRef} />
        </div>
    )

};

export default Messages;