import { useRef } from 'react';
import useAuth from "../../hooks/useAuth";
import useChatContext from "../../hooks/useChatContext";
import getInitials from "../../utils/getInitials";
import MediaModal from './MessageInput/MediaModal';
import { IoPlayCircleOutline } from "react-icons/io5";
import useSendMessage from '../../hooks/useSendMessage';

const Message = ({ message }) => {
    const { selectedChat } = useChatContext();
    const { user } = useAuth();
    const { loading } = useSendMessage();


    // References to  dialog tag
    const dialogImageRef = useRef(null);
    const dialogVideoRef = useRef(null);

    const toInitials = getInitials(selectedChat.fullName);
    const userInitials = getInitials(user.fullName);
    let isReceiver = user.id === message.receiverId;
    const time = getTime(message.createdAt);
    const shake = message.shake ? "shake" : "";
    let initials = isReceiver ? toInitials : userInitials;
    let image = isReceiver ? selectedChat?.image : user?.image;

    //Open modal
    const handleOpenModal = (dialogRef) => {
        dialogRef.current.showModal();  /*Open dialog tag*/
    };

    // Close modal
    const handleClose = (dialogRef) => {
        dialogRef.current.close(); /* Close dialog tag*/
    };

    if (selectedChat?._id === message.senderId || user.id === message.senderId) {
        return (
            <div className={`chat py-2.5 ${!isReceiver ? "chat-end" : "chat-start"}`}>
                <div className={`chat-image avatar ${image ? '' : 'placeholder'} `}>
                    {image ? (
                        <div className="w-10 rounded-full">
                            <img alt="" src={image} />
                        </div>
                    ) : (
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span className="text-sm">{initials}</span>
                        </div>
                    )}
                </div>

                <div className={`chat-bubble overflow-y-auto overflow-x-hidden break-all text-white ${shake} ${!isReceiver ? "bg-blue-500" : "bg-zinc-800"}`}>
                    {
                        loading ? <div className='w-10 loading loading-spinner'></div> :

                            /* Message with image */
                            message?.imageUrl ? (
                                <div className='max-w-[240px] max-h-[240px] lg:max-w-[350px] lg:max-h-[350px] md:max-w-[300px] md:max-h-[300px] overflow-hidden'>
                                    <img
                                        src={message?.imageUrl}
                                        className="w-full h-full object-scale-down cursor-pointer"
                                        onClick={() => handleOpenModal(dialogImageRef)}
                                        alt={message._id}
                                    />
                                </div>
                            ) :
                                /* Message with video */
                                message.videoUrl ? (
                                    <div className='max-w-[240px] max-h-[240px] lg:max-w-[350px] lg:max-h-[350px] md:max-w-[300px] md:max-h-[300px] overflow-hidden'>
                                        <video
                                            src={message?.videoUrl}
                                            className='w-full h-full object-scale-down cursor-pointer'
                                        />
                                        <button
                                            className="absolute inset-0 flex items-center justify-center"
                                            onClick={() => handleOpenModal(dialogVideoRef)}
                                        >
                                            <IoPlayCircleOutline size={90} />
                                        </button>
                                    </div>
                                ) : (null)}

                    <div> {message.message}</div>
                    <div className="opacity-55 text-xs flex justify-end gap-1 items-center mt-1">{time}</div>
                </div>

                {/* ImageModal */}
                <MediaModal
                    dialogRef={dialogImageRef}
                    handleClose={() => handleClose(dialogImageRef)}
                    src={message?.imageUrl}
                    type={'image'}
                />

                {/* VideoModal*/}
                <MediaModal
                    dialogRef={dialogVideoRef}
                    handleClose={() => handleClose(dialogVideoRef)}
                    src={message?.videoUrl}
                    type={'video'}
                />


            </div>
        );
    }
};

export default Message;


function getTime(dateString) {
    const date = new Date(dateString);

    const hour = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${hour}:${minutes}`;

}
function padZero(number) {
    return number.toString().padStart(2, "0");
}