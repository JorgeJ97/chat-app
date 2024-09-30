import { Link } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import { FaImages } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const Conversation = ({ handleClick, selectedChat, conv }) => {

    const { user } = useAuth();


    return (
        <div key={conv?.user?._id} className="mx-1">
            <Link
                className="flex items-center gap-2 py-3 px-2 hover:border hover:bg-slate-50 hover:border-blue-700 h-16"
                to={`/${conv?.user?._id}`}
                onClick={() => handleClick(conv?.user)} >
                <Avatar
                    id={conv?.user?._id}
                    image={conv?.user?.image}
                    fullName={conv?.user?.fullName}
                />
                <div className="flex-1 min-w-0">
                    <h3 className="truncate text-slate-700 font-semibold text-base">{conv?.user?.fullName}</h3>
                    <div>
                        <div>
                            {conv?.lastMessage?.imageUrl ?
                                (<span className="flex items-center">
                                    <p className="text-sm">{`${user?.id === conv?.lastMessage?.senderId ? 'You:' : ''}`}</p>
                                    <FaImages className="mx-1" />Image
                                </span>) :

                                conv?.lastMessage?.videoUrl ? (
                                    <span className="flex items-center">
                                        <p className="text-sm">{`${user?.id === conv?.lastMessage?.senderId ? 'You:' : ''}`}</p>
                                        <FaVideo className="mx-1" />Video
                                    </span>

                                ) : (
                                    <p className="text-sm truncate">{`${user?.id === conv?.lastMessage?.senderId ? 'You:' : ''}`} {conv?.lastMessage?.message}</p>
                                )}
                        </div>

                    </div>
                </div>
                {conv?.unread[user?.id] && conv?.unread[user?.id] !== 0 && selectedChat?._id !== conv?.user?._id ?
                    <p className="flex items-center justify-center w-5 h-5 text-xs ml-auto p-1 text-white font-semibold bg-blue-700 rounded-full">{conv?.unread[user?.id]}</p> : null
                }

            </Link>

        </div>

    )

};

export default Conversation;