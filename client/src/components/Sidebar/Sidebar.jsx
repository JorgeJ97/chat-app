// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
// import { BsCheckAll } from "react-icons/bs";
import React from "react";
import LogoutButton from "./LogoutButton/LogoutButton";
import SearchBar from "./SearchBar/SearchBar";
import { FaUserPlus } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import EditUser from "./EditUser/EditUser";
import Avatar from "../Avatar/Avatar";
import useGetCoversations from "../../hooks/useGetConversations";
import useChatContext from "../../hooks/useChatContext";
import ConversationsContainer from "./ConversationContainer/ConversationsContainer";


const Sidebar = () => {
    const { setSelectedChat } = useChatContext();

    const { getConversations } = useGetCoversations();


    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        getConversations();
    }, []);


    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleClick = (user) => {
        setSelectedChat(user);
    }

    return (
        <div className=" h-full grid grid-cols-[48px,252px] bg-white">
            <div className=" bg-zinc-800 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between" >
                <div className="mt-[44px]">
                    <div className="  text-white w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-zinc-700 rounded"
                        title="Users"
                        onClick={() => setSearchOpen(!searchOpen)}>
                        <FaUserPlus size={25} />
                    </div>
                </div>

                <div >
                    <div className="hover:bg-zinc-700 rounded pl-1">
                        <Avatar image={user?.image} fullName={user?.fullName} id={user?.id} handleOpen={handleOpen} />
                    </div>

                    <div className="text-white w-12 h-12  flex items-center cursor-pointer hover:bg-zinc-700 rounded" title="Logout">
                        <LogoutButton />
                    </div>
                </div>


            </div>

            <div className="w-full bg-white">
                <div className="h-16 flex items-center">
                    <h2 className="text-xl font-bold text-slate-700 p-4">Messages</h2>
                </div>

                {/* Conversations */}
                <div className="bg-slate-200 p-[0.5px]"></div>
                <div className=" overflow-hidden">

                <ConversationsContainer handleClick={handleClick} />
                </div>
            </div>


            {isOpen && (
                <EditUser onClose={() => setIsOpen(false)} user={user} />
            )
            }

            {
                searchOpen && (
                    <SearchBar onClose={() => setSearchOpen(false)} />
                )

            }


        </div>
    )

};

export default React.memo(Sidebar);




{/* <div className="  text-white w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-zinc-700 rounded"
                        title="Chat">
                        <IoChatbubbleEllipsesOutline size={25} />
                    </div> */}