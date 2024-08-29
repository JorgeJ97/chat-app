import React from 'react'
import getInitials from '../../utils/getInitials';
import { useSocket } from '../../context/SocketContext';


const Avatar = ({id, image, fullName, handleOpen}) => {

    const {onlineUsers} = useSocket();
    const isOnline = onlineUsers.includes(id);


    return (
        <>
            {image ? (

                <div className= {`avatar flex items-center cursor-pointer rounded w-12 h-12`} title={fullName} onClick={handleOpen}>
                    <div className="w-10 rounded-full">
                        <img src={image} />
                    </div>
                    <div className={`absolute rounded-full w-2 right-2 bottom-2 ${isOnline ? 'bg-green-400' : 'bg-neutral-200'}`} />
                </div>
            ) : (

                <div className={`avatar placeholder flex items-center cursor-pointer rounded w-12 h-12`} title={fullName}
                    onClick={handleOpen}
                >
                    <div className=" bg-neutral text-white rounded-full w-10 h-10">
                        <span className="text-xl">{getInitials(fullName)}</span>
                    </div>
                    <div className={`absolute rounded-full w-2 right-2 bottom-2 ${isOnline ? 'bg-green-400' : ' bg-neutral-400'}`} />
                </div>

            )}

        </>
    )
}

export default React.memo(Avatar);