import { useEffect, useState } from "react";
import useChatContext from "../../hooks/useChatContext";
import Avatar from "../Avatar/Avatar";
import { useSocket } from "../../context/SocketContext";
import useGetUsers from '../../hooks/useGetUsers';
import { useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MessageInput from "./MessageInput/MessageInput";
import wallpaper from '../../assets/wallpaper.jpeg'
import Messages from "./Messages";


const MessagesContainer = () => {

    const { userId } = useParams();
    const { selectedChat, setSelectedChat } = useChatContext();
    const { getUser } = useGetUsers();
    const { onlineUsers } = useSocket();
    const status = onlineUsers.includes(selectedChat?._id) ? 'online' : 'offline';

    useEffect(() => {
        async function fetchUser() {

            await getUser(userId)
        }
        if (userId) fetchUser();

        return () => {
            setSelectedChat(null);

        }
    }, [setSelectedChat])


    return (
        <div style={{ backgroundImage: `url(${wallpaper})` }} className="relative">
            <header className="flex items-center justify-between sticky h-16 bg-white pr-4">
                <div className="flex items-center gap-1 text-slate-800 h-full">
                    <Link to={'/'} title="Back" className=" lg:hidden hover:bg-slate-100 h-[90%] flex items-center justify-center w-10 rounded m-1">
                        <div>
                            <FaArrowLeft />
                        </div>
                    </Link>

                    <div>
                        {
                            selectedChat &&
                            <Avatar id={selectedChat?._id} image={selectedChat?.image} fullName={selectedChat?.fullName} />
                        }
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">{selectedChat?.fullName}</h3>
                        <p className={`-my-2 text-sm ${status === 'online' ? ' text-blue-700' : 'text-slate-400'}`}>
                            {selectedChat && status}
                        </p>
                    </div>

                </div>
                <div className=" text-slate-800 text-2xl ">
                    <button className="">
                        <HiDotsVertical />

                    </button>
                </div>

            </header>

            {/*  Messages */}
            <section className=" h-[calc(100vh-128px)] overflow-y-auto overflow-x-hidden bg-slate-200 bg-opacity-50">
                <Messages/>

            </section>

            {/* Input messages */}
            <MessageInput />


        </div>
    )

};

export default MessagesContainer;


/** Messages container f1 */

// import Messages from "./Messages";
// import useAuth from "../../hooks/useAuth";
// import { TiMessages } from "react-icons/ti";
// import MessageInput from "./MessageInput";





// const { user } = useAuth();

// <div className="flex flex-col md:min-w-[450px] max-w-[480px]">
//     {!selectedChat ? (
//         <div className="flex items-center justify-center w-full h-full">
//             <div className="flex items-center flex-col gap-2 font-semibold text-white md:text-lg sm:text-base text-center">
//                 <p>Hello {user.fullName}!</p>
//                 <p>Select a chat to start conversation.</p>
//                 <TiMessages className=" text-3xl md:text-6xl text-center"/>
//             </div>


//         </div>

//     ) : (
//         <>
//             <div className="px-4 py-4 mb-2 bg-zinc-600">
//                 <span className=" label-text font-semibold">To:{" "}</span>
//                 <span className=" text-white font-bold">{selectedChat?.fullName}</span>
//             </div>

//             <Messages />
//             <MessageInput/>
//         </>

//     )}
// </div>