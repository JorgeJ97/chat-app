import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessage";
import Message from "./Message";
import listenSocket from "../../utils/listenSocket";

const Messages = () => {
    listenSocket();
    
    const {messages, loading }= useGetMessages();
    const lastMessageRef = useRef(null);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100);

        return () => clearTimeout(timer);

    }, [messages]);
    

    return (
        <div className="px-4 overflow-auto flex-1">
            {!loading && messages.length > 0 &&
                messages?.map(message => {
                    return (
                        <Message
                            key={message._id}
                            message={message}
                        />
                    )
                })}
                <div ref={lastMessageRef} />
                {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
        </div>
    )

};

export default Messages;













const MessageSkeleton = () => {
	return (
		<>
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
